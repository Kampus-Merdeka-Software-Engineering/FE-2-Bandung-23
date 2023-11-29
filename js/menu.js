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


// // CONNECT TO BACKEND SERVER
// const API_URL =
//   "http://localhost:3000";

// async function getMenu() {
//   try {
//     const response = await fetch(`${API_URL}/home/offer`);
//     const menus = await response.json();
//     const menuOffer = document.getElementById("listMenu");
//     menus.forEach((menu) => {
//       const newMenu = document.createElement("p");
//       newMenu.textContent = `${menu.menu_name}`;
//       menuOffer.appendChild(newMenu);
//     });
//   } catch (error) {
//     console.log(getMenu);
//   }
// }

// getMenu();