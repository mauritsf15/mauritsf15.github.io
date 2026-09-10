(() => {
    let saved;
    try { saved = localStorage.getItem('theme'); } catch {}
    const initial = saved === 'light' || saved === 'l' ? 'light' : 'dark';
    document.documentElement.dataset.theme = initial;
    window.toggleTheme = () => {
        const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = next;
        try { localStorage.setItem('theme', next); } catch {}
        window.dispatchEvent(new Event('themechange'));
    };
})();
