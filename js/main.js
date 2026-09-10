(() => {
    const explore = document.querySelector('.explore-button');
    function syncView() {
        const expanded = location.hash === '#projects';
        document.body.classList.toggle('is-exploring', expanded);
        explore.setAttribute('aria-expanded', String(expanded));
        explore.href = expanded ? '#' : '#projects';
        explore.querySelector('.explore-label').textContent = expanded ? 'Back to the intro' : 'A bit about me & my work';
        explore.querySelector('.button-arrow').textContent = expanded ? '↑' : '↓';
    }
    window.addEventListener('hashchange', syncView);
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
