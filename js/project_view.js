const params = new URLSearchParams(location.search);
const id = Number(params.get('id'));

async function loadProject() {
  const listRes = await fetch('../json/post/index.json');
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
  const box = document.getElementById('project_view');
  box.innerHTML = `
    <div class="prj">
      <p class="title">${post.title}</p>
      <img src="${post.img} class="img">
      <p class="ex">${post.content}</p>
    </div>
  `;
}

loadProject();
