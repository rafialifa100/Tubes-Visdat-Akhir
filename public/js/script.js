
document.addEventListener('DOMContentLoaded', () => {
    // Observer setup
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => observer.observe(el));
    
    // Navigation Dots & Scroll Logic
    const sections = document.querySelectorAll('section');
    const dots = document.querySelectorAll('.dot');
    
    function updateActiveDot() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) currentSection = section.getAttribute('id');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-target') === currentSection) dot.classList.add('active');
        });
    }

    // Event Listeners
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const target = document.getElementById(dot.getAttribute('data-target'));
            if(target) window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
        });
    });
    
    window.addEventListener('scroll', () => {
        updateActiveDot();
        const nav = document.querySelector('.nav-container');
        if (window.scrollY > 100) {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });
    
    updateActiveDot();

    // Visual interactions
    document.querySelectorAll('.case-visual').forEach(visual => {
        visual.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) icon.style.transform = 'scale(1.2)';
        });
        visual.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) icon.style.transform = 'scale(1)';
        });
    });
});
