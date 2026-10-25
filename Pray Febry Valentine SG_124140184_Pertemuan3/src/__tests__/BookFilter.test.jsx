import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookFilter from '../components/BookFilter/BookFilter';

describe('BookFilter Component', () => {
  it('memanggil perubahan filter saat tombol diklik', () => {
    const handleFilterChange = vi.fn();
    const handleSearchChange = vi.fn();

    render(
      <BookFilter
        currentFilter="semua"
        onFilterChange={handleFilterChange}
        searchQuery=""
        onSearchChange={handleSearchChange}
      />
    );

    // Temukan tombol-tombol filter
    const milikButton = screen.getByRole('button', { name: /milik pribadi/i });
    const bacaButton = screen.getByRole('button', { name: /sedang dibaca/i });
    const beliButton = screen.getByRole('button', { name: /rencana beli/i });
    const semuaButton = screen.getByRole('button', { name: /semua koleksi/i });

    // Klik filter Milik Pribadi
    fireEvent.click(milikButton);
    expect(handleFilterChange).toHaveBeenCalledWith('milik');

    // Klik filter Sedang Dibaca
    fireEvent.click(bacaButton);
    expect(handleFilterChange).toHaveBeenCalledWith('baca');

    // Klik filter Rencana Beli
    fireEvent.click(beliButton);
    expect(handleFilterChange).toHaveBeenCalledWith('beli');

    // Klik filter Semua
    fireEvent.click(semuaButton);
    expect(handleFilterChange).toHaveBeenCalledWith('semua');

    // Uji juga pemanggilan search saat input pencarian diketik
    const searchInput = screen.getByLabelText(/cari buku/i);
    fireEvent.change(searchInput, { target: { value: 'Pramoedya' } });
    expect(handleSearchChange).toHaveBeenCalledWith('Pramoedya');
  });
});
