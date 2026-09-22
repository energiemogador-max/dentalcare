// DentalCare Morocco
(() => {
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Header border once the page is scrolled
    const header = $('[data-header]');
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Mobile menu
    const toggle = $('.menu-toggle');
    const nav = $('#site-nav');
    const setMenu = (open) => {
        nav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
    };

    toggle.addEventListener('click', () => {
        setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', (e) => {
        if (e.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
            setMenu(false);
            toggle.focus();
        }
    });

    window.matchMedia('(min-width: 1261px)').addEventListener('change', (e) => {
        if (e.matches) setMenu(false);
    });

    // Current section in the navigation
    const navLinks = $$('.site-nav ul a');
    const linkById = new Map(navLinks.map((a) => [a.getAttribute('href').slice(1), a]));

    if ('IntersectionObserver' in window) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navLinks.forEach((a) => a.removeAttribute('aria-current'));
                const link = linkById.get(entry.target.id);
                if (link) link.setAttribute('aria-current', 'true');
            });
        }, { rootMargin: '-45% 0px -50% 0px' });

        linkById.forEach((_, id) => {
            const section = document.getElementById(id);
            if (section) spy.observe(section);
        });
    }

    // Journey: the line fills once, when the section comes into view
    const journey = $('[data-journey]');
    if (journey) {
        if (reduceMotion || !('IntersectionObserver' in window)) {
            journey.classList.add('is-visible');
        } else {
            const reveal = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    journey.classList.add('is-visible');
                    reveal.disconnect();
                }
            }, { threshold: 0.3 });
            reveal.observe(journey);
        }
    }

    // Treatment and package buttons pre-fill the request form
    const form = $('#plan-form');
    if (form) {
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-treatment], [data-package]');
            if (!trigger) return;
            if (trigger.dataset.treatment) form.elements.treatment.value = trigger.dataset.treatment;
            if (trigger.dataset.package) form.elements.package.value = trigger.dataset.package;
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const status = $('.form-status', form);
            const button = $('button[type="submit"]', form);

            if (form.getAttribute('action').includes('LAUNCH-FORM-ID')) {
                status.dataset.state = 'error';
                status.textContent = 'This form is not connected yet. Replace LAUNCH-FORM-ID in the form action in index.html.';
                return;
            }

            button.disabled = true;
            status.dataset.state = '';
            status.textContent = window.DC ? window.DC.t('f.sending') : 'Sending...';

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { Accept: 'application/json' }
                });
                if (!response.ok) throw new Error('Request failed');
                form.reset();
                status.dataset.state = 'success';
                status.textContent = window.DC ? window.DC.t('f.success') : 'Thank you. We will reply with the next steps.';
            } catch (err) {
                status.dataset.state = 'error';
                status.textContent = window.DC ? window.DC.t('f.error') : 'The request did not go through. Please try again.';
            } finally {
                button.disabled = false;
            }
        });
    }

    // Footer year
    const year = $('#year');
    if (year) year.textContent = new Date().getFullYear();
})();
