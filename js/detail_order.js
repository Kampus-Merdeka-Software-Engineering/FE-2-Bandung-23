// Function hamburger button
const hamburgerButtonElement = document.querySelector("#hamburger");
const drawerElement = document.querySelector(".nav-list");

hamburgerButtonElement.addEventListener("click", () => {
  hamburgerButtonElement.classList.toggle("active");
  drawerElement.classList.toggle("active");
});
// End of Function hamburger button

// Function active link on the navbar

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
// End of Function active link on the navbar

document.querySelectorAll(".order-total").forEach(function (element) {
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
  modal.style.display = "none";
  // Arahkan ke halaman index.html
  window.location.href = "index.html";
}
// End of Modal
