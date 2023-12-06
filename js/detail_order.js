// CONNECT TO BACKEND SERVER
const baseURL = "https://be-2-bandung-23-production.up.railway.app";

const createOrder = document.getElementById("form");

createOrder.addEventListener("submit", async (event) => {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("createEmail").value;

  try {
    const response = await fetch(`${baseURL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email }),
    });

    const result = await response.json();
    output.innerHTML = JSON.stringify(result);
  } catch (error) {
    console.error("Error:", error);
  }
});

// Function hamburger button
const hamburgerButtonElement = document.querySelector("#hamburger");
const drawerElement = document.querySelector(".nav-list");

hamburgerButtonElement.addEventListener("click", () => {
  hamburgerButtonElement.classList.toggle("active");
  drawerElement.classList.toggle("active");
});
// End of Function hamburger button

// Function active link on the navbar
const currentUrl = window.location.href;
const links = document.querySelectorAll(".nav-link");

links.forEach((link) => {
  const linkUrl = link.href;

  if (currentUrl.includes(linkUrl)) {
    link.classList.add("active");
  }
});
// End of Function active link on the navbar

document.getElementById("form").addEventListener("submit", (event) => {
  // event.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const noTelepon = document.getElementById("noTelepon").value;
  const address = document.getElementById("address").value;

  if (
    firstName !== "" &&
    lastName !== "" &&
    email !== "" &&
    address !== "" &&
    noTelepon !== ""
  ) {
    document.getElementById("myModal").style.display = "flex";
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

if (selectedData) {
  let selectedMenu = JSON.parse(selectedData);

  const orderMenu = document.querySelector(".order-menu");
  const orderImg = orderMenu.querySelector("img");
  const orderType = orderMenu.querySelector(".order-type h3");
  const menuPrice = orderMenu.querySelector(".menu-price p");
  const notesInput = orderMenu.querySelector(".notes input");
  const orderTotal = orderMenu.querySelector(".num");

  orderImg.src = selectedMenu.imgSrc;
  orderType.textContent = selectedMenu.menuName;
  menuPrice.textContent = `Rp${selectedMenu.menuPrice}`;

  const minusButton = orderMenu.querySelector(".minus");
  const plusButton = orderMenu.querySelector(".plus");

  let total = selectedMenu.total || 1;
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
    selectedMenu.total = total;
    localStorage.setItem("selectedData", JSON.stringify(selectedMenu));
  }
} else {
  const initialData = {
    total: 0,
  };
  localStorage.setItem("selectedData", JSON.stringify(initialData));
}
