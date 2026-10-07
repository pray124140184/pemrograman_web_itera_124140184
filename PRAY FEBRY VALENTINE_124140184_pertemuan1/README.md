# WarungKu POS – Kasir & Keranjang Belanja Sederhana

## Identitas

|                     |                            |
| ------------------- | -------------------------- |
| **Nama Lengkap**    | _PRAY FEBRY VALENTINE. SG_ |
| **NIM**             | _124140184_                |
| **Kelas Praktikum** | _RB_                       |

## Deskripsi Aplikasi

**WarungKu POS** adalah aplikasi kasir mini berbasis web untuk membantu kasir kantin atau toko kampus mencatat belanjaan, menghitung total, memberi diskon, dan menghitung kembalian. Data keranjang disimpan di browser (`localStorage`) sehingga aman saat halaman di-refresh.

**Studi kasus:** kasir toko/kantin kampus.

## Panduan Menjalankan

1. Unduh atau clone repository.
2. Buka folder `PRAY FEBRY VALENTINE_124140184_pertemuan1` di VS Code.
3. Jalankan **Live Server** pada `index.html` (atau buka file tersebut langsung di browser).
4. File latihan materi berada di `modul/index.html`.

## Struktur Proyek

```
PRAY FEBRY VALENTINE_124140184_pertemuan1/
├── index.html          # Struktur halaman utama
├── style.css           # Tampilan halaman
├── script.js            # Logika aplikasi
├── README.md            # Dokumentasi proyek
│
├── modul/               # Latihan praktikum
│   ├── index.html
│   └── latihan.js
│
└── screenshot/          # Dokumentasi screenshot
    ├── diskon.png
    ├── eror.png
    └── formpengisian.png
```

## Daftar Fitur

- [x] Validasi nama barang: wajib, minimal 3 karakter
- [x] Validasi harga: angka, minimal Rp 500
- [x] Validasi qty: bilangan bulat, minimal 1
- [x] Pesan error merah di bawah input; barang tidak masuk keranjang bila tidak valid
- [x] Form otomatis ter-reset setelah sukses
- [x] Subtotal per barang (harga × qty)
- [x] Total belanja otomatis
- [x] Diskon 10% otomatis untuk belanja ≥ Rp 50.000
- [x] Kode promo `HEMAT10` (diskon 10%)
- [x] Input uang bayar dan kembalian otomatis; pesan jika uang kurang
- [x] Tabel keranjang (No, Nama Barang, Harga Satuan, Qty, Subtotal, Aksi)
- [x] Tombol Hapus per baris dengan perhitungan ulang otomatis
- [x] Penyimpanan keranjang di localStorage (JSON.stringify / JSON.parse)
- [x] Tombol Transaksi Baru / Reset
- [x] Format Rupiah dan layout responsif

## Tangkapan Layar

> Ganti dengan screenshot sendiri (minimal 3).

1. Form input utama –  
   ![Image Alt](https://github.com/pray124140184/pemrograman_web_itera_124140184/blob/ecf07ea5e6650edd1c88491b54c7bccbd03b4d44/PRAY%20FEBRY%20VALENTINE_124140184_pertemuan1/screenshot/formpengisian.png)
2. Validasi error –
   ![Image Alt](https://github.com/pray124140184/pemrograman_web_itera_124140184/blob/ecf07ea5e6650edd1c88491b54c7bccbd03b4d44/PRAY%20FEBRY%20VALENTINE_124140184_pertemuan1/screenshot/eror.png)
3. Hasil perhitungan & tabel –
   ![Image Alt](https://github.com/pray124140184/pemrograman_web_itera_124140184/blob/ecf07ea5e6650edd1c88491b54c7bccbd03b4d44/PRAY%20FEBRY%20VALENTINE_124140184_pertemuan1/screenshot/diskon.png)

## Penjelasan Teknis Singkat

**Struktur kode.** Seluruh logika dibungkus dalam objek `Kasir` yang menyimpan state (`items`, `promoAktif`) dan method (`validasi`, `hitung`, `render`, dll.). Tombol Hapus memakai _event delegation_: satu listener pada `<tbody>` membaca atribut `data-id` dari tombol yang diklik.

**Validasi.** Method `validasi()` mengembalikan objek berisi pesan galat per field. Nama harus ≥ 3 karakter, harga ≥ 500, qty bilangan bulat ≥ 1. Jika objek galat tidak kosong, pesan merah ditampilkan dan proses tambah dibatalkan.

**Kalkulator.** `hitung()` menjumlahkan `harga × qty` semua item dengan `reduce()`. Diskon 10% diberikan jika total ≥ 50.000 atau kode `HEMAT10` aktif. Kembalian = uang bayar − total akhir; jika negatif tampil pesan "uang belum mencukupi".

**localStorage.** `simpan()` menyimpan `{ items, promoAktif }` memakai `JSON.stringify()` setiap ada perubahan. `muat()` membaca dengan `JSON.parse()` di dalam `try/catch` saat halaman dibuka. Reset memanggil `localStorage.removeItem()`. Nama barang di-escape sebelum dirender agar aman dari injeksi HTML.
