(() => {
    const explore = document.querySelector('.explore-button');
    const portfolio = document.querySelector('.portfolio');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let transitionFrame;
    function scrollPage(target, done = () => {}) {
        cancelAnimationFrame(transitionFrame);
        const start = window.scrollY;
        const distance = target - start;
        if (reducedMotion.matches) { window.scrollTo(0, target); done(); return; }
        const started = performance.now();
        function frame(now) {
            const progress = Math.min(1, (now - started) / 650);
            const eased = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
            window.scrollTo(0, start + distance * eased);
            if (progress < 1) transitionFrame = requestAnimationFrame(frame);
            else done();
        }
        transitionFrame = requestAnimationFrame(frame);
    }
    function syncView(animate = false) {
        cancelAnimationFrame(transitionFrame);
        const expanded = location.hash === '#projects';
        explore.setAttribute('aria-expanded', String(expanded));
        explore.href = expanded ? '#' : '#projects';
        explore.querySelector('.explore-label').textContent = expanded ? 'Back to the intro' : 'About & projects';
        explore.querySelector('.button-arrow').textContent = expanded ? '↑' : '↓';
        if (expanded) {
            document.body.classList.add('is-exploring');
            if (animate) scrollPage(portfolio.getBoundingClientRect().top + window.scrollY - 24);
        } else if (animate) {
            scrollPage(0, () => document.body.classList.remove('is-exploring'));
        } else document.body.classList.remove('is-exploring');
    }
    document.querySelectorAll('a[href="#"], a[href="#projects"]').forEach(link => {
        link.addEventListener('click', event => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            history.pushState(null, '', link.getAttribute('href'));
            syncView(true);
        });
    });
    window.addEventListener('popstate', () => syncView(true));
    window.addEventListener('hashchange', () => syncView());
    for (const event of ['wheel', 'touchstart', 'pointerdown']) {
        window.addEventListener(event, () => cancelAnimationFrame(transitionFrame), {passive: true});
    }
    syncView();
    const today = new Date();
    const beforeBirthday = today.getMonth() < 6 || (today.getMonth() === 6 && today.getDate() < 5);
    document.querySelector('#age').textContent = today.getFullYear() - 2004 - Number(beforeBirthday);
    const themeButton = document.querySelector('.theme-toggle');
    function syncTheme() {
        const dark = document.documentElement.dataset.theme === 'dark';
        themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
        themeButton.querySelector('.theme-label').textContent = dark ? 'Light mode' : 'Dark mode';
        document.querySelector('meta[name="theme-color"]').content = dark ? '#171817' : '#f4f3ed';
    }
    themeButton.addEventListener('click', window.toggleTheme);
    window.addEventListener('themechange', syncTheme);
    syncTheme();
    let statusTimer;
    document.querySelector('.discord').addEventListener('click', async () => {
        const status = document.querySelector('#copy-status');
        clearTimeout(statusTimer);
        try { await navigator.clipboard.writeText('mauf55'); status.textContent = 'Copied @mauf55'; }
        catch { status.textContent = 'Discord: @mauf55'; }
        statusTimer = setTimeout(() => { status.textContent = ''; }, 5000);
    });
})();
