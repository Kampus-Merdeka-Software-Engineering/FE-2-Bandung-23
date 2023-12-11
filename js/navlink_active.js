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

function updateBadge() {
  const selectedData = localStorage.getItem("selectedData");

  if (selectedData) {
    let selectedMenu = JSON.parse(selectedData);
    let totalJumlah = selectedMenu.reduce(
      (accumulator, selectedMenu) => accumulator + selectedMenu.total,
      0
    );

    const badgeElement = document.getElementById("badge");
    badgeElement.textContent = `${totalJumlah}`;
  }
}
updateBadge();
