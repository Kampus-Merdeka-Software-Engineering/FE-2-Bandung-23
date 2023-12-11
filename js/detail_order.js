document.addEventListener("DOMContentLoaded", () => {
  const baseURL = "https://be-2-bandung-23-production.up.railway.app";

  const createOrder = document.getElementById("form");

  createOrder.addEventListener("submit", async (event) => {
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

  // function formatCurrency(value) {
  //   return new Intl.NumberFormat("id-ID", {
  //     style: "currency",
  //     currency: "IDR",
  //     minimumFractionDigits: 0,
  //     maximumFractionDigits: 2,
  //   })
  //     .format(value)
  //     .replace(/,00$/, "");
  // }

  const selectedData = localStorage.getItem("selectedData");

  function updateTotal(index, amount) {
    const selectedMenus = JSON.parse(localStorage.getItem("selectedData"));
    selectedMenus[index].total += amount;
    localStorage.setItem("selectedData", JSON.stringify(selectedMenus));

    const orderTotals = document.querySelectorAll(".num");
    orderTotals[index].textContent = selectedMenus[index].total;

    updateSubtotalAndTotal();
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

    // Filter out items where total is 0
    selectedMenus = selectedMenus.filter((menu) => menu.total !== 0);

    const orderMenu = document.querySelector(".scroll");
    const cardMenu = document.createElement("div");

    cardMenu.innerHTML = selectedMenus
      .map((selectedMenus, index) => {
        const formattedPrice = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
          .format(selectedMenus.menuPrice)
          .replace(/,00$/, "");

        return `
      <div class="side-bar-order">
        <div class="order-menu">
          <img src=${selectedMenus.imgSrc} alt=${selectedMenus.menuName} />
          <div class="order-type">
            <h3>${selectedMenus.menuName}</h3>
            <div class="menu-price">
              <p>${formattedPrice}</p>
            </div>
            <div class="notes">
              <input type="text" placeholder="Catatan Khusus" />
            </div>
          </div>
          <div class="order-total">
          <p class="minus" onclick="removeItem(menuName)">-</p>
            <p class="num" data-menu-id="${selectedMenus.menuId}">${selectedMenus.total}</p>
            <p class="plus">+</p>
          </div>
        </div>
      </div>
      `;
      })
      .join("");

    // Check if there are items to display
    if (selectedMenus.length > 0) {
      orderMenu.appendChild(cardMenu);
    } else {
      orderMenu.style.display = "none";
    }

    // Attach event listeners to each order item
    // const minusButtons = orderMenu.querySelectorAll(".minus");
    const plusButtons = orderMenu.querySelectorAll(".plus");
    const orderTotals = orderMenu.querySelectorAll(".num");

    minusButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        if (selectedMenus[index].total > 1) {
          updateTotal(index, -1);
          selectedMenus[index].total--;
          orderTotals[index].textContent = selectedMenus[index].total;
          updateOrderSummary(selectedMenus);
          updateLocalStorage();
          // updateLocalStorage();
        } else {
          removeMenu(index);
          updateLocalStorage();
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

    plusButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        updateTotal(index, 1);
        selectedMenus[index].total++;
        orderTotals[index].textContent = selectedMenus[index].total;
        updateOrderSummary(selectedMenus);
        updateLocalStorage();
      });
    });

    function updateOrderSummary(selectedMenus) {
      localStorage.setItem("selectedData", JSON.stringify(selectedMenus));
    }

    function updateLocalStorage() {
      // Simpan selectedMenus ke local storage
      localStorage.setItem("selectedData", JSON.stringify(selectedMenus));
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
      }
    }
    updateSubtotalAndTotal();
    // function updateLocalStorage() {
    //   selectedMenu.total = total;
    //   localStorage.setItem("selectedData", JSON.stringify(selectedMenu));
    // }
    if (selectedData) {
      const totalMenus = localStorage.getItem("total");
      let selectedMenus = JSON.parse(selectedData) || [];
      console.log(selectedMenus);
      const price = selectedMenus.reduce(
        (acc, menu) => acc + menu.menuPrice * menu.total,
        0
      );
      const modal = document.querySelector(".modal-content");
      const deliveryFee = 7000; // Biaya antar

      // Iterate over the selectedMenu array and create HTML for each menu
      const menuHtml = selectedMenus
        .map(
          (menu) => `
        <div class="list-detail">
          <p class="menu-bill">${menu.menuName}</p>
          <hr />
          <p class="qty">${menu.total}</p>
          <hr />
          <p class="price">${formatCurrency(menu.menuPrice)}</p>
        </div>
        <hr />
  `
        )
        .join("");

      const formattedPrice = formatCurrency(price);
      const formattedDeliveryFee = formatCurrency(deliveryFee);
      const formattedTotal = formatCurrency(price + deliveryFee);

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
    }
    console.log(formattedTotal);

    document.getElementById("closeModalBtn").addEventListener("click", () => {
      document.getElementById("myModal").style.display = "none";
    });

    async function getTransactionId() {
      try {
        const response = await fetch(`${baseURL}/order/payment`);
        const transactions = await response.json();

        const modalPayment = document.querySelector(".modal-content2");
        modalPayment.innerHTML = `
    <div class="img-bill">
    <img src="assets/img/logo/Logo Hitam.png" alt="bill" />
    <hr />
  </div>
  <div class="payment-box">
    <div class="payment-box-left">
      <p>Total</p>
      <h4>${formattedTotal}</h4>
      <p>Order ID #${transactions.transaction_id}</p>
    </div>
    <div class="payment-box-right">
      <p>Customer</p>
      <h4>${transactions.first_name}</h4>
      <h4>${transactions.phone}</h4>
    </div>
  </div>
  <div class="gopay">
    <div class="gopay-title">
      <p>GoPay</p>
    </div>
    <div class="gopay-logo">
     <img src="./assets/img/modal/gopay.png" alt="">
    </div>
  </div>
  <div class="barcode-box">
    <img src="./assets/img/modal/barcode.webp" alt="" />
  </div>
  <div class="payment-btn">
    <button class="close-btn" id="finishBtn">Selesai</button>
  </div>
    `;
        console.log(transactions.first_name);
      } catch (error) {
        console.log("404");
      }
      document.getElementById("finishBtn").addEventListener("click", () => {
        document.getElementById("myModal2").style.display = "none";
        document.getElementById("myModal3").style.display = "flex";
      });
    }

    getTransactionId();

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
      localStorage.removeItem("selectedData");
      window.location.href = "index.html";
    });
  }
});
