import './style.css'

console.log('Summit Strategy loaded');

// Mobile Menu
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');

        // Animate links
        const links = navLinks.querySelectorAll('a');
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `fadeUp 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
}

// Parallax Effect
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0005})`;
    }
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section-title, .card, .about-content, .contact-box').forEach(el => {
    el.classList.add('fade-in-section');
    observer.observe(el);
});
