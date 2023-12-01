// CONNECT TO BACKEND SERVER
const API_URL = "http://localhost:3000";

async function getRecommendation() {
  try {
    const response = await fetch(`${API_URL}/recommendation`);
    const recommendations = await response.json();
    const menuRecommendation = document.getElementById("listRecommend");
    recommendations.forEach((recommendation) => {
      const newRecommendation = document.createElement("div");
      newRecommendation.innerHTML = `
      <div class="menu-img">
      <img src="./img/Rawon.jpeg" alt="" />
      </div>
      <div class="menu-detail">
        <h2>${recommendation.menu_name}</h2>
        <div class="rating">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star-half-stroke"></i>
          <p>(${menu.menu_rating})</p>
        </div>
        <h4>Rp${recommendation.menu_price}</h4>
        <p>
          ${menu.menu_description}
        </p>
        <div class="menu-btn">
          <a href="detail_order.html"
            ><button><h3>Pesan</h3></button></a
          >
        </div>
      </div>`;
      newRecommendation.classList.add("detail-menu");
      menuRecommendation.appendChild(newRecommendation);
    });
  } catch (error) {
    console.log("404");
  }
}

getRecommendation();
// END OF CONNECT TO BACKEND SERVER/

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

// Function hamburger button
const hamburgerButtonElement = document.querySelector("#hamburger");
const drawerElement = document.querySelector(".nav-list");

hamburgerButtonElement.addEventListener("click", () => {
  hamburgerButtonElement.classList.toggle("active");
  drawerElement.classList.toggle("active");
});
// End of Function hamburger button
