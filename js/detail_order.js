// CONNECT TO BACKEND SERVER
const baseURL = "https://be-2-bandung-23-production.up.railway.app";

const createOrder = document.getElementById("form", "", "");

createOrder.addEventListener("click", async () => {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("createEmail").value;

  const response = await fetch(baseURL + "/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),
  });

  const result = await response.json();
  output.innerHTML = JSON.stringify(result);
});

// END OF CONNECT TO BACKEND SERVER/

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

// document.querySelectorAll(".order-total").forEach(function (element) {
//   var minusButton = element.querySelector(".minus");
//   var plusButton = element.querySelector(".plus");
//   var jumlahElement = element.querySelector(".num");
//   var jumlah = parseInt(jumlahElement.innerText);

//   minusButton.addEventListener("click", function () {
//     if (jumlah > 0) {
//       jumlah--;
//       updateNilai();
//     }
//   });

//   plusButton.addEventListener("click", function () {
//     if (jumlah < 9) {
//       jumlah++;
//       updateNilai();
//     }
//   });

//   function updateNilai() {
//     jumlahElement.innerText = jumlah;
//   }
// });

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const noTelepon = document.getElementById("noTelepon").value;
  const address = document.getElementById("address").value;

  // Check if all fields are filled
  if (
    firstName !== "" &&
    lastName !== "" &&
    email !== "" &&
    address !== "" &&
    noTelepon !== ""
  ) {
    // Show modal
    document.getElementById("myModal").style.display = "flex";
  } else {
  }
});

document.getElementById("closeModalBtn").addEventListener("click", () => {
  document.getElementById("myModal").style.display = "none";
});

document.getElementById("nextModalBtn").addEventListener("click", () => {
  document.getElementById("myModal").style.display = "none";
  document.getElementById("myModal2").style.display = "flex";
});

document.getElementById("homeBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});

// Ambil data dari local storage
const selectedData = localStorage.getItem("selectedData");

// Periksa apakah data tersedia di local storage
if (selectedData) {
  // Parse data JSON dari local storage
  let selectedMenu = JSON.parse(selectedData);

  // Temukan elemen di dalam DOM
  const orderMenu = document.querySelector(".order-menu");
  const orderImg = orderMenu.querySelector("img");
  const orderType = orderMenu.querySelector(".order-type h3");
  const menuPrice = orderMenu.querySelector(".menu-price p");
  const notesInput = orderMenu.querySelector(".notes input");
  const orderTotal = orderMenu.querySelector(".num");

  // Setel nilai elemen sesuai dengan data dari local storage
  orderImg.src = selectedMenu.imgSrc;
  orderType.textContent = selectedMenu.menuName;
  menuPrice.textContent = `Rp${selectedMenu.menuPrice}`;

  // Tambahkan event listener untuk menangani perubahan jumlah pesanan
  const minusButton = orderMenu.querySelector(".minus");
  const plusButton = orderMenu.querySelector(".plus");

  let total = selectedMenu.total || 1; // Jumlah pesanan awal (diambil dari local storage jika ada)
  orderTotal.textContent = total;

  minusButton.addEventListener("click", () => {
    if (total > 1) {
      total--;
      orderTotal.textContent = total;
      updateLocalStorage();
    }
  });

  plusButton.addEventListener("click", () => {
    total++;
    orderTotal.textContent = total;
    updateLocalStorage();
  });

  function updateLocalStorage() {
    // Update total di local storage
    selectedMenu.total = total;
    localStorage.setItem("selectedData", JSON.stringify(selectedMenu));
  }
} else {
  // Data tidak ada di local storage, inisialisasi data dengan total 0
  const initialData = {
    total: 0,
  };
  localStorage.setItem("selectedData", JSON.stringify(initialData));
}
