document.addEventListener('DOMContentLoaded', () => {
    console.log('Gallery script loaded'); // Debug log

    const initGallery = () => {
        const track = document.querySelector('.gallery-track');
        if (!track) {
            console.error('Gallery track not found');
            return;
        }

        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next-btn');
        const prevButton = document.querySelector('.prev-btn');

        if (!slides.length) {
            console.error('No slides found');
            return;
        }

        if (!nextButton || !prevButton) {
            console.error('Navigation buttons not found');
            return;
        }

        console.log(`Found ${slides.length} slides`); // Debug log

        let currentIndex = 0;

        function updateSlidePosition() {
            const offset = -currentIndex * 100;
            console.log(`Moving to slide ${currentIndex}, offset: ${offset}%`); // Debug log
            track.style.transform = `translateX(${offset}%)`;
        }

        function moveToNextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlidePosition();
        }

        function moveToPrevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlidePosition();
        }

        // Event Listeners
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Next button clicked'); // Debug log
            moveToNextSlide();
        });

        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Prev button clicked'); // Debug log
            moveToPrevSlide();
        });

        // Initialize position
        updateSlidePosition();

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') moveToNextSlide();
            if (e.key === 'ArrowLeft') moveToPrevSlide();
        });

        // Touch Navigation
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            const swipeDistance = touchStartX - touchEndX;
            
            if (Math.abs(swipeDistance) > 50) {
                if (swipeDistance > 0) moveToNextSlide();
                else moveToPrevSlide();
            }
        });
    };

    // Wait a bit for the DOM to be fully ready with dynamically loaded content
    setTimeout(initGallery, 1000);
}); 