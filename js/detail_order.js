// // CONNECT TO BACKEND SERVER
// const baseURL = "https://be-2-bandung-23-production.up.railway.app";

// const createOrder = document.getElementById("form");

// createOrder.addEventListener("submit", async (event) => {
//   event.preventDefault();

//   const firstName = document.getElementById("firstName").value;
//   const lastName = document.getElementById("lastName").value;
//   const email = document.getElementById("createEmail").value;

//   try {
//     const response = await fetch(`${baseURL}/`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ firstName, lastName, email }),
//     });

//     const result = await response.json();
//     output.innerHTML = JSON.stringify(result);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// });

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

// Ambil data dari local storage
const selectedData = localStorage.getItem("selectedData");

if (selectedData) {
  let selectedMenu = JSON.parse(selectedData);

  const orderMenu = document.querySelector(".order-menu");
  // Format the menu price as Indonesian Rupiah without commas and trailing zeros
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // Ensure at least one digit after the decimal point
    maximumFractionDigits: 2, // Limit to a maximum of two digits after the decimal point
  })
    .format(selectedMenu.menuPrice)
    .replace(/,00$/, "");
  orderMenu.innerHTML = `
  <img src=${selectedMenu.imgSrc} alt=${selectedMenu.menuName} />
  <div class="order-type">
    <h3>${selectedMenu.menuName}</h3>
    <div class="menu-price">
      <p>${formattedPrice}</p>
    </div>
    <div class="notes">
      <input type="text " placeholder="Catatan Khusus" />
    </div>
  </div>
  <div class="order-total">
    <p class="minus">-</p>
    <p class="num" id="total">${selectedMenu.total}</p>
    <p class="plus">+</p>
  </div>
  `;

  const minusButton = orderMenu.querySelector(".minus");
  const plusButton = orderMenu.querySelector(".plus");
  const orderTotal = orderMenu.querySelector(".num");

  minusButton.addEventListener("click", () => {
    if (selectedMenu.total > 1) {
      selectedMenu.total--;
      orderTotal.textContent = selectedMenu.total;
      updateLocalStorage();
    }
  });

  plusButton.addEventListener("click", () => {
    selectedMenu.total++;
    orderTotal.textContent = selectedMenu.total;
    updateLocalStorage();
  });

  function updateLocalStorage() {
    localStorage.setItem("selectedData", JSON.stringify(selectedMenu));
  }
} else {
  const initialData = {
    total: 0,
  };
  localStorage.setItem("selectedData", JSON.stringify(initialData));
}

const selectedTotal = localStorage.getItem("selectedData");

if (selectedData) {
  let selectedMenu = JSON.parse(selectedData);

  function formatCurrency(value) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
      .format(value)
      .replace(/,00$/, "");
  }
  // Format the menu price as Indonesian Rupiah without commas and trailing zeros
  const price = selectedMenu.menuPrice * selectedMenu.total;
  const deliveryFee = 7000; // Biaya antar
  const total = price + deliveryFee;
  const subtotal = document.querySelector(".subtotal");

  const formattedPrice = formatCurrency(price);
  const formattedDeliveryFee = formatCurrency(deliveryFee);
  const formattedTotal = formatCurrency(total);
  subtotal.innerHTML = `
  <div class="subtotal-item">
  <div class="subtotal-left">
    <p>Subtotal</p>
    <p>Biaya Antar</p>
    <h3>Total</h3>
  </div>
  <div class="subtotal-right">
    <p>${formattedPrice}</p>
    <p>${formattedDeliveryFee}</p>
    <h3>${formattedTotal}</h3>
  </div>
  </div>
  `;
}

if (selectedData) {
  let selectedMenu = JSON.parse(selectedData);

  const modal = document.querySelector(".modal-content");
  const price = selectedMenu.menuPrice * selectedMenu.total;
  const deliveryFee = 7000; // Biaya antar
  const total = price + deliveryFee;

  const formattedPrice = formatCurrency(price);
  const formattedDeliveryFee = formatCurrency(deliveryFee);
  const formattedTotal = formatCurrency(total);
  const formattedUnitPrice = formatCurrency(selectedMenu.menuPrice);
  modal.innerHTML = `

              <div class="img-bill">
                <img src="assets/img/logo/Logo Hitam.png" alt="bill" />
                <hr />
              </div>
              <div class="list-order">
                <div class="list-detail">
                  <p class="menu-bill">${selectedMenu.menuName}</p>
                  <hr />
                  <p class="qty">${selectedMenu.total}</p>
                  <hr />
                  <p class="price">${formattedUnitPrice}</p>
                </div>
                <hr />
              </div>
              <div class="subtotal-bill">
                <div class="subtotal-left">
                  <p>Subtotal</p>
                  <p>Biaya Antar</p>
                  <h3>Total</h3>
                </div>
                <div class="subtotal-right">
                  <p>${formattedPrice}</p>
                  <p>${formattedDeliveryFee}</p>
                  <h3>${formattedTotal}</h3>
                </div>
              </div>
              <div class="modal-title">
                  <h1>Sudah yakin dengan pesanan Anda?</h1>
                </div>
                <div class="button-modal">
                  <button class="close" id="closeModalBtn">Ubah pesanan</button>
                  <button class="close-btn" id="nextModalBtn">
                    Ya, Lanjutkan pesanan
                  </button>
                </div>
            
`;
}

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("myModal").style.display = "flex";
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
