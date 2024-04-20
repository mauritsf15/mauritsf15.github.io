const projectsDiv = document.querySelector('.projects');
const actionButton = document.querySelector('.mau-btn');

let scrolling = false;
let intervalId;
let right = true;
let x = 0;

function toggleScroll() {
    if (scrolling) {
        scrolling = false;
        clearInterval(intervalId);
    } else {
        scrolling = true;
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
        left: x + 1,
        behavior: "instant",
    })
}

actionButton.addEventListener('click', toggleScroll);

if (window.location.hash == '#projects') {
    toggleScroll();
}

projectsDiv.addEventListener('click', console.log('test'));