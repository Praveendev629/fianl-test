const app = document.getElementById('app');
const secretVideo = document.getElementById('secretVideo');

const state = {
    currentStep: 0,
    images: [
        { src: 'images/img1.png', quote: 'tap to pick the gift' },
        { src: 'images/img2.png', quote: 'tap to unrap the ribbon' },
        { src: 'images/img3.png', quote: 'tap again to see what inside the box' },
        { src: 'images/img4.png', quote: 'agin you have an small gift inside' },
        { src: 'images/img5.png', quote: 'tap to see what inside' },
        { src: 'images/img6.png', quote: 'unribboning...' },
        { src: 'images/img7.png', quote: 'opening the box...' },
        { src: 'images/img8.png', quote: 'Look! Something special...' }
    ],
    currentImageIndex: 0
};

function clearApp() {
    app.innerHTML = '';
}

function showMessage(text, isFadeOut = true, duration = 3000) {
    return new Promise((resolve) => {
        clearApp();
        const div = document.createElement('div');
        div.className = 'message';
        div.innerHTML = text;
        app.appendChild(div);

        setTimeout(() => {
            if (isFadeOut) {
                div.style.animation = 'fadeOut 2s forwards';
                setTimeout(resolve, 2000);
            } else {
                resolve();
            }
        }, duration);
    });
}

function showDots(text, duration = 4000) {
    return new Promise((resolve) => {
        clearApp();
        const div = document.createElement('div');
        div.innerHTML = `
      <div class="message">${text}</div>
      <div class="loading-dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    `;
        app.appendChild(div);
        setTimeout(resolve, duration);
    });
}

async function startFlow() {
    // Step 1: Thanks
    await showMessage('Thanks for all your effort to see Praveen💖 💝', true, 4000);

    // Step 2: Coming soon
    await showDots('Praveen is coming to see you', 4000);

    // Step 3: Warning/Gift
    clearApp();
    const warningDiv = document.createElement('div');
    warningDiv.className = 'message';
    warningDiv.style.opacity = '1';
    warningDiv.innerHTML = 'Wait! Before you see Praveen, he sent you a small gift...<br>Would you like to open it?';
    const btn = document.createElement('button');
    btn.className = 'button';
    btn.innerText = 'Open Gift';
    btn.onclick = loadGift;
    app.appendChild(warningDiv);
    app.appendChild(btn);
}

async function loadGift() {
    await showDots('Gift is loading', 3000);
    showImageSection();
}

function showImageSection() {
    clearApp();
    const imgData = state.images[state.currentImageIndex];

    const quoteDiv = document.createElement('div');
    quoteDiv.className = 'message';
    quoteDiv.style.opacity = '1';
    quoteDiv.style.fontSize = '1.2rem';
    quoteDiv.innerText = imgData.quote;

    const img = document.createElement('img');
    img.src = imgData.src;
    img.className = 'gift-image';
    img.onclick = handleImageClick;

    app.appendChild(quoteDiv);
    app.appendChild(img);
}

function handleImageClick() {
    if (state.currentImageIndex === 1) {
        launchConfetti();
    }

    if (state.currentImageIndex < state.images.length - 1) {
        state.currentImageIndex++;
        showImageSection();
    } else {
        showLetterOption();
    }
}

function launchConfetti() {
    const count = 100;
    const defaults = {
        origin: { y: 0.7 }
    };

    for (let i = 0; i < count; i++) {
        createConfettiParticle(Math.random() > 0.5);
    }
}

