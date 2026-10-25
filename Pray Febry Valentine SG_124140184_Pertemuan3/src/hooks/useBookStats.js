import { useMemo } from 'react';

/**
 * Custom Hook: useBookStats
 * Menghitung metrik statistik dari daftar buku:
 * - Total seluruh buku
 * - Jumlah buku per status (milik, baca, beli)
 * - Persentase tiap status terhadap total
 *
 * @param {Array} books - Daftar objek buku
 * @returns {Object} Objek metrik statistik buku
 */
export function useBookStats(books = []) {
  const stats = useMemo(() => {
    const safeBooks = Array.isArray(books) ? books : [];
    const total = safeBooks.length;

    // Menghitung jumlah per status
    const milik = safeBooks.filter((book) => book && book.status === 'milik').length;
    const baca = safeBooks.filter((book) => book && book.status === 'baca').length;
    const beli = safeBooks.filter((book) => book && book.status === 'beli').length;

    // Menghitung persentase (menghindari pembagian dengan 0 / NaN)
    const percentageMilik = total > 0 ? Math.round((milik / total) * 100) : 0;
    const percentageBaca = total > 0 ? Math.round((baca / total) * 100) : 0;
    const percentageBeli = total > 0 ? Math.round((beli / total) * 100) : 0;

    return {
      total,
      milik,
      baca,
      beli,
      percentageMilik,
      percentageBaca,
      percentageBeli,
    };
  }, [books]);

  return stats;
}

export default useBookStats;
