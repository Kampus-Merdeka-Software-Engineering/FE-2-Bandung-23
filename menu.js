document.addEventListener("DOMContentLoaded", function () {
  var links = document.querySelectorAll(".nav-link");

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      // Menghapus kelas 'active' dari semua link
      links.forEach(function (otherLink) {
        otherLink.classList.remove("active");
      });

      // Menambahkan kelas 'active' ke link yang sedang diklik
      link.classList.add("active");

      // Menghentikan tindakan bawaan dari link (jika ada)
    });
  });
});
