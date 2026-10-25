import { useContext } from 'react';
import PropTypes from 'prop-types';
import BookContext from '../../context/BookContext';
import './BookList.css';

// Konfigurasi label dan kelas visual status
const STATUS_CONFIG = {
  milik: {
    label: 'Milik Pribadi',
    badgeClass: 'badge-milik',
    spineClass: 'spine-milik',
  },
  baca: {
    label: 'Sedang Dibaca',
    badgeClass: 'badge-baca',
    spineClass: 'spine-baca',
  },
  beli: {
    label: 'Rencana Beli',
    badgeClass: 'badge-beli',
    spineClass: 'spine-beli',
  },
};

/**
 * Komponen reusable item buku individual
 * Menampilkan baris buku dengan motif punggung buku di sisi kiri,
 * lencana status teks & warna, serta tombol aksi Edit dan Hapus.
 */
export function BookItem({ book, onEdit, onDelete }) {
  const config = STATUS_CONFIG[book.status] || STATUS_CONFIG.milik;

  const handleDelete = () => {
    // Meminta konfirmasi pengguna sebelum menghapus data
    const confirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus buku "${book.title}" dari koleksi?`
    );
    if (confirmed) {
      onDelete(book.id);
    }
  };

  return (
    <article className="book-item-card" data-testid={`book-item-${book.id}`}>
      {/* Punggung buku (vertical colored strip di sisi kiri) */}
      <div className={`book-spine ${config.spineClass}`} aria-hidden="true" />

      <div className="book-item-content">
        <div className="book-info">
          <div className="book-header-line">
            <h3 className="book-title">{book.title}</h3>
            {/* Lencana status dengan teks dan warna serumpun */}
            <span className={`status-badge ${config.badgeClass}`}>
              {config.label}
            </span>
          </div>
          <p className="book-author">
            Penulis: <span className="author-name">{book.author}</span>
          </p>
        </div>

        {/* Tombol Aksi */}
        <div className="book-actions">
          <button
            type="button"
            onClick={() => onEdit(book)}
            className="btn-action btn-edit"
            aria-label={`Edit informasi buku ${book.title}`}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="btn-action btn-delete"
            aria-label={`Hapus buku ${book.title}`}
          >
            Hapus
          </button>
        </div>
      </div>
    </article>
  );
}

BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
    createdAt: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

/**
 * Komponen BookList
 * Menampilkan daftar buku yang telah difilter beserta pesan ramah
 * ketika daftar kosong atau tidak ditemukan hasil pencarian.
 */
export function BookList({
  books,
  totalBooksCount,
  onEdit,
  onDelete,
  emptyMessage,
}) {
  const context = useContext(BookContext);

  // Ambil data dari props jika diberikan (misal saat testing), atau dari context
  const bookList = books !== undefined ? books : (context?.filteredBooks || []);
  const allBooksCount =
    totalBooksCount !== undefined
      ? totalBooksCount
      : (context?.books?.length ?? bookList.length);

  const handleEdit = (book) => {
    if (onEdit) {
      onEdit(book);
    } else if (context?.setEditingBook) {
      context.setEditingBook(book);
    }
  };

  const handleDelete = (id) => {
    if (onDelete) {
      onDelete(id);
    } else if (context?.deleteBook) {
      context.deleteBook(id);
    }
  };

  // Kondisi daftar kosong
  if (bookList.length === 0) {
    const isSearchOrFilterActive = allBooksCount > 0;
    const defaultMessage = isSearchOrFilterActive
      ? 'Tidak ada buku yang sesuai dengan pencarian atau filter yang dipilih.'
      : 'Belum ada koleksi buku di rak pribadimu. Silakan tambahkan buku baru melalui formulir di atas.';

    return (
      <section className="book-list-empty" aria-label="Daftar Buku Kosong">
        <div className="empty-state-content">
          <div className="empty-state-icon" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h10" />
            </svg>
          </div>
          <h3 className="empty-state-title">
            {isSearchOrFilterActive ? 'Buku Tidak Ditemukan' : 'Rak Masih Kosong'}
          </h3>
          <p className="empty-state-text">
            {emptyMessage || defaultMessage}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="book-list-section" aria-label="Daftar Koleksi Buku">
      <div className="book-list-header">
        <h2 className="list-heading">Koleksi Buku ({bookList.length})</h2>
      </div>

      <div className="book-items-grid">
        {bookList.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
      createdAt: PropTypes.string,
    })
  ),
  totalBooksCount: PropTypes.number,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  emptyMessage: PropTypes.string,
};

export default BookList;
