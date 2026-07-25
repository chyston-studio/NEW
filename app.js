document.addEventListener('DOMContentLoaded', () => {

    // ================= 1. PAGE NAVIGATION SWITCHER =================
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetPage = button.getAttribute('data-page');

            // Update active state on buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Switch active page
            pages.forEach(page => {
                if (page.id === targetPage) {
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });

            // Smooth scroll back to top on page change
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // ================= 2. CAROUSEL CONTROLS =================
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carouselWrapper = document.getElementById('home-carousel');

    if (carouselWrapper && prevBtn && nextBtn) {
        const scrollAmount = 400;

        nextBtn.addEventListener('click', () => {
            carouselWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            carouselWrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    // ================= 3. LIGHTBOX INTERACTIVITY =================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxClose = document.querySelector('.lightbox-close');
    const photoCards = document.querySelectorAll('.photo-card');

    photoCards.forEach(card => {
        card.addEventListener('click', () => {
            const fullSrc = card.getAttribute('data-full');
            const title = card.getAttribute('data-title') || 'Untitled';
            const desc = card.getAttribute('data-desc') || 'No description provided.';

            lightboxImg.src = fullSrc;
            lightboxTitle.textContent = title;
            lightboxDesc.textContent = desc;

            lightbox.classList.add('active');
        });
    });

    // Close lightbox on clicking 'X' or outside the image content
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // Close lightbox on pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    });

});
