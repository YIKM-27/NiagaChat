// ===== Smooth & Cutting-Edge Interactive Script =====

// ===== Utility Functions =====
const throttle = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// ===== Button Ripple Effect =====
const initRippleEffect = () => {
    const buttons = document.querySelectorAll('.cta-button, .cta-button-large, .btn-pricing, .btn-submit, .social-link, #login-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: ripple-animation 0.6s ease-out;
            `;

            if (!button.style.position || button.style.position === 'static') {
                button.style.position = 'relative';
            }
            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
};

// ===== Smooth Hover Lift Effect =====
const initHoverLift = () => {
    const liftElements = document.querySelectorAll('.feature-card, .service-card, .portfolio-card, .team-member, .value-item, .pricing-card, .testimonial-card, .stat-card, .info-card, .step');
    
    liftElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            el.style.transform = `perspective(1000px) rotateX(${y * 5}deg) rotateY(${x * 5}deg)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
};

// ===== Login Button Functionality =====
const initLoginButton = () => {
    const loginBtn = document.getElementById('login-btn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 150);
            
            console.log('🚀 Login button clicked');
            showNotification('Redirecting to login...', 'info');
            // window.location.href = '/login';
        });
    }
};

// ===== Contact Form Handler with Validation =====
const initContactForm = () => {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const inputs = contactForm.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
            input.style.transform = 'scale(1.02)';
        });

        input.addEventListener('blur', () => {
            input.style.transform = 'scale(1)';
        });

        input.addEventListener('input', () => {
            if (input.value.trim()) {
                input.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.3)';
            } else {
                input.style.boxShadow = '';
            }
        });
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        if (validateForm(formData)) {
            showNotification('✓ Terima kasih! Kami akan menghubungi Anda segera.', 'success');
            this.reset();
            inputs.forEach(input => input.style.boxShadow = '');
        }
    });
};

const validateForm = (data) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;

    if (!data.name) {
        showNotification('Nama harus diisi', 'error');
        return false;
    }
    if (!emailRegex.test(data.email)) {
        showNotification('Email tidak valid', 'error');
        return false;
    }
    if (data.phone && !phoneRegex.test(data.phone)) {
        showNotification('Nomor telepon tidak valid', 'error');
        return false;
    }
    if (!data.message) {
        showNotification('Pesan harus diisi', 'error');
        return false;
    }
    return true;
};

// ===== Notification System =====
const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1.2rem 1.8rem;
        background: ${type === 'success' ? 'linear-gradient(135deg, rgba(0, 217, 255, 0.15), rgba(0, 217, 255, 0.05))' : 'linear-gradient(135deg, rgba(255, 0, 110, 0.15), rgba(255, 0, 110, 0.05))'};
        border: 1px solid ${type === 'success' ? 'rgba(0, 217, 255, 0.4)' : 'rgba(255, 0, 110, 0.4)'};
        color: ${type === 'success' ? '#00D9FF' : '#FF6B9D'};
        border-radius: 8px;
        z-index: 10000;
        backdrop-filter: blur(5px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        animation: slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
};

// ===== CTA Buttons Handler =====
const initCTAButtons = () => {
    const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-large, .btn-pricing');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
            
            if (this.textContent.toLowerCase().includes('daftar') || 
                this.textContent.toLowerCase().includes('mulai')) {
                e.preventDefault();
                showNotification('Akan mengarahkan ke halaman pendaftaran...', 'info');
                // window.location.href = '/register';
            }
        });
    });
};

// ===== Smooth Scroll for Anchor Links with Offset =====
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Add active state
                this.classList.add('active');
                document.querySelectorAll('a[href^="#"]').forEach(a => {
                    if (a !== this) a.classList.remove('active');
                });
            }
        });
    });
};

// ===== Mobile Menu Toggle with Smooth Animation =====
const initMobileMenu = () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('open');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('open');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('open');
        }
    });
};

// ===== Highlight Active Nav Link with Smooth Updates =====
const highlightActiveNavLink = () => {
    const sections = document.querySelectorAll('section');
    const menuItems = document.querySelectorAll('.nav-link');
    
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + currentSection) {
            item.classList.add('active');
        }
    });
};

// ===== Intersection Observer for Staggered Animations =====
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`;
                entry.target.style.animationDelay = `${index * 0.1}s`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and elements
    document.querySelectorAll(`.feature-card, .service-card, .portfolio-card, .team-member, 
        .value-item, .pricing-card, .testimonial-card, .stat-card, .info-card, .step, 
        .use-case, .stat-item`).forEach(el => {
        observer.observe(el);
    });
};

// ===== Smooth Scroll Progress Indicator =====
const initScrollProgress = () => {
    const progress = document.createElement('div');
    progress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #00D9FF, #B500FF, #FF006E);
        z-index: 10001;
        box-shadow: 0 2px 10px rgba(0, 217, 255, 0.5);
    `;
    document.body.appendChild(progress);

    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (scrollTop / docHeight) * 100;
        progress.style.width = scrolled + '%';
    }, 16));
};

