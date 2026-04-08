/**
 * NIAGACHAT CYBER ENGINE - ULTIMATE JS
 * Terdiri dari: Visual Effects, State Management, & Integrasi API
 */

// ==========================================
// 1. UTILITIES & NOTIFICATION SYSTEM
// ==========================================
const throttle = (func, wait) => {
    let timeout;
    return function(...args) {
        if (!timeout) {
            func(...args);
            timeout = setTimeout(() => { timeout = null; }, wait);
        }
    };
};

const showNotification = (msg, type = 'success') => {
    const toast = document.createElement('div');
    const color = type === 'success' ? 'var(--neon-green)' : 'var(--neon-red)';
    toast.style.cssText = `
        position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(100px);
        padding: 15px 30px; background: var(--glass-bg); border: 1px solid ${color};
        color: ${color}; font-family: 'Rajdhani', sans-serif; font-size: 1.2rem; font-weight: bold;
        box-shadow: 0 0 15px ${color}; z-index: 10001; transition: 0.4s; text-transform: uppercase;
    `;
    toast.innerHTML = `> ${msg}`;
    document.body.appendChild(toast);

    setTimeout(() => toast.style.transform = 'translateX(-50%) translateY(0)', 10);
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
};

// ==========================================
// 2. VISUAL & CYBER EFFECTS
// ==========================================

// Kursor Gaming (Neon Ring & Dot)
const initCursor = () => {
    const ring = document.getElementById('cursorRing');
    const dot = document.getElementById('cursorDot');
    
    if(!ring || !dot) return;

    document.addEventListener('mousemove', (e) => {
        ring.style.left = e.clientX + 'px';
        ring.style.top = e.clientY + 'px';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, input, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
};

// Efek Ketik (Typewriter) di Hero Title
const initTypewriter = () => {
    const textEl = document.getElementById('typewriter');
    if(!textEl) return;

    const words = ["AUTOMASI", "CHATBOT", "INTEGRASI", "UMKM DIGITAL"];
    let i = 0, isDeleting = false, currentText = "";
    
    const type = () => {
        const fullWord = words[i];
        if(isDeleting) {
            currentText = fullWord.substring(0, currentText.length - 1);
        } else {
            currentText = fullWord.substring(0, currentText.length + 1);
        }
        
        textEl.innerHTML = currentText;
        let speed = isDeleting ? 50 : 150;
        
        if(!isDeleting && currentText === fullWord) {
            speed = 2000; // Jeda saat kata selesai
            isDeleting = true;
        } else if(isDeleting && currentText === "") {
            isDeleting = false;
            i = (i + 1) % words.length;
            speed = 500; // Jeda sebelum kata baru
        }
        setTimeout(type, speed);
    };
    type();
};

// Latar Belakang Partikel Matriks (Simbol +)
const initParticles = () => {
    const container = document.getElementById('particles-container');
    if(!container) return;

    for(let i=0; i<20; i++) {
        const cross = document.createElement('div');
        cross.className = 'floating-cross';
        cross.innerHTML = '+';
        cross.style.cssText = `
            top: ${Math.random() * 100}%; left: ${Math.random() * 100}%;
            font-size: ${Math.random() * 15 + 10}px; opacity: ${Math.random() * 0.3 + 0.1};
            transition: transform 10s linear;
        `;
        container.appendChild(cross);
        
        setInterval(() => {
            cross.style.transform = `translateY(${Math.random() * 100}px) translateX(${Math.random() * 50 - 25}px)`;
        }, 5000);
    }
};

// Efek Ripple (Riak Air) pada Tombol
const initRippleEffect = () => {
    document.querySelectorAll('.btn-cyber').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const ripple = document.createElement('span');
            
            ripple.style.cssText = `
                position: absolute; left: ${x}px; top: ${y}px;
                width: 2px; height: 2px; background: rgba(163, 255, 18, 0.6);
                border-radius: 50%; transform: translate(-50%, -50%);
                pointer-events: none; animation: animateRipple 0.6s linear;
            `;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Injeksi Keyframe Ripple jika belum ada
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `@keyframes animateRipple { 0% { width: 0; height: 0; opacity: 1; } 100% { width: 400px; height: 400px; opacity: 0; } }`;
        document.head.appendChild(style);
    }
};

// 3D Card Tilt Effect
const initCyberTilt = () => {
    document.querySelectorAll('.cyber-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(1000px) rotateX(${y * -10}deg) rotateY(${x * 10}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
};

// ==========================================
// 3. FUNCTIONAL LOGIC (Form, Login, Checkout)
// ==========================================

// Integrasi Form ke WhatsApp
const initWAForm = () => {
    const form = document.getElementById('waForm');
    if(!form) return;

    form.onsubmit = (e) => {
        e.preventDefault();
        const nama = document.getElementById('waName').value;
        const bisnis = document.getElementById('waBisnis').value;
        const pesan = document.getElementById('waMsg').value;
        
        // GANTI DENGAN NOMOR WA KAMU (Format: 628...)
        const noWA = "6281234567890"; 
        const textWA = `*TRANSMISI NIAGACHAT*%0A%0A*Nama:* ${nama}%0A*Bisnis:* ${bisnis}%0A*Pesan:* ${pesan}`;
        
        showNotification('Mengalihkan ke Saluran WhatsApp...', 'success');
        setTimeout(() => window.open(`https://wa.me/${noWA}?text=${textWA}`, '_blank'), 1000);
        e.target.reset();
    };
};

// Modal Login & Shortcuts
const initLoginModal = () => {
    const modal = document.getElementById('loginModal');
    const btn = document.getElementById('openLoginBtn');
    if(!modal || !btn) return;

    btn.onclick = (e) => { e.preventDefault(); modal.classList.add('active'); };
    
    document.getElementById('loginForm').onsubmit = (e) => { 
        e.preventDefault(); 
        showNotification('Otorisasi Diterima.', 'success'); 
        modal.classList.remove('active'); 
    };

    // Shortcut Keyboard (Alt + L untuk Login)
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key.toLowerCase() === 'l') btn.click();
    });
};

