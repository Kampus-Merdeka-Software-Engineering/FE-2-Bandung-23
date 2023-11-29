// CONNECT TO BACKEND SERVER
const API_URL =
  "http://localhost:3000";

async function getMenu() {
  try {
    const response = await fetch(`${API_URL}/menu`);
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
      newMenu.classList.add('card-menu');
      menuOffer.appendChild(newMenu);
    });
  } catch (error) {
    console.log('404');
  }
}

getMenu();





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