async function loadPosts() {
  const listRes = await fetch("../json/post/index.json");
  const list = await listRes.json();

  const container = document.getElementById("prj_s");

  for (const file of list) {
    const res = await fetch(`../json/post/${file}`);
    const post = await res.json();

    const el = document.createElement("article");
    el.innerHTML = `
      <div class="prj" tag-category="${post.category}">
        <div class="img">
          <img class="img" src="${post.img}">
        </div>
        <p class="text">${post.title}</p>
      </div>
    `;

    el.addEventListener("click", () => {
      location.href = `./project_view.html?id=${post.id}`;
    });

    container.appendChild(el);
  }
}

loadPosts();
