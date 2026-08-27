// ===================================
// NAVIGATION FUNCTIONALITY
// ===================================

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (navbar && currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else if (navbar) {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-link');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        if (navLinks) navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
}

// Close mobile menu when clicking on a link
// Close mobile menu when clicking on a link
if (links.length > 0) {
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
}

// Active link on scroll
const sections = document.querySelectorAll('section');

const updateActiveLink = () => {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            links.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', updateActiveLink);

// ===================================
// THEME SWITCHER
// ===================================

const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference safely
let savedTheme = 'dark'; // Default
try {
    savedTheme = localStorage.getItem('theme') || 'dark';
} catch (e) {
    console.warn('LocalStorage access denied:', e);
}

const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

// Initial Theme Setup
// Only apply light theme if explicitly saved or system prefers it AND no save exists (optional, usually explicit save wins)
// Since our CSS defaults to dark, we only need to add class if it's light
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    updateThemeIcon('light');
}

// Toggle Theme
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        // Add animation class
        themeToggle.classList.add('animate');
        setTimeout(() => themeToggle.classList.remove('animate'), 500);

        // Toggle theme class
        body.classList.toggle('light-theme');

        // Determine current theme
        const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';

        // Update icon
        updateThemeIcon(currentTheme);

        // Save preference safely
        try {
            localStorage.setItem('theme', currentTheme);
        } catch (e) {
            console.warn('LocalStorage save failed:', e);
        }
    });
}

function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const svg = themeToggle.querySelector('svg');
    if (theme === 'light') {
        // In Light Mode, show Moon icon (action to switch to Dark)
        svg.innerHTML = `
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        `;
    } else {
        // In Dark Mode, show Sun icon (action to switch to Light)
        svg.innerHTML = `
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        `;
    }
}

// ===================================
// TYPING ANIMATION
// ===================================

const typedOutput = document.querySelector('.typed-output');
const phrases = [
    'System & Business Analyst',
    'UI/UX Researcher & Designer',
    'Data & BI Analyst',
    'Associate Product Manager',
    'Information Systems Graduate'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typePhrase() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typedOutput.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedOutput.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    // When phrase is complete
    if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
    }
    // When phrase is deleted
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before next phrase
    }

    setTimeout(typePhrase, typingSpeed);
}

// Start typing animation
setTimeout(typePhrase, 1000);

// ===================================
// SCROLL ANIMATIONS (Intersection Observer)
// ===================================

const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');

            // Animate skill bars when they come into view
            if (entry.target.classList.contains('skill-category')) {
                animateSkillBars(entry.target);
            }

            // Animate stat numbers when they come into view
            if (entry.target.classList.contains('stat-card')) {
                animateStatNumber(entry.target);
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all skill categories, project cards, and stat cards
document.querySelectorAll('.skill-category, .project-card, .stat-card, .contact-method').forEach(el => {
    observer.observe(el);
});

// ===================================
// SKILL BAR ANIMATIONS
// ===================================

function animateSkillBars(skillCategory) {
    const skillBars = skillCategory.querySelectorAll('.skill-progress');

    skillBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-progress');

        setTimeout(() => {
            bar.style.width = targetWidth + '%';
        }, index * 200);
    });
}

// ===================================
// STAT NUMBER COUNTER ANIMATION
// ===================================

function animateStatNumber(statCard) {
    const numberElement = statCard.querySelector('.stat-number');
    const target = parseInt(numberElement.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        numberElement.textContent = Math.floor(current) + '+';
    }, 16);
}

// ===================================
// FORM SUBMISSION
// ===================================

const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Simulate form submission
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';

        // Reset form
        contactForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);
});

// ===================================
// SMOOTH SCROLLING
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// PARALLAX EFFECT FOR HERO
// ===================================

const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroHeight = hero.offsetHeight;

    if (scrolled < heroHeight) {
        // Parallax effect for hero content
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / heroHeight);
    }
});

// ===================================
// FLOATING CARDS ANIMATION (Enhanced)
// ===================================

