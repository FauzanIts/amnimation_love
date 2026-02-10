const blk_pitn = {
        block1: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
        block2: [[0, 1], [0, 0], [-1, 0], [0, -1]],
        block3: [[-1, 1], [0, 0], [-1, 0], [-1, -1]],
        block4: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block5: [[-1, 1], [0, 0], [-1, 0], [0, -1]],
        block6: [[0, -1], [0, 0], [-1, 0], [1, -1]],
        block7: [[-1, -1], [0, 0], [-1, 0], [1, 0]],
        block8: [[-1, 1], [0, 0], [-1, 0], [-1, -1]], /* 3 */
        block9: [[0, -1], [0, 0], [-1, 0], [1, 0]],
        block10: [[-1, 1], [0, 0], [-1, 0], [1, 0]],
        block11: [[2, 0], [0, 0], [-1, 0], [1, 0]], /* — */
        block12: [[0, 1], [0, 0], [-1, 0], [0, -1]], /* 2 */
        block13: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block14: [[1, 1], [0, 0], [-1, 0], [1, 0]],
        block15: [[1, -1], [0, 0], [-1, 0], [1, 0]],
        block16: [[-1, -1], [0, 0], [-1, 0], [1, 0]], /* 7 */
        block17: [[0, 1], [0, 0], [-1, 0], [0, -1]], /* 2 */
        block18: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block19: [[0, -1], [0, 0], [-1, 0], [1, 0]], /* 9 */
        block20: [[1, -1], [0, 0], [-1, 0], [1, 0]],
        block21: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block22: [[1, 1], [0, 0], [-1, 0], [1, 0]], /* 14 */
        block23: [[0, 2], [0, 0], [0, -1], [0, 1]]      /* | */
    },
    offset_pitn = {
        block1: [5, 3],
        block2: [5, 1],
        block3: [3, 4],
        block4: [3, 2],
        block5: [3, -1],
        block6: [2, 5],
        block7: [2, 1],
        block8: [1, -1],
        block9: [1, -3],
        block10: [1, 2],
        block11: [0, 3],
        block12: [0, 0], 
        block13: [-1, -4],
        block14: [0, -2],
        block15: [-2, 4],
        block16: [-2, 2],
        block17: [-2, 0],
        block18: [-3, -2],
        block19: [-4, 0],
        block20: [-3, 5],
        block21: [-5, 3],
        block22: [-4, 1],
        block23: [-6, 1]   
    };

let blocks, block, love, timer = null, index = 0, clone_block;
let block_left, block_top;

function Next() {
    if (++index >= 24) {
        clearInterval(timer);

        Rise();
        return;
    }

    block.style.visibility = "visible"; 

    block.style.left = block_left + 40 * offset_pitn["block" + index][0] + "px";
    block.style.top = block_top - 40 * offset_pitn["block" + index][1] + "px";
    for (let i = 0; i < block.children.length; i++) {
        block.children[i].style.left = blk_pitn["block" + index][i][0] * -40 + "px";
        block.children[i].style.top = blk_pitn["block" + index][i][1] * -40 + "px";
    }

    clone_block = block.cloneNode(true);
    love.appendChild(clone_block);

    if (love.children.length >= 25) {
        blocks[blocks.length - 1].children[2].style.display = "none";
        block.style.display = "none";   
    }
}

function Rise() {
    console.log("开始升空");
    let timer2 = null,
        distance = 0;
    const target = 120, 
        speed = 1;

    let love_top = parseFloat(window.getComputedStyle(love, null).top.slice(0, -2));


    timer2 = setInterval(() => {
        distance += speed;
        if (distance >= target) {
            clearInterval(timer2);

            console.log("升空完毕");

            // Show "I Love You" text
            const loveText = document.getElementById('loveText');
            if (loveText) {
                loveText.classList.add('show');
            }

            // Show subtitle after a short delay
            setTimeout(() => {
                const loveSub = document.getElementById('loveSubtitle');
                if (loveSub) {
                    loveSub.classList.add('show');
                }

                // Show open letter button after subtitle
                setTimeout(() => {
                    const btn = document.getElementById('openLetterBtn');
                    if (btn) {
                        btn.style.display = 'inline-block';
                    }
                }, 2000);
            }, 1500);
        }

        love.style.top = (love_top - distance) + "px";

    }, 22);

}

