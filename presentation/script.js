document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const header = document.querySelector('.fixed-header');
    const navDotsContainer = document.querySelector('.nav-dots');
    
    // Create navigation dots
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('nav-dot');
        dot.dataset.index = index;
        dot.addEventListener('click', () => {
            slide.scrollIntoView({ behavior: 'smooth' });
        });
        navDotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.nav-dot');

    // Intersection Observer for Animations and Active State
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Activate Slide Animations
                entry.target.classList.add('visible');

                // Update Active Dot
                const index = Array.from(slides).indexOf(entry.target);
                dots.forEach(dot => dot.classList.remove('active'));
                if(dots[index]) dots[index].classList.add('active');

                // Header Theme Switching
                if (entry.target.classList.contains('slide-hero')) {
                    header.classList.add('dark-mode');
                } else {
                    header.classList.remove('dark-mode');
                }
            }
        });
    }, observerOptions);

    slides.forEach(slide => {
        observer.observe(slide);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const currentSlide = document.querySelector('.slide.visible') || slides[0];
        let nextSlide;

        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            nextSlide = currentSlide.nextElementSibling;
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            nextSlide = currentSlide.previousElementSibling;
        }

        if (nextSlide && nextSlide.classList.contains('slide')) {
            nextSlide.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
