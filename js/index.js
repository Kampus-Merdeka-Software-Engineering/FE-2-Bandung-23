var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slide");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";

  setTimeout(function () {
    plusSlides(1);
  }, 4000);
}

//End of Slideshow

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];
let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;
// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });
// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");
// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});
const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};
const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};
const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};
const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};
const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 3000);
};
autoPlay();
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

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
const hamburgerButtonElement = document.querySelector("#hamburger");
const drawerElement = document.querySelector(".nav-list");

hamburgerButtonElement.addEventListener("click", () => {
  hamburgerButtonElement.classList.toggle("active");
  drawerElement.classList.toggle("active");
});
// End of Function hamburger button

// Function hamburger button
const filterButtonElement = document.querySelector("#filter");
const filterElement = document.querySelector(".side-bar");

filterButtonElement.addEventListener("click", () => {
  filterButtonElement.classList.toggle("active");
  filterElement.classList.toggle("active");
});
// End of Function hamburger button

document.querySelectorAll(".order-total").forEach(function (element) {
  var minusButton = element.querySelectorAll(".minus");
  var plusButton = element.querySelectorAll(".plus");
  var jumlahElement = element.querySelectorAll(".num");
  var jumlah = parseInt(jumlahElement.innerText);

  minusButton.addEventListener("click", function () {
    if (jumlah > 0) {
      jumlah--;
      updateNilai();
    }
  });

  plusButton.addEventListener("click", function () {
    if (jumlah < 9) {
      jumlah++;
      updateNilai();
    }
  });

  function updateNilai() {
    jumlahElement.innerText = jumlah;
  }
});

// Objek utilitas untuk fungsi statis
var TeleponUtil = {
  formatNomorTelepon: function (nomorTeleponElement) {
    var nomorTelepon = nomorTeleponElement.value;

    // Hapus karakter selain angka
    nomorTelepon = nomorTelepon.replace(/\D/g, "");

    // Batasi panjang nomor telepon menjadi maksimal 13 karakter
    nomorTelepon = nomorTelepon.slice(0, 13);

    // Tambahkan kode negara jika belum ada
    if (!nomorTelepon.startsWith("62")) {
      nomorTelepon = "62" + nomorTelepon;
    }

    // Update nilai pada elemen input
    nomorTeleponElement.value = "+" + nomorTelepon;
  },
};

var nomorTeleponElement = document.getElementById("nomorTelepon");

// Event listener untuk setiap perubahan pada input
nomorTeleponElement.addEventListener("input", function () {
  TeleponUtil.formatNomorTelepon(nomorTeleponElement);
});

// Format ulang saat halaman dimuat (opsional)
TeleponUtil.formatNomorTelepon(nomorTeleponElement);

// Modal
var konfirmasiBtn = document.getElementById("konfirmasiBtn");
var tutupBtn = document.getElementById("tutupBtn");
var modal = document.getElementById("modal");

konfirmasiBtn.addEventListener("click", function () {
  tampilkanModal();
});

tutupBtn.addEventListener("click", function () {
  tutupModal();
});

function tampilkanModal() {
  modal.style.display = "flex";
}

function tutupModal() {
  modal.style.display = "none";
  // Arahkan ke halaman index.html
  window.location.href = "index.html";
}

// CONNECT TO BACKEND SERVER
const API_URL =
  "https://kampus-merdeka-software-engineering.github.io/FE-2-Bandung-23/";

async function getMenu() {
  try {
    const response = await fetch(`${API_URL}/offer`);
    const menus = await response.json();
    const menuOffer = document.getElementsByClassName("card-offer");
    menus.forEach((menu) => {
      const newMenu = document.createElement("p");
      newMenu.textContent = `${menu.menu_name}`;
      menuOffer.appendChild(newMenu);
    });
  } catch (error) {
    console.log(menus);
  }
}

getMenu();
