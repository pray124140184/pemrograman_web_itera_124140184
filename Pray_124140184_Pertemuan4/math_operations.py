
# Modul Matematika

# Nilai PI
PI = 3.14159


# Menghitung luas persegi
def luas_persegi(sisi):
    """Menghitung luas persegi berdasarkan panjang sisinya."""
    return sisi * sisi


# Menghitung keliling persegi
def keliling_persegi(sisi):
    """Menghitung keliling persegi berdasarkan panjang sisinya."""
    return 4 * sisi


# Menghitung luas persegi panjang
def luas_persegi_panjang(panjang, lebar):
    """Menghitung luas persegi panjang berdasarkan panjang dan lebar."""
    return panjang * lebar


# Menghitung keliling persegi panjang
def keliling_persegi_panjang(panjang, lebar):
    """Menghitung keliling persegi panjang berdasarkan panjang dan lebar."""
    return 2 * (panjang + lebar)


# Menghitung luas lingkaran
def luas_lingkaran(jari_jari):
    """Menghitung luas lingkaran berdasarkan jari-jari."""
    return PI * jari_jari * jari_jari


# Menghitung keliling lingkaran
def keliling_lingkaran(jari_jari):
    """Menghitung keliling lingkaran berdasarkan jari-jari."""
    return 2 * PI * jari_jari


# Mengubah suhu Celsius ke Fahrenheit
def celsius_ke_fahrenheit(celsius):
    """Mengubah suhu Celsius menjadi Fahrenheit."""
    return (celsius * 9 / 5) + 32


# Mengubah suhu Celsius ke Kelvin
def celsius_ke_kelvin(celsius):
    """Mengubah suhu Celsius menjadi Kelvin."""
    return celsius + 273.15
