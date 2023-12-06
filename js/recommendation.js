// CONNECT TO BACKEND SERVER
const API_URL = "https://be-2-bandung-23-production.up.railway.app";

async function getRecommendation() {
  try {
    const response = await fetch(`${API_URL}/recommendation`);
    const recommendations = await response.json();
    const menuRecommendation = document.getElementById("listRecommend");
    recommendations.forEach((recommendation) => {
      const newRecommendation = document.createElement("div");
      // Format the menu price as Indonesian Rupiah without commas and trailing zeros
      const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0, // Ensure at least one digit after the decimal point
        maximumFractionDigits: 2, // Limit to a maximum of two digits after the decimal point
      })
        .format(recommendation.menu_price)
        .replace(/,00$/, "");
      newRecommendation.innerHTML = `
      <div class="menu-img">
      <img src="${recommendation.image_url}" alt="" />
      </div>
      <div class="menu-detail">
        <h2>${recommendation.menu_name}</h2>
        <div class="rating">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star-half-stroke"></i>
          <p>(${recommendation.menu_rating})</p>
        </div>
        <h4>${formattedPrice}</h4>
        <p>
          ${recommendation.menu_description}
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
