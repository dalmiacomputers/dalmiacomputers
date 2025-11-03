// Global state
let businessData = {};
let selectedDirectories = [];
let isVerified = false;
let currentJobId = null;
let verificationIdentifier = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadCategories();
    await loadDirectories();
});

// Load categories
async function loadCategories() {
    try {
        const response = await fetch('/api/directories/categories');
        const data = await response.json();

        if (data.success) {
            const categorySelect = document.getElementById('category');
            data.categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categorySelect.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Failed to load categories:', error);
    }
}

// Load directories
async function loadDirectories() {
    try {
        const response = await fetch('/api/directories');
        const data = await response.json();

        if (data.success) {
            displayDirectories(data.directories);
        }
    } catch (error) {
        console.error('Failed to load directories:', error);
        showError('Failed to load directories. Please refresh the page.');
    }
}

// Display directories
function displayDirectories(directories) {
    const directoryList = document.getElementById('directoryList');
    directoryList.innerHTML = '';

    directories.forEach((dir, index) => {
        const item = document.createElement('div');
        item.className = 'directory-item';
        item.innerHTML = `
            <input type="checkbox" id="dir_${index}" value="${dir.id}" onchange="updateSelectedCount()">
            <div class="directory-info">
                <div class="directory-name">${dir.name}</div>
                <div class="directory-meta">${dir.domain} • DA: ${dir.domainAuthority || 'N/A'}</div>
            </div>
        `;
        directoryList.appendChild(item);
    });

    selectedDirectories = directories;
}

// Step navigation
function goToStep1() {
    showStep(1);
}

function goToStep2() {
    if (!validateBusinessForm()) {
        return;
    }

    // Save business data
    businessData = {
        businessName: document.getElementById('businessName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        website: document.getElementById('website').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zipCode: document.getElementById('zipCode').value,
        country: document.getElementById('country').value,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value
    };

    showStep(2);
}

function goToStep3() {
    if (!isVerified) {
        showError('Please verify your contact information first.');
        return;
    }
    showStep(3);
}

function showStep(stepNumber) {
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById(`step${stepNumber}`).classList.add('active');

    // Scroll to top of form
    document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
}

// Validate business form
function validateBusinessForm() {
    const required = ['businessName', 'phone', 'email', 'address', 'city', 'country', 'category'];

    for (const fieldId of required) {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            showError(`Please fill in the ${field.previousElementSibling.textContent}`);
            field.focus();
            return false;
        }
    }

    // Validate email
    const email = document.getElementById('email').value;
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return false;
    }

    return true;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// OTP Functions
async function sendOTP() {
    const method = document.querySelector('input[name="verifyMethod"]:checked').value;
    const sendBtn = document.getElementById('sendOtpBtn');

    let contactValue;
    if (method === 'email') {
        contactValue = businessData.email;
    } else {
        contactValue = businessData.phone;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';
    showLoading('Sending verification code...');

    try {
        const response = await fetch('/api/otp/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: method === 'email' ? contactValue : null,
                phone: method === 'sms' ? contactValue : null,
                whatsapp: method === 'whatsapp' ? contactValue : null,
                method: method
            })
        });

        const data = await response.json();
        hideLoading();

        if (data.success) {
            verificationIdentifier = data.identifier;
            document.getElementById('otpInputSection').style.display = 'block';
            showSuccess('Verification code sent! Please check your ' + method);
        } else {
            showError(data.error || 'Failed to send verification code');
        }
    } catch (error) {
        hideLoading();
        showError('Failed to send verification code. Please try again.');
        console.error('OTP send error:', error);
    } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send Verification Code';
    }
}

