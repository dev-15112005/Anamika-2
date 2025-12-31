// ===== GLOBAL FUNCTIONS =====
function checkAuth() {
    if (sessionStorage.getItem('loggedIn') !== 'true') {
        alert('Please login first!');
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

function createHearts(container, count = 20) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        
        const left = Math.random() * 100;
        const size = Math.random() * 20 + 15;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        heart.style.left = `${left}%`;
        heart.style.fontSize = `${size}px`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        
        container.appendChild(heart);
    }
}

// ===== LOGIN PAGE =====
if (document.querySelector('.login-page')) {
    // Create falling hearts
    const heartsContainer = document.querySelector('.hearts-container');
    if (heartsContainer) createHearts(heartsContainer, 25);
    
    // Form Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === 'Anamika Maurya' && password === '15112005') {
                // Success
                sessionStorage.setItem('loggedIn', 'true');
                sessionStorage.setItem('username', username);
                
                // Show success message
                const btn = this.querySelector('.login-btn');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> Welcome!';
                btn.style.background = '#4CAF50';
                
                setTimeout(() => {
                    window.location.href = 'gift.html';
                }, 1500);
            } else {
                // Error
                this.classList.add('shake');
                setTimeout(() => this.classList.remove('shake'), 500);
                
                const btn = this.querySelector('.login-btn');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-times"></i> Wrong Credentials';
                btn.style.background = '#f44336';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                }, 2000);
            }
        });
    }
    
    // Face Login
    const faceBtn = document.getElementById('faceLoginBtn');
    if (faceBtn) {
        faceBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scanning...';
            this.disabled = true;
            
            // Animate scanning
            const scan = document.querySelector('.scanning-effect');
            const dots = document.querySelectorAll('.dot');
            
            scan.style.animationDuration = '0.5s';
            dots.forEach(dot => {
                dot.style.animationDuration = '0.3s';
                dot.style.backgroundColor = '#FFD700';
            });
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Face Verified!';
                this.style.background = '#4CAF50';
                
                scan.style.background = 'linear-gradient(90deg, transparent, #4CAF50, transparent)';
                dots.forEach(dot => {
                    dot.style.backgroundColor = '#4CAF50';
                });
                
                sessionStorage.setItem('loggedIn', 'true');
                sessionStorage.setItem('username', 'Anamika Maurya');
                
                setTimeout(() => {
                    window.location.href = 'gift.html';
                }, 1500);
            }, 3000);
        });
    }
    
    // Shake animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .shake { animation: shake 0.5s; }
    `;
    document.head.appendChild(style);
}

// ===== GIFT PAGE =====
if (document.querySelector('.gift-page')) {
    // Check authentication
    if (!checkAuth()) return;
    
    // Gift box functionality
    const giftBox = document.getElementById('giftBox');
    const loveLetter = document.getElementById('loveLetter');
    
    if (giftBox) {
        giftBox.addEventListener('click', function() {
            // Open animation
            this.classList.add('open');
            
            // Create sparkles
            for (let i = 0; i < 8; i++) {
                setTimeout(() => createSparkle(this), i * 100);
            }
            
            // Show letter after delay
            setTimeout(() => {
                this.style.display = 'none';
                if (loveLetter) loveLetter.style.display = 'block';
            }, 1200);
        });
    }
    
    function createSparkle(container) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, #FFD700, #FF69B4);
            border-radius: 50%;
            left: ${Math.random() * 250}px;
            top: ${Math.random() * 250}px;
            box-shadow: 0 0 10px #FFD700;
            z-index: 10;
        `;
        
        container.appendChild(sparkle);
        
        sparkle.animate([
            { transform: 'scale(0) rotate(0deg)', opacity: 1 },
            { transform: 'scale(1) rotate(180deg)', opacity: 0.5 },
            { transform: 'scale(0) rotate(360deg)', opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out'
        });
        
        setTimeout(() => sparkle.remove(), 800);
    }
    
    // Navigation
    const backBtn = document.getElementById('backBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (!giftBox.classList.contains('open')) {
                alert('Please open your gift first! 🎁');
                return;
            }
            window.location.href = 'countdown.html';
        });
    }
}

