import { useContext } from 'react';
import PropTypes from 'prop-types';
import BookContext from '../../context/BookContext';
import './BookFilter.css';

const FILTER_OPTIONS = [
  { value: 'semua', label: 'Semua Koleksi' },
  { value: 'milik', label: 'Milik Pribadi' },
  { value: 'baca', label: 'Sedang Dibaca' },
  { value: 'beli', label: 'Rencana Beli' },
];

/**
 * Komponen BookFilter
 * Menyediakan kontrol pencarian dan filter tombol status buku.
 * Dapat menerima props langsung atau terhubung ke BookContext.
 */
export function BookFilter({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) {
  const context = useContext(BookContext);

  // Nilai aktif diambil dari props atau fallback ke context
  const activeFilter = currentFilter !== undefined ? currentFilter : (context?.filterStatus || 'semua');
  const activeSearch = searchQuery !== undefined ? searchQuery : (context?.searchQuery || '');

  const handleFilterClick = (filterValue) => {
    if (onFilterChange) {
      onFilterChange(filterValue);
    } else if (context?.setFilterStatus) {
      context.setFilterStatus(filterValue);
    }
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    if (onSearchChange) {
      onSearchChange(value);
    } else if (context?.setSearchQuery) {
      context.setSearchQuery(value);
    }
  };

  const handleClearSearch = () => {
    if (onSearchChange) {
      onSearchChange('');
    } else if (context?.setSearchQuery) {
      context.setSearchQuery('');
    }
  };

  return (
    <section className="book-filter-container" aria-label="Filter dan Pencarian Koleksi">
      {/* Kolom Pencarian */}
      <div className="search-box">
        <label htmlFor="search-input" className="search-label">
          Cari Buku
        </label>
        <div className="search-input-wrapper">
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            id="search-input"
            type="search"
            value={activeSearch}
            onChange={handleSearchInputChange}
            placeholder="Cari berdasarkan judul atau penulis..."
            className="search-input"
            aria-label="Cari buku berdasarkan judul atau nama penulis"
          />
          {activeSearch && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="search-clear-btn"
              aria-label="Hapus kata kunci pencarian"
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {/* Tombol Filter Status */}
      <div className="filter-buttons-wrapper">
        <span className="filter-label" id="filter-group-label">
          Filter Status:
        </span>
        <div
          className="filter-buttons"
          role="group"
          aria-labelledby="filter-group-label"
        >
          {FILTER_OPTIONS.map((option) => {
            const isSelected = activeFilter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleFilterClick(option.value)}
                className={`filter-btn ${isSelected ? 'active' : ''}`}
                aria-pressed={isSelected}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

BookFilter.propTypes = {
  currentFilter: PropTypes.oneOf(['semua', 'milik', 'baca', 'beli']),
  onFilterChange: PropTypes.func,
  searchQuery: PropTypes.string,
  onSearchChange: PropTypes.func,
};

export default BookFilter;
