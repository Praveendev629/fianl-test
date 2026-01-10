document.addEventListener('DOMContentLoaded', () => {
    const authBtn = document.getElementById('auth-btn');
    const viewIntro = document.getElementById('view-intro');
    const viewPrank = document.getElementById('view-prank');
    const viewDownload = document.getElementById('view-download');

    // State management
    let state = 'intro'; // intro -> prank -> download

    authBtn.addEventListener('click', () => {
        if (state !== 'intro') return;

        // Transition to Prank View
        navigateTo(viewIntro, viewPrank, 'next');
        state = 'prank';

        // Auto-transition to Download View after delay
        // Start 15-second countdown before moving to download view
        const timerEl = document.getElementById('timer');
        let remaining = 15;
        if (timerEl) {
            timerEl.textContent = `${remaining} seconds remaining`;
            const interval = setInterval(() => {
                remaining--;
                if (remaining > 0) {
                    timerEl.textContent = `${remaining} seconds remaining`;
                } else {
                    timerEl.textContent = '';
                    clearInterval(interval);
                }
            }, 1000);
        }
        // Transition after 15 seconds
        setTimeout(() => {
            navigateTo(viewPrank, viewDownload, 'next');
            state = 'download';
        }, 15000); // 15s delay
    });

    /**
     * Handles the complex full-page transition logic
     * @param {HTMLElement} currentView - The view leaving the screen
     * @param {HTMLElement} nextView - The view entering the screen
     * @param {string} direction - 'next' or 'prev' (useful for future expansion)
     */
    function navigateTo(currentView, nextView, direction = 'next') {
        // Setup initial state for the incoming view
        nextView.classList.remove('prev', 'next');
        nextView.classList.add(direction === 'next' ? 'next' : 'prev'); // Start from right or left

        // Force Reflow
        void nextView.offsetWidth;

        // Animate Current View Out
        currentView.classList.remove('active');
        currentView.classList.add(direction === 'next' ? 'prev' : 'next'); // Go to left or right

        // Animate Next View In
        nextView.classList.remove('prev', 'next');
        nextView.classList.add('active');
    }
});
