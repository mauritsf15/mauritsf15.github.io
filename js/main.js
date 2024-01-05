// animation

const subtext = document.querySelector('h6');
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
        setTimeout(function() {letter.style.color = 'white'}, i * 100 + 400);
    }
    setTimeout(animate, i*200 + 1000);
}

prepare();
setTimeout(animate, 1000);

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
