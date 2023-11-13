// Ambil URL saat ini
const currentUrl = window.location.href;

// Ambil semua elemen link di dalam navigasi
const links = document.querySelectorAll(".nav-link");

// Loop melalui setiap link untuk memeriksa URL
links.forEach((link) => {
  const linkUrl = link.href;

  // Periksa apakah URL saat ini mengandung URL link
  if (currentUrl.includes(linkUrl)) {
    // Tambahkan class "active" pada link yang sesuai
    link.classList.add("active");
  }
});

const listItems = document.querySelectorAll(".list-kat li");

// Menambahkan event listener pada setiap elemen <li>
listItems.forEach(function (item, index) {
  item.addEventListener("click", function () {
    // Menghapus class "active" dari semua elemen <li>
    listItems.forEach(function (li) {
      li.classList.remove("active");
    });

    // Menambah class "active" pada elemen yang diklik
    item.classList.add("active");
  });
});

const hamburgerButtonElement = document.querySelector("#hamburger");
const drawerElement = document.querySelector(".nav-list");

hamburgerButtonElement.addEventListener("click", () => {
  hamburgerButtonElement.classList.toggle("active");
  drawerElement.classList.toggle("active");
});

document.querySelectorAll(".jumlah-order").forEach(function (element) {
  var minusButton = element.querySelector(".minus");
  var plusButton = element.querySelector(".plus");
  var jumlahElement = element.querySelector(".num");
  var jumlah = parseInt(jumlahElement.innerText);

  minusButton.addEventListener("click", function () {
    if (jumlah > 0) {
      jumlah--;
      updateNilai();
    }
  });

  plusButton.addEventListener("click", function () {
    if (jumlah < 9) {
      jumlah++;
      updateNilai();
    }
  });

  function updateNilai() {
    jumlahElement.innerText = jumlah;
  }
});

// Objek utilitas untuk fungsi statis
var TeleponUtil = {
  formatNomorTelepon: function (nomorTeleponElement) {
    var nomorTelepon = nomorTeleponElement.value;

    // Hapus karakter selain angka
    nomorTelepon = nomorTelepon.replace(/\D/g, "");

    // Batasi panjang nomor telepon menjadi maksimal 13 karakter
    nomorTelepon = nomorTelepon.slice(0, 13);

    // Tambahkan kode negara jika belum ada
    if (!nomorTelepon.startsWith("62")) {
      nomorTelepon = "62" + nomorTelepon;
    }

    // Update nilai pada elemen input
    nomorTeleponElement.value = "+" + nomorTelepon;
  },
};

var nomorTeleponElement = document.getElementById("nomorTelepon");

// Event listener untuk setiap perubahan pada input
nomorTeleponElement.addEventListener("input", function () {
  TeleponUtil.formatNomorTelepon(nomorTeleponElement);
});

// Format ulang saat halaman dimuat (opsional)
TeleponUtil.formatNomorTelepon(nomorTeleponElement);

// Modal
var konfirmasiBtn = document.getElementById("konfirmasiBtn");
var tutupBtn = document.getElementById("tutupBtn");
var modal = document.getElementById("modal");

konfirmasiBtn.addEventListener("click", function () {
  tampilkanModal();
});

tutupBtn.addEventListener("click", function () {
  tutupModal();
});

function tampilkanModal() {
  modal.style.display = "flex";
}

function tutupModal() {
  window.location.href = "index.html";
}
