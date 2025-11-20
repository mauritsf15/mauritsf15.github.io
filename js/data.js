fetch('data/projects.json')
    .then(data => data.json())
    .then(jsonData => loadProjects(jsonData));

function loadProjects(jsonData) {
    for (let i = 0; i < jsonData.length; i++) {
        const project = jsonData[i];
        const isLast = i === jsonData.length - 1;

        projectsDiv.innerHTML +=
        `
        <div class="project ${isLast ? 'last-project' : ''}">
            <img class="project-image" src="/img/${project.image}" alt="Screenshot of ${project.title}" unselectable="on">
            <div class="description ${project.background}">
                <h5>${project.title}</h5>
                <p>${project.desc}</p>
            </div>
            <a class="mau-btn-secondary" href="${project.url}" target="_blank">open website</a>
        </div>
        `;
    }
}