function createConfettiParticle(isLeft) {
    const confetti = document.createElement('div');
    const colors = ['#ff3e60', '#ffb400', '#4ade80', '#60a5fa', '#a855f7', '#ec4899'];

    confetti.className = 'confetti-particle';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    const size = Math.random() * 8 + 4;
    confetti.style.width = size + 'px';
    confetti.style.height = size + 'px';

    const startX = isLeft ? -50 : window.innerWidth + 50;
    const startY = window.innerHeight * (0.4 + Math.random() * 0.4);

    document.body.appendChild(confetti);

    const destinationX = isLeft ? window.innerWidth * (0.1 + Math.random() * 0.4) : window.innerWidth * (0.5 + Math.random() * 0.4);
    const destinationY = startY - (Math.random() * 300 + 100);

    const angle = (isLeft ? -45 : 225) + (Math.random() * 30 - 15);
    const velocity = Math.random() * 15 + 15;
    const gravity = 0.4;
    const friction = 0.98;

    let curX = startX;
    let curY = startY;
    let velX = Math.cos(angle * Math.PI / 180) * velocity;
    let velY = Math.sin(angle * Math.PI / 180) * velocity;
    let rotation = Math.random() * 360;
    let rotVel = Math.random() * 10 - 5;

    const update = () => {
        velX *= friction;
        velY += gravity;
        curX += velX;
        curY += velY;
        rotation += rotVel;

        confetti.style.transform = `translate3d(${curX}px, ${curY}px, 0) rotate(${rotation}deg)`;

        if (curY > window.innerHeight + 100) {
            confetti.remove();
        } else {
            requestAnimationFrame(update);
        }
    };

    requestAnimationFrame(update);
}

function showLetterOption() {
    clearApp();
    const div = document.createElement('div');
    div.className = 'message';
    div.style.opacity = '1';
    div.innerHTML = 'Would you like to open the letter that Praveen sent you?';

    const btn = document.createElement('button');
    btn.className = 'button';
    btn.innerText = 'Yes';
    btn.onclick = showLetter;

    app.appendChild(div);
    app.appendChild(btn);
}

async function showLetter() {
    clearApp();
    const letterDiv = document.createElement('div');
    letterDiv.className = 'letter';
    letterDiv.innerHTML = `
    <div style="background: rgba(255,255,255,0.95); color: #2d3436; padding: 2.5rem; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.6); font-family: 'Georgia', serif; line-height: 1.8; position: relative; overflow: hidden;">
      <div class="letter-icon" style="position: absolute; top: 10px; right: 10px; opacity: 0.1; color: var(--accent-color);">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
      </div>
      <h2 style="color: var(--accent-color); font-size: 2rem; margin-bottom: 1.5rem; font-family: 'Outfit';">Dearest,</h2>
      <p style="font-size: 1.1rem; margin-bottom: 1rem;">I wanted to tell you how much I appreciate every little effort you make. You are special, and I'm so lucky to have you in my life.</p>
      <p style="font-size: 1.1rem;">Itha patha odana un face la oru smila varum la pa antah smile ka tha na ivlovum pannen pa and ithu may be unna dissapoint panna thu nu nenaikiren. Thank you for being the amazing person you are.</p>
      <div style="text-align: right; margin-top: 2rem; font-weight: 600; font-family: 'Outfit'; color: var(--accent-color); font-size: 1.2rem;">- P.S  [ never forget how amazing you are ]</div>
    </div>
    <div id="letter-actions" style="margin-top: 2rem;">
      <div class="message" style="opacity: 1; font-size: 1.2rem; display: block;">Someone had come to see you!</div>
      <button class="button" id="see-who-btn" style="margin-top: 1rem;">See who had come to see you</button>
    </div>
  `;
    app.appendChild(letterDiv);

    // Floating hearts effect
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '110vh';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.opacity = Math.random();
        heart.style.transition = `all ${Math.random() * 3 + 2}s linear`;
        heart.style.zIndex = '1';
        document.body.appendChild(heart);
        setTimeout(() => {
            heart.style.top = '-10vh';
            heart.style.transform = `translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg)`;
        }, 100);
        setTimeout(() => heart.remove(), 5000);
    }

    document.getElementById('see-who-btn').onclick = () => {
        // Fade out letter
        letterDiv.style.animation = 'fadeOut 1s forwards';
        document.getElementById('letter-actions').style.animation = 'fadeOut 1s forwards';

        setTimeout(() => {
            clearApp();
            setupVideoTrigger();
        }, 1000);
    };
}

