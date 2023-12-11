// CONNECT TO BACKEND SERVER
const API_URL = "https://be-2-bandung-23-production.up.railway.app";

// Variable untuk menyimpan data menu asli
let originalMenus = [];

// Function Get Menu Default
async function getMenu() {
  try {
    const response = await fetch(`${API_URL}/menu`);
    const menus = await response.json();
    originalMenus = menus; // Simpan data menu asli
    const listMenu = document.getElementById("listMenu");
    // Ambil 8 data secara acak
    const randomMenus = getRandomMenus(menus, 8);

    randomMenus.forEach((menu) => {
      const newMenu = createMenuElement(menu);
      listMenu.appendChild(newMenu);
    });
  } catch (error) {
    console.error("Error fetching menu:", error);
  }
}

// Fungsi untuk mengambil data secara acak
function getRandomMenus(menus, limit) {
  const shuffledMenus = menus.sort(() => 0.5 - Math.random());
  return shuffledMenus.slice(0, limit);
}

// Fungsi untuk membuat elemen menu
function createMenuElement(menu) {
  const newMenu = document.createElement("div");
  // Format the menu price as Indonesian Rupiah without commas and trailing zeros
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // Ensure at least one digit after the decimal point
    maximumFractionDigits: 2, // Limit to a maximum of two digits after the decimal point
  })
    .format(menu.menu_price)
    .replace(/,00$/, "");
  newMenu.innerHTML = `
    <img src="${menu.image_url}" alt="${menu.menu_name}" />
    <div class="menu-detail">
      <div class="menu-name">
        <div class="menu-price">
          <h3>${menu.menu_name}</h3>
          <h4>${formattedPrice}</h4>
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
        <p>${menu.menu_description}</p>
      </div>
    </div>
    <div class="menu-btn">
      
        <button class="pesan-btn"><h3>Pesan</h3></button>
      
    </div>`;
  newMenu.classList.add("card-menu");

  // Menambahkan event listener pada tombol "Pesan"
  const pesanButton = newMenu.querySelector(".pesan-btn");
  pesanButton.addEventListener("click", () => saveToLocalStorage(menu));

  return newMenu;
}

// Fungsi untuk menyimpan data terpilih ke local storage
function saveToLocalStorage(selectedMenu) {
  const { menu_id, image_url, menu_name, menu_price } = selectedMenu;
  const dataToSave = {
    menuId: menu_id,
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
  updateBadge();
}

// Fungsi pencarian menu
function searchMenu() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredMenus = originalMenus.filter((menu) =>
    menu.menu_name.toLowerCase().includes(searchInput)
  );

  // Hapus semua menu yang ada
  const listMenu = document.getElementById("listMenu");
  listMenu.innerHTML = "";

  if (filteredMenus.length === 0) {
    // Tampilkan alert jika tidak ada hasil pencarian
    const createAlert = document.createElement("div");
    createAlert.innerHTML = `<p>Menu tidak ditemukan</p>`;
    createAlert.classList.add("alert");
    listMenu.appendChild(createAlert);
  } else {
    // Tampilkan hasil pencarian
    filteredMenus.forEach((menu) => {
      const newMenu = createMenuElement(menu);
      listMenu.appendChild(newMenu);
    });
  }
}

// Event listener untuk button pencarian
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", searchMenu);

// Event listener untuk input pencarian (Enter)
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchMenu();
  }
});

getMenu();

// Get menu by type
async function getMenuTypes() {
  const listCat = document.getElementById("listCat");
  const listMenu = document.getElementById("listMenu");

  listCat.addEventListener("click", async function (e) {
    if (e.target && e.target.nodeName === "LI") {
      let type = e.target.getAttribute("value");
      await fetchMenuData(type);
    }
  });

  async function fetchMenuData(type) {
    // Remove previously displayed data
    listMenu.innerHTML = "";

    try {
      const response = await fetch(`${API_URL}/menu/${type}`);
      const data = await response.json();

      console.log("Received data:", data);

      // Check for the existence of data
      if (Array.isArray(data) && data.length > 0) {
        // Log all properties present in the data
        console.log("Properties in received data:", Object.keys(data[0]));

        // Check for specific properties you need
        data.forEach((menu) => {
          const newMenu = createMenuElement(menu);
          listMenu.appendChild(newMenu);
        });
      } else {
        console.error("Invalid data received. Data is empty or not an array.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

getMenuTypes();

// Function active link on Category
const listItems = document.querySelectorAll(".list-cat li");

// Menambahkan event listener pada setiap elemen <li>
listItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    // Menghapus class "active" dari semua elemen <li>
    listItems.forEach((li) => {
      li.classList.remove("active");
    });

    // Menambah class "active" pada elemen yang diklik
    item.classList.add("active");
  });
});
// End of Function active link on Category
