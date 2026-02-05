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

// Close mobile menu when a link is clicked
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
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Form Submission with Better UX =====
quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'block';
    submitBtn.disabled = true;
    
    // Simulate sending (replace with actual form submission)
    setTimeout(() => {
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form and button
        this.reset();
        btnText.style.display = 'block';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
        
        // In production, you would send the data to a server:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
    }, 1500);
});

// Success message popup
function showSuccessMessage() {
    const popup = document.createElement('div');
    popup.className = 'success-popup';
    popup.innerHTML = `
        <div class="success-content">
            <div class="success-icon">✅</div>
            <h3>Thank You!</h3>
            <p>Your quote request has been received. We'll get back to you within 1 hour!</p>
            <button onclick="this.parentElement.parentElement.remove()">Got it!</button>
        </div>
    `;
    document.body.appendChild(popup);
    
    // Add styles dynamically
    popup.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
    `;
    
    popup.querySelector('.success-content').style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 12px;
        text-align: center;
        max-width: 400px;
        margin: 20px;
        animation: popIn 0.3s ease;
    `;
    
    popup.querySelector('.success-icon').style.cssText = `
        font-size: 4rem;
        margin-bottom: 15px;
    `;
    
    popup.querySelector('h3').style.cssText = `
        font-size: 1.5rem;
        margin-bottom: 10px;
        color: #1a1a2e;
    `;
    
    popup.querySelector('p').style.cssText = `
        color: #6c757d;
        margin-bottom: 20px;
    `;
    
    popup.querySelector('button').style.cssText = `
        background: linear-gradient(135deg, #0066cc 0%, #00a8e8 100%);
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        font-size: 1rem;
    `;
}

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        // Toggle current item
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
        baAfter.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        baHandle.style.left = `${percentage}%`;
    }
    
    baSlider.addEventListener('mousedown', (e) => {
        isDragging = true;
        updateSlider(e.clientX);
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            updateSlider(e.clientX);
        }
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    // Touch support
    baSlider.addEventListener('touchstart', (e) => {
        isDragging = true;
        updateSlider(e.touches[0].clientX);
    });
    
    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            updateSlider(e.touches[0].clientX);
        }
    });
    
    document.addEventListener('touchend', () => {
        isDragging = false;
    });
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

popupClose.addEventListener('click', () => {
    exitPopup.classList.remove('active');
});

// Close popup when clicking overlay
document.querySelector('.popup-overlay')?.addEventListener('click', () => {
    exitPopup.classList.remove('active');
});

function closePopup() {
    exitPopup.classList.remove('active');
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .review-card, .why-card, .contact-item, .problem-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animate-in class styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    @keyframes popIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(style);

// ===== Urgency Counter (Dynamic) =====
function updateUrgency() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const spotsLeft = Math.max(1, 5 - dayOfWeek); // Fewer spots as week progresses
    
    const urgencyHighlight = document.querySelector('.urgency-highlight');
    if (urgencyHighlight) {
        urgencyHighlight.textContent = `Only ${spotsLeft} spots left this week`;
    }
}
updateUrgency();

// ===== Scroll Progress Indicator (Optional Enhancement) =====
function createScrollProgress() {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #0066cc, #00a8e8);
        z-index: 10000;
        transition: width 0.1s;
    `;
    document.body.appendChild(progress);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progress.style.width = scrollPercent + '%';
    });
}
createScrollProgress();

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

// ===== Typing Effect for Hero (Optional) =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

console.log('JA Pressure Washing - High Converting Landing Page Loaded ✅');

// ===== Gallery Image Click (Lightbox placeholder) =====
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        // In production, you could implement a lightbox here
        console.log('Gallery image clicked:', img.src);
    });
});

// ===== Video Play Tracking =====
const video = document.querySelector('.video-container video');
if (video) {
    video.addEventListener('play', () => {
        console.log('Time lapse video started playing');
    });
    
    video.addEventListener('ended', () => {
        console.log('Time lapse video finished');
    });
}

// ===== Add loading animation delay for staggered effect =====
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.why-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});

// ===== Console welcome message =====
console.log('%cJA Pressure Washing', 'color: #0066cc; font-size: 24px; font-weight: bold;');
console.log('%cProfessional Pressure Washing Services', 'color: #666; font-size: 14px;');