const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach((card, index) => {
    // Random delay for each card
    card.style.animationDelay = `${index * 0.5}s`;

    // Add hover effect
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-30px) scale(1.1)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===================================
// GRADIENT ORB MOUSE TRACKING
// ===================================

const orbs = document.querySelectorAll('.gradient-orb');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const xMove = (x - 0.5) * speed;
        const yMove = (y - 0.5) * speed;

        orb.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
});

// ===================================
// PROJECTS CAROUSEL WITH ROLE FILTER
// ===================================

class ProjectsCarousel {
    constructor() {
        this.track = document.querySelector('.carousel-track');
        this.allCards = Array.from(document.querySelectorAll('.project-card'));
        this.visibleCards = [...this.allCards];
        this.filterButtons = document.querySelectorAll('.project-filter-btn');
        this.prevBtn = document.querySelector('.carousel-btn-prev');
        this.nextBtn = document.querySelector('.carousel-btn-next');
        this.dotsContainer = document.querySelector('.carousel-dots');
        this.dots = [];

        this.currentIndex = 0;
        this.currentFilter = 'all';
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000;

        if (this.track && this.allCards.length > 0) {
            this.init();
        }
    }

    init() {
        // Initialize filter buttons
        this.setupFilters();

        // Generate initial dots
        this.createDots();

        // Set initial state
        this.updateCarousel();

        // Event listeners for prev/next buttons
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const projectsSection = document.getElementById('projects');
            if (!projectsSection) return;
            const rect = projectsSection.getBoundingClientRect();
            // Only react to keys if user is near projects section
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                if (e.key === 'ArrowLeft') this.prev();
                if (e.key === 'ArrowRight') this.next();
            }
        });

        // Touch/swipe support
        this.addTouchSupport();

        // Recalculate on window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const maxIndex = Math.max(0, this.visibleCards.length - this.getVisibleCardsCount());
                if (this.currentIndex > maxIndex) {
                    this.currentIndex = maxIndex;
                }
                this.updateCarousel();
            }, 100);
        });

        // Pause auto-play on hover
        this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.track.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    setupFilters() {
        if (!this.filterButtons || this.filterButtons.length === 0) return;

        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                if (filter === this.currentFilter) return;

                // Update active state on buttons
                this.filterButtons.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                this.applyFilter(filter);
            });
        });
    }

    applyFilter(filter) {
        this.currentFilter = filter;
        this.currentIndex = 0;

        // Filter cards
        this.visibleCards = this.allCards.filter(card => {
            const roles = card.getAttribute('data-roles') || '';
            const match = filter === 'all' || roles.split(' ').includes(filter);

            if (match) {
                card.classList.remove('is-hidden');
                card.classList.remove('filtered-in');
                // Trigger reflow for animation restart
                void card.offsetWidth;
                card.classList.add('filtered-in');
            } else {
                card.classList.add('is-hidden');
                card.classList.remove('filtered-in');
            }
            return match;
        });

        // Reset track position smoothly
        this.track.style.transform = 'translateX(0px)';

        // Recreate dots for filtered cards
        this.createDots();

        // Update carousel state
        this.updateCarousel();
    }

    createDots() {
        if (!this.dotsContainer) return;

        this.dotsContainer.innerHTML = '';

        if (this.visibleCards.length <= 1) {
            this.dots = [];
            return;
        }

        this.visibleCards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('data-index', index);
            dot.setAttribute('aria-label', `Go to project ${index + 1}`);

            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });

        this.dots = this.dotsContainer.querySelectorAll('.carousel-dot');
    }

    getVisibleCardsCount() {
        if (window.innerWidth <= 1024) {
            return 1;
        }
        return 2;
    }

    updateCarousel() {
        if (this.visibleCards.length === 0) return;

        const visibleCount = this.getVisibleCardsCount();
        const maxIndex = Math.max(0, this.visibleCards.length - visibleCount);

        if (this.currentIndex > maxIndex) {
            this.currentIndex = maxIndex;
        }

        // Calculate translation using first visible card's offsetWidth
        const firstCard = this.visibleCards[0];
        if (firstCard) {
            const cardWidth = firstCard.offsetWidth;
            const gap = 30;
            const offset = -(this.currentIndex * (cardWidth + gap));
            this.track.style.transform = `translateX(${offset}px)`;
        }

        // Update active class on visible cards
        this.allCards.forEach(card => card.classList.remove('active'));
        this.visibleCards.forEach((card, index) => {
            if (index >= this.currentIndex && index < this.currentIndex + visibleCount) {
                card.classList.add('active');
            }
        });

        // Update dots
        this.dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update button disabled states
        this.updateButtons();
    }

    updateButtons() {
        const visibleCount = this.getVisibleCardsCount();
        const maxIndex = Math.max(0, this.visibleCards.length - visibleCount);

        // If all items fit within current view, disable both navigation buttons
        if (this.visibleCards.length <= visibleCount) {
            this.prevBtn?.setAttribute('disabled', 'true');
            this.nextBtn?.setAttribute('disabled', 'true');
            return;
        }

        if (this.currentIndex === 0) {
            this.prevBtn?.setAttribute('disabled', 'true');
        } else {
            this.prevBtn?.removeAttribute('disabled');
        }

        if (this.currentIndex >= maxIndex) {
            this.nextBtn?.setAttribute('disabled', 'true');
        } else {
            this.nextBtn?.removeAttribute('disabled');
        }
    }

    next() {
        const maxIndex = Math.max(0, this.visibleCards.length - this.getVisibleCardsCount());
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }

    goToSlide(index) {
        const maxIndex = Math.max(0, this.visibleCards.length - this.getVisibleCardsCount());
        this.currentIndex = Math.min(Math.max(0, index), maxIndex);
        this.updateCarousel();
    }

    addTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;

        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        }, { passive: true });
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            const maxIndex = Math.max(0, this.visibleCards.length - this.getVisibleCardsCount());
            if (maxIndex > 0) {
                if (this.currentIndex < maxIndex) {
                    this.next();
                } else {
                    this.goToSlide(0);
                }
            }
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize carousel
const projectsCarousel = new ProjectsCarousel();

