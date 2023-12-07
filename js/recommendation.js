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
      <img src="${recommendation.image_url}" alt="${recommendation.menu_name}" />
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
          <button class="pesan-btn"><h3>Pesan</h3></button>
        </div>
      </div>`;
      newRecommendation.classList.add("detail-menu");
      menuRecommendation.appendChild(newRecommendation);
      // Menambahkan event listener pada tombol "Pesan"
      const pesanButton = newRecommendation.querySelector(".pesan-btn");
      pesanButton.addEventListener("click", () =>
        saveToLocalStorage(recommendation)
      );
    });
  } catch (error) {
    console.log("404");
  }
}

// Fungsi untuk menyimpan data terpilih ke local storage
function saveToLocalStorage(selectedMenu) {
  const { image_url, menu_name, menu_price } = selectedMenu;
  const dataToSave = {
    imgSrc: image_url,
    menuName: menu_name,
    menuPrice: menu_price,
    total: 1, // Menambah properti quantity dan menginisialisasinya dengan 1
  };

  // Dapatkan data yang telah disimpan sebelumnya dari local storage
  const storedData = localStorage.getItem("selectedData");

  // Cek apakah data sudah tersimpan sebelumnya atau belum
  let selectedDataArray = [];

  if (storedData) {
    try {
      // Coba mengonversi data yang ada menjadi array
      selectedDataArray = JSON.parse(storedData);

      // Pastikan bahwa selectedDataArray adalah array
      if (!Array.isArray(selectedDataArray)) {
        selectedDataArray = [];
      }

      // Mencari apakah data yang sama sudah ada dalam array
      const existingDataIndex = selectedDataArray.findIndex(
        (item) => item.imgSrc === dataToSave.imgSrc
      );

      // Jika data yang sama sudah ada, tambahkan totalnya
      if (existingDataIndex !== -1) {
        selectedDataArray[existingDataIndex].total += 1;
      } else {
        // Jika data belum ada, tambahkan ke dalam array
        selectedDataArray.push(dataToSave);
      }
    } catch (error) {
      console.error("Error parsing stored data:", error);
    }
  } else {
    // Jika belum ada data, tambahkan data ke dalam array
    selectedDataArray.push(dataToSave);
  }

  // Simpan data ke local storage
  localStorage.setItem("selectedData", JSON.stringify(selectedDataArray));
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
