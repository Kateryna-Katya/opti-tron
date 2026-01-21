document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. MOBILE MENU LOGIC --- */
    const burger = document.querySelector('.burger');
    const menuClose = document.getElementById('menuClose');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    const toggleMenu = () => mobileMenu.classList.toggle('active');

    if(burger) burger.addEventListener('click', toggleMenu);
    if(menuClose) menuClose.addEventListener('click', toggleMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.remove('active'));
    });

    /* --- 2. COOKIE POPUP LOGIC --- */
    const cookiePopup = document.getElementById('cookiePopup');
    const acceptBtn = document.getElementById('acceptCookies');

    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('visible');
        }, 2000);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookiePopup.classList.remove('visible');
    });

    /* --- 3. REVEAL ANIMATION (Intersection Observer) --- */
    const observerOptions = { threshold: 0.15 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach((el, i) => {
        el.style.transitionDelay = `${(i % 3) * 0.1}s`;
        revealObserver.observe(el);
    });

    /* --- 4. HERO CARD 3D EFFECT --- */
    const holoCard = document.querySelector('.holo-card');
    if (holoCard) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 30;
            const y = (window.innerHeight / 2 - e.pageY) / 30;
            holoCard.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
        });
    }

    /* --- 5. INFO CARDS LIGHT EFFECT --- */
    document.querySelectorAll('.info-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(99,102,241,0.1), transparent 70%), var(--primary-bg)`;
        });
    });

    /* --- 6. TECH ACCORDION --- */
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            techItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    /* --- 7. CONTACT FORM & CAPTCHA --- */
    const contactForm = document.getElementById('main-contact-form');
    if (contactForm) {
        const phoneInput = document.getElementById('phone');
        const captchaLabel = document.getElementById('captcha-label');
        const captchaInput = document.getElementById('captcha');
        const formSuccess = document.getElementById('form-success');

        // Generazione Captcha
        let n1 = Math.floor(Math.random() * 9) + 1;
        let n2 = Math.floor(Math.random() * 9) + 1;
        let result = n1 + n2;
        captchaLabel.innerText = `Quanto fa ${n1} + ${n2}?`;

        // Validazione Numerica Telefono
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (parseInt(captchaInput.value) !== result) {
                alert("Il calcolo è errato!");
                return;
            }
            
            const btn = contactForm.querySelector('button');
            btn.innerText = "Invio...";
            btn.disabled = true;

            setTimeout(() => {
                formSuccess.classList.add('active');
            }, 1500);
        });
    }

    /* --- 8. HEADER SCROLL --- */
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        header.classList.toggle('header--scrolled', window.scrollY > 50);
    });
});