import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useBookStats } from '../hooks/useBookStats';

describe('useBookStats Custom Hook', () => {
  it('menghitung total dan jumlah per status dengan benar', () => {
    // 1. Uji kondisi ketika koleksi kosong
    const { result, rerender } = renderHook(({ books }) => useBookStats(books), {
      initialProps: { books: [] },
    });

    expect(result.current.total).toBe(0);
    expect(result.current.milik).toBe(0);
    expect(result.current.baca).toBe(0);
    expect(result.current.beli).toBe(0);
    expect(result.current.percentageMilik).toBe(0);
    expect(result.current.percentageBaca).toBe(0);
    expect(result.current.percentageBeli).toBe(0);

    // 2. Uji kondisi dengan data buku
    const mockBooks = [
      { id: '1', title: 'Buku 1', author: 'A', status: 'milik' },
      { id: '2', title: 'Buku 2', author: 'B', status: 'milik' },
      { id: '3', title: 'Buku 3', author: 'C', status: 'baca' },
      { id: '4', title: 'Buku 4', author: 'D', status: 'beli' },
    ];

    rerender({ books: mockBooks });

    // Total buku = 4
    expect(result.current.total).toBe(4);
    // Milik = 2 (50%)
    expect(result.current.milik).toBe(2);
    expect(result.current.percentageMilik).toBe(50);
    // Baca = 1 (25%)
    expect(result.current.baca).toBe(1);
    expect(result.current.percentageBaca).toBe(25);
    // Beli = 1 (25%)
    expect(result.current.beli).toBe(1);
    expect(result.current.percentageBeli).toBe(25);
  });
});
