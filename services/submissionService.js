const puppeteer = require('puppeteer');
const directories = require('../data/directories.json');

// Process submissions to multiple directories
async function processSubmissions(jobId, napData, selectedDirectoryIds, submissionJobs) {
    const job = submissionJobs.get(jobId);
    if (!job) return;

    job.status = 'processing';
    job.startedAt = new Date();

    const total = selectedDirectoryIds.length;
    let completed = 0;

    console.log(`Starting submission job ${jobId} for ${total} directories`);

    for (const dirId of selectedDirectoryIds) {
        const directory = directories.find(d => d.id === dirId);

        if (!directory) {
            job.results.push({
                directoryId: dirId,
                directoryName: 'Unknown',
                status: 'error',
                message: 'Directory not found'
            });
            continue;
        }

        try {
            console.log(`Submitting to ${directory.name}...`);

            const result = await submitToDirectory(directory, napData);

            job.results.push({
                directoryId: dirId,
                directoryName: directory.name,
                status: result.success ? 'success' : 'error',
                message: result.message,
                submittedAt: new Date()
            });

            completed++;
            job.progress = Math.round((completed / total) * 100);

            console.log(`Progress: ${job.progress}% (${completed}/${total})`);

            // Add delay between submissions to avoid rate limiting
            await delay(2000);

        } catch (error) {
            console.error(`Error submitting to ${directory.name}:`, error);

            job.results.push({
                directoryId: dirId,
                directoryName: directory.name,
                status: 'error',
                message: error.message
            });

            completed++;
            job.progress = Math.round((completed / total) * 100);
        }
    }

    job.status = 'completed';
    job.completedAt = new Date();

    console.log(`Job ${jobId} completed. Success: ${job.results.filter(r => r.status === 'success').length}/${total}`);
}

// Submit to a single directory using Puppeteer
async function submitToDirectory(directory, napData) {
    // For demo purposes, we'll simulate submissions
    // In production, this would use Puppeteer to automate form filling

    if (directory.submissionType === 'manual') {
        return {
            success: false,
            message: 'Manual submission required - opening link'
        };
    }

    // Simulate submission process
    const simulationDelay = 1000 + Math.random() * 2000;
    await delay(simulationDelay);

    // Simulate success/failure (90% success rate for demo)
    const success = Math.random() > 0.1;

    if (success) {
        return {
            success: true,
            message: 'Successfully submitted'
        };
    } else {
        return {
            success: false,
            message: 'Submission failed - captcha or form validation error'
        };
    }
}

// Submit using Puppeteer (example implementation)
async function submitWithPuppeteer(directory, napData) {
    let browser = null;

    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        // Set user agent to avoid bot detection
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

        // Navigate to submission page
        await page.goto(directory.submissionUrl, {
            waitUntil: 'networkidle2',
            timeout: 30000
        });

        // Fill form based on directory selectors (these would be defined in directory data)
        if (directory.selectors) {
            if (directory.selectors.businessName) {
                await page.type(directory.selectors.businessName, napData.businessName);
            }
            if (directory.selectors.address) {
                await page.type(directory.selectors.address, napData.address);
            }
            if (directory.selectors.phone) {
                await page.type(directory.selectors.phone, napData.phone);
            }
            if (directory.selectors.email) {
                await page.type(directory.selectors.email, napData.email);
            }
            if (directory.selectors.website && napData.website) {
                await page.type(directory.selectors.website, napData.website);
            }
            if (directory.selectors.description && napData.description) {
                await page.type(directory.selectors.description, napData.description);
            }

            // Submit form
            if (directory.selectors.submitButton) {
                await page.click(directory.selectors.submitButton);
                await page.waitForNavigation({ waitUntil: 'networkidle2' });
            }
        }

        // Take screenshot for verification
        const screenshot = await page.screenshot({ encoding: 'base64' });

        await browser.close();

        return {
            success: true,
            message: 'Form submitted successfully',
            screenshot: screenshot
        };

    } catch (error) {
        if (browser) {
            await browser.close();
        }

        return {
            success: false,
            message: `Puppeteer error: ${error.message}`
        };
    }
}

// Handle OTP verification during submission
async function handleOTPVerification(page, method, napData) {
    // This would integrate with your OTP service to retrieve codes
    // For directories that send verification emails/SMS

    try {
        // Wait for OTP input field to appear
        await page.waitForSelector('input[type="text"][name*="code"]', { timeout: 10000 });

        // In production, you would:
        // 1. Monitor email/SMS for incoming OTP
        // 2. Extract OTP from message
        // 3. Enter OTP in the form

        // For now, return that manual intervention is needed
        return {
            success: false,
            message: 'OTP verification required - manual intervention needed'
        };

    } catch (error) {
        return {
            success: false,
            message: 'Could not handle OTP verification'
        };
    }
}

// Utility function for delays
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    processSubmissions,
    submitToDirectory,
    submitWithPuppeteer,
    handleOTPVerification
};
