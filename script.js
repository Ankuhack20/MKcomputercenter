// script.js
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Animate On Scroll (AOS)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Sticky Header Configuration Matrix
    const header = document.querySelector('.main-header');
    const handleScrollHeader = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScrollHeader);

    // Responsive Mobile Menu Interactions
    const hamburger = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMobileMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    };

    const closeMobileMenu = () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    };

    hamburger.addEventListener('click', toggleMobileMenu);
    navLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

    // Dynamic Navigation Active State Tracking
    const sections = document.querySelectorAll('section[id]');
    const handleActiveNavigation = () => {
        const scrollPosition = window.scrollY + 120;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (targetLink) {
                if (scrollPosition > sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                    targetLink.classList.add('active');
                } else {
                    targetLink.classList.remove('active');
                }
            }
        });
    };
    window.addEventListener('scroll', handleActiveNavigation);

    // Light / Dark Theme Mode Machine Logic
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });

    // Back-To-Top Component Functionality
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Technical FAQ Accordion Control Loops
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const currentBody = currentItem.querySelector('.accordion-body');
            const isActive = currentItem.classList.contains('active');

            // Close all active sibling accordions
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-body').style.maxHeight = null;
            });

            if (!isActive) {
                currentItem.classList.add('active');
                currentBody.style.maxHeight = currentBody.scrollHeight + "px";
            }
        });
    });

    // Statistical Numerical Counter Array Integrations
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersInitiated = false;

    const executeCounters = () => {
        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const increment = target / 50; 
            let count = 0;

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 25);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const observeStatsIntersection = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersInitiated) {
                executeCounters();
                countersInitiated = true;
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observeStatsIntersection.observe(statsSection);
    }

    // Input Contact Form Operational Validation
    const admissionForm = document.getElementById('admissionForm');
    admissionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('studentName').value.trim();
        const email = document.getElementById('studentEmail').value.trim();
        const phone = document.getElementById('studentPhone').value.trim();
        const course = document.getElementById('targetCourse').value;

        if (name && email && phone && course) {
            const submitBtn = admissionForm.querySelector('button[type="submit"]');
            const primaryBtnHTML = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing Request...';

            setTimeout(() => {
                alert(`Data Connection Secure! Thank you, ${name}. Our Admissions Officer will contact you within 24 hours regarding the ${course} track.`);
                admissionForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = primaryBtnHTML;
            }, 1500);
        }
    });
});