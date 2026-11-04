
# Program Utama Modul Matematika

# Cara pertama mengimpor modul
import math_operations

# Cara kedua mengimpor fungsi tertentu
from math_operations import celsius_ke_fahrenheit, celsius_ke_kelvin


# Data untuk perhitungan
sisi = 5
panjang = 10
lebar = 4
jari_jari = 7
suhu = 30


# Menampilkan hasil perhitungan persegi
print("=== PERHITUNGAN PERSEGI ===")
print(f"Luas       : {math_operations.luas_persegi(sisi)}")
print(f"Keliling   : {math_operations.keliling_persegi(sisi)}")


# Menampilkan hasil perhitungan persegi panjang
print("\n=== PERHITUNGAN PERSEGI PANJANG ===")
print(f"Luas       : {math_operations.luas_persegi_panjang(panjang, lebar)}")
print(f"Keliling   : {math_operations.keliling_persegi_panjang(panjang, lebar)}")


# Menampilkan hasil perhitungan lingkaran
print("\n=== PERHITUNGAN LINGKARAN ===")
print(f"Luas       : {math_operations.luas_lingkaran(jari_jari):.2f}")
print(f"Keliling   : {math_operations.keliling_lingkaran(jari_jari):.2f}")


# Menampilkan hasil konversi suhu
print("\n=== KONVERSI SUHU ===")
print(f"Celsius    : {suhu} C")
print(f"Fahrenheit : {celsius_ke_fahrenheit(suhu):.2f} F")
print(f"Kelvin     : {celsius_ke_kelvin(suhu):.2f} K")
