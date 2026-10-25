import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookForm from '../components/BookForm/BookForm';

describe('BookForm Component', () => {
  it('menampilkan pesan error saat judul atau penulis kosong', () => {
    const handleSubmit = vi.fn();
    render(<BookForm onSubmit={handleSubmit} />);

    const submitButton = screen.getByRole('button', { name: /tambah buku/i });

    // Submit saat kolom masih kosong sama sekali
    fireEvent.click(submitButton);

    expect(screen.getByText(/judul buku wajib diisi/i)).toBeInTheDocument();
    expect(screen.getByText(/nama penulis wajib diisi/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();

    // Verifikasi penolakan input yang hanya berisi spasi
    const titleInput = screen.getByLabelText(/judul buku/i);
    const authorInput = screen.getByLabelText(/nama penulis/i);

    fireEvent.change(titleInput, { target: { value: '   ' } });
    fireEvent.change(authorInput, { target: { value: '   ' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/judul buku wajib diisi/i)).toBeInTheDocument();
    expect(screen.getByText(/nama penulis wajib diisi/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();

    // Verifikasi pesan error hilang seketika saat pengguna mengetik input valid
    fireEvent.change(titleInput, { target: { value: 'Filosofi Teras' } });
    expect(screen.queryByText(/judul buku wajib diisi/i)).not.toBeInTheDocument();

    fireEvent.change(authorInput, { target: { value: 'Henry Manampiring' } });
    expect(screen.queryByText(/nama penulis wajib diisi/i)).not.toBeInTheDocument();
  });

  it('memanggil handler submit dengan data yang benar saat input valid', () => {
    const handleSubmit = vi.fn();
    render(<BookForm onSubmit={handleSubmit} />);

    const titleInput = screen.getByLabelText(/judul buku/i);
    const authorInput = screen.getByLabelText(/nama penulis/i);
    const statusSelect = screen.getByLabelText(/status buku/i);
    const submitButton = screen.getByRole('button', { name: /tambah buku/i });

    // Mengisi input dengan data valid
    fireEvent.change(titleInput, { target: { value: '   Bumi Manusia   ' } });
    fireEvent.change(authorInput, { target: { value: '   Pramoedya Ananta Toer   ' } });
    fireEvent.change(statusSelect, { target: { value: 'baca' } });

    // Submit form
    fireEvent.click(submitButton);

    // Memastikan submit terpanggil 1 kali dengan nilai yang sudah di-trim
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'Bumi Manusia',
      author: 'Pramoedya Ananta Toer',
      status: 'baca',
    });

    // Memastikan form di-reset setelah penambahan berhasil
    expect(titleInput.value).toBe('');
    expect(authorInput.value).toBe('');
    expect(statusSelect.value).toBe('milik');
  });
});
