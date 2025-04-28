import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDAZJyOxa2OS-jJnRXZy7lB8KK8tRVLTKc",
  authDomain: "insancemerlang-77850.firebaseapp.com",
  projectId: "insancemerlang-77850",
  storageBucket: "insancemerlang-77850.firebasestorage.app",
  messagingSenderId: "1089988030004",
  appId: "1:1089988030004:web:c51a6d35c4bcf397a5e461",
  measurementId: "G-DT35RBD5EF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambildaftarNama() {
  const refDokumen = collection(db, "Todolist");
  const kueri = query(refDokumen, orderBy("Nama"));
  const cuplikankueri = await getDocs(kueri);
  
  let hasil = [];
  cuplikankueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      Nama: dok.data().Nama,
      Prioritas: dok.data().Prioritas,
      Status: dok.data().Status,
      Tanggal: dok.data().Tanggal,
    });
  });
  
  return hasil;
}

export async function tambahNama(Nama, Prioritas, Status, tanggal) {
  try {
    const dokRef = await addDoc(collection(db, 'senin'), {
      Nama: Nama,
      Prioritas: Prioritas,
      Status: Status,
      Tanggal: Tanggal,
    });
    console.log('berhasil menembah Nama ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah Nama ' + e);
  }
}

export async function hapusNama(docId) {
  await deleteDoc(doc(db, "Nama", docId));
}

export async function ubahNama(docId, Nama, Prioritas, Status, Tanggal) {
  await updateDoc(doc(db, "senin", docId), {
    Nama: Nama,
    Prioritas: Prioritas,
    Status: Status,
    Tanggal: Tanggal,
  });
}

export async function ambilNama(docId) {
  const docRef = await doc(db, "Nama", docId);
  const docSnap = await getDoc(docRef);
  
  return await docSnap.data();
}

function ubahPrioritas(tombol) {
  let Prioritas = tombol.dataset.Prioritas;
  
  if (Status === "Selesai") {
    tombol.textContent = "Belum Selesai";
    tombol.dataset.Status = "Belum Selesai";
  } else {
    tombol.textContent = "Selesai";
    tombol.dataset.status = "Selesai";
  }
}

// Event listener untuk hapus tugas
$(".tombol-hapus").click(async function() {
  await hapusNama($(this).attr("data-id"));
  location.reload();
});

// Event listener untuk ubah tugas
$(".ubah").click(async function() {
  window.location.replace("ubahNama.html?docId=" + $(this).attr("data-id"));
});

// Gunakan event delegation agar berfungsi pada elemen dinamis
$(document).on("click", ".btn-status", function() {
  let NamaId = $(this).attr("data-id");
  let PrioritasSekarang = $(this).attr("data-Prioritas");
  let PrioritasBaru;
  
  if (PrioritasSekarang === "Belum Selesai") {
    PrioritasBaru = "Sedang Dikerjakan";
  } else if (PrioritasSekarang === "Sedang Dikerjakan") {
    PrioritasBaru = "Selesai";
  } else {
    PrioritasBaru = "Belum Selesai";
  }
  
  // Update tampilan tombol
  $(this).attr("data-Status", StatusBaru);
  $(this).text(statusBaru);
  updateWarnaStatus($(this), StatusBaru);
  
  // Tambahkan kode AJAX jika ingin menyimpan perubahan status ke database
  console.log(`Status Nama ID ${NamaId} diubah menjadi ${StatusBaru}`);
});

// Fungsi untuk memperbarui warna tombol berdasarkan status
function updateWarnaStatus(button, status) {
  if (status === "Belum Selesai") {
    button.css("background-color", "#dc3545").css("color", "white");
  } else if (Status === "Sedang Dikerjakan") {
    button.css("background-color", "#ffc107").css("color", "black");
  } else {
    button.css("background-color", "#28a745").css("color", "white");
  }
}

// Atur warna status setelah halaman dimuat
$(document).ready(function() {
  $(".btn-status").each(function() {
    updateWarnaStatus($(this), $(this).attr("data-status"));
  });
});