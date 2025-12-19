document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.nav-toggle');
    const menu = document.getElementById('mobileMenu');

    function setOpen(isOpen) {
        btn.setAttribute('aria-expanded', String(isOpen));
        menu.hidden = !isOpen;
    }

    btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        setOpen(!isOpen);
    });

    // Schließen bei Klick außerhalb
    document.addEventListener('click', (e) => {
        if (menu.hidden) return;
        const clickInside = e.target.closest('#mobileMenu, .nav-toggle');
        if (!clickInside) setOpen(false);
    });

    // Schließen nach Klick auf einen Menülink
    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => setOpen(false));
    });

    // Tastatur: Escape schließt
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setOpen(false);
    });
});