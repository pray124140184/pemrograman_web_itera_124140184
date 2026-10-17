# Dashboard Tugas - Tugas Pertemuan 2 Pemrograman Web

**Nama:** Pray Febry Valentine SG  
**NIM:** 124140184  
**Kelas:** Praktikum Pemrograman Web (Pertemuan 2 - JavaScript ES6+)

---

## 1. Penjelasan Singkat Aplikasi dan Fitur-Fiturnya

### Fungsi Aplikasi

Aplikasi ini adalah **Dashboard Tugas** sederhana berbasis web untuk membantu mencatat dan memantau tugas-tugas (kuliah, kepanitiaan, atau harian) agar tidak terlewat _deadline_.

Aplikasi dibuat menggunakan **HTML, CSS, dan JavaScript modern (ES6+)**. Seluruh data disimpan langsung di peramban menggunakan **LocalStorage**, sehingga data tugas dan kategori tidak akan hilang saat halaman ditutup atau di-refresh.

### Fitur-Fitur Aplikasi:

1. **Jam & Tanggal Digital**: Menampilkan jam digital yang terus berdetak setiap detik serta tanggal lengkap hari ini dalam format bahasa Indonesia.
2. **Deadline Terdekat**: Otomatis mencari dan menampilkan tugas yang paling dekat batas waktunya, lengkap dengan hitung mundur (misal: "6 jam lagi").
3. **Statistik Tugas Selesai**: Menghitung berapa banyak tugas yang sudah selesai dibandingkan total tugas (contoh: _"1 dari 3 selesai"_).
4. **Kata-Kata Hari Ini**: Menampilkan kutipan santai/motivasi yang berganti secara otomatis.
5. **Kelola Tugas (CRUD)**:
   - **Tambah Tugas**: Menambahkan tugas baru beserta kategori, tanggal, dan jam deadline.
   - **Ceklis Selesai**: Menandai tugas yang sudah tuntas (teks otomatis dicoret).
   - **Edit Tugas**: Mengubah judul, kategori, atau waktu deadline tugas yang sudah ada.
   - **Hapus Tugas**: Menghapus tugas yang sudah tidak diperlukan.
6. **Filter Kategori**: Tombol cepat untuk memfilter tugas (Semua, Kuliah, INFEST, KMPA, dll).
7. **Kelola Kategori**: Bisa menambahkan kategori baru dan menghapus kategori yang ada.
8. **Pemilih Tanggal Otomatis**: Dropdown tanggal otomatis menyesuaikan jumlah hari dalam bulan yang dipilih (misal bulan Februari 28/29 hari).

---

## 2. Screenshot Antarmuka Aplikasi

Berikut tampilan aplikasi Dashboard Tugas yang sudah selesai dan berjalan:

