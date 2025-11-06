/**
 * reCAPTCHA Handler for all forms
 */

class RecaptchaHandler {
    constructor(siteKey) {
        this.siteKey = siteKey;
        this.loaded = false;
        this.init();
    }

    init() {
        this.loadRecaptchaScript();
        this.bindForms();
    }

    loadRecaptchaScript() {
        if (document.querySelector('script[src*="recaptcha"]')) {
            this.loaded = true;
            return;
        }

        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${this.siteKey}`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            this.loaded = true;
            console.log('reCAPTCHA loaded');
        };
        document.head.appendChild(script);
    }

    bindForms() {
        const forms = document.querySelectorAll('form[data-recaptcha="true"]');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e, form));
        });
    }

    async handleSubmit(e, form) {
        e.preventDefault();

        if (!this.loaded) {
            alert('Please wait for security verification to load');
            return;
        }

        try {
            const token = await this.getToken(form.dataset.action || 'submit');
            
            // Add token to form
            let tokenInput = form.querySelector('input[name="recaptcha_token"]');
            if (!tokenInput) {
                tokenInput = document.createElement('input');
                tokenInput.type = 'hidden';
                tokenInput.name = 'recaptcha_token';
                form.appendChild(tokenInput);
            }
            tokenInput.value = token;

            // Submit form
            if (form.dataset.ajax === 'true') {
                await this.submitAjax(form);
            } else {
                form.submit();
            }
        } catch (error) {
            console.error('reCAPTCHA error:', error);
            alert('Security verification failed. Please try again.');
        }
    }

    getToken(action) {
        return new Promise((resolve, reject) => {
            if (!window.grecaptcha) {
                reject(new Error('reCAPTCHA not loaded'));
                return;
            }

            grecaptcha.ready(() => {
                grecaptcha.execute(this.siteKey, { action })
                    .then(resolve)
                    .catch(reject);
            });
        });
    }

    async submitAjax(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        const response = await fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || ''
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Submission failed');

        const result = await response.json();
        
        if (result.ok) {
            this.showSuccess(form);
        } else {
            throw new Error(result.error || 'Submission failed');
        }
    }

    showSuccess(form) {
        const message = form.dataset.successMessage || 'Form submitted successfully!';
        alert(message);
        form.reset();
    }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    const siteKey = document.querySelector('meta[name="recaptcha-site-key"]')?.content;
    if (siteKey) {
        window.recaptchaHandler = new RecaptchaHandler(siteKey);
    }
});