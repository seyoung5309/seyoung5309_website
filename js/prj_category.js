let currentCategory = null;

function tagItems(category) {
  const items = document.querySelectorAll(".prj");
  const tags = document.querySelectorAll(".tag .text");

  if (currentCategory === category) {
    currentCategory = null;

    tags.forEach((tag) => tag.classList.remove("active"));

    items.forEach((item) => {
      item.style.display = "block";
    });

    return;
  }

  currentCategory = category;

  tags.forEach((tag) => {
    tag.classList.remove("active");
    if (tag.textContent === category) {
      tag.classList.add("active");
    }
  });

  items.forEach((item) => {
    const itemCategory = item.getAttribute("tag-category");

    if (itemCategory === category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
