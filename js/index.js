// CONNECT TO BACKEND SERVER
const API_URL = "https://be-2-bandung-23-production.up.railway.app";

// Function Get Menu Default
async function getOffer() {
  try {
    const response = await fetch(`${API_URL}/home/offer`);
    const menus = await response.json();
    const listOffer = document.getElementById("carousel");
    menus.forEach((menu) => {
      const newOffer = document.createElement("li");
      // Format the menu price as Indonesian Rupiah without commas and trailing zeros
      const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0, // Ensure at least one digit after the decimal point
        maximumFractionDigits: 2, // Limit to a maximum of two digits after the decimal point
      })
        .format(menu.menu_price)
        .replace(/,00$/, "");
      newOffer.innerHTML = `
      <div class="img">
        <img
          src="${menu.image_url}"
          alt="img"
          draggable="false"
        />
      </div>
      <h2>${menu.menu_name}</h2>
      <span>${formattedPrice}</span>`;
      newOffer.classList.add("card");
      listOffer.appendChild(newOffer);
    });
  } catch (error) {
    console.error(error);
  }
}

getOffer();

// Slideshow Jumbotron
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

//End of Slideshow Jumbotron

document.addEventListener("DOMContentLoaded", () => {
  // Carousel
  const wrapper = document.querySelector(".wrapper");
  let carouselCard = document.querySelector(".carousel");
  const firstCardWidth = carouselCard.querySelector(".card");
  const arrowBtns = document.querySelectorAll(".wrapper i");
  const carouselCardChildrens = [...carouselCard.children];
  let isDragging = false,
    isAutoPlay = true,
    startX,
    startScrollLeft,
    timeoutId;
  // Get the number of cards that can fit in the carouselCard at once
  let cardPerView = Math.round(carouselCard.offsetWidth / firstCardWidth);
  // Insert copies of the last few cards to beginning of carouselCard for infinite scrolling
  carouselCardChildrens
    .slice(-cardPerView)
    .reverse()
    .forEach((card) => {
      carouselCard.insertAdjacentHTML("afterbegin", card.outerHTML);
    });
  // Insert copies of the first few cards to end of carouselCard for infinite scrolling
  carouselCardChildrens.slice(0, cardPerView).forEach((card) => {
    carouselCard.insertAdjacentHTML("beforeend", card.outerHTML);
  });
  // Scroll the carouselCard at appropriate postition to hide first few duplicate cards on Firefox
  carouselCard.classList.add("no-transition");
  carouselCard.scrollLeft = carouselCard.offsetWidth;
  carouselCard.classList.remove("no-transition");
  // Add event listeners for the arrow buttons to scroll the carouselCard left and right
  arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      carouselCard.scrollLeft +=
        btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
  });
  const dragStart = (e) => {
    isDragging = true;
    carouselCard.classList.add("dragging");
    // Records the initial cursor and scroll position of the carouselCard
    startX = e.pageX;
    startScrollLeft = carouselCard.scrollLeft;
  };
  const dragging = (e) => {
    if (!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carouselCard based on the cursor movement
    carouselCard.scrollLeft = startScrollLeft - (e.pageX - startX);
  };
  const dragStop = () => {
    isDragging = false;
    carouselCard.classList.remove("dragging");
  };
  const infiniteScroll = () => {
    // If the carouselCard is at the beginning, scroll to the end
    if (carouselCard.scrollLeft === 0) {
      carouselCard.classList.add("no-transition");
      carouselCard.scrollLeft =
        carouselCard.scrollWidth - 2 * carouselCard.offsetWidth;
      carouselCard.classList.remove("no-transition");
    }
    // If the carouselCard is at the end, scroll to the beginning
    else if (
      Math.ceil(carouselCard.scrollLeft) ===
      carouselCard.scrollWidth - carouselCard.offsetWidth
    ) {
      carouselCard.classList.add("no-transition");
      carouselCard.scrollLeft = carouselCard.offsetWidth;
      carouselCard.classList.remove("no-transition");
    }
    // Clear existing timeout & start autoplay if mouse is not hovering over carouselCard
    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
  };
  const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carouselCard after every 2500 ms
    timeoutId = setTimeout(
      () => (carouselCard.scrollLeft += firstCardWidth),
      1000
    );
  };
  autoPlay();
  carouselCard.addEventListener("mousedown", dragStart);
  carouselCard.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  carouselCard.addEventListener("scroll", infiniteScroll);
  wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  wrapper.addEventListener("mouseleave", autoPlay);

  console.log(carouselCard);
  console.log(carouselChildrens);
  console.log(firstCardWidth);
  console.log(cardPerView);
  console.log(isDragging);
});
// const selectedData = localStorage.getItem("selectedData");
