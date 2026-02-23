const params = new URLSearchParams(location.search);
const id = Number(params.get("id"));

async function loadProject() {
  const listRes = await fetch("../json/post/index.json");
  const list = await listRes.json();

  for (const file of list) {
    const res = await fetch(`../json/post/${file}`);
    const post = await res.json();

    if (post.id === id) {
      render(post);
      break;
    }
  }
}

function render(post) {
  const box = document.getElementById("project_view");
  box.innerHTML = `
    <div class="prj">
      <div class="main">
        <p class="title">${post.title}</p>
        <p class="ca">${post.category}</p>
      </div>
      <p class="date">${post.date}</p>
      <img src="${post.img}" class="img">
      <p class="ex">${post.content}</p>
      <div class="sub">
        ${post.code}
      </div>
    </div>
    <hr>
  `;
}

loadProject();
