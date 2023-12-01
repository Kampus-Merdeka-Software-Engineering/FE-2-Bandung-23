// CONNECT TO BACKEND SERVER
const API_URL = "http://localhost:3000";

// Function Get Menu Default
async function getMenu() {
  try {
    const response = await fetch(`${API_URL}/menu`);
    const menus = await response.json();
    const listMenu = document.getElementById("listMenu");
    menus.forEach((menu) => {
      const newMenu = document.createElement("div");
      newMenu.innerHTML = `
      <img src="img/Sop Konro resize.jpg" alt="Rawon" />
      <div class="menu-detail">
        <div class="menu-name">
          <div class="menu-price">
            <h3>${menu.menu_name}</h3>
            <h4>Rp${menu.menu_price}</h4>
          </div>
          <div class="menu-rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
            <p>(${menu.menu_rating})</p>
          </div>
        </div>
        <div class="menu-description">
          <p>
            ${menu.menu_description}
          </p>
        </div>
        <div class="menu-btn">
          <a href="detail_order.html"
            ><button><h3>Pesan</h3></button></a
          >
        </div>
      </div>`;
      newMenu.classList.add("card-menu");
      listMenu.appendChild(newMenu);
    });
  } catch (error) {
    console.log("404");
  }
}

getMenu();


// Function Get Menu by Category
async function getMenuCategory() {
  try {
    const response = await fetch(`${API_URL}/menu/category/:type`);
    const menus = await response.json();
    const menuOffer = document.getElementById("listMenu");
    menus.forEach((menu) => {
      const newMenu = document.createElement("div");
      newMenu.innerHTML = `
      <img src="img/Sop Konro resize.jpg" alt="Rawon" />
      <div class="menu-detail">
        <div class="menu-name">
          <div class="menu-price">
            <h3>${menu.menu_name}</h3>
            <h4>Rp${menu.menu_price}</h4>
          </div>
          <div class="menu-rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
            <p>(4.9/5)</p>
          </div>
        </div>
        <div class="menu-description">
          <p>
            ${menu.menu_description}
          </p>
        </div>
        <div class="menu-btn">
          <a href="detail_order.html"
            ><button><h3>Pesan</h3></button></a
          >
        </div>
      </div>`;
      newMenu.classList.add('card-menu');
      menuOffer.appendChild(newMenu);
    });
  } catch (error) {
    console.log("404");
  }
}

getMenuCategory();

// END OF CONNECT TO BACKEND SERVER

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

// Function active link on Category
const listItems = document.querySelectorAll(".list-cat li");

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
// End of Function active link on Category

// Function hamburger button
const filterButtonElement = document.getElementById("filter");
const filterElement = document.getElementById("sideBar");

filterButtonElement.addEventListener("click", () => {
  filterButtonElement.classList.toggle("active");
  filterElement.classList.toggle("active");
});
// End of Function hamburger button