// ===== Keyboard Shortcuts =====
const initKeyboardShortcuts = () => {
    document.addEventListener('keydown', (e) => {
        // Alt + L: Go to Login
        if (e.altKey && e.key === 'l') {
            const loginBtn = document.getElementById('login-btn');
            if (loginBtn) loginBtn.click();
        }
        // Alt + T: Go to top
        if (e.altKey && e.key === 't') {
            scrollToTop();
        }
    });
};

// ===== Parallax Scroll Effect =====
const initParallax = () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', throttle(() => {
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-parallax') || 0.5;
            const yPos = window.scrollY * speed;
            el.style.transform = `translateY(${yPos}px)`;
        });
    }, 16));
};

// ===== Number Counter Animation =====
const animateNumbers = () => {
    const numberElements = document.querySelectorAll('.stat-number, .stat-num, .price');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.animated) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                
                if (!isNaN(finalValue)) {
                    let currentValue = 0;
                    const increment = Math.ceil(finalValue / 30);
                    
                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= finalValue) {
                            target.textContent = finalValue;
                            clearInterval(counter);
                        } else {
                            target.textContent = currentValue;
                        }
                    }, 30);
                    
                    target.animated = true;
                }
            }
        });
    }, { threshold: 0.5 });

    numberElements.forEach(el => counterObserver.observe(el));
};

// ===== Form Focus States =====
const initFormInteractions = () => {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        if (!input) return;

        input.addEventListener('focus', () => {
            group.style.transform = 'scale(1.01)';
        });

        input.addEventListener('blur', () => {
            group.style.transform = 'scale(1)';
        });
    });
};

// ===== Scroll to Top Button =====
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

const initScrollToTop = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #00D9FF, #B500FF);
        color: #0a0e27;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        z-index: 9999;
        font-size: 24px;
        font-weight: 700;
        transition: all 0.3s ease;
        opacity: 0;
        pointer-events: none;
        box-shadow: 0 0 20px rgba(0, 217, 255, 0.3);
    `;

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.pointerEvents = 'auto';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.pointerEvents = 'none';
        }
    }, 100));

    scrollBtn.addEventListener('click', scrollToTop);
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'scale(1.2)';
        scrollBtn.style.boxShadow = '0 0 40px rgba(0, 217, 255, 0.8)';
    });
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'scale(1)';
        scrollBtn.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.3)';
    });
};

// ===== Enhanced Console Message =====
const initConsoleMessage = () => {
    console.clear();
    console.log('%c🚀 NiagaChat', 'font-size: 32px; font-weight: bold; background: linear-gradient(135deg, #00D9FF, #B500FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;');
    console.log('%cWelcome to NiagaChat Platform', 'font-size: 16px; color: #00D9FF; font-weight: bold;');
    console.log('%cVersion 2.0.0 - Cutting Edge & Smooth', 'font-size: 12px; color: #B500FF;');
    console.log('%c✨ Enhanced with smooth interactions, parallax effects, and cutting-edge animations', 'font-size: 11px; color: #FF006E;');
    console.log('%cKeyboard Shortcuts:\n• Alt + L: Login\n• Alt + T: Scroll to Top', 'font-size: 11px; color: #00D9FF; padding: 10px;');
};

// ===== Initialize Everything on DOM Ready =====
document.addEventListener('DOMContentLoaded', function() {
    // Core Functionality
    initLoginButton();
    initContactForm();
    initCTAButtons();
    initSmoothScroll();
    initMobileMenu();
    highlightActiveNavLink();
    
    // Visual Effects & Animations
    initRippleEffect();
    initHoverLift();
    initScrollAnimations();
    animateNumbers();
    initFormInteractions();
    initScrollToTop();
    initScrollProgress();
    
    // Advanced Features
    initParallax();
    initKeyboardShortcuts();
    initConsoleMessage();
    
    // Scroll event listeners
    window.addEventListener('scroll', throttle(() => {
        highlightActiveNavLink();
    }, 100));
    
    // Add CSS animations to head if not already present
    if (!document.querySelector('style[data-anim]')) {
        const animStyle = document.createElement('style');
        animStyle.setAttribute('data-anim', 'true');
        animStyle.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideOutRight {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-40px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            input:focus, textarea:focus, select:focus {
                outline: none !important;
            }
            
            .hamburger span {
                display: block;
                transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
            }
        `;
        document.head.appendChild(animStyle);
    }
    
    console.log('✅ All interactive features initialized!');
});