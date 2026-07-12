// 1. TAB SYSTEM SWAPPING LOGIC
const navLinks = document.querySelectorAll('.nav-link');
const tabContents = document.querySelectorAll('.tab-content');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(item => item.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
        
        // Hide all tabs
        tabContents.forEach(tab => tab.classList.remove('active'));
        
        // Show selected tab content
        const targetId = link.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
        
        // Scroll to top when changing tabs
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});


// 2. SLOW-FADING HERO SLIDESHOW
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    
    // Move to next slide, wrap around to 0 if at the end
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
}

// Change slide every 6 seconds (6000ms) for a slow, premium look
setInterval(nextSlide, 6000);
