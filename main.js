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

// Parallax Effect Removed

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

document.querySelectorAll('.section-title, .card, .about-content, .contact-box, .fade-in-section').forEach(el => {
    el.classList.add('fade-in-section');
    observer.observe(el);
});

// Testimonial Slider
const sliderTrack = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.slider-dots');

if (sliderTrack && slides.length > 0) {
    let currentSlide = 0;
    const slideCount = slides.length;

    // Calculate slides per view based on window width
    function getSlidesPerView() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    // Create dots (one per page, roughly)
    function createDots() {
        dotsContainer.innerHTML = '';
        const slidesPerView = getSlidesPerView();
        const totalPages = Math.ceil(slideCount / 1); // Simplify: just 1 dot per slide for now, or we can do pages. 
        // Let's keep it simple: 1 dot per slide, but we scroll by 1.

        slides.forEach((_, index) => {
            // Only show dots if we have enough slides to scroll? 
            // Actually, standard carousel: 1 dot per starting item is fine.
            // But if we show 3 at a time, we might not need to scroll to the last 2 individually if we want "pages".
            // Let's stick to scrolling 1 by 1 for smoothness.
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    createDots();
    const dots = document.querySelectorAll('.dot');

    function updateSlides() {
        const slidesPerView = getSlidesPerView();
        const slideWidth = 100 / slidesPerView;
        const gap = 2; // rem, roughly. But in % calculation, gap is handled by CSS flex-basis.
        // We just need to translate by (100% / slidesPerView + gap_adjustment) * currentSlide.
        // Actually, since we used flex-basis with calc(), we can just translate by (100% / slidesPerView) * currentSlide?
        // No, simpler: translate by (slideWidth + gap) is hard in %.
        // Let's just translate by (100 / slidesPerView)% * currentSlide.
        // The CSS flex-basis handles the sizing.

        // Wait, if we have gap: 2rem in CSS, percentage translation might be slightly off if not careful.
        // A safer way for responsive slider with gaps is to scroll by item width + gap.
        // Let's assume the track moves by (100 / slidesPerView) percent.

        // Actually, let's use the slide's offsetWidth if possible, or just stick to % and ignore minor gap issues or fix CSS.
        // CSS: gap: 2rem.
        // If we translate -100%, we move one full container width.
        // If we want to move one slide, we move -(100 / slidesPerView)%.
        // But the gap is inside the track.
        // Let's try a simple approach:

        // If we are at index 0: 0%
        // If we are at index 1: -(100 / slidesPerView)% ? 
        // If slidesPerView is 3, we move 33.33%.

        // Let's refine the CSS to use gap properly with % width.
        // In CSS I used: flex: 0 0 calc(33.333% - 1.33rem).
        // So the item takes 1/3 space minus gap.
        // So moving 33.333% should be correct including the gap if the gap is distributed?
        // Actually, gap is between items.
        // Let's just use a simpler calculation:
        // TranslateX = -(currentSlide * (100 / slidesPerView))%

        sliderTrack.style.transform = `translateX(-${currentSlide * (100 / slidesPerView)}%)`;

        // Update dots
        // Re-query dots in case we rebuilt them (we didn't here, but good practice)
        const currentDots = document.querySelectorAll('.dot');
        currentDots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function goToSlide(index) {
        // Boundary check
        const slidesPerView = getSlidesPerView();
        // We can't scroll past the end so that empty space shows?
        // Usually we stop when the last item is fully visible.
        // Max index = slideCount - slidesPerView
        // But for infinite loop feeling or simple carousel, we might just let it wrap or stop.
        // Let's wrap.

        if (index < 0) index = slideCount - slidesPerView; // Go to end
        if (index > slideCount - slidesPerView) index = 0; // Go to start

        // Wait, if we have 4 slides and show 3.
        // Index 0: 1,2,3
        // Index 1: 2,3,4
        // Index 2: 3,4, empty? -> We should stop at slideCount - slidesPerView.

        // Let's implement "Carousel" behavior where we just cycle back to 0 if we hit the end.
        // But if we have few slides, we might not want to scroll at all.

        if (slideCount <= slidesPerView) {
            currentSlide = 0;
            return;
        }

        // Wrap logic
        if (index > slideCount - slidesPerView) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slideCount - slidesPerView;
        } else {
            currentSlide = index;
        }

        updateSlides();
        resetTimer();
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    let slideTimer = setInterval(nextSlide, 5000);

    function resetTimer() {
        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, 5000);
    }

    // Handle resize
    window.addEventListener('resize', () => {
        createDots(); // Re-evaluate if needed, or just updateSlides
        updateSlides();
    });

    // Initialize
    updateSlides();
}

// Language Auto-detection
const userLang = navigator.language || navigator.userLanguage;
const currentPath = window.location.pathname;
const isPolish = userLang.startsWith('pl');

// Check if we are on the root path or index.html and user is Polish
// Avoid redirecting if user explicitly switched (we can use localStorage or just simple logic for now)
// Simple logic: if on index.html (or root) and Polish -> go to index-pl.html
// If on index-pl.html and NOT Polish -> stay (user might have clicked) - actually auto-detect is usually only on first visit.
// Let's use sessionStorage to prevent loop or annoying redirects.

if (!sessionStorage.getItem('langRedirected')) {
    const isPolishPage = currentPath.includes('/pl/');
    // Assume anything that isn't in /pl/ is the English version
    const isEnglishPage = !isPolishPage;

    if (isPolish && isEnglishPage) {
        sessionStorage.setItem('langRedirected', 'true');
        window.location.href = '/pl/index.html';
    }
}

// Handle manual switch to update session storage so we don't redirect back
document.querySelectorAll('.lang-link').forEach(link => {
    link.addEventListener('click', () => {
        sessionStorage.setItem('langRedirected', 'true');
    });
});
