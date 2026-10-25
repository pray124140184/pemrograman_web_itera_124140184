import { useState, useEffect } from 'react';

/**
 * Custom Hook: useLocalStorage
 * Menyinkronkan state React dengan browser localStorage secara aman
 * Dilengkapi blok try/catch untuk menangani JSON corrupt atau restriksi storage
 *
 * @param {string} key - Kunci penyimpanan localStorage
 * @param {*} initialValue - Nilai default jika key belum ada di localStorage
 * @returns {[any, Function]} - [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
  // Inisialisasi state dengan membaca dari localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      // Parsing JSON jika ada data, fallback ke initialValue jika null
      return item !== null ? JSON.parse(item) : initialValue;
    } catch {
      // Penanganan jika JSON rusak atau storage tidak dapat diakses
      return initialValue;
    }
  });

  // Fungsi untuk memperbarui state dan localStorage secara bersamaan
  const setValue = (value) => {
    try {
      // Mendukung nilai langsung atau fungsi callback (state updater)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch {
      // Gagal menyimpan (misal storage penuh atau private browsing)
    }
  };

  // Sinkronisasi jika nilai awal belum ada di localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        if (item === null && initialValue !== undefined) {
          window.localStorage.setItem(key, JSON.stringify(storedValue));
        }
      }
    } catch {
      // Abaikan error background sync
    }
  }, [key, initialValue, storedValue]);

  return [storedValue, setValue];
}

export default useLocalStorage;