![Image Alt](https://github.com/pray124140184/pemrograman_web_itera_124140184/blob/2c7f69a0e35504bd0e583d679a3fb9b4e2841c76/Pray%20Febry%20Valentine%20SG_124140184_Pertemuan2/Dokum.jpeg)
---

## 3. Daftar Fitur ES6+ dan Baris Kodenya

Berikut adalah fitur-fitur JavaScript Modern (ES6+) yang digunakan pada aplikasi ini beserta letak baris kodenya:

| No  | Fitur ES6+                                                | File                        |              Baris Kode              | Keterangan Singkat & Contoh                                                                                      |
| :-: | :-------------------------------------------------------- | :-------------------------- | :----------------------------------: | :--------------------------------------------------------------------------------------------------------------- |
|  1  | **`const` & `let`**                                       | `js/app.js`<br>`js/main.js` |   Baris 1, 2, 5<br>Baris 14, 17–20   | Menggantikan `var`. `const` untuk nilai tetap, `let` untuk variabel yang bisa berubah nilainya                   |
|  2  | **Arrow Function (`() => {}`)**                           | `js/app.js`<br>`js/main.js` | Baris 23, 24, 34<br>Baris 52, 58, 92 | Penulisan fungsi yang lebih ringkas, contoh: `const showClock = () => { ... }`                                   |
|  3  | **Template Literals (`` `...${}...` ``)**                 | `js/app.js`<br>`js/main.js` |  Baris 53, 60<br>Baris 104, 121–131  | Menggabungkan teks dan variabel menggunakan tanda backtick (`` ` ``) tanpa perlu tanda `+`                       |
|  4  | **Class & Constructor**                                   | `js/app.js`                 |             Baris 12–20              | Membuat cetakan/blueprint objek: `class TaskItem { constructor(...) { ... } }`                                   |
|  5  | **Class Instantiation (`new`)**                           | `js/main.js`                |              Baris 228               | Membuat objek tugas baru dari class: `new TaskItem(...)`                                                         |
|  6  | **ES6 Modules (`export`)**                                | `js/app.js`                 |         Baris 12, 23, 29, 75         | Mengekspor fungsi/class agar bisa dipakai di file JavaScript lain                                                |
|  7  | **ES6 Modules (`import`)**                                | `js/main.js`                |              Baris 1–12              | Mengambil fungsi/class dari file `app.js`: `import { TaskItem, ... } from "./app.js";`                           |
|  8  | **Destructuring Object**                                  | `js/main.js`                |         Baris 121, 250, 259          | Mengambil isi properti objek secara langsung, contoh: `const { action, id } = event.target.dataset;`             |
|  9  | **Destructuring Array**                                   | `js/main.js`                |             Baris 75, 81             | Mengambil elemen array langsung ke variabel: `([id, name]) => ...`                                               |
| 10  | **Spread Operator Array (`...`)**                         | `js/main.js`                |          Baris 79, 156, 228          | Menggabungkan array atau menambah data tugas baru: `tasks = [...tasks, new TaskItem(...)]`                       |
| 11  | **Spread Operator Object (`{ ...obj }`)**                 | `js/main.js`                |         Baris 232, 266, 304          | Meng-copy dan mengupdate properti objek secara aman, contoh: `{ ...task, done: !task.done }`                     |
| 12  | **Rest Property (`...rest`)**                             | `js/main.js`                |              Baris 329               | Memisahkan satu properti dan menyimpan sisanya: `const { [id]: dihapus, ...sisa } = categories;`                 |
| 13  | **Async / Await**                                         | `js/app.js`<br>`js/main.js` |     Baris 75–78<br>Baris 337–338     | Menangani proses asynchronous untuk memuat kata motivasi: `async function fetchQuote()` dan `await fetchQuote()` |
| 14  | **Method Array Modern (`filter`, `map`, `sort`, `find`)** | `js/main.js`                |    Baris 91–93, 111–113, 120, 272    | Mengolah data array: memfilter tugas aktif (`filter`), menyortir deadline (`sort`), dan mencari tugas (`find`)   |
| 15  | **`Array.from()`**                                        | `js/main.js`                |         Baris 166, 172, 176          | Membuat deret angka secara instan untuk mengisi pilihan dropdown tanggal, jam, dan menit                         |
| 16  | **`Object.entries()`**                                    | `js/main.js`                |               Baris 71               | Mengubah object kategori menjadi array pasangan `[key, value]` agar bisa di-loop dengan `map`                    |
| 17  | **`padStart()`**                                          | `js/main.js`                |            Baris 176, 177            | Menambahkan angka `0` di depan angka satuan agar rapi 2 digit (contoh: `"05"`, `"09"`)                           |

---

## 4. Cara Menjalankan

1. Buka folder ini di **VS Code**.
2. Klik kanan file `html/index.html` lalu pilih **Open with Live Server**.  
   _(Atau buka terminal, jalankan `python -m http.server`, lalu buka `http://localhost:8000/html/index.html` di browser)_.
