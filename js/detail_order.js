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

// Get modals and buttons
var konfirmasiBtn = document.getElementById("konfirmasiBtn");
var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");
var btn = document.getElementById("tutupBtn");
var closeModalBtn = document.getElementById("closeModalBtn");
var nextModalBtn = document.getElementById("nextModalBtn");
var closeModalBtn2 = document.getElementById("closeModalBtn2");
var homeBtn = document.getElementById("homeBtn");

konfirmasiBtn.addEventListener("click", function () {
  tampilkanModal();
});

homeBtn.addEventListener("click", function () {
  tutupModal();
});

function tutupModal() {
  modal.style.display = "none";
  // Arahkan ke halaman index.html
  window.location.href = "index.html";
}

function tampilkanModal() {
  modal.style.display = "flex";
}

// Add event listener to open the first modal
btn.addEventListener("click", function () {
  modal.style.display = "block";
});

// Add event listener to close the first modal
closeModalBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// Add event listener to open the second modal
nextModalBtn.addEventListener("click", function () {
  modal.style.display = "none";
  modal2.style.display = "flex";
});

// Add event listener to close the second modal
closeModalBtn2.addEventListener("click", function () {
  modal2.style.display = "none";
});

// Add event listener to close the modals when clicking outside of them
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  } else if (event.target == modal2) {
    modal2.style.display = "none";
  }
});

// End of Modal
