// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursorOuter = document.querySelector('.cursor-outer');
    const cursorInner = document.querySelector('.cursor-inner');
    
    // Update cursor position on mouse move
    document.addEventListener('mousemove', function(e) {
        cursorOuter.style.left = `${e.clientX}px`;
        cursorOuter.style.top = `${e.clientY}px`;
        cursorInner.style.left = `${e.clientX}px`;
        cursorInner.style.top = `${e.clientY}px`;
    });
    
    // Add active class on mouse down
    document.addEventListener('mousedown', function() {
        cursorOuter.classList.add('active');
        cursorInner.classList.add('active');
    });
    
    // Remove active class on mouse up
    document.addEventListener('mouseup', function() {
        cursorOuter.classList.remove('active');
        cursorInner.classList.remove('active');
    });
    
    // Handle cursor on links and buttons
    const allLinks = document.querySelectorAll('a, button');
    allLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursorOuter.classList.add('hover');
            cursorInner.classList.add('hover');
        });
        
        link.addEventListener('mouseleave', function() {
            cursorOuter.classList.remove('hover');
            cursorInner.classList.remove('hover');
        });
    });
    
    // Navigation menu for mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking a nav link on mobile
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Change header on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });
    
    // Product examination/modal system
    const examineButtons = document.querySelectorAll('.examine-btn');
    const productModal = document.getElementById('productModal');
    const closeModal = document.querySelector('.close-modal');
    const productDetails = document.querySelector('.product-details');
    
    // Product data (would typically come from a backend)
    const productData = {
        spoofer: {
            name: "Valorant Spoofer",
            price: "$29.99",
            description: "Our advanced HWID spoofer ensures that you can bypass hardware bans and keep your system safe. Using cutting-edge technology, our spoofer modifies essential hardware identifiers to prevent Riot's anti-cheat system from detecting your actual hardware.",
            features: [
                "Hardware ID spoofing",
                "Disk serial spoofer",
                "MAC address spoofer",
                "SMBIOS modification",
                "Registry cleaner",
                "Anti-ban protection",
                "Automatic updates",
                "Instant activation"
            ],
            images: [
                "https://images.unsplash.com/photo-1614285653636-af3191aa94bd",
                "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42"
            ]
        },
        external: {
            name: "Valorant EXTERNAL",
            price: "$49.99",
            description: "Our external cheat solution provides powerful advantages while maintaining a low detection footprint. Running outside of the game process, this cheat offers essential features without the risks associated with internal cheats. Perfect for players who want a reliable advantage.",
            features: [
                "ESP Wallhack",
                "2D Radar",
                "Aim Assistance",
                "Player information",
                "Configurable settings",
                "Low CPU usage",
                "Undetected since release",
                "Regular updates"
            ],
            images: [
                "https://images.unsplash.com/photo-1617957772002-57adde1156fa",
                "https://images.unsplash.com/photo-1593305841991-05c297ba4575"
            ]
        },
        internal: {
            name: "Valorant INTERNAL",
            price: "$79.99",
            description: "Our flagship internal cheat provides the most comprehensive feature set available. Designed with advanced security measures, this premium solution directly interfaces with the game for pixel-perfect accuracy and the smoothest experience possible.",
            features: [
                "Advanced aimbot with customizable settings",
                "Complete ESP with full customization",
                "Recoil control system",
                "Silent aim",
                "Skin changer",
                "Instant weapon swap",
                "Stream-proof overlay",
                "24/7 priority support"
            ],
            images: [
                "https://images.unsplash.com/photo-1557682250-33bd709cbe85",
                "https://images.unsplash.com/photo-1475070929565-c985b496cb9f"
            ]
        }
    };
    
    // Open modal with product details
    examineButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productType = this.getAttribute('data-product');
            const product = productData[productType];
            
            // Build the modal content
            let modalContent = `
                <div class="product-details-header">
                    <h2>${product.name}</h2>
                </div>
                <div class="product-details-price">${product.price}</div>
                <p class="product-details-description">${product.description}</p>
                <h3>Key Features</h3>
                <div class="product-features-list">
            `;
            
            // Add features
            product.features.forEach(feature => {
                modalContent += `
                    <div class="product-feature-item">
                        <i class="fas fa-check-circle"></i>
                        <span>${feature}</span>
                    </div>
                `;
            });
            
            modalContent += `</div><h3>Screenshots</h3><div class="product-screenshots">`;
            
            // Add screenshots
            product.images.forEach(image => {
                modalContent += `
                    <div class="screenshot">
                        <img src="${image}" alt="${product.name} Screenshot">
                    </div>
                `;
            });
            
            modalContent += `
                </div>
                <button class="purchase-btn">Purchase Now</button>
            `;
            
            // Set the modal content
            productDetails.innerHTML = modalContent;
            
            // Show the modal
            productModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        productModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === productModal) {
            productModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Testimonial slider
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    
    // FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems && faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-toggle i');
            
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = null;
                        otherItem.querySelector('.faq-toggle i').className = 'fas fa-plus';
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.className = 'fas fa-minus';
                } else {
                    answer.style.maxHeight = null;
                    icon.className = 'fas fa-plus';
                }
            });
        });
    }
    
    // Set initial position
    let testimonialIndex = 0;
    const cardWidth = testimonialCards[0].offsetWidth + 25; // Including gap
    
    // Clone testimonials for infinite loop effect
    const cloneFirst = testimonialCards[0].cloneNode(true);
    const cloneLast = testimonialCards[testimonialCards.length - 1].cloneNode(true);
    
    testimonialsTrack.appendChild(cloneFirst);
    testimonialsTrack.insertBefore(cloneLast, testimonialCards[0]);
    
    // Calculate visible testimonials based on viewport
    function getVisibleCount() {
        const containerWidth = document.querySelector('.testimonials-container').offsetWidth;
        return Math.floor(containerWidth / cardWidth);
    }
    
    // Update testimonial position
    function updateTestimonialPosition() {
        testimonialsTrack.style.transform = `translateX(-${(testimonialIndex + 1) * cardWidth}px)`;
    }
    
    // Next button
    nextBtn.addEventListener('click', function() {
        if (testimonialIndex >= testimonialCards.length - 1) return;
        testimonialIndex++;
        updateTestimonialPosition();
        
        // Reset to beginning if reached end
        if (testimonialIndex === testimonialCards.length) {
            setTimeout(() => {
                testimonialsTrack.style.transition = 'none';
                testimonialIndex = 0;
                updateTestimonialPosition();
                setTimeout(() => {
                    testimonialsTrack.style.transition = 'transform 0.5s ease';
                }, 50);
            }, 500);
        }
    });
    
    // Previous button
    prevBtn.addEventListener('click', function() {
        if (testimonialIndex <= -1) return;
        testimonialIndex--;
        updateTestimonialPosition();
        
        // Reset to end if reached beginning
        if (testimonialIndex === -1) {
            setTimeout(() => {
                testimonialsTrack.style.transition = 'none';
                testimonialIndex = testimonialCards.length - 1;
                updateTestimonialPosition();
                setTimeout(() => {
                    testimonialsTrack.style.transition = 'transform 0.5s ease';
                }, 50);
            }, 500);
        }
    });
    
    // Initialize testimonials position
    updateTestimonialPosition();
    
    // Auto play testimonials
    let testimonialInterval = setInterval(() => {
        nextBtn.click();
    }, 5000);
    
    // Pause auto play on hover
    document.querySelector('.testimonials-container').addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    document.querySelector('.testimonials-container').addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            nextBtn.click();
        }, 5000);
    });
    
    // Create animated particles for hero section
    function createParticles() {
        const particlesContainer = document.querySelector('.particles');
        const particleCount = 12;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('span');
            const size = Math.random() * 5 + 3;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 20;
            const duration = Math.random() * 10 + 10;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.top = `${posY}%`;
            particle.style.left = `${posX}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Initialize particles
    createParticles();
    
    // Animate product prices
    function animatePrices() {
        const prices = document.querySelectorAll('.price');
        prices.forEach(price => {
            price.classList.add('animate');
            setTimeout(() => {
                price.classList.remove('animate');
            }, 500);
        });
    }
    
    // Periodically animate prices
    setInterval(animatePrices, 5000);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            if (href === '#') return; // Skip empty anchors
            
            const target = document.querySelector(href);
            if (!target) return; // Skip if target doesn't exist
            
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.product-card, .feature-card, .reason, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Purchase button functionality in modal
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('purchase-btn')) {
            window.open('https://discord.gg/sunucunuzunadi', '_blank');
        }
    });
});
