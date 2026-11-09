document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Logic ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);
    
    // Close menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // --- Language Switcher Logic ---
    const langToggleBtn = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('ggh_lang') || 'en';

    // Function to update all texts with data-en and data-so
    function setLanguage(lang) {
        const elements = document.querySelectorAll('[data-en][data-so]');
        
        elements.forEach(el => {
            if (lang === 'so') {
                el.textContent = el.getAttribute('data-so');
            } else {
                el.textContent = el.getAttribute('data-en');
            }
        });

        // Update placeholders for inputs
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');

        if (lang === 'so') {
            nameInput.placeholder = "Magacaaga oo buuxa";
            phoneInput.placeholder = "Tusaale: +252...";
            messageInput.placeholder = "Sidee kuu caawin karnaa?";
            langToggleBtn.textContent = "English";
        } else {
            nameInput.placeholder = "John Doe";
            phoneInput.placeholder = "+252...";
            messageInput.placeholder = "How can we help you?";
            langToggleBtn.textContent = "Somali";
        }

        // Update HTML lang attribute
        document.documentElement.lang = lang;
        localStorage.setItem('ggh_lang', lang);
        currentLang = lang;
    }

    // Initialize language on page load
    setLanguage(currentLang);

    // Toggle language on button click
    langToggleBtn.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'so' : 'en';
        setLanguage(newLang);
    });

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Contact Form to WhatsApp Integration ---
    const form = document.getElementById('whatsapp-form');
    const hospitalPhone = "252907791150"; // Hospital WhatsApp number

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        // Construct message
        const whatsappText = `*New Inquiry for Galdogob General Hospital*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Message:* ${message}`;
        
        // Construct URL
        const whatsappURL = `https://wa.me/${hospitalPhone}?text=${whatsappText}`;

        // Alert user (respecting language)
        if (currentLang === 'so') {
            alert("Waxaa laguu wareejinayaa WhatsApp si aad u dirto fariintaada.");
        } else {
            alert("You are being redirected to WhatsApp to send your message.");
        }

        // Open WhatsApp
        window.open(whatsappURL, '_blank');

        // Reset form
        form.reset();
    });

    // --- Dynamic Year in Footer ---
    document.getElementById('year').textContent = new Date().getFullYear();
});