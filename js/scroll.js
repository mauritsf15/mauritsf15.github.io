(() => {
    const gallery = document.querySelector('.projects');
    const prev = document.querySelector('.gallery-prev');
    const next = document.querySelector('.gallery-next');
    const count = document.querySelector('.gallery-count');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cards = () => [...gallery.querySelectorAll('.project')];
    function currentIndex() {
        const items = cards();
        const inset = parseFloat(getComputedStyle(gallery).paddingLeft);
        const left = gallery.getBoundingClientRect().left + inset;
        let closest = 0;
        items.forEach((item, index) => {
            if (Math.abs(item.getBoundingClientRect().left - left) < Math.abs(items[closest].getBoundingClientRect().left - left)) closest = index;
        });
        return closest;
    }
    function update() {
        const total = cards().length;
        count.textContent = `${String(total ? currentIndex() + 1 : 0).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
        prev.disabled = !total || gallery.scrollLeft <= 2;
        next.disabled = !total || gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth - 2;
    }
    function move(direction) {
        const items = cards();
        const index = Math.max(0, Math.min(items.length - 1, currentIndex() + direction));
        if (!items[index]) return;
        const inset = parseFloat(getComputedStyle(gallery).paddingLeft);
        const target = gallery.scrollLeft + items[index].getBoundingClientRect().left - gallery.getBoundingClientRect().left - inset;
        gallery.scrollTo({left: target, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
    }
    prev.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    gallery.addEventListener('keydown', event => {
        if (event.target !== gallery) return;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
    });
    let drag = null;
    let didDrag = false;
    gallery.addEventListener('pointerdown', event => {
        if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('a,button')) return;
        drag = {x: event.clientX, left: gallery.scrollLeft};
        didDrag = false;
    });
    window.addEventListener('pointermove', event => {
        if (!drag) return;
        if (Math.abs(event.clientX - drag.x) > 5) {
            didDrag = true;
            gallery.classList.add('is-dragging');
            gallery.scrollLeft = drag.left - (event.clientX - drag.x);
        }
    });
    function endDrag() { drag = null; gallery.classList.remove('is-dragging'); }
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);
    window.addEventListener('blur', endDrag);
    gallery.addEventListener('click', event => { if (didDrag) { event.preventDefault(); didDrag = false; } });
    gallery.addEventListener('dragstart', event => event.preventDefault());
    gallery.addEventListener('scroll', update, {passive: true});
    gallery.addEventListener('projectsloaded', update);
    new ResizeObserver(update).observe(gallery);
    update();
})();
