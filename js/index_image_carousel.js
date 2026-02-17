
function createSlideHTML(item) {
  return `
    <div class="slide">
      <div class="award_item_p">
        <img class="img_icon" src="${item.img}" alt="${item.alt}" />
        <div class="award_text">
          <p class="text">${item.name}</p>
          <p>${item.category}</p>
        </div>
      </div>
    </div>
  `;
}

async function loadSlides(containerId, jsonPath) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error(`JSON 로드 실패: ${jsonPath}`);
    const items = await response.json();

    container.innerHTML = items.map(createSlideHTML).join("");
  } catch (error) {
    console.error(error);
  }
}

function initCarousel(containerSelector, direction = "left") {
  const slides = document.querySelector(containerSelector);
  if (!slides) return;

  let slideItems = Array.from(slides.querySelectorAll(".slide"));

  const slideWidth = slideItems[0].offsetWidth + 50;

  for (let i = 0; i < slideItems.length; i++) {
    const clone = slideItems[i].cloneNode(true);
    slides.appendChild(clone);
  }

  let index = 0;
  let currentPosition = 0;
  let accumulatedMove = 0;

  const moveSpeed = direction === "left" ? 1 : -1;

  setInterval(() => {
    accumulatedMove += Math.abs(moveSpeed);
    currentPosition -= moveSpeed;

    slides.style.transition = "none";
    slides.style.transform = `translateX(${currentPosition}px)`;

    if (accumulatedMove >= slideWidth) {
      if (direction === "left") {
        slides.removeChild(slides.firstElementChild);
        index++;
        const nextSlideIndex = index % slideItems.length;
        const clone = slideItems[nextSlideIndex].cloneNode(true);
        slides.appendChild(clone);
        currentPosition += slideWidth;
      } else {
        slides.removeChild(slides.lastElementChild);
        index--;
        if (index < 0) index = slideItems.length - 1;
        const clone = slideItems[index].cloneNode(true);
        slides.insertBefore(clone, slides.firstElementChild);
        currentPosition -= slideWidth;
      }

      slides.style.transform = `translateX(${currentPosition}px)`;
      accumulatedMove = 0;
    }
  }, 16);
}

// JSON 로드 후 캐러셀 초기화
document.addEventListener("DOMContentLoaded", async () => {
  await loadSlides("slides1", "../json/tech_stack_1.json");
  await loadSlides("slides2", "../json/tech_stack_2.json");

  initCarousel("#slides1", "left");
  initCarousel("#slides2", "right");
});