// Modal Checkout Dinamis
const initCheckout = () => {
    const modal = document.getElementById('checkoutModal');
    if(!modal) return;

    document.querySelectorAll('.btn-buy').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.cyber-card');
            const pkgName = card.querySelector('.pkg-name').innerText;
            // Membersihkan teks "/bln" agar yang tampil hanya harganya saja
            const pkgPrice = card.querySelector('.pkg-price').innerText.replace('/bln', '').trim();
            
            document.getElementById('checkoutPkgName').innerText = pkgName;
            document.getElementById('checkoutPkgPrice').innerText = pkgPrice;
            modal.classList.add('active');
        });
    });
};

// ==========================================
// 4. CORE UI (Scroll, Nav, Animations)
// ==========================================
const initCoreUI = () => {
    const progress = document.getElementById('progressBar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Scroll Events
    window.addEventListener('scroll', throttle(() => {
        const scrollY = window.scrollY;
        
        // Progress Bar
        if(progress) {
            progress.style.width = (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100 + "%";
        }

        // Active Menu Highlighting
        let current = '';
        sections.forEach(sec => {
            if(scrollY >= sec.offsetTop - 150) current = sec.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    }, 100));

    // Intersection Observer untuk animasi Fade In / Slide Up
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) { 
                entry.target.style.opacity = 1; 
                entry.target.style.transform = 'translateY(0)'; 
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.anim-scroll').forEach(el => observer.observe(el));
};

const initLiveMetrics = () => {
    const msgEl = document.getElementById('liveMessages');
    const userEl = document.getElementById('liveUsers');
    const marquee = document.getElementById('marquee-content');

    if(msgEl) {
        setInterval(() => {
            const currentMsg = parseInt(msgEl.innerText.replace(/\D/g, '')) || 0;
            const newTotal = currentMsg + (Math.floor(Math.random() * 15) + 1);
            const parts = newTotal.toLocaleString('id-ID').split('.');
            msgEl.innerHTML = parts.length > 1 ? `${parts[0]}.<span>${parts[1]}</span>` : `<span>${newTotal.toLocaleString('id-ID')}</span>`;
        }, 1500);
    }

    if(userEl) {
        setInterval(() => {
            const currentUser = parseInt(userEl.innerText.replace(/\D/g, '')) || 0;
            const parts = (currentUser + 1).toLocaleString('id-ID').split('.');
            userEl.innerHTML = parts.length > 1 ? `${parts[0]}.<span>${parts[1]}</span>` : `<span>${(currentUser + 1).toLocaleString('id-ID')}</span>`;
        }, 18000);
    }

    if(marquee) {
        marquee.innerHTML += marquee.innerHTML;
    }
};

const initROI = () => {
    const slider = document.getElementById('chatVolume');
    const chatVal = document.getElementById('chatVal');
    const roiVal = document.getElementById('roiVal');

    if(!slider || !chatVal || !roiVal) return;

    slider.addEventListener('input', (e) => {
        const msgs = e.target.value;
        chatVal.innerText = msgs;
        roiVal.innerText = (msgs * 1000 * 30).toLocaleString('id-ID');
    });
};

const initFAQ = () => {
    document.querySelectorAll('.faq-question').forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.parentElement;
            const answer = item.nextElementSibling;
            const icon = item.querySelector('.toggle-icon');

            document.querySelectorAll('.faq-item').forEach(child => {
                if(child !== parent) {
                    child.classList.remove('active');
                    const childAnswer = child.querySelector('.faq-answer');
                    if(childAnswer) {
                        childAnswer.style.maxHeight = null;
                    }
                    const childIcon = child.querySelector('.toggle-icon');
                    if(childIcon) childIcon.innerText = '+';
                }
            });

            parent.classList.toggle('active');
            if(parent.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.innerText = '-';
            } else {
                answer.style.maxHeight = null;
                icon.innerText = '+';
            }
        });
    });
};

