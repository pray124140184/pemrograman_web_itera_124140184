import { BrowserRouter, Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom';
import { BookProvider, useBooks } from './context/BookContext';
import { useBookStats } from './hooks/useBookStats';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';

/**
 * Halaman 404 Sederhana
 */
export function NotFound() {
  return (
    <div
      className="not-found-card"
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--border-thin)',
        borderRadius: 'var(--radius-lg)',
        padding: '3.5rem 2rem',
        margin: '2rem auto',
        maxWidth: '520px',
        textAlign: 'center',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '3.5rem',
          color: 'var(--pink-primary)',
          marginBottom: '0.5rem',
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: '1.4rem',
          color: 'var(--text-plum)',
          marginBottom: '0.75rem',
        }}
      >
        Halaman Tidak Ditemukan
      </h2>
      <p
        style={{
          color: 'var(--text-secondary)',
          marginBottom: '1.75rem',
          fontSize: '0.95rem',
        }}
      >
        Maaf, halaman rak buku yang kamu tuju tidak ditemukan atau telah dipindahkan.
      </p>
      <Link to="/" className="btn-primary" style={{ textDecoration: 'none' }}>
        Kembali ke Koleksi
      </Link>
    </div>
  );
}

NotFound.propTypes = {};

/**
 * Panel Kanan (Widget Panel - Compact & Pas Tanpa Scroll)
 * Menampilkan kartu profil mahasiswa, palet status, quick counters status, dan catatan literasi.
 */
