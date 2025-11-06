/**
 * Premium Hero Slider for Dalmia Computers
 * Advanced slider with touch support, autoplay, and smooth transitions
 */

class PremiumSlider {
    constructor(selector, options = {}) {
        this.slider = document.querySelector(selector);
        if (!this.slider) return;

        this.options = {
            autoplay: true,
            autoplayDelay: 5000,
            loop: true,
            touchEnabled: true,
            keyboardEnabled: true,
            pauseOnHover: true,
            showControls: true,
            showDots: true,
            transitionDuration: 500,
            ...options
        };

        this.currentSlide = 0;
        this.slides = [];
        this.isPlaying = false;
        this.autoplayTimer = null;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        this.setupSlides();
        this.setupControls();
        this.bindEvents();
        
        if (this.options.autoplay) {
            this.startAutoplay();
        }

        // Set initial slide
        this.goToSlide(0);
        
        console.log('Premium Slider initialized');
    }

    setupSlides() {
        const slideElements = this.slider.querySelectorAll('.slide');
        
        slideElements.forEach((slide, index) => {
            const bgImage = slide.dataset.bg;
            if (bgImage) {
                slide.style.backgroundImage = `url(${bgImage})`;
            }
            
            this.slides.push({
                element: slide,
                index: index
            });
        });

        // Show first slide
        if (this.slides.length > 0) {
            this.slides[0].element.classList.add('active');
        }
    }

    setupControls() {
        if (!this.options.showControls && !this.options.showDots) return;

        const controlsContainer = this.slider.querySelector('.hero-controls');
        if (!controlsContainer) return;

        // Setup navigation buttons
        if (this.options.showControls) {
            const prevBtn = controlsContainer.querySelector('.hero-prev');
            const nextBtn = controlsContainer.querySelector('.hero-next');

            if (prevBtn) {
                prevBtn.addEventListener('click', () => this.previousSlide());
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => this.nextSlide());
            }
        }

        // Setup dots
        if (this.options.showDots) {
            const dotsContainer = controlsContainer.querySelector('.hero-dots');
            if (dotsContainer) {
                // Clear existing dots
                dotsContainer.innerHTML = '';
                
                // Create dots for each slide
                this.slides.forEach((slide, index) => {
                    const dot = document.createElement('span');
                    dot.className = 'dot';
                    dot.dataset.slide = index;
                    
                    if (index === 0) {
                        dot.classList.add('active');
                    }
                    
                    dot.addEventListener('click', () => this.goToSlide(index));
                    dotsContainer.appendChild(dot);
                });
            }
        }
    }

    bindEvents() {
        // Touch events for mobile
        if (this.options.touchEnabled) {
            this.slider.addEventListener('touchstart', (e) => {
                this.touchStartX = e.changedTouches[0].screenX;
                this.pauseAutoplay();
            }, { passive: true });

            this.slider.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
                
                if (this.options.autoplay) {
                    this.startAutoplay();
                }
            }, { passive: true });
        }

        // Keyboard navigation
        if (this.options.keyboardEnabled) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    this.previousSlide();
                } else if (e.key === 'ArrowRight') {
                    this.nextSlide();
                }
            });
        }

        // Pause on hover
        if (this.options.pauseOnHover && this.options.autoplay) {
            this.slider.addEventListener('mouseenter', () => {
                this.pauseAutoplay();
            });

            this.slider.addEventListener('mouseleave', () => {
                this.startAutoplay();
            });
        }

        // Visibility change (pause when tab is not active)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoplay();
            } else if (this.options.autoplay) {
                this.startAutoplay();
            }
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                this.nextSlide();
            } else {
                // Swipe right - previous slide
                this.previousSlide();
            }
        }
    }

    goToSlide(index) {
        if (index < 0 || index >= this.slides.length) return;

        // Remove active class from current slide
        const currentSlideElement = this.slides[this.currentSlide]?.element;
        if (currentSlideElement) {
            currentSlideElement.classList.remove('active');
        }

        // Update current slide index
        this.currentSlide = index;

        // Add active class to new slide
        const newSlideElement = this.slides[this.currentSlide].element;
        newSlideElement.classList.add('active');

        // Update dots
        this.updateDots();

        // Trigger custom event
        this.slider.dispatchEvent(new CustomEvent('slideChange', {
            detail: {
                currentSlide: this.currentSlide,
                totalSlides: this.slides.length
            }
        }));
    }

    nextSlide() {
        let nextIndex = this.currentSlide + 1;
        
        if (nextIndex >= this.slides.length) {
            nextIndex = this.options.loop ? 0 : this.slides.length - 1;
        }
        
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        let prevIndex = this.currentSlide - 1;
        
        if (prevIndex < 0) {
            prevIndex = this.options.loop ? this.slides.length - 1 : 0;
        }
        
        this.goToSlide(prevIndex);
    }

    updateDots() {
        const dots = this.slider.querySelectorAll('.dot');
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    startAutoplay() {
        if (!this.options.autoplay || this.isPlaying) return;

        this.isPlaying = true;
        this.autoplayTimer = setInterval(() => {
            this.nextSlide();
        }, this.options.autoplayDelay);
    }

    pauseAutoplay() {
        if (!this.isPlaying) return;

        this.isPlaying = false;
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
    }

    stopAutoplay() {
        this.pauseAutoplay();
        this.options.autoplay = false;
    }

    handleResize() {
        // Handle responsive adjustments if needed
        // This can be extended for more complex responsive behavior
    }

    // Public API methods
    play() {
        this.options.autoplay = true;
        this.startAutoplay();
    }

    pause() {
        this.pauseAutoplay();
    }

    stop() {
        this.stopAutoplay();
    }

    getCurrentSlide() {
        return this.currentSlide;
    }

    getTotalSlides() {
        return this.slides.length;
    }

    destroy() {
        this.pauseAutoplay();
        
        // Remove event listeners
        // Note: In a production environment, you'd want to store references
        // to the event listeners to properly remove them
        
        // Reset slides
        this.slides.forEach(slide => {
            slide.element.classList.remove('active');
        });
        
        console.log('Slider destroyed');
    }
}

// Auto-initialize sliders
document.addEventListener('DOMContentLoaded', () => {
    // Initialize hero slider
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        window.heroSlider = new PremiumSlider('.hero', {
            autoplay: true,
            autoplayDelay: 6000,
            loop: true,
            touchEnabled: true,
            keyboardEnabled: true,
            pauseOnHover: true
        });
    }

    // Initialize any other sliders with data attributes
    const sliders = document.querySelectorAll('[data-slider]');
    sliders.forEach(slider => {
        const options = {};
        
        // Parse data attributes for options
        if (slider.dataset.autoplay !== undefined) {
            options.autoplay = slider.dataset.autoplay !== 'false';
        }
        
        if (slider.dataset.autoplayDelay) {
            options.autoplayDelay = parseInt(slider.dataset.autoplayDelay);
        }
        
        if (slider.dataset.loop !== undefined) {
            options.loop = slider.dataset.loop !== 'false';
        }

        new PremiumSlider(slider, options);
    });
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PremiumSlider;
}