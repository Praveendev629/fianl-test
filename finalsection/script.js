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
    await showMessage('Thanks for all your effort to see Praveen ❤️✨', true, 4000);

    // Step 2: Coming soon
    await showDots('Praveen is coming to see you', 4000);

    // Step 3: Warning/Gift
    clearApp();
    const warningDiv = document.createElement('div');
    warningDiv.className = 'message';
    warningDiv.style.opacity = '1';
    warningDiv.innerHTML = 'Wait! Before you see Praveen, he sent you a small gift... 🎁<br>Would you like to open it?';
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
        showPopups();
    }

    if (state.currentImageIndex < state.images.length - 1) {
        state.currentImageIndex++;
        showImageSection();
    } else {
        showLetterOption();
    }
}

function showPopups() {
    const left = document.createElement('div');
    left.className = 'popup left';
    left.innerText = 'Surprise! ✨';
    document.body.appendChild(left);

    const right = document.createElement('div');
    right.className = 'popup right';
    right.innerText = 'Something special! 💖';
    document.body.appendChild(right);

    setTimeout(() => {
        left.remove();
        right.remove();
    }, 3000);
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
      <div style="position: absolute; top: -10px; right: -10px; font-size: 4rem; opacity: 0.1; color: var(--accent-color);">❤️</div>
      <h2 style="color: var(--accent-color); font-size: 2rem; margin-bottom: 1.5rem; font-family: 'Outfit';">Dearest,</h2>
      <p style="font-size: 1.1rem; margin-bottom: 1rem;">I wanted to tell you how much I appreciate every little effort you make. You are special, and I'm so lucky to have you in my life.</p>
      <p style="font-size: 1.1rem;">Every moment feels better when you're around. Thank you for being the amazing person you are. ❤️✨</p>
      <div style="text-align: right; margin-top: 2rem; font-weight: 600; font-family: 'Outfit'; color: var(--accent-color); font-size: 1.2rem;">- Praveen</div>
    </div>
    <div id="letter-actions" style="margin-top: 2rem;">
      <button class="button" id="someone-came-btn">someone had come to see you</button>
    </div>
  `;
    app.appendChild(letterDiv);

    // Heart felt effect - floating hearts
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
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

    const btn = document.getElementById('someone-came-btn');
    btn.onclick = () => {
        btn.style.display = 'none';
        const nextText = document.createElement('div');
        nextText.className = 'reveal-text';
        nextText.innerText = 'see who had come to see you';
        document.getElementById('letter-actions').appendChild(nextText);

        setTimeout(() => {
            setupVideoTrigger();
        }, 2000);
    };
}

function setupVideoTrigger() {
    if (document.getElementById('fingerprint-sensor')) return;

    const trigger = document.createElement('div');
    trigger.id = 'fingerprint-sensor';
    trigger.className = 'fingerprint-sensor';
    trigger.innerHTML = '<div class="ring"></div><div class="ring" style="animation-delay: 0.4s;"></div>';
    document.body.appendChild(trigger);

    secretVideo.style.opacity = '0';
    secretVideo.style.display = 'block';
    secretVideo.style.pointerEvents = 'none';

    const playVideo = (e) => {
        if (e.cancelable) e.preventDefault();
        trigger.classList.add('active');
        secretVideo.style.opacity = '1';
        secretVideo.play();
    };

    const stopVideo = (e) => {
        if (e.cancelable) e.preventDefault();
        trigger.classList.remove('active');
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
}


document.addEventListener('DOMContentLoaded', startFlow);
