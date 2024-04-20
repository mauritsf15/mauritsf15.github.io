const projectsDiv = document.querySelector('.projects');
const actionButton = document.querySelector('.mau-btn');

let scrolling = false;
let x = 0;
let intervalId;
let right = true;

function toggleScroll() {
    if (scrolling) {
        clearInterval(intervalId);
    } else {
        console.log('erm');
        intervalId = setInterval(scroll, 25);
    }   
}

function scroll() {
    if (right) {
        x++;
    } else {
        x--;
    }

    projectsDiv.scroll({
        top: 0,
        left: x,
        behavior: "instant",
    })
}

actionButton.addEventListener('click', toggleScroll);

if (window.location.hash == '#projects') {
    toggleScroll();
}

console.log(projectsDiv.offsetWidth);