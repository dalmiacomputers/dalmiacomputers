/**
 * Form handling with validation and API integration
 */

class FormHandler {
    constructor() {
        this.init();
    }

    init() {
        this.bindForms();
        this.setupValidation();
    }

    bindForms() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleContactForm.bind(this));
        }
    }

    async handleContactForm(e) {
        e.preventDefault();
        const form = e.target;
        
        if (!this.validateForm(form)) return;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        data._source = 'contact';

        try {
            form.querySelector('button').disabled = true;
            form.querySelector('button').textContent = 'Sending...';

            await this.submitForm('/api/save_contact.php', data);
            
            this.showSuccess('Message sent successfully! We will contact you soon.');
            form.reset();
        } catch (error) {
            this.showError('Failed to send message. Please try again.');
        } finally {
            form.querySelector('button').disabled = false;
            form.querySelector('button').textContent = 'Send Message';
        }
    }

    validateForm(form) {
        const fields = form.querySelectorAll('[required]');
        let valid = true;

        fields.forEach(field => {
            if (!field.value.trim()) {
                this.showFieldError(field, 'This field is required');
                valid = false;
            } else {
                this.clearFieldError(field);
            }
        });

        const email = form.querySelector('input[type="email"]');
        if (email && email.value && !this.isValidEmail(email.value)) {
            this.showFieldError(email, 'Please enter a valid email');
            valid = false;
        }

        const mobile = form.querySelector('input[name="mobile"]');
        if (mobile && mobile.value && !this.isValidMobile(mobile.value)) {
            this.showFieldError(mobile, 'Please enter a valid mobile number');
            valid = false;
        }

        return valid;
    }

    showFieldError(field, message) {
        field.style.borderColor = '#ef4444';
        let error = field.parentNode.querySelector('.field-error');
        if (!error) {
            error = document.createElement('div');
            error.className = 'field-error';
            error.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem;';
            field.parentNode.appendChild(error);
        }
        error.textContent = message;
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const error = field.parentNode.querySelector('.field-error');
        if (error) error.remove();
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    isValidMobile(mobile) {
        return /^[6-9]\d{9}$/.test(mobile.replace(/\D/g, ''));
    }

    async submitForm(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || ''
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Network error');
        return response.json();
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; z-index: 9999;
            padding: 1rem 1.5rem; border-radius: 0.5rem; color: white;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            transform: translateX(100%); transition: transform 0.3s;
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    setupValidation() {
        document.addEventListener('input', (e) => {
            if (e.target.matches('input, textarea, select')) {
                this.clearFieldError(e.target);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FormHandler();
});