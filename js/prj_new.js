const PROJECT_LIST_PATH = "../json/post/index.json";

async function loadLatestProject() {
  const listRes = await fetch(PROJECT_LIST_PATH);
  const projectPaths = await listRes.json();

  const firstPath = projectPaths[0];
  const projectRes = await fetch(`../json/post/${firstPath.replace("./", "")}`);
  const project = await projectRes.json();

  const container = document.querySelector(".prj_main");
  container.innerHTML = `
    <div class="prj_card" onclick="goToProject(${project.id})">
      <img src="${project.img}" alt="${project.title}" style="width: 445px; height: 250.5px;" />
      <p class="text">${project.title}</p>
    </div>
  `;
}

function goToProject(id) {
  location.href = `project_view.html?id=${id}`;
}

loadLatestProject();
