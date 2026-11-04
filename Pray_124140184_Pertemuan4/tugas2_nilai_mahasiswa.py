
# Program Pengelolaan Data Nilai Mahasiswa

# Data mahasiswa
mahasiswa = [
    {
        "nama": "Pray",
        "nim": "124140184",
        "nilai_uts": 78,
        "nilai_uas": 77,
        "nilai_tugas": 82
    },
    {
        "nama": "Andini",
        "nim": "124140192",
        "nilai_uts":60,
        "nilai_uas": 65,
        "nilai_tugas": 70
    },
    {
        "nama": "Adhytia",
        "nim": "124140007",
        "nilai_uts": 90,
        "nilai_uas": 95,
        "nilai_tugas": 90
    },
    {
        "nama": "Winda",
        "nim": "124140220",
        "nilai_uts": 55,
        "nilai_uas": 53,
        "nilai_tugas": 67
    },
    {
        "nama": "Eka",
        "nim": "124140226",
        "nilai_uts": 43,
        "nilai_uas": 47,
        "nilai_tugas": 56
    }
]

# Menghitung nilai akhir 

for data in mahasiswa:

    nilai_akhir = (
        (30 / 100 * data["nilai_uts"]) +
        (40 / 100 * data["nilai_uas"]) +
        (30 / 100 * data["nilai_tugas"])
    )

    data["nilai_akhir"] = nilai_akhir

    if nilai_akhir >= 80:
        data["grade"] = "A"
    elif nilai_akhir >= 70:
        data["grade"] = "B"
    elif nilai_akhir >= 60:
        data["grade"] = "C"
    elif nilai_akhir >= 50:
        data["grade"] = "D"
    else:
        data["grade"] = "E"

# Menampilkan tabel nilai 
print("=== DATA NILAI MAHASISWA ===")
print("-" * 75)
print(f"{'Nama':<12} {'NIM':<15} {'Nilai Akhir':<15} {'Grade':<10}")
print("-" * 75)

for data in mahasiswa:
    print(
        f"{data['nama']:<12} "
        f"{data['nim']:<15} "
        f"{data['nilai_akhir']:<15.2f} "
        f"{data['grade']:<10}"
    )

print("-" * 75)

# Mencari nilai tertinggi dan terendah
nilai_tertinggi = max(mahasiswa, key=lambda x: x["nilai_akhir"])
nilai_terendah = min(mahasiswa, key=lambda x: x["nilai_akhir"])

# Menampilkan mahasiswa dengan nilai tertinggi
print("\n=== NILAI TERTINGGI ===")
print(f"Nama        : {nilai_tertinggi['nama']}")
print(f"NIM         : {nilai_tertinggi['nim']}")
print(f"Nilai Akhir : {nilai_tertinggi['nilai_akhir']:.2f}")

# Menampilkan mahasiswa dengan nilai terendah
print("\n=== NILAI TERENDAH ===")
print(f"Nama        : {nilai_terendah['nama']}")
print(f"NIM         : {nilai_terendah['nim']}")
print(f"Nilai Akhir : {nilai_terendah['nilai_akhir']:.2f}")
