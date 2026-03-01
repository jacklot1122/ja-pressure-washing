// ===== DOM Elements =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const quoteForm = document.getElementById('quoteForm');

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Menu Toggle =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// ===== Form Submission =====
if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        btnText.style.display = 'none';
        btnLoading.style.display = 'block';
        submitBtn.disabled = true;
    });
}

// ===== Form Real-Time Validation =====
document.querySelectorAll('.contact-form input[required], .contact-form select[required]').forEach(field => {
    field.addEventListener('blur', function() {
        if (this.value.trim() !== '' && this.checkValidity()) {
            this.classList.add('valid');
        } else {
            this.classList.remove('valid');
        }
    });
});

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        faqItems.forEach(otherItem => {
            if (otherItem !== item) otherItem.classList.remove('active');
        });
        item.classList.toggle('active');
    });
});

// ===== Before/After Slider =====
const baSlider = document.getElementById('baSlider1');
if (baSlider) {
    let isDragging = false;
    const baAfter = baSlider.querySelector('.ba-after');
    const baHandle = baSlider.querySelector('.ba-handle');

    function updateSlider(x) {
        const rect = baSlider.getBoundingClientRect();
        let percentage = ((x - rect.left) / rect.width) * 100;
        percentage = Math.max(0, Math.min(100, percentage));
        baAfter.style.clipPath = 'inset(0 ' + (100 - percentage) + '% 0 0)';
        baHandle.style.left = percentage + '%';
    }

    baSlider.addEventListener('mousedown', (e) => { isDragging = true; updateSlider(e.clientX); });
    document.addEventListener('mousemove', (e) => { if (isDragging) updateSlider(e.clientX); });
    document.addEventListener('mouseup', () => { isDragging = false; });
    baSlider.addEventListener('touchstart', (e) => { isDragging = true; updateSlider(e.touches[0].clientX); });
    document.addEventListener('touchmove', (e) => { if (isDragging) updateSlider(e.touches[0].clientX); });
    document.addEventListener('touchend', () => { isDragging = false; });
}

// ===== Exit Intent Popup =====
const exitPopup = document.getElementById('exitPopup');
const popupClose = document.getElementById('popupClose');
let popupShown = false;

document.addEventListener('mouseout', (e) => {
    if (!popupShown && e.clientY < 10 && e.relatedTarget === null) {
        exitPopup.classList.add('active');
        popupShown = true;
    }
});

if (popupClose) {
    popupClose.addEventListener('click', () => { exitPopup.classList.remove('active'); });
}

document.querySelector('.popup-overlay')?.addEventListener('click', () => {
    exitPopup.classList.remove('active');
});

function closePopup() {
    exitPopup.classList.remove('active');
}

// ===== Intersection Observer for Animations =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .why-card, .contact-item, .problem-card, .faq-item, .process-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

const style = document.createElement('style');
style.textContent = '.animate-in { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// ===== Animated Number Counters =====
const counters = document.querySelectorAll('.counter');
let countersStarted = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.floor(eased * (target - start) + start);
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }
        requestAnimationFrame(updateCounter);
    });
}

// Fire counters immediately since hero is visible on load,
// but also set up observer as fallback
function startCounters() {
    if (!countersStarted) {
        countersStarted = true;
        animateCounters();
    }
}

// Start after a short delay so the page has rendered
setTimeout(startCounters, 800);

// ===== Dynamic Urgency Month =====
const urgencyMonth = document.getElementById('urgencyMonth');
if (urgencyMonth) {
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    urgencyMonth.textContent = months[new Date().getMonth()];
}

// ===== Dynamic Urgency Spots =====
function updateUrgency() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const spotsLeft = Math.max(1, 5 - dayOfWeek);
    const spotsEl = document.getElementById('urgencySpots');
    if (spotsEl) spotsEl.textContent = spotsLeft;
}
updateUrgency();

// ===== Scroll Progress Indicator =====
(function createScrollProgress() {
    const progress = document.createElement('div');
    progress.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#0066cc,#00a8e8);z-index:10000;transition:width 0.1s;width:0';
    document.body.appendChild(progress);
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (scrollTop / docHeight) * 100 + '%';
    });
})();

// ===== Auto-hide urgency banner on scroll =====
const urgencyBanner = document.querySelector('.urgency-banner');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 200 && currentScroll > lastScroll) {
        urgencyBanner.style.transform = 'translateY(-100%)';
        navbar.style.top = '0';
    } else if (currentScroll < 100) {
        urgencyBanner.style.transform = 'translateY(0)';
        navbar.style.top = '45px';
    }
    lastScroll = currentScroll;
});

