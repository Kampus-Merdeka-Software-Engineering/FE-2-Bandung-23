// CONNECT TO BACKEND SERVER
const baseURL = 'https://be-2-bandung-23-production.up.railway.app'

  const createOrder = document.getElementById("form", "", "")

    createOrder.addEventListener("click", async () => {
      const firstName =  document.getElementById("firstName").value;
      const lastName =  document.getElementById("lastName").value;
      const email = document.getElementById("createEmail").value;

      const response = await fetch(baseURL + '/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email}),
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
