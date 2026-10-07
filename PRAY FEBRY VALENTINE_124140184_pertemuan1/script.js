/* ==========================================================
   WarungKu POS - Versi B
   Struktur: satu objek "Kasir" berisi state + method.
   Tombol hapus memakai event delegation (data-id).
   ========================================================== */

const Kasir = {
  // ----- konfigurasi -----
  STORAGE_KEY: "warungku_pos_cart",
  HARGA_MIN: 500,
  NAMA_MIN: 3,
  DISKON_OTOMATIS_MIN: 50000,
  DISKON_PERSEN: 10,
  KODE_PROMO: "HEMAT10",

  // ----- state -----
  items: [],          // [{ id, nama, harga, qty }]
  promoAktif: false,  // true jika kode HEMAT10 dipakai

  // ----- elemen -----
  el: {},

  init() {
    const $ = (id) => document.getElementById(id);
    this.el = {
      form: $("entryForm"),
      nama: $("fName"), harga: $("fPrice"), qty: $("fQty"),
      msgNama: $("msgName"), msgHarga: $("msgPrice"), msgQty: $("msgQty"),
      body: $("cartBody"), count: $("itemCount"),
      total: $("outTotal"), disc: $("outDisc"), discLabel: $("discLabel"), grand: $("outGrand"),
      promo: $("fPromo"), btnPromo: $("btnPromo"), promoHint: $("promoHint"),
      paid: $("fPaid"), changeBox: $("changeBox"), change: $("outChange"), note: $("changeNote"),
      reset: $("btnReset")
    };

    this.muat();

    this.el.form.addEventListener("submit", (e) => this.onSubmit(e));
    this.el.body.addEventListener("click", (e) => {
      const tombol = e.target.closest("button[data-id]");
      if (tombol) this.hapus(Number(tombol.dataset.id));
    });
    this.el.paid.addEventListener("input", () => this.renderRingkasan());
    this.el.btnPromo.addEventListener("click", () => this.pakaiPromo());
    this.el.promo.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); this.pakaiPromo(); }
    });
    this.el.reset.addEventListener("click", () => this.reset());

    this.render();
  },

  // ===== util =====
  rupiah(n) {
    return "Rp " + Math.round(n).toLocaleString("id-ID");
  },
  escapeHtml(teks) {
    return String(teks)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  },

  // ===== localStorage =====
  simpan() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
      items: this.items,
      promoAktif: this.promoAktif
    }));
  },
  muat() {
    try {
      const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
      if (data && Array.isArray(data.items)) {
        this.items = data.items.filter((i) =>
          i && typeof i.nama === "string" && Number(i.harga) > 0 && Number(i.qty) > 0
        );
        this.promoAktif = data.promoAktif === true;
      }
    } catch (e) {
      this.items = [];
      this.promoAktif = false;
    }
  },

  // ===== validasi =====
  validasi(nama, hargaTeks, qtyTeks) {
    const galat = {};

    if (nama.length < this.NAMA_MIN) {
      galat.nama = `Nama barang wajib diisi (minimal ${this.NAMA_MIN} karakter).`;
    }

    const harga = Number(hargaTeks);
    if (hargaTeks === "" || Number.isNaN(harga)) {
      galat.harga = "Harga wajib berupa angka.";
    } else if (harga < this.HARGA_MIN) {
      galat.harga = `Harga minimal Rp ${this.HARGA_MIN.toLocaleString("id-ID")}.`;
    }

    const qty = Number(qtyTeks);
    if (qtyTeks === "" || Number.isNaN(qty)) {
      galat.qty = "Qty wajib berupa angka.";
    } else if (!Number.isInteger(qty) || qty < 1) {
      galat.qty = "Qty harus bilangan bulat ≥ 1.";
    }

    return { ok: Object.keys(galat).length === 0, galat, harga, qty };
  },

  tampilkanGalat(galat) {
    const pasangan = [
      [this.el.nama, this.el.msgNama, galat.nama],
      [this.el.harga, this.el.msgHarga, galat.harga],
      [this.el.qty, this.el.msgQty, galat.qty]
    ];
    pasangan.forEach(([input, pesan, teks]) => {
      pesan.textContent = teks || "";
      input.classList.toggle("bad", Boolean(teks));
    });
  },

  // ===== aksi =====
  onSubmit(e) {
    e.preventDefault();
    const nama = this.el.nama.value.trim();
    const hasil = this.validasi(nama, this.el.harga.value.trim(), this.el.qty.value.trim());

    this.tampilkanGalat(hasil.galat);
    if (!hasil.ok) return; // gagal validasi -> tidak masuk keranjang

    this.items.push({ id: Date.now() + Math.random(), nama, harga: hasil.harga, qty: hasil.qty });
    this.simpan();
    this.render();

    this.el.form.reset();
    this.tampilkanGalat({});
    this.el.nama.focus();
  },

  hapus(id) {
    this.items = this.items.filter((i) => i.id !== id);
    this.simpan();
    this.render();
  },

  pakaiPromo() {
    const kode = this.el.promo.value.trim().toUpperCase();
    const hint = this.el.promoHint;

    if (kode === "") {
      this.promoAktif = false;
      hint.textContent = "";
      hint.className = "hint";
    } else if (kode === this.KODE_PROMO) {
      this.promoAktif = true;
      hint.textContent = `Kode ${this.KODE_PROMO} dipakai: diskon ${this.DISKON_PERSEN}%.`;
      hint.className = "hint ok";
    } else {
      this.promoAktif = false;
      hint.textContent = "Kode promo tidak dikenal.";
      hint.className = "hint err";
    }
    this.simpan();
    this.renderRingkasan();
  },

  reset() {
    if (this.items.length > 0 && !confirm("Mulai transaksi baru? Semua barang di keranjang akan dihapus.")) return;
    this.items = [];
    this.promoAktif = false;
    localStorage.removeItem(this.STORAGE_KEY);

    this.el.paid.value = "";
    this.el.promo.value = "";
    this.el.promoHint.textContent = "";
    this.el.promoHint.className = "hint";
    this.el.form.reset();
    this.tampilkanGalat({});
    this.render();
  },

  // ===== perhitungan =====
  hitung() {
    const total = this.items.reduce((sum, i) => sum + i.harga * i.qty, 0);
    const eligible = total >= this.DISKON_OTOMATIS_MIN || (this.promoAktif && total > 0);
    const diskon = eligible ? total * this.DISKON_PERSEN / 100 : 0;
    const alasan = this.promoAktif && total > 0 ? "kode promo"
      : total >= this.DISKON_OTOMATIS_MIN ? "belanja ≥ Rp 50.000" : "";
    return { total, diskon, grand: total - diskon, alasan };
  },

  // ===== render =====
  render() {
    this.renderTabel();
    this.renderRingkasan();
  },

  renderTabel() {
    if (this.items.length === 0) {
      this.el.body.innerHTML = `<tr><td colspan="6" class="empty">Belum ada barang. Isi form di atas lalu klik Tambah.</td></tr>`;
    } else {
      this.el.body.innerHTML = this.items.map((it, idx) => `
        <tr>
          <td>${idx + 1}</td>
          <td>${this.escapeHtml(it.nama)}</td>
          <td class="r">${this.rupiah(it.harga)}</td>
          <td class="r">${it.qty}</td>
          <td class="r">${this.rupiah(it.harga * it.qty)}</td>
          <td class="c"><button type="button" class="btn btn--tiny" data-id="${it.id}">Hapus</button></td>
        </tr>`).join("");
    }
    this.el.count.textContent = `${this.items.length} item`;
  },

  renderRingkasan() {
    const { total, diskon, grand, alasan } = this.hitung();
    this.el.total.textContent = this.rupiah(total);
    this.el.disc.textContent = "- " + this.rupiah(diskon);
    this.el.discLabel.textContent = diskon > 0
      ? `Diskon ${this.DISKON_PERSEN}% (${alasan})`
      : "Diskon (min. belanja Rp 50.000)";
    this.el.grand.textContent = this.rupiah(grand);

    // kembalian
    const box = this.el.changeBox;
    box.classList.remove("ok", "short");
    const teks = this.el.paid.value.trim();

    if (teks === "" || Number.isNaN(Number(teks))) {
      this.el.change.textContent = this.rupiah(0);
      this.el.note.textContent = "";
      return;
    }

    const selisih = Number(teks) - grand;
    if (grand === 0) {
      this.el.change.textContent = this.rupiah(0);
      this.el.note.textContent = "Keranjang masih kosong.";
    } else if (selisih < 0) {
      this.el.change.textContent = this.rupiah(0);
      this.el.note.textContent = `Uang belum mencukupi (kurang ${this.rupiah(-selisih)}).`;
      box.classList.add("short");
    } else {
      this.el.change.textContent = this.rupiah(selisih);
      this.el.note.textContent = "Pembayaran cukup.";
      box.classList.add("ok");
    }
  }
};

document.addEventListener("DOMContentLoaded", () => Kasir.init());
