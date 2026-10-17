
import {
  DashboardApp,
  CATEGORIES,
  fetchQuote,
  formatDate,
  formatCountdown,
  escapeHtml
} from "./app.js";

const ONE_DAY = 24 * 3600000;

// buat satu aplikasi yang siap dipakai
const app = new DashboardApp();

// ===== ambil elemen dari HTML =====
const el = {
  stat: document.getElementById("stat"),
  dlTitle: document.getElementById("dl-title"),
  dlTime: document.getElementById("dl-time"),
  dlTag: document.getElementById("dl-tag"),
  quoteText: document.getElementById("quote-text"),
  quoteAuthor: document.getElementById("quote-author"),
  form: document.getElementById("task-form"),
  title: document.getElementById("task-title"),
  category: document.getElementById("task-category"),
  date: document.getElementById("task-date"),
  error: document.getElementById("form-error"),
  filters: document.getElementById("filters"),
  list: document.getElementById("task-list")
};

// ===== tampilan =====

// kartu deadline terdekat
const renderDeadline = () => {
  const next = app.getNearestDeadline();

  // kalau belum ada tugas aktif
  if (!next) {
    el.dlTitle.textContent = "Belum ada deadline aktif";
    el.dlTime.textContent = "-";
    el.dlTime.classList.remove("late");
    el.dlTag.innerHTML = "";
    return;
  }

  el.dlTitle.textContent = next.title;
  el.dlTime.textContent = formatCountdown(next.dueDate);
  el.dlTime.classList.toggle("late", next.dueDate < Date.now());
  el.dlTag.innerHTML = `<span class="tag tag-${next.category}">${CATEGORIES[next.category]}</span>`;
};

// daftar tugas
const renderList = () => {
  const tasks = app.getVisibleTasks();

  if (tasks.length === 0) {
    el.list.innerHTML = `<p class="empty">Belum ada tugas di sini. Tambahkan tugas pertamamu di atas.</p>`;
    return;
  }

  el.list.innerHTML = tasks
    .map(({ id, title, category, dueDate, done }) => `
      <div class="row">
        <input type="checkbox" data-action="toggle" data-id="${id}" ${done ? "checked" : ""}>
        <span class="title ${done ? "done" : ""}">${escapeHtml(title)}</span>
        <span class="tag tag-${category}">${CATEGORIES[category]}</span>
        <span class="date">${formatDate(dueDate)}</span>
        <button data-action="edit" data-id="${id}">Edit</button>
        <button data-action="delete" data-id="${id}">Hapus</button>
      </div>
    `)
    .join("");
};

// tulisan "2 dari 5 selesai"
const renderStat = () => {
  const { done, total } = app.getStats();
  el.stat.textContent = `${done} dari ${total} selesai`;
};

// gambar ulang semuanya
const renderAll = () => {
  renderStat();
  renderDeadline();
  renderList();
};

// ===== aksi pengguna =====

// tambah tugas
el.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = el.title.value.trim();

  if (!title) {
    el.error.textContent = "Isi nama tugasnya dulu";
    return;
  }

  // kalau tanggal kosong, deadline diisi besok
  const dueDate = el.date.value
    ? new Date(`${el.date.value}T23:59:00`).getTime()
    : Date.now() + ONE_DAY;

  app.addTask({ title, category: el.category.value, dueDate });

  el.title.value = "";
  el.date.value = "";
  el.error.textContent = "";
  renderAll();
});

// pesan error hilang saat mulai mengetik
el.title.addEventListener("input", () => {
  el.error.textContent = "";
});

// tombol filter kategori
el.filters.addEventListener("click", (event) => {
  const { filter } = event.target.dataset;
  if (!filter) return;

  app.setFilter(filter);

  el.filters.querySelectorAll(".chip").forEach((chip) => {
    chip.classList.toggle("on", chip.dataset.filter === filter);
  });

  renderList();
});

// centang, edit, dan hapus (satu listener untuk semua baris)
el.list.addEventListener("click", (event) => {
  const { action, id } = event.target.dataset;
  if (!action) return;

  const taskId = Number(id);

  if (action === "toggle") {
    app.toggleTask(taskId);
  } else if (action === "delete") {
    app.deleteTask(taskId);
  } else if (action === "edit") {
    const task = app.tasks.find((t) => t.id === taskId);
    const newTitle = prompt("Ubah nama tugas:", task.title);

    if (newTitle && newTitle.trim()) {
      app.editTask(taskId, newTitle.trim());
    }
  }

  renderAll();
});

// ===== kutipan harian (async) =====
const loadQuote = async () => {
  el.quoteText.textContent = "Memuat kutipan...";

  const { quote, author } = await fetchQuote();

  el.quoteText.textContent = quote;
  el.quoteAuthor.textContent = author ? `— ${author}` : "";
};

// ===== jalankan aplikasi =====
renderAll();
loadQuote();

// hitung mundur diperbarui tiap 30 detik
setInterval(renderDeadline, 30000);