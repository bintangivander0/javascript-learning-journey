const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const closeBtn = document.querySelector("#close-btn");

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Menghilangkan "-thumbnail" pada ujung URL tiap foto
    const fullSizeSrc = item.src.replace("-thumbnail", "");
    console.log(fullSizeSrc);
    lightboxImage.src = fullSizeSrc;
    lightbox.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});
lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});
