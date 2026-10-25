import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useLocalStorage } from '../hooks/useLocalStorage';

describe('useLocalStorage Custom Hook', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('menyimpan dan membaca nilai dari localStorage', () => {
    const key = 'test_book_key';
    const initialData = [{ id: '1', title: 'Awal' }];

    // Inisialisasi hook dengan data awal
    const { result } = renderHook(() => useLocalStorage(key, initialData));

    // Membaca nilai awal dari hook
    expect(result.current[0]).toEqual(initialData);

    // Memperbarui nilai menggunakan setValue
    const updatedData = [
      { id: '1', title: 'Awal' },
      { id: '2', title: 'Buku Kedua' },
    ];

    act(() => {
      result.current[1](updatedData);
    });

    // Memastikan state terbarui
    expect(result.current[0]).toEqual(updatedData);

    // Memastikan nilai tersimpan di window.localStorage
    const storedInStorage = JSON.parse(window.localStorage.getItem(key));
    expect(storedInStorage).toEqual(updatedData);

    // Uji komponen baru yang memuat dari localStorage yang sudah terisi
    const { result: newHookResult } = renderHook(() =>
      useLocalStorage(key, [])
    );
    expect(newHookResult.current[0]).toEqual(updatedData);
  });

  it('aman terhadap data JSON yang rusak (try/catch fallback)', () => {
    const corruptKey = 'corrupt_key';
    // Menaruh string bukan JSON valid
    window.localStorage.setItem(corruptKey, '{corrupted-json...');

    const fallbackData = [{ id: 'fallback', title: 'Fallback Book' }];
    const { result } = renderHook(() =>
      useLocalStorage(corruptKey, fallbackData)
    );

    // Mengembalikan fallbackData tanpa menimbulkan uncaught exception
    expect(result.current[0]).toEqual(fallbackData);
  });
});