function setupVideoTrigger() {
    if (document.getElementById('fingerprint-sensor')) return;

    const trigger = document.createElement('div');
    trigger.id = 'fingerprint-sensor';
    trigger.className = 'fingerprint-sensor';
    trigger.innerHTML = `
    <div class="bubble-message">Hold to see Praveen</div>
    <div class="progress-ring"></div>
    <div class="ring"></div>
    <div class="ring" style="animation-delay: 0.4s;"></div>
  `;
    document.body.appendChild(trigger);

    const volumeWarning = document.createElement('div');
    volumeWarning.className = 'volume-warning-hud';
    volumeWarning.innerHTML = `
        <div class="volume-hud-container">
            <div class="volume-icon-wrapper">
                <svg class="speaker-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 5L6 9H2V15H6L11 19V5Z"></path>
                </svg>
            </div>
            <div class="volume-slider">
                <div class="volume-level"></div>
            </div>
        </div>
        <div class="volume-text">LOWER YOUR VOLUME</div>
    `;
    document.body.appendChild(volumeWarning);

    secretVideo.style.display = 'block';
    secretVideo.style.pointerEvents = 'none';
    secretVideo.style.opacity = '0';

    let revealTimer;
    let textFadeTimer;

    const playVideo = (e) => {
        if (e.cancelable) e.preventDefault();
        trigger.classList.add('active');
        const bubble = trigger.querySelector('.bubble-message');
        if (bubble) bubble.style.opacity = '0';

        // Start narrative sequence
        volumeWarning.style.transition = 'opacity 1s ease';
        volumeWarning.style.opacity = '1';

        textFadeTimer = setTimeout(() => {
            volumeWarning.style.opacity = '0';
            secretVideo.style.opacity = '1';

            revealTimer = setTimeout(() => {
                secretVideo.play();
            }, 1000); // Wait for fade-in to be well underway before playing
        }, 2000); // Show text for 2 seconds before starting video reveal
    };

    const stopVideo = (e) => {
        if (e.cancelable) e.preventDefault();
        trigger.classList.remove('active');
        const bubble = trigger.querySelector('.bubble-message');
        if (bubble) bubble.style.opacity = '1';

        // Clear all timers
        clearTimeout(textFadeTimer);
        clearTimeout(revealTimer);

        // Reset visuals
        volumeWarning.style.opacity = '0';
        secretVideo.style.opacity = '0';
        secretVideo.pause();
        secretVideo.currentTime = 0;
    };

    trigger.addEventListener('touchstart', playVideo);
    trigger.addEventListener('mousedown', playVideo);
    trigger.addEventListener('touchend', stopVideo);
    trigger.addEventListener('touchcancel', stopVideo);
    trigger.addEventListener('mouseup', stopVideo);
    trigger.addEventListener('mouseleave', stopVideo);

    // Final Section Trigger
    secretVideo.onended = () => {
        showFinalSection();
    };
}

async function showFinalSection() {
    // 1. Hide video and sensor
    secretVideo.style.opacity = '0';
    const sensor = document.getElementById('fingerprint-sensor');
    const volumeHud = document.querySelector('.volume-warning-hud');
    if (sensor) sensor.style.display = 'none';
    if (volumeHud) volumeHud.style.display = 'none';

    setTimeout(async () => {
        secretVideo.style.display = 'none';

        // 2. Intermediate message
        await showMessage('one day praveen will meet you ....... 🤞🚲✨', true, 4000);

        // 3. Show final message and WhatsApp button
        clearApp();
        const container = document.createElement('div');
        container.className = 'final-section';
        container.innerHTML = `
            <div class="message">well !! thats it praveen had gone ✨😊</div>
            <p style="margin-bottom: 2rem; opacity: 0.8;">You need to message Praveen...</p>
            <a href="https://wa.me/918122699623" target="_blank" class="button whatsapp-btn">
                Message Praveen
            </a>
        `;
        app.appendChild(container);
    }, 1500);
}


document.addEventListener('DOMContentLoaded', startFlow);