window.onload = function () {
    // Initialize DOM elements
    blocks = document.getElementsByClassName("block");
    block = blocks[0];
    love = document.getElementsByClassName("love")[0];
    timer = null;
    index = 0;

    block.style.top = "50%";
    block.style.left = "50%";
    block.style.margin = "-20px 0 0 -20px";

    block_left = parseFloat(window.getComputedStyle(block, null).left.slice(0, -2));
    block_top = parseFloat(window.getComputedStyle(block, null).top.slice(0, -2));

    const audio = document.getElementById('audios');
    const overlay = document.getElementById('tapOverlay');

    // Start everything on tap
    function startAll() {
        // Hide overlay
        if (overlay) {
            overlay.style.display = 'none';
        }

        // Show container and footer
        var mainContainer = document.getElementById('mainContainer');
        var mainFooter = document.getElementById('mainFooter');
        if (mainContainer) mainContainer.style.display = '';
        if (mainFooter) mainFooter.style.display = '';

        // Recalculate positions after container is visible
        block.style.top = "50%";
        block.style.left = "50%";
        block.style.margin = "-20px 0 0 -20px";
        block_left = parseFloat(window.getComputedStyle(block, null).left.slice(0, -2));
        block_top = parseFloat(window.getComputedStyle(block, null).top.slice(0, -2));

        // Play music
        if (audio) {
            audio.load();
            audio.currentTime = 0;
            var playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(function(e) {
                    console.log('Audio play failed:', e);
                    // Retry once
                    setTimeout(function() { audio.play(); }, 100);
                });
            }
        }

        // Start music visualizer
        startMusicVisualizer(audio);

        // Start border animation
        const borderTop = document.querySelector('.border-top');
        const borderBottom = document.querySelector('.border-bottom');
        if (borderTop) borderTop.classList.add('animate');
        if (borderBottom) borderBottom.classList.add('animate');

        // Start floating hearts
        startFloatingHearts();

        // Start heart animation after 12s (border finishes)
        setTimeout(() => {
            timer = setInterval(() => {
                Next();
            }, 300);
        }, 12000);
    }

    if (overlay) {
        overlay.addEventListener('click', startAll);
        overlay.addEventListener('touchend', startAll);
    }
};

// ==================  Floating Hearts Particle System  ==================
function startFloatingHearts() {
    const canvas = document.getElementById('heartsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const hearts = [];
    const heartColors = [
        'rgba(255,105,135,0.35)',
        'rgba(255,150,170,0.3)',
        'rgba(255,80,100,0.25)',
        'rgba(255,182,193,0.35)',
        'rgba(220,80,110,0.2)',
        'rgba(255,130,160,0.3)'
    ];

    function createHeart() {
        return {
            x: Math.random() * canvas.width,
            y: canvas.height + 20,
            size: Math.random() * 12 + 6,
            speedY: Math.random() * 0.8 + 0.3,
            speedX: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.4 + 0.15,
            color: heartColors[Math.floor(Math.random() * heartColors.length)],
            wobbleAmp: Math.random() * 1.5 + 0.5,
            wobbleSpeed: Math.random() * 0.02 + 0.01,
            phase: Math.random() * Math.PI * 2,
            rotation: Math.random() * 0.5 - 0.25
        };
    }

    // Seed initial hearts
    for (let i = 0; i < 18; i++) {
        const h = createHeart();
        h.y = Math.random() * canvas.height;
        hearts.push(h);
    }

    function drawHeart(x, y, size, color, rot) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rot);
        ctx.beginPath();
        const topY = -size / 2;
        ctx.moveTo(0, size * 0.3);
        ctx.bezierCurveTo(-size, topY - size * 0.2, -size * 0.5, topY - size * 0.7, 0, topY);
        ctx.bezierCurveTo(size * 0.5, topY - size * 0.7, size, topY - size * 0.2, 0, size * 0.3);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }

    let frame = 0;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frame++;

        // Add new heart occasionally
        if (frame % 40 === 0 && hearts.length < 35) {
            hearts.push(createHeart());
        }

        for (let i = hearts.length - 1; i >= 0; i--) {
            const h = hearts[i];
            h.y -= h.speedY;
            h.x += Math.sin(h.phase) * h.wobbleAmp * 0.3 + h.speedX;
            h.phase += h.wobbleSpeed;

            if (h.y < -30) {
                hearts.splice(i, 1);
                continue;
            }

            drawHeart(h.x, h.y, h.size, h.color, h.rotation);
        }

        requestAnimationFrame(animate);
    }
    animate();
}

