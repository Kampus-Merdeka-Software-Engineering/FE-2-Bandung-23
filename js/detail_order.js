const baseURL = "https://be-2-bandung-23-production.up.railway.app";

const createOrder = document.getElementById("myModal");

createOrder.addEventListener("click", async (event) => {
  event.preventDefault();

  const first_name = document.getElementById("firstName").value;
  const last_name = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  try {
    const response = await fetch(`${baseURL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first_name, last_name, email, phone, address }),
    });
  } catch (error) {
    console.error("Error:", error);
  }
});

const selectedData = localStorage.getItem("selectedData");

// Function to update total and save to local storage
const updateTotal = (index, amount) => {
  let selectedMenus = JSON.parse(localStorage.getItem("selectedData"));
  selectedMenus[index].total += amount;
  localStorage.setItem("selectedData", JSON.stringify(selectedMenus));

  // Update the displayed total
  orderTotals[index].textContent = selectedMenus[index].total;

  // Update subtotal and total
  updateSubtotalAndTotal();
};

// Function to update subtotal and total
const updateSubtotalAndTotal = () => {
  let selectedMenus = JSON.parse(localStorage.getItem("selectedData"));

  const price = selectedMenus.reduce(
    (acc, menu) => acc + menu.menuPrice * menu.total,
    0
  );
  const deliveryFee = 7000; // Biaya antar
  const total = price + deliveryFee;

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
};

if (selectedData) {
  let selectedMenus = JSON.parse(selectedData);

  const orderMenu = document.querySelector(".scroll");
  const cardMenu = document.createElement("div");

  cardMenu.innerHTML = selectedMenus
    .map((selectedMenu, index) => {
      const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
        .format(selectedMenu.menuPrice)
        .replace(/,00$/, "");

      return `
      <div class="side-bar-order">
        <div class="order-menu">
          <img src=${selectedMenu.imgSrc} alt=${selectedMenu.menuName} />
          <div class="order-type">
            <h3>${selectedMenu.menuName}</h3>
            <div class="menu-price">
              <p>${formattedPrice}</p>
            </div>
            <div class="notes">
              <input type="text" placeholder="Catatan Khusus" />
            </div>
          </div>
          <div class="order-total">
            <p class="minus" onclick="updateTotal(${index}, -1)">-</p>
            <p class="num" data-menu-id="${selectedMenu.menuId}">${selectedMenu.total}</p>
            <p class="plus" onclick="updateTotal(${index}, 1)">+</p>
          </div>
        </div>
      </div>
      `;
    })
    .join("");
  orderMenu.appendChild(cardMenu);

  // Attach event listeners to each order item
  const minusButtons = orderMenu.querySelectorAll(".minus");
  const plusButtons = orderMenu.querySelectorAll(".plus");
  const orderTotals = orderMenu.querySelectorAll(".num");

  minusButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (selectedMenus[index].total > 1) {
        selectedMenus[index].total--;
        orderTotals[index].textContent = selectedMenus[index].total;
        updateLocalStorage();
      }
    });
  });

  plusButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      selectedMenus[index].total++;
      orderTotals[index].textContent = selectedMenus[index].total;
      updateLocalStorage();
    });
  });
} else {
}
function updateLocalStorage() {
  localStorage.setItem("selectedData", JSON.stringify(selectedMenus));
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace(/,00$/, "");
};

if (selectedData) {
  let selectedMenus = JSON.parse(selectedData);

  const price = selectedMenus.reduce(
    (acc, menu) => acc + menu.menuPrice * menu.total,
    0
  );
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
      <button class="close-btn" id="nextModalBtn">Ya, Lanjutkan pesanan</button>
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
