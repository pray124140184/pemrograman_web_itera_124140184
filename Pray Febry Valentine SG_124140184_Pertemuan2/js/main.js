import {
  TaskItem,
  loadTasks,
  saveTasks,
  loadCategories,
  saveCategories,
  escapeHtml,
  formatDate,
  formatTime,
  formatCountdown,
  fetchQuote
} from "./app.js";

const ONE_DAY = 24 * 3600000;

/* bagian data */
let tasks = loadTasks();
let categories = loadCategories();
let filter = "all";     // Filter yang sedang dipilih
let editingId = null;   // ID tugas yang sedang diedit

// bagian htmlnya
const stat = document.getElementById("stat");
const clock = document.getElementById("clock");
const today = document.getElementById("today");
const dlTitle = document.getElementById("dl-title");
const dlTime = document.getElementById("dl-time");
const dlTag = document.getElementById("dl-tag");

const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const categoryInput = document.getElementById("task-category");
const daySelect = document.getElementById("task-day");
const monthSelect = document.getElementById("task-month");
const yearSelect = document.getElementById("task-year");
const hourSelect = document.getElementById("task-hour");
const minuteSelect = document.getElementById("task-minute");
const submitButton = document.getElementById("task-submit");
const cancelButton = document.getElementById("task-cancel");
const formError = document.getElementById("form-error");

const filters = document.getElementById("filters");
const list = document.getElementById("task-list");

const categoryForm = document.getElementById("category-form");
const categoryName = document.getElementById("category-name");
const categoryError = document.getElementById("category-error");
const categoryList = document.getElementById("category-list");


// bagian kategori
const tagHtml = (id) => {
  const name = categories[id] || "Tanpa kategori";
  return `<span class="tag tag-${id}">${escapeHtml(name)}</span>`;
};

// bagian jam 
const showClock = () => {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString("id-ID", { hour12: false }).replace(/\./g, ":");
  today.textContent = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
};

// tombol tombol bagian 
const showCategories = () => {
  const entries = Object.entries(categories);
  const selected = categoryInput.value;

  categoryInput.innerHTML = entries
    .map(([id, name]) => `<option value="${id}">${escapeHtml(name)}</option>`)
    .join("");
  if (categories[selected]) categoryInput.value = selected;

  const allButtons = [["all", "Semua"], ...entries];
  filters.innerHTML = allButtons
    .map(([id, name]) => `<button class="chip ${filter === id ? "on" : ""}" data-filter="${id}">${escapeHtml(name)}</button>`)
    .join("");

  categoryList.innerHTML = entries
    .map(([id]) => `<span class="cat-item">${tagHtml(id)}<button type="button" class="cat-del" data-delete-category="${id}">×</button></span>`)
    .join("");
};

// bagian kotak dl terdekat
const showDeadline = () => {
  const next = tasks
    .filter((task) => !task.done)
    .sort((a, b) => a.dueDate - b.dueDate)[0];

  if (!next) {
    dlTitle.textContent = "Belum ada deadline aktif";
    dlTime.textContent = "-";
    dlTime.classList.remove("late");
    dlTag.innerHTML = "";
    return;
  }

  dlTitle.textContent = next.title;
  dlTime.textContent = `${formatCountdown(next.dueDate)} (${formatTime(next.dueDate)})`;
  dlTime.classList.toggle("late", next.dueDate < Date.now());
  dlTag.innerHTML = tagHtml(next.category);
};

// daftar tugas
const showList = () => {
  const visible = tasks
    .filter((task) => filter === "all" || task.category === filter)
    .sort((a, b) => a.dueDate - b.dueDate);

  if (visible.length === 0) {
    list.innerHTML = `<p class="empty">Belum ada tugas di sini. Tambahkan tugas pertamamu di atas.</p>`;
    return;
  }

  list.innerHTML = visible
    .map(({ id, title, category, dueDate, done }) => `
      <div class="row">
        <input type="checkbox" data-action="toggle" data-id="${id}" ${done ? "checked" : ""}>
        <span class="title ${done ? "done" : ""}">${escapeHtml(title)}</span>
        ${tagHtml(category)}
        <span class="date">${formatDate(dueDate)}, ${formatTime(dueDate)}</span>
        <button data-action="edit" data-id="${id}">Edit</button>
        <button data-action="delete" data-id="${id}">Hapus</button>
      </div>
    `)
    .join("");
};

/* tugas selesai*/
const showStat = () => {
  const done = tasks.filter((task) => task.done).length;
  stat.textContent = `${done} dari ${tasks.length} selesai`;
};


const showAll = () => {
  showCategories();
  showStat();
  showDeadline();
  showList();
};

/*bagian ganti tgl bulan tahun*/
const namaBulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

const optionsHtml = (items) => {
  return items.map(([value, text]) => `<option value="${value}">${text}</option>`).join("");
};

const setSelect = (select, value) => {
  if (![...select.options].some((option) => option.value === String(value))) {
    select.insertAdjacentHTML("beforeend", `<option value="${value}">${value}</option>`);
  }
  select.value = String(value);
};

const fillDays = () => {
  const total = new Date(Number(yearSelect.value), Number(monthSelect.value), 0).getDate();
  const selected = Number(daySelect.value) || 1;

  daySelect.innerHTML = optionsHtml(Array.from({ length: total }, (_, i) => [i + 1, i + 1]));
  daySelect.value = String(Math.min(selected, total));
};

