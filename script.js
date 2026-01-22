// ===================================
// NAVIGATION FUNCTIONALITY
// ===================================

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

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
// PROJECT CARDS TILT EFFECT
// ===================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

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
