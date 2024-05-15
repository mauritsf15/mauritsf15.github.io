let isDown = false;
let startX;
let scrollLeft;

projectsDiv.addEventListener('mousedown', (e) => {
    isDown = true;
    projectsDiv.classList.add('mouse-down');

    startX = e.pageX - projectsDiv.offsetLeft;
    scrollLeft = projectsDiv.scrollLeft;
});

projectsDiv.addEventListener('mouseleave', () => {
    isDown = false;
    projectsDiv.classList.remove('mouse-down');
});

projectsDiv.addEventListener('mouseup', () => {
    isDown = false;
    projectsDiv.classList.remove('mouse-down');
});

projectsDiv.addEventListener('mousemove', (e) => {
    // Stop function from running if mouse is not down
    if (!isDown) return;
    
    e.preventDefault();

    const x = e.pageX - projectsDiv.offsetLeft;
    const walk = x - startX;
    
    projectsDiv.scrollLeft = scrollLeft - walk;
});