"""Program Penghitung Body Mass Index (BMI)."""


def hitung_bmi(berat, tinggi):
    """
    Menghitung Body Mass Index (BMI) berdasarkan berat dan tinggi badan.

    Parameters:
        berat (float): Berat badan dalam satuan kilogram (kg).
        tinggi (float): Tinggi badan dalam satuan meter (m).

    Returns:
        float: Nilai BMI hasil kalkulasi (berat / (tinggi^2)).
    """
    return berat / (tinggi * tinggi)


def tentukan_kategori_bmi(bmi):
    """
    Menentukan kategori berat badan berdasarkan nilai BMI.

    Parameters:
        bmi (float): Nilai Body Mass Index.

    Returns:
        str: Kategori berat badan ('Berat badan kurang', 'Berat badan normal',
             'Berat badan berlebih', atau 'Obesitas').
    """
    if bmi < 18.5:
        return "Berat badan kurang"
    elif bmi < 25:
        return "Berat badan normal"
    elif bmi < 30:
        return "Berat badan berlebih"
    return "Obesitas"


def main():
    """Fungsi utama untuk menjalankan program penghitung BMI."""
    berat = float(input("Masukkan berat badan (kg): "))
    tinggi = float(input("Masukkan tinggi badan (m): "))

    bmi = hitung_bmi(berat, tinggi)
    kategori = tentukan_kategori_bmi(bmi)

    print("\n=== HASIL PERHITUNGAN BMI ===")
    print(f"BMI      : {bmi:.2f}")
    print(f"Kategori : {kategori}")


if __name__ == "__main__":
    main()
