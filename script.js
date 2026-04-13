document.addEventListener('DOMContentLoaded', () => {
    // Stat Counting Animation
    const stats = document.querySelectorAll('.stat-val');
    const animateStat = (stat) => {
        const target = +stat.getAttribute('data-target');
        const count = +stat.innerText;
        const speed = 100; // Increase for slower speed
        const increment = target / speed;

        if (count < target) {
            stat.innerText = Math.ceil(count + increment);
            setTimeout(() => animateStat(stat), 10);
        } else {
            stat.innerText = target;
        }
    };

    // Intersection Observer for Stats
    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStat(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    // Smooth Scroll for Nav (only for internal links)
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Parallax-ish Effect for Hero Visual
    const vaultSphere = document.querySelector('.vault-sphere');
    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 30;
        const y = (window.innerHeight / 2 - e.pageY) / 30;
        vaultSphere.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });

    // Reveal animation on scroll
    const sections = document.querySelectorAll('section');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.classList.add('reveal-init');
        revealObserver.observe(section);
    });
});
