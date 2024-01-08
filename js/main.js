// animation

const subtext = document.querySelector('.animation');
let subtextLength;

function prepare() {
    let localText = '';
    subtextLength = subtext.innerText.length;
    for (let i = 0; i < subtext.innerText.length; i++) {
        localText += `<span class="letter-${i} letter">${subtext.innerText.charAt(i)}</span>`;
    }
    subtext.innerHTML = localText;
}

function animate() {
    let rand = Math.round(Math.random()*200 + 55);
    let rand2 = Math.round(Math.random()*200 + 55);
    let rand3 = Math.round(Math.random()*200 + 55);
    let color = `rgb(${rand}, ${rand2}, ${rand3})`;
    for (i = 0; i < subtextLength; i++) {
        let letter = document.querySelector(`.letter-${i}`)
        setTimeout(function() {letter.style.color = color}, i * 100);
        setTimeout(function() {letter.style.color = 'inherit'}, i * 100 + 600);
    }
    setTimeout(animate, i*200 + 1000);
}

prepare();
setTimeout(animate, 1000);

// bootstrap tooltips

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// action button

const button = document.querySelector('.mau-btn');

function clickBtn() {
    if (button.attributes[0].nodeValue == '#projects') {
        button.attributes[0].nodeValue = '#';
        button.textContent = 'go back';
    } else {
        button.attributes[0].nodeValue = '#projects';
        button.textContent = 'about me';
    }
}

button.addEventListener('click', function() {setTimeout(clickBtn, 1)});

if (window.location.href.includes('projects')) {
    button.attributes[0].nodeValue = '#';
    button.textContent = 'go back';
}

// random theme

document.querySelector('html').attributes[1].nodeValue = Math.floor(Math.random() * 9) + 1;
console.log(document.querySelector('html').attributes[1].nodeValue);