// ==================  Music Visualizer  ==================
function startMusicVisualizer(audio) {
    const vizContainer = document.getElementById('musicVisualizer');
    if (!vizContainer || !audio) return;

    vizContainer.style.display = 'flex';
    const bars = vizContainer.querySelectorAll('.viz-bar');

    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioCtx.createMediaElementSource(audio);
        const analyser = audioCtx.createAnalyser();

        analyser.fftSize = 64;
        source.connect(analyser);
        analyser.connect(audioCtx.destination);

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        function updateBars() {
            analyser.getByteFrequencyData(dataArray);

            // Pick frequency bands spread across spectrum
            const step = Math.floor(bufferLength / bars.length);
            for (let i = 0; i < bars.length; i++) {
                const value = dataArray[i * step];
                const height = Math.max(4, (value / 255) * 35);
                bars[i].style.height = height + 'px';

                // Color intensity based on height
                const intensity = Math.min(255, 150 + value * 0.4);
                bars[i].style.background = `linear-gradient(to top, rgb(212,114,122), rgb(255,${intensity},${intensity + 20}))`;
            }

            requestAnimationFrame(updateBars);
        }
        updateBars();

    } catch (e) {
        // Fallback: fake visualizer with random animation
        console.log('Web Audio API not supported, using fallback visualizer');
        function fakeBars() {
            for (let i = 0; i < bars.length; i++) {
                const h = Math.random() * 28 + 4;
                bars[i].style.height = h + 'px';
            }
            setTimeout(fakeBars, 150);
        }
        fakeBars();
    }
}

// ==================  Auto Pause/Resume on Tab Switch  ==================
document.addEventListener('visibilitychange', function() {
    var audio = document.getElementById('audios');
    if (!audio) return;
    if (document.hidden) {
        audio.pause();
    } else {
        audio.play().catch(function(){});
    }
});

window.addEventListener('pagehide', function() {
    var audio = document.getElementById('audios');
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
});

window.addEventListener('beforeunload', function() {
    var audio = document.getElementById('audios');
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
});

// ==================  Page 2: Love Letter  ==================
function showLoveLetter() {
    const page2 = document.getElementById('page2');
    if (!page2) return;

    page2.style.display = 'block';
    // Trigger reflow then add visible class for fade-in
    page2.offsetHeight;
    page2.classList.add('visible');

    // Start countdown
    startCountdown();

    // Start typing effect after a short delay
    setTimeout(() => {
        typeLoveLetter();
    }, 1500);
}

function startCountdown() {
    const startDate = new Date('2026-01-16');
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const countdownText = document.getElementById('countdownText');
    if (countdownText) {
        countdownText.textContent = 'Sudah ' + diffDays + ' hari bersama kamu \u2764\uFE0F';
    }
}

