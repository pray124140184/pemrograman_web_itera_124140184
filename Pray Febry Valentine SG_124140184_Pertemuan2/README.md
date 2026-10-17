# Dashboard Tugas

Aplikasi web sederhana untuk mencatat dan memantau tugas kuliah maupun kegiatan organisasi. Dibuat menggunakan HTML, CSS, dan JavaScript modern (ES6+) untuk memenuhi tugas Praktikum Pemrograman Web.

## Identitas

- **Nama**: Pray Febry Valentine SG
- **NIM**: 124140184
- **Kelas**: Praktikum Pemrograman Web - Pertemuan 2

---

## Fungsi Aplikasi & Fitur

Aplikasi ini berfungsi sebagai dashboard to-do list sederhana yang membantu mahasiswa mengelola tugas agar tidak terlewat deadline.

### Fitur Utama:

1. **Kelola Tugas (CRUD)**:
   - **Tambah Tugas**: Masukkan judul, pilih kategori (Kuliah, INFEST, KMPA), dan tentukan tanggal deadline. Jika tanggal dikosongkan, deadline otomatis diatur untuk besok.
   - **Centang Selesai**: Menandai tugas yang sudah selesai (teks akan dicoret).
   - **Edit & Hapus**: Tombol untuk mengubah nama tugas atau menghapus tugas dari daftar.
2. **Deadline Terdekat**:
   - Menampilkan kartu tugas yang paling dekat tenggat waktunya beserta hitung mundur (misal: "5 jam lagi" atau "Terlambat").
3. **Statistik Sederhana**:
   - Menghitung progres tugas, contoh: "2 dari 5 selesai".
4. **Filter Kategori**:
   - Memfilter tampilan tugas berdasarkan tombol: Semua, Kuliah, INFEST, atau KMPA.
5. **Kutipan Harian (API)**:
   - Menampilkan kutipan motivasi yang diambil langsung dari internet menggunakan API publik (DummyJSON Quotes).
6. **Penyimpanan Lokal (localStorage)**:
   - Data tugas tersimpan di browser, jadi tidak hilang saat halaman di-refresh.

---

## Screenshot Antarmuka

Berikut tampilan aplikasi yang sudah dibuat:

![Image Alt]()

---

## Fitur ES6+ yang Digunakan

Berikut adalah daftar fitur JavaScript Modern (ES6+) yang diterapkan pada kode program:

| No  | Fitur ES6+                                  | File & Baris                                                      | Contoh / Potongan Kode                                                                          | Penjelasan Sederhana                                                                         |
| :-: | :------------------------------------------ | :---------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
|  1  | **`const` dan `let`**                       | `js/app.js` (baris 2–4, 31–33)<br>`js/main.js` (baris 11, 14, 17) | `const STORAGE_KEY = "...";`<br>`let text;`                                                     | Menggantikan `var` agar variabel hanya berlaku di dalam blok kode tempat ia dibuat.          |
|  2  | **Arrow Function (`=>`)**                   | `js/app.js` (baris 14, 22, 30)<br>`js/main.js` (baris 36, 55, 93) | `const escapeHtml = (text) => { ... }`                                                          | Cara penulisan fungsi yang lebih singkat dan praktis.                                        |
|  3  | **Template Literals (`` `${}` ``)**         | `js/app.js` (baris 36, 47)<br>`js/main.js` (baris 51, 64–74, 80)  | `` `${text} lagi` ``<br>`` `${done} dari ${total} selesai` ``                                   | Memudahkan menyisipkan variabel ke dalam teks tanpa tanda tambah (`+`).                      |
|  4  | **ES Modules (`export` & `import`)**        | `js/app.js` (baris 5, 51, 63, 136)<br>`js/main.js` (baris 2–9)    | `export class DashboardApp { ... }`<br>`import { DashboardApp } from "./app.js";`               | Memisahkan kode ke dalam beberapa file terpisah agar lebih rapi dan teratur.                 |
|  5  | **Class dan Constructor**                   | `js/app.js` (baris 51–59, 63–133)                                 | `class TaskItem { constructor(...) { ... } }`                                                   | Membuat cetakan objek untuk data tugas dan aplikasi dashboard.                               |
|  6  | **Destructuring Object**                    | `js/app.js` (baris 84, 144)<br>`js/main.js` (baris 64, 79, 122)   | `const { quote, author } = await response.json();`<br>`const { done, total } = app.getStats();` | Mengambil nilai properti dari objek secara langsung ke dalam variabel.                       |
|  7  | **Spread Operator (`...`)**                 | `js/app.js` (baris 86, 92, 99)                                    | `this.tasks = [...this.tasks, task];`<br>`{ ...task, done: !task.done }`                        | Menyalin isi array atau objek lama ke dalam yang baru tanpa mengubah aslinya.                |
|  8  | **Property Shorthand**                      | `js/app.js` (baris 131, 145)<br>`js/main.js` (baris 107)          | `return { done, total: this.tasks.length };`<br>`return { quote, author };`                     | Penulisan singkat objek ketika nama properti sama dengan nama variabelnya.                   |
|  9  | **Async / Await & Fetch API**               | `js/app.js` (baris 136–145)<br>`js/main.js` (baris 158–162)       | `const response = await fetch("https://dummyjson.com/quotes/random");`                          | Mengambil data kutipan dari internet secara asinkron agar halaman tidak macet.               |
| 10  | **Array Methods (`map`, `filter`, `find`)** | `js/app.js` (baris 91, 105, 116)<br>`js/main.js` (baris 64, 146)  | `tasks.map(...)`<br>`tasks.filter(...)`<br>`tasks.find(...)`                                    | Fungsi bawaan array untuk memproses data (mengubah, menyaring, atau mencari) dengan ringkas. |

---

## Cara Menjalankan

Karena proyek ini menggunakan modul JavaScript (`type="module"`), buka menggunakan web server lokal:

1. Buka folder proyek di **VS Code**.
2. Klik kanan file `index.html` lalu pilih **Open with Live Server**.
3. Aplikasi akan langsung berjalan di browser.
