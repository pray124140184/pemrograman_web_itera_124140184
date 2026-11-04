"""Program Pengelolaan Data Nilai Mahasiswa."""


def hitung_nilai_akhir(nilai_uts, nilai_uas, nilai_tugas):
    """
    Menghitung nilai akhir mahasiswa berdasarkan bobot penilaian.

    Bobot:
        - UTS: 30%
        - UAS: 40%
        - Tugas: 30%

    Parameters:
        nilai_uts (float atau int): Nilai Ujian Tengah Semester.
        nilai_uas (float atau int): Nilai Ujian Akhir Semester.
        nilai_tugas (float atau int): Nilai Tugas.

    Returns:
        float: Nilai akhir akumulasi berdasarkan proporsi bobot.
    """
    return (
        (30 / 100 * nilai_uts) +
        (40 / 100 * nilai_uas) +
        (30 / 100 * nilai_tugas)
    )


def tentukan_grade(nilai_akhir):
    """
    Menentukan grade kelulusan huruf (A-E) berdasarkan nilai akhir.

    Rentang Nilai:
        - >= 80 : A
        - >= 70 : B
        - >= 60 : C
        - >= 50 : D
        - < 50  : E

    Parameters:
        nilai_akhir (float): Nilai akhir mahasiswa.

    Returns:
        str: Grade huruf hasil konversi ('A', 'B', 'C', 'D', atau 'E').
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    return "E"


def proses_data_mahasiswa(daftar_mahasiswa):
    """
    Memproses daftar mahasiswa dengan menambahkan nilai akhir dan grade.

    Parameters:
        daftar_mahasiswa (list of dict): List data mahasiswa dengan komponen nilai.

    Returns:
        list of dict: List data mahasiswa yang telah diperbarui dengan nilai akhir dan grade.
    """
    for data in daftar_mahasiswa:
        nilai_akhir = hitung_nilai_akhir(
            data["nilai_uts"],
            data["nilai_uas"],
            data["nilai_tugas"]
        )
        data["nilai_akhir"] = nilai_akhir
        data["grade"] = tentukan_grade(nilai_akhir)
    return daftar_mahasiswa


def tampilkan_tabel_mahasiswa(daftar_mahasiswa):
    """
    Menampilkan data nilai mahasiswa dalam bentuk tabel terformat ke terminal.

    Parameters:
        daftar_mahasiswa (list of dict): List data mahasiswa yang sudah diproses.

    Returns:
        None
    """
    print("=== DATA NILAI MAHASISWA ===")
    print("-" * 75)
    print(f"{'Nama':<12} {'NIM':<15} {'Nilai Akhir':<15} {'Grade':<10}")
    print("-" * 75)

    for data in daftar_mahasiswa:
        print(
            f"{data['nama']:<12} "
            f"{data['nim']:<15} "
            f"{data['nilai_akhir']:<15.2f} "
            f"{data['grade']:<10}"
        )

    print("-" * 75)


def tampilkan_ekstrem_nilai(daftar_mahasiswa):
    """
    Mencari dan menampilkan mahasiswa dengan nilai tertinggi dan terendah.

    Parameters:
        daftar_mahasiswa (list of dict): List data mahasiswa yang sudah diproses.

    Returns:
        None
    """
    nilai_tertinggi = max(daftar_mahasiswa, key=lambda x: x["nilai_akhir"])
    nilai_terendah = min(daftar_mahasiswa, key=lambda x: x["nilai_akhir"])

    print("\n=== NILAI TERTINGGI ===")
    print(f"Nama        : {nilai_tertinggi['nama']}")
    print(f"NIM         : {nilai_tertinggi['nim']}")
    print(f"Nilai Akhir : {nilai_tertinggi['nilai_akhir']:.2f}")

    print("\n=== NILAI TERENDAH ===")
    print(f"Nama        : {nilai_terendah['nama']}")
    print(f"NIM         : {nilai_terendah['nim']}")
    print(f"Nilai Akhir : {nilai_terendah['nilai_akhir']:.2f}")


def main():
    """Fungsi utama untuk menjalankan program pengelolaan data nilai mahasiswa."""
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
            "nilai_uts": 60,
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

    proses_data_mahasiswa(mahasiswa)
    tampilkan_tabel_mahasiswa(mahasiswa)
    tampilkan_ekstrem_nilai(mahasiswa)


if __name__ == "__main__":
    main()
