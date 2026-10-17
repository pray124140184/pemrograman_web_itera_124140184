/* bagian pengaturan */
const STORAGE_KEY = "dashboard-tugas";
const HOUR = 3600000;

export const CATEGORIES = {
  kuliah: "Kuliah",
  infest: "INFEST",
  kmpa: "KMPA"
};

// ===== fungsi bantu 

// supaya teks dari pengguna tidak dibaca sebagai tag HTML
export const escapeHtml = (text) => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

// contoh hasil: 17 Okt
export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short"
  });
};

// hitung mundur menuju deadline
export const formatCountdown = (timestamp) => {
  const diff = timestamp - Date.now();
  const abs = Math.abs(diff);
  let text;

  if (abs < HOUR) {
    text = `${Math.max(1, Math.round(abs / 60000))} menit`;
  } else if (abs < 24 * HOUR) {
    text = `${Math.round(abs / HOUR)} jam`;
  } else {
    text = `${Math.round(abs / (24 * HOUR))} hari`;
  }

  // kalau sudah lewat deadline
  if (diff < 0) {
    return `Terlambat ${text}`;
  }
  return `${text} lagi`;
};

// cetakan untuk satu tugas
export class TaskItem {
  constructor(title, category, dueDate) {
    this.id = Date.now() + Math.floor(Math.random() * 1000);
    this.title = title;
    this.category = category;
    this.dueDate = dueDate;
    this.done = false;
  }
}
  

// menyimpan daftar tugas dan semua aksinya
export class DashboardApp {
  constructor() {
    this.tasks = this.load();
    this.filter = "all";
  }

  // --- localStorage ---
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      return [];
    }
  }

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
  }

  // --- tambah, ubah, hapus ---
  addTask({ title, category, dueDate }) {
    const task = new TaskItem(title, category, dueDate);
    this.tasks = [...this.tasks, task];
    this.save();
  }

  toggleTask(id) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    this.save();
  }

  editTask(id, newTitle) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, title: newTitle } : task
    );
    this.save();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.save();
  }

  // --- filter dan urutan ---
  setFilter(filter) {
    this.filter = filter;
  }

  getVisibleTasks() {
    return this.tasks
      .filter((task) => this.filter === "all" || task.category === this.filter)
      .sort((a, b) => a.dueDate - b.dueDate);
  }

  // --- ringkasan ---
  getNearestDeadline() {
    const open = this.tasks
      .filter((task) => !task.done)
      .sort((a, b) => a.dueDate - b.dueDate);

    return open.length > 0 ? open[0] : null;
  }

  getStats() {
    const done = this.tasks.filter((task) => task.done).length;
    return { done, total: this.tasks.length };
  }
}

// ===== ambil kutipan dari API (async) =====
export async function fetchQuote() {
  try {
    const response = await fetch("https://dummyjson.com/quotes/random");

    if (!response.ok) {
      throw new Error("Gagal mengambil kutipan");
    }

    const { quote, author } = await response.json();
    return { quote, author };
  } catch (error) {
    // kalau offline atau API error, pakai kutipan cadangan
    return {
      quote: "Kerjakan satu hal kecil dulu, sisanya menyusul.",
      author: ""
    };
  }
}