const buildPickers = () => {
  const thisYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => thisYear - 1 + i);

  monthSelect.innerHTML = optionsHtml(namaBulan.map((nama, i) => [i + 1, nama]));
  yearSelect.innerHTML = optionsHtml(years.map((year) => [year, year]));
  hourSelect.innerHTML = optionsHtml(Array.from({ length: 24 }, (_, i) => [i, String(i).padStart(2, "0")]));
  minuteSelect.innerHTML = optionsHtml(Array.from({ length: 60 }, (_, i) => [i, String(i).padStart(2, "0")]));
  fillDays();
};

const setWhen = (timestamp) => {
  const d = new Date(timestamp);
  setSelect(yearSelect, d.getFullYear());
  monthSelect.value = String(d.getMonth() + 1);
  fillDays();
  daySelect.value = String(d.getDate());
  hourSelect.value = String(d.getHours());
  minuteSelect.value = String(d.getMinutes());
};

const readDueDate = () => {
  return new Date(
    Number(yearSelect.value),
    Number(monthSelect.value) - 1,
    Number(daySelect.value),
    Number(hourSelect.value),
    Number(minuteSelect.value)
  ).getTime();
};

monthSelect.addEventListener("change", fillDays);
yearSelect.addEventListener("change", fillDays);

// bagian form tugas
const resetForm = () => {
  editingId = null;
  form.reset();

  const besok = new Date(Date.now() + ONE_DAY);
  besok.setHours(23, 59, 0, 0);
  setWhen(besok.getTime());

  submitButton.textContent = "Tambah";
  cancelButton.hidden = true;
  formError.textContent = "";
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = titleInput.value.trim();

  if (!title) {
    formError.textContent = "Isi nama tugasnya dulu";
    return;
  }

  if (editingId === null) {
    tasks = [...tasks, new TaskItem(title, categoryInput.value, readDueDate())];
  } else {
    tasks = tasks.map((task) =>
      task.id === editingId
        ? { ...task, title, category: categoryInput.value, dueDate: readDueDate() }
        : task
    );
  }

  saveTasks(tasks);
  resetForm();
  showAll();
});

cancelButton.addEventListener("click", resetForm);

titleInput.addEventListener("input", () => {
  formError.textContent = "";
});

// bagian daftarin tugas
filters.addEventListener("click", (event) => {
  const { filter: pilihan } = event.target.dataset;
  if (!pilihan) return;

  filter = pilihan;
  showCategories();
  showList();
});

list.addEventListener("click", (event) => {
  const { action, id } = event.target.dataset;
  if (!action) return;

  const taskId = Number(id);

  if (action === "toggle") {
    tasks = tasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
  } else if (action === "delete") {
    tasks = tasks.filter((task) => task.id !== taskId);
    if (editingId === taskId) resetForm();
  } else if (action === "edit") {
    const task = tasks.find((item) => item.id === taskId);
    editingId = task.id;
    titleInput.value = task.title;
    if (categories[task.category]) categoryInput.value = task.category;
    setWhen(task.dueDate);
    submitButton.textContent = "Simpan";
    cancelButton.hidden = false;
    titleInput.focus();
    return;
  }

  saveTasks(tasks);
  showAll();
});

// bagian custom
categoryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = categoryName.value.trim();

  if (!name) {
    categoryError.textContent = "Isi nama kategorinya dulu";
    return;
  }

  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || String(Date.now());

  if (categories[id]) {
    categoryError.textContent = "Kategori itu sudah ada";
    return;
  }

  categories = { ...categories, [id]: name };
  saveCategories(categories);
  categoryName.value = "";
  categoryError.textContent = "";
  showAll();
});

categoryName.addEventListener("input", () => {
  categoryError.textContent = "";
});

categoryList.addEventListener("click", (event) => {
  const { deleteCategory: id } = event.target.dataset;
  if (!id) return;

  if (Object.keys(categories).length <= 1) {
    categoryError.textContent = "Minimal harus ada satu kategori";
    return;
  }

  const dipakai = tasks.filter((task) => task.category === id).length;
  if (dipakai > 0 && !confirm(`Kategori ini dipakai ${dipakai} tugas. Tugasnya tetap ada, tapi jadi "Tanpa kategori". Hapus?`)) {
    return;
  }

  const { [id]: dihapus, ...sisa } = categories;
  categories = sisa;
  if (filter === id) filter = "all";
  saveCategories(categories);
  showAll();
});

/*kata kata*/
const loadQuote = async () => {
  const data = await fetchQuote();
  const quoteTextElement = document.getElementById("quote-text");
  const quoteAuthorElement = document.getElementById("quote-author");

  if (quoteTextElement && quoteAuthorElement) {
    quoteTextElement.textContent = `"${data.quote}"`;
    quoteAuthorElement.textContent = data.author ? `— ${data.author}` : "";
  }
};

/*menjalankan*/
buildPickers();
resetForm();
showClock();
showAll();
loadQuote();

setInterval(showClock, 1000);      // Jam berdetak tiap 1 detik
setInterval(showDeadline, 30000);  // Update hitung mundur deadline tiap 30 detik
setInterval(loadQuote, 60000);     // Cek pergantian kutipan tiap 1 menit