(() => {
    const gallery = document.querySelector('.projects');
    fetch('data/projects.json').then(response => {
        if (!response.ok) throw new Error('Projects unavailable');
        return response.json();
    }).then(projects => {
        gallery.replaceChildren();
        projects.forEach((project, index) => {
            const card = document.createElement('article');
            card.className = 'project';
            const visual = document.createElement('div');
            visual.className = 'project-visual';
            const image = document.createElement('img');
            image.className = 'project-image';
            image.src = `img/${project.image}`;
            image.alt = `Screenshot of ${project.title}`;
            image.loading = 'lazy';
            image.draggable = false;
            visual.append(image);
            const info = document.createElement('div');
            info.className = 'project-info';
            const copy = document.createElement('div');
            const title = document.createElement('h3');
            title.className = 'project-title';
            const number = document.createElement('span');
            number.className = 'project-number';
            number.textContent = String(index + 1).padStart(2, '0');
            title.append(number, project.title);
            const desc = document.createElement('p');
            desc.className = 'project-description';
            desc.textContent = project.desc;
            copy.append(title, desc);
            const link = document.createElement('a');
            link.className = 'project-link';
            link.href = project.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = project.title === 'AEHT App' ? 'View app ↗' : project.title === 'CV' ? 'View CV ↗' : 'Visit website ↗';
            link.setAttribute('aria-label', `${link.textContent.replace(' ↗', '')}: ${project.title} (opens in a new tab)`);
            info.append(copy, link);
            card.append(visual, info);
            gallery.append(card);
        });
        if (!projects.length) gallery.textContent = 'More projects coming soon. In the meantime, find me on GitHub.';
        gallery.setAttribute('aria-busy', 'false');
        gallery.dispatchEvent(new Event('projectsloaded'));
    }).catch(() => {
        gallery.textContent = 'Projects could not be loaded. Please refresh, or explore my work on GitHub.';
        gallery.setAttribute('aria-busy', 'false');
        gallery.dispatchEvent(new Event('projectsloaded'));
    });
})();
