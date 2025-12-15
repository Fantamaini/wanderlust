// ==========================================
// Navigation & Mobile Menu
// ==========================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll Effect pour la navigation
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Toggle menu mobile
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Navigation active et fermeture du menu mobile
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Retirer la classe active de tous les liens
        navLinks.forEach(l => l.classList.remove('active'));
        // Ajouter la classe active au lien cliqué
        link.classList.add('active');
        
        // Fermer le menu mobile
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Scroll vers la section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Détection de la section active au scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// Search Functionality
// ==========================================
const searchBtn = document.getElementById('searchBtn');
const searchContainer = document.getElementById('searchContainer');

searchBtn.addEventListener('click', () => {
    searchContainer.scrollIntoView({ behavior: 'smooth' });
});

// ==========================================
// Destination Cards - Favorite Toggle
// ==========================================
const favoriteButtons = document.querySelectorAll('.favorite');

favoriteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const svg = button.querySelector('svg');
        
        if (svg.getAttribute('fill') === 'currentColor') {
            svg.setAttribute('fill', 'none');
            showNotification('Retiré des favoris', 'info');
        } else {
            svg.setAttribute('fill', 'currentColor');
            showNotification('Ajouté aux favoris ❤️', 'success');
        }
    });
});

// ==========================================
// Destination Cards - Click to View Details
// ==========================================
const destinationCards = document.querySelectorAll('.destination-card');

destinationCards.forEach(card => {
    const button = card.querySelector('.btn-destination');
    button.addEventListener('click', () => {
        const destinationName = card.querySelector('.destination-name').textContent;
        showNotification(`Découvrez ${destinationName} bientôt !`, 'info');
    });
});

// ==========================================
// Testimonials Slider
// ==========================================
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;

function showSlide(index) {
    // Assurer que l'index est dans les limites
    if (index >= testimonialCards.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = testimonialCards.length - 1;
    } else {
        currentSlide = index;
    }
    
    // Retirer la classe active de toutes les cartes et dots
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Ajouter la classe active à la carte et dot actuels
    testimonialCards[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Navigation par boutons
nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

// Navigation par dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto-play du slider (optionnel)
let autoPlayInterval = setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Pause auto-play au survol
const testimonialsSlider = document.getElementById('testimonialsSlider');
testimonialsSlider.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

testimonialsSlider.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
});

// ==========================================
// Newsletter Form
// ==========================================
const newsletterForm = document.getElementById('newsletterForm');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    // Simulation d'envoi
    showNotification(`Merci ! ${email} a été ajouté à notre liste.`, 'success');
    newsletterForm.reset();
});

// ==========================================
// Contact Form
// ==========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupération des valeurs
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const phone = contactForm.querySelector('input[type="tel"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Validation basique
    if (!name || !email || !message) {
        showNotification('Veuillez remplir tous les champs obligatoires', 'error');
        return;
    }
    
    // Simulation d'envoi
    showNotification('Message envoyé avec succès ! Nous vous contacterons bientôt.', 'success');
    contactForm.reset();
});

// ==========================================
// Offers - Booking
// ==========================================
const offerButtons = document.querySelectorAll('.offers .btn-primary');

offerButtons.forEach(button => {
    button.addEventListener('click', () => {
        const offerCard = button.closest('.offer-card');
        const offerTitle = offerCard.querySelector('h3').textContent;
        showNotification(`Réservation pour ${offerTitle} en cours...`, 'info');
    });
});

// ==========================================
// Back to Top Button
// ==========================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// Scroll Animations
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments pour les animations
const animatedElements = document.querySelectorAll('.destination-card, .experience-card, .offer-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==========================================
// Notification System
// ==========================================
function showNotification(message, type = 'info') {
    // Supprimer toute notification existante
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        background: type === 'success' ? '#2c5f4a' : type === 'error' ? '#e74c3c' : '#3498db',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease',
        fontWeight: '500',
        maxWidth: '350px'
    });
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Retirer après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Animations CSS pour les notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// Search Form Handling
// ==========================================
const searchBar = document.querySelector('.search-bar');
const searchSubmitBtn = document.querySelector('.btn-search-submit');

searchSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const destination = searchBar.querySelector('input[type="text"]').value;
    const depart = searchBar.querySelector('input[type="date"]:nth-of-type(1)').value;
    const retour = searchBar.querySelector('input[type="date"]:nth-of-type(2)').value;
    const voyageurs = searchBar.querySelector('select').value;
    
    if (!destination || !depart || !retour) {
        showNotification('Veuillez remplir tous les champs de recherche', 'error');
        return;
    }
    
    // Validation des dates
    const departDate = new Date(depart);
    const retourDate = new Date(retour);
    
    if (retourDate <= departDate) {
        showNotification('La date de retour doit être après la date de départ', 'error');
        return;
    }
    
    showNotification(`Recherche de voyages pour ${destination}... ${voyageurs}`, 'success');
});

// ==========================================
// Hero CTA Buttons
// ==========================================
const heroCTAs = document.querySelectorAll('.hero-cta button');

heroCTAs.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('btn-secondary')) {
            showNotification('Fonctionnalité vidéo bientôt disponible !', 'info');
        } else {
            document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==========================================
// Parallax Effect for Hero
// ==========================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero-content');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ==========================================
// Dynamic Date Restrictions
// ==========================================
const dateInputs = document.querySelectorAll('input[type="date"]');
const today = new Date().toISOString().split('T')[0];

dateInputs.forEach(input => {
    input.setAttribute('min', today);
});

// Mettre à jour la date minimum de retour quand la date de départ change
const departInput = searchBar.querySelector('input[type="date"]:nth-of-type(1)');
const retourInput = searchBar.querySelector('input[type="date"]:nth-of-type(2)');

if (departInput && retourInput) {
    departInput.addEventListener('change', (e) => {
        const selectedDate = e.target.value;
        retourInput.setAttribute('min', selectedDate);
        
        // Si la date de retour est avant la nouvelle date de départ, la réinitialiser
        if (retourInput.value && retourInput.value < selectedDate) {
            retourInput.value = '';
        }
    });
}

// ==========================================
// Lazy Loading Images (Performance)
// ==========================================
const images = document.querySelectorAll('img');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// ==========================================
// Smooth Scroll for All Links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ne pas empêcher le comportement par défaut pour les liens vides
        if (href === '#' || href === '') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// Console Welcome Message
// ==========================================
console.log('%c🌍 Wanderlust - Site de Voyage', 'font-size: 20px; font-weight: bold; color: #2c5f4a;');
console.log('%cBienvenue sur notre site ! Explorez le monde avec nous.', 'font-size: 14px; color: #666;');

// ==========================================
// Performance Monitoring (Optional)
// ==========================================
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Page chargée en ${(loadTime / 1000).toFixed(2)} secondes`);
});