const initChatbot = () => {
    const trigger = document.getElementById('chat-trigger');
    const widget = document.getElementById('chat-widget');
    const close = document.getElementById('close-chat');
    const form = document.getElementById('demo-chat-form');
    const input = document.getElementById('chat-input-text');
    const body = document.getElementById('chat-body');

    if(trigger && widget) {
        trigger.onclick = () => {
            widget.classList.add('open');
            trigger.style.transform = 'scale(0)';
        };
    }

    if(close && widget) {
        close.onclick = () => {
            widget.classList.remove('open');
            if(trigger) trigger.style.transform = 'scale(1)';
        };
    }

    if(form && input && body) {
        form.onsubmit = (e) => {
            e.preventDefault();
            if(!input.value.trim()) return;
            body.innerHTML += `<div class="msg user">${input.value}</div>`;
            input.value = '';
            body.scrollTop = body.scrollHeight;

            setTimeout(() => {
                const replies = ["Menarik!", "NiagaChat bisa melakukan itu.", "Sistem kami terintegrasi 24/7.", "Hubungi tim via form Transmisi Data ya!"];
                body.innerHTML += `<div class="msg bot">${replies[Math.floor(Math.random() * replies.length)]}</div>`;
                body.scrollTop = body.scrollHeight;
            }, 1000);
        };
    }
};

const initLoginRedirect = () => {
    document.querySelectorAll('#login-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = '/pages/login/index.html';
        });
    });
};

// ==========================================
// 5. MASTER INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Jalankan semua modul
    initCursor();
    initTypewriter();
    initParticles();
    initRippleEffect();
    initCyberTilt();
    initWAForm();
    initLoginModal();
    initCheckout();
    initCoreUI();
    initLiveMetrics();
    initROI();
    initFAQ();
    initChatbot();
    initLoginRedirect();

    // Pesan Terminal
    console.clear();
    console.log("%c TERMINAL ONLINE: NIAGACHAT CYBER ENGINE V4 ACTIVE ", "background: #a3ff12; color: #151720; font-weight: bold; font-size: 14px; padding: 5px;");
    console.log("%c> Shortcuts Available:", "color: #ced0da");
    console.log("%c  [Alt + L] : Buka Sistem Login", "color: #a3ff12");
});

js