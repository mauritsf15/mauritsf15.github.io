// theme

let theme = localStorage.getItem('theme');
let themeTriggered = localStorage.getItem('themeTriggered');

const number = Math.floor(Math.random() * 9) + 1;

if (theme === null || themeTriggered === null) {
    theme = 'd';
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches)
        theme = 'l';
    
    localStorage.setItem('theme', theme);
    localStorage.setItem('themeTriggered', 'true');
}

function setTheme(color) {
    theme = color;
    localStorage.setItem('theme', theme);
    document.querySelector('html').dataset.theme = theme + number;
}

function toggleTheme() {
    if (theme === 'd') {
        setTheme('l');
    } else {
        setTheme('d');
    }
}

setTheme(theme);