async function verifyOTP() {
    const otpCode = document.getElementById('otpCode').value;

    if (!otpCode || otpCode.length !== 6) {
        showError('Please enter a valid 6-digit code');
        return;
    }

    showLoading('Verifying code...');

    try {
        const response = await fetch('/api/otp/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier: verificationIdentifier,
                otp: otpCode
            })
        });

        const data = await response.json();
        hideLoading();

        if (data.success && data.verified) {
            isVerified = true;
            showSuccess('Verification successful!');
            setTimeout(() => goToStep3(), 1500);
        } else {
            showError(data.error || 'Invalid verification code');
        }
    } catch (error) {
        hideLoading();
        showError('Verification failed. Please try again.');
        console.error('OTP verify error:', error);
    }
}

// Directory selection
function selectAllDirectories() {
    document.querySelectorAll('#directoryList input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = true;
    });
    updateSelectedCount();
}

function deselectAllDirectories() {
    document.querySelectorAll('#directoryList input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    updateSelectedCount();
}

function filterTopDirectories() {
    const checkboxes = document.querySelectorAll('#directoryList input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = index < 100;
    });
    updateSelectedCount();
}

function updateSelectedCount() {
    const count = document.querySelectorAll('#directoryList input[type="checkbox"]:checked').length;
    document.getElementById('selectedCount').textContent = count;
}

// Start submission
async function startSubmission() {
    const selectedCheckboxes = document.querySelectorAll('#directoryList input[type="checkbox"]:checked');

    if (selectedCheckboxes.length === 0) {
        showError('Please select at least one directory');
        return;
    }

    const selectedDirIds = Array.from(selectedCheckboxes).map(cb => cb.value);

    showLoading('Starting submission process...');

    try {
        const response = await fetch('/api/submission/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...businessData,
                selectedDirectories: selectedDirIds,
                verified: isVerified
            })
        });

        const data = await response.json();
        hideLoading();

        if (data.success) {
            currentJobId = data.jobId;
            showStep(4);
            showSuccess(`Submission started! Processing ${data.totalDirectories} directories`);
            startProgressMonitoring();
        } else {
            showError(data.error || 'Failed to start submission');
        }
    } catch (error) {
        hideLoading();
        showError('Failed to start submission. Please try again.');
        console.error('Submission start error:', error);
    }
}

// Monitor progress
function startProgressMonitoring() {
    const interval = setInterval(async () => {
        try {
            const response = await fetch(`/api/submission/status/${currentJobId}`);
            const data = await response.json();

            if (data.success) {
                updateProgress(data.job);

                if (data.job.status === 'completed' || data.job.status === 'failed') {
                    clearInterval(interval);
                    document.getElementById('downloadBtn').style.display = 'block';
                }
            }
        } catch (error) {
            console.error('Progress check error:', error);
        }
    }, 2000);
}

function updateProgress(job) {
    const progress = job.progress || 0;
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    progressFill.style.width = progress + '%';
    progressText.textContent = progress + '%';

    // Update results
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';

    job.results.forEach(result => {
        const item = document.createElement('div');
        item.className = `result-item ${result.status}`;
        item.innerHTML = `
            <span>${result.directoryName}</span>
            <span>${result.status === 'success' ? '✓' : result.status === 'error' ? '✗' : '...'}</span>
        `;
        resultsList.appendChild(item);
    });
}

// Download report
function downloadReport() {
    showInfo('Report download functionality will be implemented soon!');
}

// Reset form
function resetForm() {
    businessData = {};
    selectedDirectories = [];
    isVerified = false;
    currentJobId = null;
    verificationIdentifier = null;

    document.getElementById('businessForm').reset();
    document.getElementById('otpCode').value = '';
    document.getElementById('otpInputSection').style.display = 'none';

    showStep(1);
    showSuccess('Form reset! You can submit another business.');
}

// UI Helper functions
function showLoading(message = 'Processing...') {
    const overlay = document.getElementById('loadingOverlay');
    const text = document.getElementById('loadingText');
    text.textContent = message;
    overlay.classList.add('active');
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.remove('active');
}

function showError(message) {
    alert('Error: ' + message);
}

function showSuccess(message) {
    alert('Success: ' + message);
}

function showInfo(message) {
    alert('Info: ' + message);
}
