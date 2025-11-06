/**
 * Premium Core JavaScript for Dalmia Computers
 * Handles navigation, interactions, and core functionality
 */

class DalmiaCore {
    constructor() {
        this.init();
        this.bindEvents();
        this.initAnimations();
    }

    init() {
        // Set active navigation
        this.setActiveNav();
        
        // Initialize mobile menu
        this.initMobileMenu();
        
        // Initialize smooth scrolling
        this.initSmoothScroll();
        
        // Initialize header scroll effect
        this.initHeaderScroll();
        
        // Initialize lazy loading
        this.initLazyLoading();
        
        console.log('Dalmia Computers - Premium website loaded');
    }

    bindEvents() {
        // Navigation toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Search button
        const searchBtn = document.getElementById('search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', this.handleSearch.bind(this));
        }

        // Close mobile menu on link click
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu?.classList.remove('active');
                navToggle?.classList.remove('active');
            });
        });

        // Window resize handler
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Scroll handler
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    setActiveNav() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === currentPath || 
                (currentPath === '/' && href === '#home') ||
                (href.startsWith('#') && currentPath === '/')) {
                link.classList.add('active');
            }
        });
    }

    initMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        if (!navMenu) return;

        // Add mobile menu styles
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 767px) {
                .nav-menu {
                    position: fixed;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                    transform: translateY(-100%);
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                    z-index: 999;
                }
                
                .nav-menu.active {
                    transform: translateY(0);
                    opacity: 1;
                    visibility: visible;
                }
                
                .nav-list {
                    flex-direction: column;
                    padding: 2rem;
                    gap: 1rem;
                }
                
                .nav-toggle.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                
                .nav-toggle.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .nav-toggle.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -6px);
                }
            }
        `;
        document.head.appendChild(style);
    }

    initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    initHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScrollY = window.scrollY;
        
        const updateHeader = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide header on scroll down, show on scroll up
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', updateHeader, { passive: true });
        
        // Add scrolled styles
        const style = document.createElement('style');
        style.textContent = `
            .header.scrolled {
                background-color: rgba(255, 255, 255, 0.98);
                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            }
        `;
        document.head.appendChild(style);
    }

    initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    initAnimations() {
        // Intersection Observer for animations
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                        animationObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Observe elements for animation
            const animateElements = document.querySelectorAll(
                '.feature-card, .category-card, .service-card, .contact-item'
            );
            
            animateElements.forEach(el => {
                animationObserver.observe(el);
            });
        }
    }

    handleSearch() {
        // Simple search implementation
        const query = prompt('Search for products or services:');
        if (query && query.trim()) {
            // In a real implementation, this would search through products
            const searchResults = this.searchContent(query.trim().toLowerCase());
            this.displaySearchResults(searchResults, query);
        }
    }

    searchContent(query) {
        const searchableContent = [
            { title: 'Laptops', url: '/products/laptops.html', type: 'product' },
            { title: 'Desktops', url: '/products/desktops.html', type: 'product' },
            { title: 'Printers', url: '/products/printers.html', type: 'product' },
            { title: 'CCTV Systems', url: '/products/cctv.html', type: 'product' },
            { title: 'Repair Service', url: '/services/repair.html', type: 'service' },
            { title: 'AMC Plans', url: '/services/amc.html', type: 'service' },
            { title: 'CCTV Installation', url: '/services/cctv.html', type: 'service' }
        ];

        return searchableContent.filter(item => 
            item.title.toLowerCase().includes(query) ||
            item.type.toLowerCase().includes(query)
        );
    }

    displaySearchResults(results, query) {
        if (results.length === 0) {
            alert(`No results found for "${query}". Please contact us for specific requirements.`);
            return;
        }

        let message = `Search results for "${query}":\n\n`;
        results.forEach((result, index) => {
            message += `${index + 1}. ${result.title} (${result.type})\n`;
        });
        message += '\nWould you like to visit the first result?';

        if (confirm(message)) {
            window.location.href = results[0].url;
        }
    }

    handleResize() {
        // Handle responsive adjustments
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (window.innerWidth >= 768) {
            navMenu?.classList.remove('active');
            navToggle?.classList.remove('active');
        }
    }

    handleScroll() {
        // Update active navigation based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Utility methods
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // API helper methods
    static async apiCall(endpoint, options = {}) {
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        };

        // Add CSRF token if available
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (csrfToken) {
            defaultOptions.headers['X-CSRF-Token'] = csrfToken;
        }

        const config = { ...defaultOptions, ...options };
        
        try {
            const response = await fetch(endpoint, config);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        }
    }

    // Form validation helper
    static validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });

        // Email validation
        const emailFields = form.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            if (field.value && !this.isValidEmail(field.value)) {
                field.classList.add('error');
                isValid = false;
            }
        });

        // Phone validation
        const phoneFields = form.querySelectorAll('input[type="tel"]');
        phoneFields.forEach(field => {
            if (field.value && !this.isValidPhone(field.value)) {
                field.classList.add('error');
                isValid = false;
            }
        });

        return isValid;
    }

    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{9,14}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    // Show notification
    static showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dalmiaCore = new DalmiaCore();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DalmiaCore;
}