// ===== Staggered animation delays =====
document.querySelectorAll('.service-card').forEach((card, i) => { card.style.transitionDelay = (i * 0.1) + 's'; });
document.querySelectorAll('.why-card').forEach((card, i) => { card.style.transitionDelay = (i * 0.15) + 's'; });
document.querySelectorAll('.process-step').forEach((step, i) => { step.style.transitionDelay = (i * 0.2) + 's'; });

// ===== Video Play Tracking =====
const video = document.querySelector('.video-container video');
if (video) {
    video.addEventListener('play', () => { console.log('Video started'); });
    video.addEventListener('ended', () => { console.log('Video finished'); });
}

// ===== Testimonial Carousel =====
(function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dotsContainer = document.getElementById('carouselDots');
    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

    const cards = track.querySelectorAll('.review-card');
    let currentIndex = 0;
    let cardsPerView = 3;
    let autoPlayTimer;

    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 992) return 2;
        return 3;
    }

    function getTotalPages() {
        return Math.ceil(cards.length / cardsPerView);
    }

    function buildDots() {
        dotsContainer.innerHTML = '';
        const total = getTotalPages();
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('span');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToPage(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        const page = Math.floor(currentIndex / cardsPerView);
        dots.forEach((d, i) => d.classList.toggle('active', i === page));
    }

    function goToPage(page) {
        currentIndex = page * cardsPerView;
        if (currentIndex >= cards.length) currentIndex = 0;
        updatePosition();
        updateDots();
    }

    function updatePosition() {
        if (cards.length === 0) return;
        const cardWidth = cards[0].offsetWidth + 24;
        track.style.transform = 'translateX(-' + (currentIndex * cardWidth) + 'px)';
    }

    function next() {
        currentIndex += cardsPerView;
        if (currentIndex >= cards.length) currentIndex = 0;
        updatePosition();
        updateDots();
    }

    function prev() {
        currentIndex -= cardsPerView;
        if (currentIndex < 0) currentIndex = Math.max(0, cards.length - cardsPerView);
        updatePosition();
        updateDots();
    }

    function startAutoPlay() {
        autoPlayTimer = setInterval(next, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    prevBtn.addEventListener('click', () => { stopAutoPlay(); prev(); startAutoPlay(); });
    nextBtn.addEventListener('click', () => { stopAutoPlay(); next(); startAutoPlay(); });

    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);

    // Touch support for carousel
    let touchStartX = 0;
    let touchEndX = 0;
    track.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; stopAutoPlay(); }, {passive: true});
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) next();
        else if (touchEndX - touchStartX > 50) prev();
        startAutoPlay();
    }, {passive: true});

    function handleResize() {
        const newPerView = getCardsPerView();
        if (newPerView !== cardsPerView) {
            cardsPerView = newPerView;
            currentIndex = 0;
            buildDots();
            updatePosition();
        }
    }

    window.addEventListener('resize', handleResize);
    cardsPerView = getCardsPerView();
    buildDots();
    updatePosition();
    startAutoPlay();
})();

// ===== Gallery Lightbox =====
(function initLightbox() {
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const lightboxOverlay = lightbox ? lightbox.querySelector('.lightbox-overlay') : null;
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!lightbox || !lightboxImg || galleryItems.length === 0) return;

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.getAttribute('data-caption') || '';
            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
})();

// ===== Sticky CTA Bar =====
(function initStickyCta() {
    const stickyCta = document.getElementById('stickyCta');
    const contactSection = document.getElementById('contact');
    if (!stickyCta) return;

    let stickyVisible = false;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const contactTop = contactSection ? contactSection.offsetTop : Infinity;
        const shouldShow = scrollY > 600 && scrollY < contactTop - 200;

        if (shouldShow && !stickyVisible) {
            stickyCta.classList.add('visible');
            stickyVisible = true;
        } else if (!shouldShow && stickyVisible) {
            stickyCta.classList.remove('visible');
            stickyVisible = false;
        }
    });
})();

// ===== Dynamic Form Quote Count =====
(function updateQuoteCount() {
    const el = document.getElementById('quoteCountToday');
    if (!el) return;
    const hour = new Date().getHours();
    const count = Math.max(3, Math.min(12, Math.floor(hour * 0.5) + 3));
    el.textContent = count;
})();

console.log('%cJA Pressure Washing', 'color: #0066cc; font-size: 24px; font-weight: bold;');
console.log('%cProfessional Pressure Washing Services', 'color: #666; font-size: 14px;');
