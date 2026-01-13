document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const CONFIG = {
        password: "loke243856", // Updated by User Request
        whatsappNumber: "918122699623", // Updated by User Request
        whatsappMessage: "இனிய பொங்கல் திருநாள் நல்வாழ்த்துகள் தோழியே !!. may be this surprize unna dissapoint panna thu nu nenaikiren pa (◕ヮ◕)......The password is: loke243856",
        loadingTime: 2500 // 2.5 seconds
    };

    // --- References ---
    const loaderSection = document.getElementById('loader-section');
    const gateSection = document.getElementById('gate-section');
    const revealSection = document.getElementById('reveal-section');
    const contentSection = document.getElementById('content-section');
    const passwordInput = document.getElementById('password-input');
    const whatsappLink = document.getElementById('whatsapp-link');
    const revealCard = document.getElementById('reveal-card');
    const qrImage = document.getElementById('qr-image');

    // --- Initialization ---

    // 1. Simulate Loading
    setTimeout(() => {
        switchSection(loaderSection, gateSection);
    }, CONFIG.loadingTime);

    // 2. Setup WhatsApp Link
    const encodedMsg = encodeURIComponent(CONFIG.whatsappMessage);
    whatsappLink.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMsg}`;

    // 3. Setup Reveal Interaction
    if (revealCard) {
        revealCard.addEventListener('click', () => {
            switchSection(revealSection, contentSection);
            triggerSparkles(); // ✨ Sparkle Shower!

            // Trigger Text Animation
            const creatorText = document.getElementById('creator-text');
            if (creatorText) {
                creatorText.classList.remove('animate-drop'); // Reset just in case
                void creatorText.offsetWidth; // Reflow
                creatorText.classList.add('animate-drop');
            }
        });
    }

    // --- Functions ---
    // ...

    // Confetti Animation (Physics based for "Pop & Fall" effect)
    // ... (existing confetti code) ...

    // Sparkle Animation (Simple rain from top)
    function triggerSparkles() {
        const count = 40;
        for (let i = 0; i < count; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');

            // Random Horizontal Position
            sparkle.style.left = Math.random() * 100 + 'vw';

            // Random Fall Speed & Delay
            const duration = Math.random() * 2 + 1.5 + 's';
            const delay = Math.random() * 0.5 + 's';

            sparkle.style.animation = `sparkleFall ${duration} linear forwards ${delay}`;

            document.body.appendChild(sparkle);

            setTimeout(() => {
                sparkle.remove();
            }, 4000);
        }
    }

    // --- Functions ---

    // Switch between sections with fade effect
    function switchSection(hideEl, showEl) {
        hideEl.style.opacity = '0';
        setTimeout(() => {
            hideEl.classList.add('hidden');
            hideEl.classList.remove('active');

            showEl.classList.remove('hidden');
            showEl.classList.add('active');

            // Trigger reflow for animation
            void showEl.offsetWidth;
            showEl.style.opacity = '1';
        }, 500); // Wait for opacity transition
    }

    // Password Validation
    window.validatePassword = function () {
        const value = passwordInput.value;

        if (value === CONFIG.password) {
            // Success
            passwordInput.blur();
            triggerConfetti(); // 🎊 Pop Confetti

            // Show Reveal Screen
            setTimeout(() => {
                switchSection(gateSection, revealSection);
            }, 1000); // 1s delay to let them see "confetti" start while on gate, then switch.
        } else {
            // Failure
            triggerErrorEffect();
        }
    };

    // Toggle Password Visibility
    window.togglePasswordVisibility = function () {
        const eyeIcon = document.getElementById('eye-icon');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Toggle Icon (Simple opacity change or path swap could be done. Here we just keep same icon but maybe could change color)
        eyeIcon.style.opacity = type === 'text' ? '1' : '0.5';
    };

    // Confetti Animation (Physics based for "Pop & Fall" effect)
    function triggerConfetti() {
        const colors = ['#7000FF', '#00D4FF', '#FF4B4B', '#FFD700', '#32CD32'];
        const particles = [];
        const particleCount = 100;

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('confetti');

            // Random Color
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];

            // Initial Position (Two sources: Bottom Left, Bottom Right)
            const isLeft = Math.random() > 0.5;
            const startX = isLeft ? -10 : window.innerWidth + 10;
            const startY = window.innerHeight;

            document.body.appendChild(particle);

            // Velocity
            // Left source: vx > 0. Right source: vx < 0.
            const velocityX = isLeft ? (Math.random() * 15 + 5) : -(Math.random() * 15 + 5);
            const velocityY = -(Math.random() * 20 + 15); // Upward pop (negative Y)

            particles.push({
                element: particle,
                x: startX,
                y: startY,
                vx: velocityX,
                vy: velocityY,
                gravity: 0.8,
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 20
            });
        }

        // Animation Loop
        function update() {
            if (particles.length === 0) return; // Stop when empty

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];

                // Physics
                p.vx *= 0.96; // Air resistance
                p.vy += p.gravity; // Gravity
                p.x += p.vx;
                p.y += p.vy;
                p.rotation += p.rotationSpeed;

                // Apply
                p.element.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`;

                // Cleanup if fallen below screen
                if (p.y > window.innerHeight + 100) {
                    p.element.remove();
                    particles.splice(i, 1);
                }
            }

            requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    // Haptic & Visual Feedback
    function triggerErrorEffect() {
        // 1. Haptic Vibration (Android/Mobile mostly)
        if (navigator.vibrate) {
            navigator.vibrate([10, 50, 10]); // Short vibration pattern
        }

        // 2. Shake Animation
        passwordInput.classList.add('shake');
        passwordInput.classList.add('error-border');

        // Reset after animation
        setTimeout(() => {
            passwordInput.classList.remove('shake');
            passwordInput.classList.remove('error-border');
            passwordInput.value = '';
            passwordInput.focus();
        }, 400);
    }

    // Download QR
    window.downloadQR = function () {
        const link = document.createElement('a');
        link.href = qrImage.src;
        link.download = 'secure-qr-code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Enter key support
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            validatePassword();
        }
    });
});