function typeLoveLetter() {
    const letterBody = document.getElementById('letterBody');
    const letterClosing = document.getElementById('letterClosing');
    if (!letterBody) return;

    const lines = [
        'Hai Nurlian sayang,',
        '',
        'Aku tau mungkin aku bukan orang yang paling sempurna,',
        'tapi aku ingin kamu tau bahwa setiap hari bersamamu',
        'adalah hari terbaik dalam hidupku.',
        '',
        'Kamu adalah alasan kenapa aku bangun setiap pagi',
        'dengan senyuman. Kamu adalah tempat pulangku',
        'di saat dunia terasa terlalu berat.',
        '',
        'Terima kasih sudah menjadi rumahku,',
        'terima kasih sudah menjadi ceritaku,',
        'terima kasih sudah menjadi mimpiku yang paling indah.',
        '',
        'Aku berjanji akan selalu menjaga hatimu,',
        'menemanimu di hari-hari sulit,',
        'dan tertawa bersamamu di hari-hari bahagia.',
        '',
        'Kamu bukan hanya cintaku,',
        'kamu adalah segalanya bagiku. \u2764\uFE0F',
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let currentLineEl = null;

    // Add cursor element
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    letterBody.appendChild(cursor);

    function typeChar() {
        if (lineIndex >= lines.length) {
            // Done typing - remove cursor and show closing
            cursor.remove();
            if (letterClosing) {
                letterClosing.style.opacity = '1';
            }
            // Hide scroll hint
            const hint = document.getElementById('scrollHint');
            if (hint) hint.style.display = 'none';

            // Show interactive sections after letter is done
            setTimeout(() => {
                showInteractiveSections();
            }, 2000);
            return;
        }

        const line = lines[lineIndex];

        // Empty line = paragraph break
        if (line === '') {
            const br = document.createElement('div');
            br.style.height = '12px';
            letterBody.insertBefore(br, cursor);
            lineIndex++;
            setTimeout(typeChar, 200);
            return;
        }

        // Start new line
        if (charIndex === 0) {
            currentLineEl = document.createElement('div');
            currentLineEl.className = 'typed-line';
            letterBody.insertBefore(currentLineEl, cursor);
        }

        // Type one character
        currentLineEl.textContent = line.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex >= line.length) {
            // Line complete
            charIndex = 0;
            lineIndex++;
            setTimeout(typeChar, 300);
        } else {
            // Random typing speed for natural feel
            const speed = 30 + Math.random() * 40;
            setTimeout(typeChar, speed);
        }
    }

    typeChar();
}

// ==================  Interactive Sections  ==================
function showInteractiveSections() {
    const quiz = document.getElementById('quizSection');
    const scratch = document.getElementById('scratchSection');
    const timeline = document.getElementById('timelineSection');
    const slideshow = document.getElementById('slideshowSection');

    if (quiz) quiz.style.display = 'block';

    setTimeout(() => {
        if (scratch) {
            scratch.style.display = 'block';
            initScratchCard();
        }
    }, 500);

    setTimeout(() => {
        if (slideshow) {
            slideshow.style.display = 'block';
            initSlideshow();
        }
    }, 1000);

    setTimeout(() => {
        if (timeline) {
            timeline.style.display = 'block';
            animateTimeline();
        }
    }, 1500);

}

// ==================  Quiz Romantis  ==================
var quizReasonIndex = 0;
var quizReasonsList = [
    'Karena senyummu bisa bikin hariku langsung cerah \u2600\uFE0F',
    'Karena kamu selalu tau cara bikin aku ketawa \uD83D\uDE02',
    'Karena kamu sabar banget sama aku yang kadang menyebalkan \uD83D\uDE05',
    'Karena pelukanmu adalah tempat paling aman di dunia \uD83E\uDD17',
    'Karena kamu selalu percaya sama aku, bahkan saat aku ragu sama diri sendiri \uD83D\uDCAA',
    'Karena setiap hari bersamamu terasa seperti petualangan baru \u2728',
    'Karena kamu cantik, luar dan dalam \uD83E\uDD70',
    'Dan yang paling penting... karena kamu adalah KAMU \u2764\uFE0F'
];

