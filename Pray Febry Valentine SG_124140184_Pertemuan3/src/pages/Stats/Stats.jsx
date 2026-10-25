import { Link } from 'react-router-dom';
import { useBooks } from '../../context/BookContext';
import { useBookStats } from '../../hooks/useBookStats';
import './Stats.css';

/**
 * Halaman Statistik Koleksi Buku
 * Menggunakan custom hook useBookStats untuk menghitung dan menampilkan
 * total buku, jumlah buku per status, dan persentase setiap status.
 */
export function Stats() {
  const { books } = useBooks();
  const {
    total,
    milik,
    baca,
    beli,
    percentageMilik,
    percentageBaca,
    percentageBeli,
  } = useBookStats(books);

  return (
    <div className="stats-page">
      <header className="stats-header">
        <div className="stats-header-text">
          <h1 className="stats-title">Statistik Koleksi Buku</h1>
          <p className="stats-subtitle">
            Ringkasan data membaca dan perkembangan koleksi buku di rak pribadimu.
          </p>
        </div>
        <Link to="/" className="btn-secondary btn-back-home">
          &larr; Kembali ke Koleksi
        </Link>
      </header>

      {/* Grid Kartu Metrik Utama */}
      <section className="stats-grid" aria-label="Metrik Koleksi Buku">
        {/* Total Koleksi */}
        <div className="metric-card metric-total">
          <div className="metric-header">
            <span className="metric-badge">Total Koleksi</span>
          </div>
          <p className="metric-value">{total}</p>
          <p className="metric-description">Buku terdaftar di dalam sistem</p>
        </div>

        {/* Milik Pribadi */}
        <div className="metric-card metric-milik">
          <div className="metric-header">
            <span className="metric-badge badge-milik">Milik Pribadi</span>
            <span className="metric-percent">{percentageMilik}%</span>
          </div>
          <p className="metric-value">{milik}</p>
          <p className="metric-description">Buku yang telah menjadi milikmu</p>
          <div className="progress-track" aria-hidden="true">
            <div
              className="progress-fill fill-milik"
              style={{ width: `${percentageMilik}%` }}
            />
          </div>
        </div>

        {/* Sedang Dibaca */}
        <div className="metric-card metric-baca">
          <div className="metric-header">
            <span className="metric-badge badge-baca">Sedang Dibaca</span>
            <span className="metric-percent">{percentageBaca}%</span>
          </div>
          <p className="metric-value">{baca}</p>
          <p className="metric-description">Buku yang sedang aktif kamu nikmati</p>
          <div className="progress-track" aria-hidden="true">
            <div
              className="progress-fill fill-baca"
              style={{ width: `${percentageBaca}%` }}
            />
          </div>
        </div>

        {/* Rencana Beli */}
        <div className="metric-card metric-beli">
          <div className="metric-header">
            <span className="metric-badge badge-beli">Rencana Beli</span>
            <span className="metric-percent">{percentageBeli}%</span>
          </div>
          <p className="metric-value">{beli}</p>
          <p className="metric-description">Daftar keinginan (wishlist) buku</p>
          <div className="progress-track" aria-hidden="true">
            <div
              className="progress-fill fill-beli"
              style={{ width: `${percentageBeli}%` }}
            />
          </div>
        </div>
      </section>

      {/* Rincian Proporsi Koleksi */}
      <section className="stats-breakdown-card" aria-label="Proporsi Status Koleksi">
        <h2 className="breakdown-title">Distribusi Status Koleksi</h2>
        <p className="breakdown-description">
          Visualisasi perbandingan kategori status buku yang tersimpan di rak.
        </p>

        {total === 0 ? (
          <div className="empty-stats-note">
            <p>Belum ada buku untuk dihitung. Tambahkan buku di halaman beranda.</p>
          </div>
        ) : (
          <div className="breakdown-bars">
            <div className="breakdown-item">
              <div className="breakdown-label-row">
                <span className="breakdown-name">Milik Pribadi</span>
                <span className="breakdown-count">
                  {milik} buku ({percentageMilik}%)
                </span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill fill-milik"
                  style={{ width: `${percentageMilik}%` }}
                />
              </div>
            </div>

            <div className="breakdown-item">
              <div className="breakdown-label-row">
                <span className="breakdown-name">Sedang Dibaca</span>
                <span className="breakdown-count">
                  {baca} buku ({percentageBaca}%)
                </span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill fill-baca"
                  style={{ width: `${percentageBaca}%` }}
                />
              </div>
            </div>

            <div className="breakdown-item">
              <div className="breakdown-label-row">
                <span className="breakdown-name">Rencana Beli</span>
                <span className="breakdown-count">
                  {beli} buku ({percentageBeli}%)
                </span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill fill-beli"
                  style={{ width: `${percentageBeli}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

Stats.propTypes = {};

export default Stats;
