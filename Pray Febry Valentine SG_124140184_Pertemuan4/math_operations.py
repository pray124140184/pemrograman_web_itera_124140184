"""
Modul Operasi Matematika dan Konversi Suhu.

Modul ini menyediakan fungsi-fungsi perhitungan luas dan keliling
bangun datar (persegi, persegi panjang, lingkaran) serta konversi suhu
dari derajat Celsius ke skala Fahrenheit dan Kelvin.
"""

# Nilai konstanta Pi
PI = 3.14159


def luas_persegi(sisi):
    """
    Menghitung luas bangun datar persegi.

    Parameters:
        sisi (float atau int): Panjang sisi persegi.

    Returns:
        float atau int: Nilai luas persegi (sisi * sisi).
    """
    return sisi * sisi


def keliling_persegi(sisi):
    """
    Menghitung keliling bangun datar persegi.

    Parameters:
        sisi (float atau int): Panjang sisi persegi.

    Returns:
        float atau int: Nilai keliling persegi (4 * sisi).
    """
    return 4 * sisi


def luas_persegi_panjang(panjang, lebar):
    """
    Menghitung luas bangun datar persegi panjang.

    Parameters:
        panjang (float atau int): Panjang sisi persegi panjang.
        lebar (float atau int): Lebar sisi persegi panjang.

    Returns:
        float atau int: Nilai luas persegi panjang (panjang * lebar).
    """
    return panjang * lebar


def keliling_persegi_panjang(panjang, lebar):
    """
    Menghitung keliling bangun datar persegi panjang.

    Parameters:
        panjang (float atau int): Panjang sisi persegi panjang.
        lebar (float atau int): Lebar sisi persegi panjang.

    Returns:
        float atau int: Nilai keliling persegi panjang (2 * (panjang + lebar)).
    """
    return 2 * (panjang + lebar)


def luas_lingkaran(jari_jari):
    """
    Menghitung luas bangun datar lingkaran.

    Parameters:
        jari_jari (float atau int): Jari-jari lingkaran (r).

    Returns:
        float: Nilai luas lingkaran (PI * r^2).
    """
    return PI * jari_jari * jari_jari


def keliling_lingkaran(jari_jari):
    """
    Menghitung keliling bangun datar lingkaran.

    Parameters:
        jari_jari (float atau int): Jari-jari lingkaran (r).

    Returns:
        float: Nilai keliling lingkaran (2 * PI * r).
    """
    return 2 * PI * jari_jari


def celsius_ke_fahrenheit(celsius):
    """
    Mengonversi nilai suhu dari derajat Celsius ke Fahrenheit.

    Parameters:
        celsius (float atau int): Nilai suhu dalam skala Celsius.

    Returns:
        float: Nilai suhu dalam skala Fahrenheit ((C * 9/5) + 32).
    """
    return (celsius * 9 / 5) + 32


def celsius_ke_kelvin(celsius):
    """
    Mengonversi nilai suhu dari derajat Celsius ke Kelvin.

    Parameters:
        celsius (float atau int): Nilai suhu dalam skala Celsius.

    Returns:
        float: Nilai suhu dalam skala Kelvin (C + 273.15).
    """
    return celsius + 273.15