function showNextReason() {
    const container = document.getElementById('quizReasons');
    const btn = document.getElementById('quizBtn');
    if (!container || !btn) return;

    if (quizReasonIndex >= quizReasonsList.length) {
        btn.textContent = 'Itu semua alasannya \u2764\uFE0F';
        btn.disabled = true;
        return;
    }

    const item = document.createElement('div');
    item.className = 'quiz-reason-item';
    item.textContent = (quizReasonIndex + 1) + '. ' + quizReasonsList[quizReasonIndex];
    container.appendChild(item);

    quizReasonIndex++;

    if (quizReasonIndex >= quizReasonsList.length) {
        btn.textContent = 'Itu semua alasannya \u2764\uFE0F';
        btn.disabled = true;
    }
}

// ==================  Scratch Card  ==================
function initScratchCard() {
    const canvas = document.getElementById('scratchCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Draw scratch cover
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#d4727a');
    gradient.addColorStop(0.5, '#e8889a');
    gradient.addColorStop(1, '#c27a82');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text on cover
    ctx.fillStyle = '#fff';
    ctx.font = 'italic 16px Georgia';
    ctx.textAlign = 'center';
    ctx.fillText('Gosok di sini \uD83D\uDC46', canvas.width / 2, canvas.height / 2 - 8);
    ctx.font = 'italic 12px Georgia';
    ctx.fillText('untuk buka pesan rahasia', canvas.width / 2, canvas.height / 2 + 15);

    ctx.globalCompositeOperation = 'destination-out';

    var isDrawing = false;

    function getPos(e) {
        const r = canvas.getBoundingClientRect();
        if (e.touches) {
            return { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top };
        }
        return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    function scratch(e) {
        if (!isDrawing) return;
        e.preventDefault();
        var pos = getPos(e);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
        ctx.fill();
    }

    canvas.addEventListener('mousedown', function(e) { isDrawing = true; scratch(e); });
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', function() { isDrawing = false; });
    canvas.addEventListener('mouseleave', function() { isDrawing = false; });

    canvas.addEventListener('touchstart', function(e) { isDrawing = true; scratch(e); }, { passive: false });
    canvas.addEventListener('touchmove', scratch, { passive: false });
    canvas.addEventListener('touchend', function() { isDrawing = false; });
}

// ==================  Timeline Animation  ==================
function animateTimeline() {
    const items = document.querySelectorAll('.timeline-item');
    items.forEach(function(item, i) {
        setTimeout(function() {
            item.classList.add('visible');
        }, i * 600);
    });
}

// ==================  Photo Slideshow  ==================
var slidePhotos = ['images/foto1.jpeg', 'images/foto2.jpeg', 'images/foto3.jpeg', 'images/foto4.jpeg'];
var currentSlide = 0;
var slideAutoTimer = null;

function goToSlide(idx) {
    if (idx < 0) idx = slidePhotos.length - 1;
    if (idx >= slidePhotos.length) idx = 0;

    const img = document.getElementById('slideshowImg');
    const dots = document.querySelectorAll('.slide-dot');
    if (!img) return;

    // Fade out
    img.classList.add('fade-out');

    setTimeout(function() {
        img.src = slidePhotos[idx];
        img.classList.remove('fade-out');
    }, 400);

    // Update dots
    dots.forEach(function(d, i) {
        d.classList.toggle('active', i === idx);
    });

    currentSlide = idx;
    resetSlideAutoPlay();
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

function resetSlideAutoPlay() {
    if (slideAutoTimer) clearInterval(slideAutoTimer);
    slideAutoTimer = setInterval(function() {
        goToSlide(currentSlide + 1);
    }, 4000);
}

function initSlideshow() {
    // Add dot click handlers
    const dots = document.querySelectorAll('.slide-dot');
    dots.forEach(function(dot) {
        dot.addEventListener('click', function() {
            goToSlide(parseInt(this.getAttribute('data-index')));
        });
    });

    // Swipe support for mobile
    var touchStartX = 0;
    var touchEndX = 0;
    var slideFrame = document.querySelector('.slideshow-frame');
    if (slideFrame) {
        slideFrame.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        slideFrame.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            var diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) nextSlide();
                else prevSlide();
            }
        }, { passive: true });
    }

    // Start auto-play
    resetSlideAutoPlay();
}