function RightWidgetPanel() {
  const { books } = useBooks();
  const { milik, baca, beli } = useBookStats(books);

  return (
    <aside className="lunar-right-panel" aria-label="Ringkasan Koleksi & Profil">
      {/* 1. Kartu Profil Mahasiswa Ringkas & Presisi */}
      <div className="right-profile-card">
        <img
          src="/student-avatar.jpg"
          alt="Pray Pray Febry Valentine SG"
          className="right-profile-avatar"
        />
        <div className="right-profile-info">
          <span className="right-profile-tag">Mahasiswa Pengembang</span>
          <h3 className="right-profile-name" title="Pray Pray Febry Valentine SG">
            Pray Pray Febry Valentine SG
          </h3>
          <span className="right-profile-nim">NIM: 124140184 &bull; PAW ITERA</span>
        </div>
      </div>

      {/* 2. Indikator Palet Status Buku (Compact Bar) */}
      <div className="status-legend-bar">
        <span className="legend-label">#STATUS</span>
        <div className="legend-pills-row">
          <span className="legend-pill-item pill-milik">
            <span className="legend-dot dot-milik" /> Milik
          </span>
          <span className="legend-pill-item pill-baca">
            <span className="legend-dot dot-baca" /> Baca
          </span>
          <span className="legend-pill-item pill-beli">
            <span className="legend-dot dot-beli" /> Beli
          </span>
        </div>
      </div>

      {/* 3. Kartu Ringkasan Status Koleksi (SVG Icons, Pas & Rapi) */}
      <div className="right-status-section">
        <div className="status-section-header">
          <h4 className="status-section-title">Status Koleksi</h4>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>&bull;&bull;&bull;</span>
        </div>

        {/* Milik Pribadi */}
        <div className="status-quick-card">
          <div className="quick-card-left">
            <div
              className="quick-card-icon"
              style={{
                backgroundColor: 'var(--status-milik-bg)',
                color: 'var(--status-milik)',
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <polyline points="10 2 10 10 13 7 16 10 16 2" />
              </svg>
            </div>
            <div>
              <p className="quick-card-title">Milik Pribadi</p>
              <p className="quick-card-desc">Buku di rak fisik</p>
            </div>
          </div>
          <span
            className="quick-card-counter"
            style={{ color: 'var(--status-milik)' }}
          >
            {milik}
          </span>
        </div>

        {/* Sedang Dibaca */}
        <div className="status-quick-card">
          <div className="quick-card-left">
            <div
              className="quick-card-icon"
              style={{
                backgroundColor: 'var(--status-baca-bg)',
                color: 'var(--status-baca-text)',
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <div>
              <p className="quick-card-title">Sedang Dibaca</p>
              <p className="quick-card-desc">Aktif dinikmati</p>
            </div>
          </div>
          <span
            className="quick-card-counter"
            style={{ color: 'var(--status-baca-text)' }}
          >
            {baca}
          </span>
        </div>

        {/* Rencana Beli */}
        <div className="status-quick-card">
          <div className="quick-card-left">
            <div
              className="quick-card-icon"
              style={{
                backgroundColor: 'var(--status-beli-bg)',
                color: 'var(--status-beli-text)',
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <div>
              <p className="quick-card-title">Rencana Beli</p>
              <p className="quick-card-desc">Daftar impian (wishlist)</p>
            </div>
          </div>
          <span
            className="quick-card-counter"
            style={{ color: 'var(--status-beli-text)' }}
          >
            {beli}
          </span>
        </div>
      </div>

      {/* 4. Kartu Catatan Membaca Pengembang Ringkas */}
      <div className="reading-note-card">
        <div className="note-card-header">
          <div className="note-card-icon-badge">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
          <div>
            <h5 className="note-card-title">Catatan Pengembang</h5>
            <span className="note-card-sub">Teknik Informatika ITERA</span>
          </div>
        </div>
        <p className="note-card-quote">
          &ldquo;Membaca adalah petualangan sunyi yang memperkaya jiwa dengan kebijaksanaan dan imajinasi.&rdquo;
        </p>
        <div className="note-card-footer">
          Total Terdaftar: <strong>{books.length} Buku</strong>
        </div>
      </div>
    </aside>
  );
}

/**
 * Shell Layout dengan Sidebar & Kolom Konten
 */
function DashboardLayout() {
  const { filterStatus, setFilterStatus, books } = useBooks();
  const navigate = useNavigate();

  const handleSidebarFilter = (status) => {
    setFilterStatus(status);
    navigate('/');
  };

  const { milik, baca, beli } = useBookStats(books);

  return (
    <div className="lunar-app-shell">
      {/* Kolom Kiri: Sidebar Navigasi yang Bagus & Terstruktur */}
      <aside className="lunar-sidebar">
        {/* Brand Header */}
        <Link to="/" className="sidebar-brand-wrapper" aria-label="Rak Buku Pribadi">
          <div className="sidebar-brand-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h10" />
            </svg>
          </div>
          <div className="sidebar-brand-text">
            <span className="brand-name-main">RAK BUKU</span>
            <span className="brand-name-sub">PRIBADI</span>
          </div>
        </Link>

        {/* Featured Capsule (Katalog Utama) */}
        <div className="sidebar-featured-capsule">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
          </svg>
          <span>KATALOG UTAMA</span>
        </div>

        {/* Menu Navigasi Utama */}
        <div className="sidebar-nav-section">
          <span className="sidebar-section-title">Menu Utama</span>
          <nav aria-label="Menu Utama">
            <ul className="sidebar-nav-list">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `sidebar-nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  <span>Koleksi Buku</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/stats"
                  className={({ isActive }) =>
                    `sidebar-nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                  <span>Statistik Koleksi</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="sidebar-divider" />

        {/* Filter Cepat di Sidebar */}
        <div className="sidebar-nav-section">
          <span className="sidebar-section-title">Filter Status</span>
          <ul className="sidebar-filter-list">
            <li>
              <button
                type="button"
                onClick={() => handleSidebarFilter('semua')}
                className={`sidebar-filter-btn ${filterStatus === 'semua' ? 'active' : ''}`}
              >
                <span>
                  <span className="sidebar-filter-dot" style={{ backgroundColor: 'var(--pink-primary)' }} />
                  Semua Buku
                </span>
                <span className="sidebar-filter-count">{books.length}</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleSidebarFilter('milik')}
                className={`sidebar-filter-btn ${filterStatus === 'milik' ? 'active' : ''}`}
              >
                <span>
                  <span className="sidebar-filter-dot" style={{ backgroundColor: 'var(--status-milik)' }} />
                  Milik Pribadi
                </span>
                <span className="sidebar-filter-count">{milik}</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleSidebarFilter('baca')}
                className={`sidebar-filter-btn ${filterStatus === 'baca' ? 'active' : ''}`}
              >
                <span>
                  <span className="sidebar-filter-dot" style={{ backgroundColor: 'var(--status-baca)' }} />
                  Sedang Dibaca
                </span>
                <span className="sidebar-filter-count">{baca}</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleSidebarFilter('beli')}
                className={`sidebar-filter-btn ${filterStatus === 'beli' ? 'active' : ''}`}
              >
                <span>
                  <span className="sidebar-filter-dot" style={{ backgroundColor: 'var(--status-beli)' }} />
                  Rencana Beli
                </span>
                <span className="sidebar-filter-count">{beli}</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Kartu Profil Mahasiswa di Sidebar Bawah */}
        <div className="sidebar-owner-card">
          <span className="owner-card-role">Teknik Informatika ITERA</span>
          <p className="owner-card-name">Pray Pray Febry Valentine SG</p>
          <span className="owner-card-nim">NIM: 124140184</span>
        </div>
      </aside>

      {/* Kolom Tengah: Konten Halaman */}
      <main className="lunar-main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Kolom Kanan: Widget Ringkasan & Profil Rapi */}
      <RightWidgetPanel />
    </div>
  );
}

/**
 * Komponen Utama App
 */
export function App() {
  return (
    <BrowserRouter>
      <BookProvider>
        <DashboardLayout />
      </BookProvider>
    </BrowserRouter>
  );
}

App.propTypes = {};

export default App;
