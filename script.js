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
    'UI/UX Designer',
    'System Analyst',
    'Front End Developer',
    'Critical Thinker'
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
// PROJECTS CAROUSEL
// ===================================

class ProjectsCarousel {
    constructor() {
        this.track = document.querySelector('.carousel-track');
        this.cards = document.querySelectorAll('.project-card');
        this.prevBtn = document.querySelector('.carousel-btn-prev');
        this.nextBtn = document.querySelector('.carousel-btn-next');
        this.dotsContainer = document.querySelector('.carousel-dots');
        this.dots = [];

        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds

        if (this.track && this.cards.length > 0) {
            this.init();
        }
    }

    init() {
        // Generate dots dynamically
        this.createDots();

        // Set initial state
        this.updateCarousel();

        // Event listeners for buttons
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());

        // Note: Dots event listeners are added in createDots()

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        // Touch/swipe support
        this.addTouchSupport();

        // Recalculate on window resize for responsive positioning
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Ensure index is within new bounds if view changes
                const maxIndex = this.cards.length - this.getVisibleCardsCount();
                if (this.currentIndex > maxIndex) {
                    this.currentIndex = maxIndex;
                }
                this.updateCarousel();
            }, 100);
        });

        // Auto-play (optional - uncomment to enable)
        // this.startAutoPlay();

        // Pause auto-play on hover
        this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.track.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    createDots() {
        if (!this.dotsContainer) return;

        // Clear existing dots
        this.dotsContainer.innerHTML = '';

        // Create a dot for each card
        this.cards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('data-index', index);
            dot.setAttribute('aria-label', `Go to project ${index + 1}`);

            // Add click event listener
            dot.addEventListener('click', () => this.goToSlide(index));

            this.dotsContainer.appendChild(dot);
        });

        // Update dots reference
        this.dots = document.querySelectorAll('.carousel-dot');
    }

    getVisibleCardsCount() {
        if (window.innerWidth <= 1024) {
            return 1;
        }
        return 2;
    }

    updateCarousel() {
        // Calculate translation using actual card width for accurate positioning
        if (this.cards.length > 0) {
            const firstCard = this.cards[0];
            const cardWidth = firstCard.offsetWidth;
            const gap = 30; // Gap from CSS (30px)
            const offset = -(this.currentIndex * (cardWidth + gap));
            this.track.style.transform = `translateX(${offset}px)`;
        }

        // Update active card class (highlight visible cards)
        const visibleCount = this.getVisibleCardsCount();
        this.cards.forEach((card, index) => {
            if (index >= this.currentIndex && index < this.currentIndex + visibleCount) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Update dots
        // Note: Dots mapping logic works best for 1-to-1 or if we have dots per page.
        // For simplicity, we keep 1 dot per item but highlight the "starting" item's dot.
        this.dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update button states
        this.updateButtons();
    }

    updateButtons() {
        // Disable prev button at start
        if (this.currentIndex === 0) {
            this.prevBtn?.setAttribute('disabled', 'true');
        } else {
            this.prevBtn?.removeAttribute('disabled');
        }

        // Disable next button at end
        // End is reached when the last group of cards is fully visible
        const maxIndex = this.cards.length - this.getVisibleCardsCount();
        if (this.currentIndex >= maxIndex) {
            this.nextBtn?.setAttribute('disabled', 'true');
        } else {
            this.nextBtn?.removeAttribute('disabled');
        }
    }

    next() {
        const maxIndex = this.cards.length - this.getVisibleCardsCount();
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
        // Ensure we don't go out of bounds (past the last full group)
        const maxIndex = this.cards.length - this.getVisibleCardsCount();
        this.currentIndex = Math.min(index, maxIndex);
        this.updateCarousel();
    }

    addTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;

        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        this.track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - go to next
                    this.next();
                } else {
                    // Swipe right - go to prev
                    this.prev();
                }
            }
        };

        this.handleSwipe = handleSwipe;
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            const maxIndex = this.cards.length - this.getVisibleCardsCount();
            if (this.currentIndex < maxIndex) {
                this.next();
            } else {
                this.goToSlide(0); // Loop back to start
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
// CONSOLE MESSAGE
// ===================================

console.log('%c👋 Hello Developer!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cLooking at the code? I like your style! 😎', 'font-size: 14px; color: #764ba2;');
console.log('%cTry the Konami Code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', 'font-size: 12px; color: #f093fb;');