// ===== COUNTDOWN PAGE =====
if (document.querySelector('.countdown-page')) {
    // Check authentication
    if (!checkAuth()) return;
    
    // Countdown functionality
    const targetDate = new Date('January 1, 2026 00:00:00').getTime();
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const newYearMessage = document.getElementById('newYearMessage');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            showCelebration();
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        // Flip animation
        [daysElement, hoursElement, minutesElement, secondsElement].forEach(el => {
            if (el) el.classList.add('flip');
            setTimeout(() => el.classList.remove('flip'), 300);
        });
    }
    
    function showCelebration() {
        // Hide countdown
        const timer = document.getElementById('countdownTimer');
        const target = document.querySelector('.target-date');
        if (timer) timer.style.display = 'none';
        if (target) target.style.display = 'none';
        
        // Show celebration
        if (newYearMessage) newYearMessage.style.display = 'block';
        
        // Create fireworks
        createFireworks();
        
        // Create balloons
        createBalloons();
    }
    
    function createFireworks() {
        const colors = ['#FF69B4', '#4A90E2', '#FFD700', '#32CD32'];
        
        setInterval(() => {
            if (Math.random() > 0.7) {
                const firework = document.createElement('div');
                firework.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    width: 5px;
                    height: 5px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: 50%;
                    z-index: 100;
                    opacity: 0;
                `;
                
                document.body.appendChild(firework);
                
                firework.animate([
                    { transform: 'scale(0)', opacity: 1 },
                    { transform: 'scale(3)', opacity: 0.8 },
                    { transform: 'scale(0)', opacity: 0 }
                ], {
                    duration: 1500,
                    easing: 'ease-out'
                });
                
                setTimeout(() => firework.remove(), 1500);
            }
        }, 800);
    }
    
    function createBalloons() {
        function createBalloon() {
            const balloon = document.createElement('div');
            const colors = ['#FF69B4', '#4A90E2', '#FFD700', '#32CD32'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            balloon.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                bottom: -100px;
                width: ${Math.random() * 40 + 30}px;
                height: ${Math.random() * 60 + 40}px;
                background: ${color};
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                animation: balloonFloat ${Math.random() * 20 + 15}s linear infinite;
                opacity: 0.7;
                z-index: 99;
            `;
            
            document.body.appendChild(balloon);
            
            setTimeout(() => balloon.remove(), 20000);
        }
        
        // Create initial balloons
        for (let i = 0; i < 10; i++) {
            setTimeout(createBalloon, i * 500);
        }
        
        // Keep creating
        setInterval(createBalloon, 2000);
    }
    
    // Add CSS animations
    const countdownStyle = document.createElement('style');
    countdownStyle.textContent = `
        @keyframes flip {
            0% { transform: rotateX(0deg); }
            50% { transform: rotateX(90deg); }
            100% { transform: rotateX(0deg); }
        }
        .flip { animation: flip 0.3s ease-in-out; }
        
        @keyframes balloonFloat {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.7; }
            100% { transform: translateY(-100vh) rotate(20deg); opacity: 0; }
        }
    `;
    document.head.appendChild(countdownStyle);
    
    // Start countdown
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
}// Extra celebration effects
function startCelebration() {
    // Confetti
    setInterval(createConfetti, 100);
    
    // Floating messages
    const messages = ['2026!', 'Happy!', 'New Year!', '🎉', '❤️'];
    setInterval(() => {
        createFloatingText(messages[Math.floor(Math.random() * messages.length)]);
    }, 1500);
}

function createConfetti() {
    if (Math.random() > 0.3) return;
    
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        top: -10px;
        left: ${Math.random() * 100}%;
        width: 10px;
        height: 10px;
        background: hsl(${Math.random() * 360}, 100%, 50%);
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        z-index: 99;
    `;
    
    document.body.appendChild(confetti);
    
    confetti.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    });
    
    setTimeout(() => confetti.remove(), 5000);
}

function createFloatingText(text) {
    const floatText = document.createElement('div');
    floatText.textContent = text;
    floatText.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}%;
        bottom: 0;
        font-size: ${Math.random() * 30 + 20}px;
        font-weight: bold;
        color: hsl(${Math.random() * 360}, 100%, 60%);
        opacity: 0;
        z-index: 100;
        pointer-events: none;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    `;
    
    document.body.appendChild(floatText);
    
    floatText.animate([
        { transform: 'translateY(0) scale(0.5)', opacity: 0 },
        { transform: 'translateY(-100px) scale(1)', opacity: 1 },
        { transform: 'translateY(-300px) scale(1.2)', opacity: 0 }
    ], {
        duration: 3000,
        easing: 'ease-out'
    });
    
    setTimeout(() => floatText.remove(), 3000);
}