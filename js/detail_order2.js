const baseURL = "https://be-2-bandung-23-production.up.railway.app";

const createOrder = document.getElementById("myModal");

createOrder.addEventListener("click", async function (event) {
  event.preventDefault();

  function getValue(id) {
    return document.getElementById(id).value;
  }

  const first_name = getValue("firstName");
  const last_name = getValue("lastName");
  const email = getValue("email");
  const phone = getValue("phone");
  const address = getValue("address");

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

function updateTotal(index, amount) {
  const selectedMenus = JSON.parse(localStorage.getItem("selectedData"));
  selectedMenus[index].total += amount;
  localStorage.setItem("selectedData", JSON.stringify(selectedMenus));

  const orderTotals = document.querySelectorAll(".num");
  orderTotals[index].textContent = selectedMenus[index].total;

  updateSubtotalAndTotal();
}

if (selectedData) {
  const selectedMenus = JSON.parse(selectedData);

  const orderMenu = document.querySelector(".scroll");
  const cardMenu = document.createElement("div");

  cardMenu.innerHTML = selectedMenus
    .map(function (selectedMenu, index) {
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

  const minusButtons = orderMenu.querySelectorAll(".minus");
  const plusButtons = orderMenu.querySelectorAll(".plus");
  const orderTotals = orderMenu.querySelectorAll(".num");

  minusButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      if (selectedMenus[index].total > 1) {
        selectedMenus[index].total--;
        orderTotals[index].textContent = selectedMenus[index].total;
        updateLocalStorage();
        updateOrderSummary(selectedMenus);
      }
    });
  });

  function removeMenu(index) {
    // Hapus objek data dari selectedMenus berdasarkan index
    selectedMenus.splice(index, 1);
    // Perbarui tampilan dan ringkasan pesanan
    updateOrderSummary(selectedMenus);

    // Tampilkan atau sembunyikan orderMenu sesuai dengan jumlah selectedMenus
    if (selectedMenus.length > 0) {
      orderMenu.style.display = "block";
    } else {
      orderMenu.style.display = "none";
    }
  }

  plusButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      selectedMenus[index].total++;
      orderTotals[index].textContent = selectedMenus[index].total;
      updateLocalStorage();
      updateOrderSummary(selectedMenus);
    });
  });
}
function updateOrderSummary(selectedMenus) {
  localStorage.setItem("selectedData", JSON.stringify(selectedMenus));
}

function updateLocalStorage() {
  localStorage.setItem("selectedData", JSON.stringify(selectedMenus));
}

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

function updateSubtotalAndTotal() {
  const selectedData = localStorage.getItem("selectedData");

  if (selectedData) {
    const selectedMenu = JSON.parse(selectedData);

    const price = selectedMenu.reduce(
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
    generateMenuAndModal(selectedMenu);
  }
}
updateSubtotalAndTotal();

function generateMenuAndModal(selectedMenu) {
  const modal = document.querySelector(".modal-content");
  const deliveryFee = 7000;

  const price = selectedMenu.reduce(function (acc, menu) {
    return acc + menu.menuPrice * menu.total;
  }, 0);

  const menuHtml = selectedMenu
    .map(function (menu) {
      return `
          <div class="list-detail">
            <p class="menu-bill">${menu.menuName}</p>
            <hr />
            <p class="qty">${menu.total}</p>
            <hr />
            <p class="price">${formatCurrency(menu.menuPrice)}</p>
          </div>
          <hr />
        `;
    })
    .join("");

  const formattedPrice = formatCurrency(price);
  const formattedDeliveryFee = formatCurrency(deliveryFee);
  const formattedTotal = formatCurrency(price + deliveryFee);
  //   formattedTotal = formatCurrency(price + deliveryFee);

  modal.innerHTML = `
      <div class="img-bill">
        <img src="assets/img/logo/Logo Hitam.png" alt="bill" />
        <hr />
      </div>
      <div class="list-order">
        ${menuHtml}
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
        <button class="close-btn" id="nextModalBtn">Ya, Lanjutkan pembayaran</button>
      </div>
    `;

  //   document
  //     .getElementById("nextModalBtn")
  //     .addEventListener("click", function () {
  //       document.getElementById("myModal").style.display = "none";
  //       document.getElementById("modalContent2").style.display = "flex";
  //       getTransactionId();
  //     });
}

async function getTransactionId() {
  try {
    const response = await fetch(`${baseURL}/order/payment`);
    const transactions = await response.json();
    console.log(transactions);
    //     const modalPaymentBox = document.querySelector(".modal2");
    //     const modalPayment = document.getElementById("modalPayment");
    //     modalPayment.innerHTML = `
    //   <div class="img-bill">
    //   <img src="assets/img/logo/Logo Hitam.png" alt="bill" />
    //   <hr />
    // </div>
    // <div class="payment-box">
    //   <div class="payment-box-left">
    //     <p>Total</p>
    //     <h4>${formattedTotal}</h4>
    //   </div>
    //   <div class="payment-box-right">
    //     <p>Order ID #${transactions.transaction_id}</p>
    //   </div>
    // </div>
    // <div class="gopay">
    //   <div class="gopay-title">
    //     <p>GoPay</p>
    //   </div>
    //   <div class="gopay-logo">
    //    <img src="./assets/img/modal/gopay.png" alt="">
    //   </div>
    // </div>
    // <div class="barcode-box">
    //   <img src="./assets/img/modal/barcode.webp" alt="" />
    // </div>
    // <div class="payment-btn">
    //   <button class="close-btn" id="finishBtn">Selesai</button>
    // </div>
    //   `;
    //     modalPaymentBox.appendChild(modalPayment);
    //     modalPayment.style.display = "flex";
    // console.log(transactions.first_name);
  } catch (error) {
    console.error("404");
  }
  //   document.getElementById("finishBtn").addEventListener("click", () => {
  //     document.getElementById("myModal2").style.display = "none";
  //     document.getElementById("myModal3").style.display = "flex";
  //   });
}

window.addEventListener("load", function () {
  updateSubtotalAndTotal();
  getTransactionId();

  document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("myModal").style.display = "flex";
  });

  document
    .getElementById("closeModalBtn")
    .addEventListener("click", function () {
      document.getElementById("myModal").style.display = "none";
    });

  document
    .getElementById("nextModalBtn")
    .addEventListener("click", function () {
      document.getElementById("myModal").style.display = "none";
      document.getElementById("myModal3").style.display = "flex";
    });

  document.getElementById("homeBtn").addEventListener("click", () => {
    localStorage.removeItem("selectedData");
    window.location.href = "index.html";
  });
});
