// ===== Login Button Functionality =====
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            // Redirect to login page or show login modal
            console.log('Login button clicked');
            window.location.href = '/pages/login/index.html';
        });
    }

    // ===== Contact Form Handler =====
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            console.log('Form Data:', formData);
            
            // TODO: Send to backend
            alert('Terima kasih! Kami akan menghubungi Anda segera.');
            contactForm.reset();
        });
    }

    // ===== CTA Buttons Handler =====
    const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-large, .btn-pricing');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.toLowerCase().includes('daftar') || 
                this.textContent.toLowerCase().includes('mulai')) {
                e.preventDefault();
                alert('Akan mengarahkan ke halaman pendaftaran...');
                // window.location.href = '/register';
            }
        });
    });

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== Mobile Menu Toggle =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('open');
        });

        // Close menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('open');
            });
        });
    }

    // ===== Highlight Active Nav Link =====
    highlightActiveNavLink();
    window.addEventListener('scroll', highlightActiveNavLink);
});

function highlightActiveNavLink() {
    const currentLocation = location.pathname;
    const menuItems = document.querySelectorAll('.nav-link');
    
    menuItems.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href === '/' && currentLocation === '/') {
            link.classList.add('active');
        } else if (href !== '/' && currentLocation.includes(href)) {
            link.classList.add('active');
        }
    });
}

// ===== Scroll Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all feature cards, service cards, portfolio cards, etc.
document.querySelectorAll('.feature-card, .service-card, .portfolio-card, .team-member, .value-item').forEach(el => {
    observer.observe(el);
});

// ===== Utility Functions =====
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== Console Message =====
console.log('%cNiagaChat', 'font-size: 24px; font-weight: bold; color: #4CAF50;');
console.log('%cWelcome to NiagaChat Platform', 'font-size: 14px; color: #333;');
console.log('Version: 1.0.0');