// ===================================
// LOADING ANIMATION
// ===================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';

    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// EASTER EGG: Konami Code
// ===================================

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        // Easter egg activated!
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Add rainbow animation to all gradient elements
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        .gradient-orb, .skill-progress, .btn-primary, .category-icon {
            animation: rainbow 2s linear infinite !important;
        }
    `;
    document.head.appendChild(style);

    // Show message
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 30px 50px;
        border-radius: 20px;
        font-size: 24px;
        font-weight: bold;
        z-index: 10000;
        animation: scaleIn 0.5s ease;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    `;
    message.textContent = '🎉 You found the secret! 🎉';
    document.body.appendChild(message);

    setTimeout(() => {
        message.style.animation = 'scaleIn 0.5s ease reverse';
        setTimeout(() => message.remove(), 500);
    }, 3000);
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(updateActiveLink, 50));

// ===================================
// CERTIFICATE PREVIEW MODAL LOGIC
// ===================================

const certCards = document.querySelectorAll('.credential-card');
const certModal = document.getElementById('certModal');
const certCloseBtn = document.querySelector('.cert-modal-close');
const certOverlay = document.querySelector('.cert-modal-overlay');
const certModalImg = document.querySelector('.cert-modal-img');
const certModalLink = document.querySelector('.cert-modal-footer a');

if (certCards.length > 0 && certModal) {
    certCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const certImgSrc = card.getAttribute('data-cert-img');
            const certLinkHref = card.getAttribute('href');
            const certAlt = card.getAttribute('data-cert-title') || 'Certificate Preview';

            if (certImgSrc && certModalImg) {
                certModalImg.src = certImgSrc;
                certModalImg.alt = certAlt;
            }
            if (certLinkHref && certModalLink) {
                certModalLink.href = certLinkHref;
            }

            certModal.classList.add('active');
            document.body.classList.add('no-scroll');
        });
    });

    // Close modal function
    const closeModal = () => {
        certModal.classList.remove('active');
        document.body.classList.remove('no-scroll');
    };

    certCloseBtn?.addEventListener('click', closeModal);
    certOverlay?.addEventListener('click', closeModal);

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certModal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c👋 Hello Developer!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cLooking at the code? I like your style! 😎', 'font-size: 14px; color: #764ba2;');
console.log('%cTry the Konami Code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', 'font-size: 12px; color: #f093fb;');