/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Key penyimpanan di localStorage
const STORAGE_KEY = 'praypray_book_management_data';

// Data awal koleksi buku untuk demonstrasi pertama kali
const INITIAL_BOOKS = [
  {
    id: 'book-1',
    title: 'Bumi Manusia',
    author: 'Pramoedya Ananta Toer',
    status: 'milik',
    createdAt: '2026-01-15T08:00:00.000Z',
  },
  {
    id: 'book-2',
    title: 'Filosofi Teras',
    author: 'Henry Manampiring',
    status: 'baca',
    createdAt: '2026-02-10T10:30:00.000Z',
  },
  {
    id: 'book-3',
    title: 'Laut Bercerita',
    author: 'Leila S. Chudori',
    status: 'beli',
    createdAt: '2026-03-01T14:15:00.000Z',
  },
];

// Inisialisasi Context
const BookContext = createContext(null);

/**
 * Provider untuk BookContext
 * Mengelola state global buku, filter status, kata kunci pencarian,
 * serta status buku yang sedang diedit.
 */
export function BookProvider({ children }) {
  // State tersinkronisasi localStorage
  const [books, setBooks] = useLocalStorage(STORAGE_KEY, INITIAL_BOOKS);

  // State untuk filter dan pencarian
  const [filterStatus, setFilterStatus] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');

  // State untuk melacak buku yang sedang dalam mode edit
  const [editingBook, setEditingBook] = useState(null);

  // Fungsi menambah buku baru
  const addBook = (bookData) => {
    const newBook = {
      id: `book-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: bookData.title.trim(),
      author: bookData.author.trim(),
      status: bookData.status || 'milik',
      createdAt: new Date().toISOString(),
    };
    setBooks((prevBooks) => [newBook, ...prevBooks]);
  };

  // Fungsi memperbarui buku yang sudah ada
  const editBook = (id, updatedData) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id
          ? {
              ...book,
              title: updatedData.title.trim(),
              author: updatedData.author.trim(),
              status: updatedData.status,
              updatedAt: new Date().toISOString(),
            }
          : book
      )
    );
    // Reset mode edit jika buku yang diedit adalah yang aktif
    if (editingBook && editingBook.id === id) {
      setEditingBook(null);
    }
  };

  // Fungsi menghapus buku
  const deleteBook = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    if (editingBook && editingBook.id === id) {
      setEditingBook(null);
    }
  };

  // Membatalkan mode edit
  const cancelEdit = () => {
    setEditingBook(null);
  };

  // Memoized filtered books berdasarkan status & kata kunci pencarian
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Filter status
      const matchesStatus = filterStatus === 'semua' || book.status === filterStatus;

      // Filter pencarian case-insensitive pada judul atau nama penulis
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [books, filterStatus, searchQuery]);

  const value = {
    books,
    filteredBooks,
    addBook,
    editBook,
    deleteBook,
    editingBook,
    setEditingBook,
    cancelEdit,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Custom Hook: useBooks
 * Mempermudah konsumsi BookContext di seluruh komponen
 */
export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus digunakan di dalam BookProvider');
  }
  return context;
}

export default BookContext;
