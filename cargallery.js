// Collect all gallery images
const galleryThumbs = Array.from(document.querySelectorAll(".gallery-thumb"));
const displayedImage = document.getElementById("displayed-image");

// Store all image srcs for slider
const imageSrcs = galleryThumbs.map((img) => img.src);

// Hover to preview
let lastDisplayedSrc = displayedImage.src;
galleryThumbs.forEach((img) => {
  img.addEventListener("mouseenter", () => {
    displayedImage.src = img.src;
  });
  img.addEventListener("mouseleave", () => {
    displayedImage.src = lastDisplayedSrc;
  });
  img.addEventListener("click", () => {
    openModal(img.src);
  });
});

displayedImage.addEventListener("mouseenter", () => {
  lastDisplayedSrc = displayedImage.src;
});

displayedImage.addEventListener("mouseleave", () => {
  lastDisplayedSrc = displayedImage.src;
});

// Modal logic
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-image");
const closeModalBtn = document.getElementById("close-modal");
const prevBtn = document.getElementById("prev-image");
const nextBtn = document.getElementById("next-image");
let currentIndex = 0;

function openModal(src) {
  currentIndex = imageSrcs.indexOf(src);
  if (currentIndex === -1) currentIndex = 0;
  modalImg.src = imageSrcs[currentIndex];
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
  // Slide in modal content
  const panel = document.getElementById("modal-content-panel");
  panel.classList.remove("translate-x-full");
  panel.classList.add("translate-x-0");
}

function closeModal() {
  // Slide out modal content
  const panel = document.getElementById("modal-content-panel");
  panel.classList.remove("translate-x-0");
  panel.classList.add("translate-x-full");
  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }, 300); // match transition duration
}

function showImage(index) {
  if (index < 0) index = imageSrcs.length - 1;
  if (index >= imageSrcs.length) index = 0;
  currentIndex = index;
  modalImg.src = imageSrcs[currentIndex];
}

closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showImage(currentIndex - 1);
});
nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showImage(currentIndex + 1);
});

document.addEventListener("keydown", (e) => {
  if (modal.style.display === "flex") {
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
    if (e.key === "Escape") closeModal();
  }
});
