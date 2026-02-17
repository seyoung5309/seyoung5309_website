async function loadPosts() {
  const listRes = await fetch('../post/index.json');
  const list = await listRes.json();

  const container = document.getElementById('post-list');

  for (const file of list) {
    const res = await fetch(`../post/${file}`);
    const post = await res.json();

    const el = document.createElement('article');
    el.innerHTML = `
      <div class="prj" tag-category=${post.category}>
        <div class="img"></div>
        <p class="text">${post.title}</p>
      </div>
    `;
    container.appendChild(el);
  }
}

loadPosts();