import { Link } from 'react-router-dom';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import './Home.css';

/**
 * Halaman Utama (Home)
 * Berisi Topbar, Hero Banner Bertema Rak Buku Hangat & Elegan,
 * Formulir Tambah/Edit Buku, Filter Pencarian, dan Daftar Koleksi.
 */
export function Home() {
  const scrollToForm = () => {
    const formElement = document.getElementById('book-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-dashboard">
      {/* Topbar: Welcome & Tombol Aksi Cepat */}
      <div className="home-topbar-row">
        <div className="topbar-welcome">
          <span className="welcome-tag">Praktikum Pengembangan Aplikasi Web (PAW)</span>
          <h2 className="welcome-title">Koleksi &amp; Manajemen Buku Pribadi</h2>
        </div>

        <div className="topbar-clay-actions">
          <Link
            to="/stats"
            className="clay-btn"
            title="Lihat Statistik Koleksi"
            aria-label="Statistik Koleksi"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </Link>
          <button
            type="button"
            onClick={scrollToForm}
            className="clay-btn"
            title="Tambah Buku Baru"
            aria-label="Tambah Buku Baru"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Featured Hero Banner */}
      <section className="lunar-hero-banner" aria-labelledby="banner-heading">
        <div className="banner-text-column">
          <span className="banner-subtitle">Koleksi Bacaan Pribadi &bull; Pertemuan 3</span>
          <h1 id="banner-heading" className="banner-title">
            Rak Buku Pribadi
          </h1>
          <p className="banner-desc">
            Kelola koleksi bacaan pribadimu dengan mudah, rapi, dan teratur.
            Catat buku yang telah kamu miliki, sedang aktif dinikmati, hingga daftar impian buku yang akan dibeli.
          </p>
          <div className="banner-actions">
            <button
              type="button"
              onClick={scrollToForm}
              className="banner-btn-primary"
            >
              Tambah Buku Baru
            </button>
            <Link to="/stats" className="banner-btn-secondary">
              Lihat Statistik
            </Link>
          </div>
        </div>

        <div className="banner-illustration-wrapper">
          <img
            src="/banner-floral-door.jpg"
            alt="Ilustrasi Rak Buku Pribadi Hangat"
            className="banner-illustration"
          />
        </div>
      </section>

      {/* Formulir Buku (Tambah / Edit) */}
      <div id="book-form-section">
        <BookForm />
      </div>

      {/* Kontrol Filter & Pencarian */}
      <BookFilter />

      {/* Daftar Koleksi Buku */}
      <BookList />
    </div>
  );
}

Home.propTypes = {};

export default Home;
