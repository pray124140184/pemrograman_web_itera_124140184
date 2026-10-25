import { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import BookContext from '../../context/BookContext';
import './BookForm.css';

/**
 * Komponen BookForm
 * Menangani penambahan buku baru dan pengeditan buku yang sudah ada.
 * Dilengkapi validasi input judul & penulis (menolak string spasi kosong).
 */
export function BookForm({ onSubmit, initialData = null, onCancel = null }) {
  // Mengakses BookContext secara aman jika tersedia
  const context = useContext(BookContext);

  // Menentukan apakah dalam mode edit dari props atau context
  const activeEditingBook = initialData || context?.editingBook || null;
  const isEditing = Boolean(activeEditingBook);

  // State form terkontrol (controlled components)
  const [title, setTitle] = useState(activeEditingBook ? activeEditingBook.title : '');
  const [author, setAuthor] = useState(activeEditingBook ? activeEditingBook.author : '');
  const [status, setStatus] = useState(activeEditingBook ? activeEditingBook.status : 'milik');

  // Melacak perubahan activeEditingBook tanpa cascading re-render
  const [prevEditingBook, setPrevEditingBook] = useState(activeEditingBook);
  if (activeEditingBook !== prevEditingBook) {
    setPrevEditingBook(activeEditingBook);
    setTitle(activeEditingBook ? activeEditingBook.title : '');
    setAuthor(activeEditingBook ? activeEditingBook.author : '');
    setStatus(activeEditingBook ? activeEditingBook.status : 'milik');
  }

  // State pesan error validasi
  const [errors, setErrors] = useState({ title: '', author: '' });

  // Ref untuk mengarahkan fokus saat mode edit aktif
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (activeEditingBook && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [activeEditingBook]);

  // Handler perubahan input judul dengan pembersihan error otomatis
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    if (errors.title && value.trim() !== '') {
      setErrors((prev) => ({ ...prev, title: '' }));
    }
  };

  // Handler perubahan input penulis dengan pembersihan error otomatis
  const handleAuthorChange = (e) => {
    const value = e.target.value;
    setAuthor(value);
    if (errors.author && value.trim() !== '') {
      setErrors((prev) => ({ ...prev, author: '' }));
    }
  };

  // Handler submit form beserta validasi
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi input: tidak boleh kosong atau hanya berisi spasi
    const trimmedTitle = title.trim();
    const trimmedAuthor = author.trim();

    const newErrors = { title: '', author: '' };
    let hasError = false;

    if (!trimmedTitle) {
      newErrors.title = 'Judul buku wajib diisi';
      hasError = true;
    }

    if (!trimmedAuthor) {
      newErrors.author = 'Nama penulis wajib diisi';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    const formData = {
      title: trimmedTitle,
      author: trimmedAuthor,
      status,
    };

    // Eksekusi fungsi submit dari props atau context
    if (onSubmit) {
      onSubmit(formData);
    } else if (context) {
      if (isEditing) {
        context.editBook(activeEditingBook.id, formData);
      } else {
        context.addBook(formData);
      }
    }

    // Reset formulir setelah penambahan berhasil jika bukan mode edit
    if (!isEditing) {
      setTitle('');
      setAuthor('');
      setStatus('milik');
      setErrors({ title: '', author: '' });
    }
  };

  // Handler pembatalan mode edit
  const handleCancel = () => {
    setErrors({ title: '', author: '' });
    if (onCancel) {
      onCancel();
    } else if (context?.cancelEdit) {
      context.cancelEdit();
    }
  };

  return (
    <section className="book-form-card" aria-labelledby="form-heading">
      <div className="form-header">
        <h2 id="form-heading" className="form-title">
          {isEditing ? 'Edit Informasi Buku' : 'Tambah Buku ke Koleksi'}
        </h2>
        <p className="form-subtitle">
          {isEditing
            ? 'Perbarui detail buku yang dipilih pada koleksi rak pribadimu.'
            : 'Catat buku yang kamu miliki, sedang dibaca, atau direncanakan untuk dibeli.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="form-content">
        <div className="form-row">
          {/* Input Judul Buku */}
          <div className="form-group">
            <label htmlFor="book-title" className="form-label">
              Judul Buku <span className="required-star">*</span>
            </label>
            <input
              ref={titleInputRef}
              type="text"
              id="book-title"
              name="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Contoh: Bumi Manusia"
              className={`form-input ${errors.title ? 'input-error' : ''}`}
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && (
              <span id="title-error" className="error-message" role="alert">
                {errors.title}
              </span>
            )}
          </div>

          {/* Input Penulis */}
          <div className="form-group">
            <label htmlFor="book-author" className="form-label">
              Nama Penulis <span className="required-star">*</span>
            </label>
            <input
              type="text"
              id="book-author"
              name="author"
              value={author}
              onChange={handleAuthorChange}
              placeholder="Contoh: Pramoedya Ananta Toer"
              className={`form-input ${errors.author ? 'input-error' : ''}`}
              aria-invalid={Boolean(errors.author)}
              aria-describedby={errors.author ? 'author-error' : undefined}
            />
            {errors.author && (
              <span id="author-error" className="error-message" role="alert">
                {errors.author}
              </span>
            )}
          </div>
        </div>

        <div className="form-row-actions">
          {/* Dropdown Status Buku */}
          <div className="form-group form-group-status">
            <label htmlFor="book-status" className="form-label">
              Status Buku
            </label>
            <select
              id="book-status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-select"
            >
              <option value="milik">Milik Pribadi</option>
              <option value="baca">Sedang Dibaca</option>
              <option value="beli">Rencana Beli</option>
            </select>
          </div>

          {/* Tombol Aksi */}
          <div className="form-actions">
            {isEditing && (
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary btn-cancel"
              >
                Batal
              </button>
            )}
            <button type="submit" className="btn-primary btn-submit">
              {isEditing ? 'Simpan Perubahan' : 'Tambah Buku'}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

BookForm.propTypes = {
  onSubmit: PropTypes.func,
  initialData: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']),
  }),
  onCancel: PropTypes.func,
};

export default BookForm;
