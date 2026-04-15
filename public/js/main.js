/**
 * ========================================
 * PORTFOLIO CLIENT-SIDE LOGIC
 * ========================================
 * This script handles all interactive behaviors on the page.
 * It's written in vanilla JavaScript to ensure it's easy to understand
 * and doesn't require any external libraries.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navbar Scroll Effect ---
    // Changes the navbar background when the user scrolls down.
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    // Handles opening and closing the mobile navigation menu.
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    mobileToggle.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        
        if (isOpen) {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        } else {
            mobileMenu.classList.remove('hidden');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        }
    });

    // Close mobile menu when a link is clicked
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });

    // --- 3. Scroll Reveal Animation ---
    // Uses the Intersection Observer API to detect when elements enter the viewport
    // and adds an 'active' class to trigger CSS animations.
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once revealed, we can stop observing this element
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 4. Contact Form Submission ---
    // Handles the contact form submission via AJAX (Fetch API).
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');
    const successMessage = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Update UI to show loading state
            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';
            
            try {
                // Send data to our Express server API
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Show success state
                    btnText.textContent = 'Sent!';
                    successMessage.classList.remove('hidden');
                    contactForm.reset();
                    
                    // Reset button after 5 seconds
                    setTimeout(() => {
                        successMessage.classList.add('hidden');
                        btnText.textContent = 'Send Message';
                        submitBtn.disabled = false;
                    }, 5000);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                btnText.textContent = 'Error!';
                submitBtn.disabled = false;
                alert('Something went wrong. Please try again later.');
            }
        });
    }
});
