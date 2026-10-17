const KUNCI_TUGAS = "dashboard-tugas";
const KUNCI_KATEGORI = "dashboard-kategori";

/* bagian kategori */ 
const kategoriAwal = {
  kuliah: "Kuliah",
  infest: "INFEST",
  kmpa: "KMPA"
};

// Bagian buat satu tugas
export class TaskItem {
  constructor(title, category, dueDate) {
    this.id = Date.now();
    this.title = title;
    this.category = category;
    this.dueDate = dueDate;
    this.done = false;
  }
}

/* bagian nyimpan data */
export const loadTasks = () => JSON.parse(localStorage.getItem(KUNCI_TUGAS)) || [];
export const saveTasks = (tasks) => localStorage.setItem(KUNCI_TUGAS, JSON.stringify(tasks));

export const loadCategories = () => JSON.parse(localStorage.getItem(KUNCI_KATEGORI)) || kategoriAwal;
export const saveCategories = (categories) => localStorage.setItem(KUNCI_KATEGORI, JSON.stringify(categories));

export const escapeHtml = (text) => {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

/* Bagian tanggaldan jam */
export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString("id-ID", { day: "numeric", month: "short" });
};

export const formatTime = (timestamp) => {
  return new Date(timestamp).toTimeString().slice(0, 5);
};

export const toDateInput = (timestamp) => {
  return new Date(timestamp).toLocaleDateString("sv-SE");
};

// bagian hitung mundur dl
export const formatCountdown = (timestamp) => {
  const selisih = timestamp - Date.now();
  const menit = Math.round(Math.abs(selisih) / 60000);
  let teks;

  if (menit < 60) {
    teks = `${Math.max(menit, 1)} menit`;
  } else if (menit < 1440) {
    teks = `${Math.round(menit / 60)} jam`;
  } else {
    teks = `${Math.round(menit / 1440)} hari`;
  }

  return selisih < 0 ? `Terlambat ${teks}` : `${teks} lagi`;
};

/* daftar kata kata hari ini*/
const daftarKata = [
  { quote: "Sedikit demi sedikit, lama-lama menjadi bukit. ky tugas preii", author: "Peribahasa" },
  { quote: "Mau sampai kapan prei kata 'nanti ajalah'", author: "Preiii" },
  { quote: "Mulai aja dulu, bingungnya belakangan", author: "Preiii" },
  { quote: "Sok iya banget prei nunda terus", author: "Preiii" },
  { quote: "AZEEKKK lagi rajin nih kynya", author: "Preiii" },
];

// bagian ganti waktu kata kata
const MENIT_GANTI = 10;

export async function fetchQuote() {
  const putaran = Math.floor(Date.now() / (MENIT_GANTI * 60000));
  return daftarKata[putaran % daftarKata.length];
}