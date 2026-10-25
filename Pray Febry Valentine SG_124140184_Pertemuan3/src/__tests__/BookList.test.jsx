import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookList from '../components/BookList/BookList';

describe('BookList Component', () => {
  it('menampilkan daftar buku dan pesan kosong bila tidak ada data', () => {
    // 1. Uji kondisi ketika daftar buku kosong
    const { rerender } = render(
      <BookList books={[]} totalBooksCount={0} onEdit={vi.fn()} onDelete={vi.fn()} />
    );

    expect(screen.getByText(/rak masih kosong/i)).toBeInTheDocument();
    expect(
      screen.getByText(/belum ada koleksi buku di rak pribadimu/i)
    ).toBeInTheDocument();

    // 2. Uji kondisi ketika terdapat daftar buku
    const mockBooks = [
      {
        id: '1',
        title: 'Cantik Itu Luka',
        author: 'Eka Kurniawan',
        status: 'milik',
      },
      {
        id: '2',
        title: 'Laskar Pelangi',
        author: 'Andrea Hirata',
        status: 'baca',
      },
      {
        id: '3',
        title: 'Gadis Kretek',
        author: 'Ratih Kumala',
        status: 'beli',
      },
    ];

    rerender(
      <BookList
        books={mockBooks}
        totalBooksCount={3}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    // Memastikan judul dan penulis seluruh buku tampil
    expect(screen.getByText('Cantik Itu Luka')).toBeInTheDocument();
    expect(screen.getByText('Eka Kurniawan')).toBeInTheDocument();
    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
    expect(screen.getByText('Andrea Hirata')).toBeInTheDocument();
    expect(screen.getByText('Gadis Kretek')).toBeInTheDocument();
    expect(screen.getByText('Ratih Kumala')).toBeInTheDocument();

    // Memastikan lencana status tampil
    expect(screen.getByText('Milik Pribadi')).toBeInTheDocument();
    expect(screen.getByText('Sedang Dibaca')).toBeInTheDocument();
    expect(screen.getByText('Rencana Beli')).toBeInTheDocument();

    // Memastikan pesan kosong sudah tidak tampil
    expect(screen.queryByText(/rak masih kosong/i)).not.toBeInTheDocument();
  });
});
