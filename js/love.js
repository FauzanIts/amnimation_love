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
    // On mobile, reduce rise distance so subtitle doesn't crowd into the heart
    const isMobile = window.innerWidth <= 600;
    const target = isMobile ? 40 : 120, 
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
    // Start Firebase listeners early so data is cached before user opens sections
    initTimelineListener();
    initPhotosListener();

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

    // Hide scroll hint on scroll
    var page2El = document.getElementById('page2');
    if (page2El) {
        var scrollHintHidden = false;
        page2El.addEventListener('scroll', function () {
            if (!scrollHintHidden && page2El.scrollTop > 50) {
                scrollHintHidden = true;
                var hint = document.getElementById('scrollHint');
                if (hint) { hint.style.opacity = '0'; hint.style.transition = 'opacity 0.5s'; }
            }
        });
    }

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
        'Hai sayang,',
        '',
        'Aku nggak mau sok jadi orang paling sempurna.',
        'Tapi aku mau kamu tau satu hal: aku serius sama kamu.',
        'Di tengah hari yang kadang rame dan capek,',
        'kamu itu tetap jadi bagian yang paling aku cari',
        'tempat aku tenang, tempat aku pulang.',
        '',
        'Makasih ya\u2026udah jadi cerita yang bikin aku semangat,',
        'dan jadi alasan aku pengen jadi versi terbaik',
        'dari diriku sendiri.',
        '',
        'Aku juga ngerti, yang kamu butuhin itu',
        'bukan janji manis doang, tapi rasa aman.',
        'Jadi aku mau belajar lebih peka:',
        'nggak ngilang, nggak bikin kamu ngerasa sendiri,',
        'dan tetap ada walau cuma lewat hal-hal kecil',
        'yang konsisten.',
        'Kalau kamu lagi berat, aku pengen jadi orang',
        'yang pertama kamu inget buat bersandar.',
        '',
        'Dan karena 18 Februari itu hari spesial kamu\u2026',
        'aku pengen jadi orang yang ngucapin paling tulus:',
        'Selamat ulang tahun, sayang.',
        'Semoga kamu selalu sehat, hatimu selalu tenang,',
        'dan mimpi-mimpimu satu-satu jadi nyata.',
        'Aku bangga sama kamu',
        'dan aku bersyukur bisa punya kamu.',
        '',
        'Kamu bukan cuma "cintaku".',
        'Kamu itu\u2026 kesayanganku',
        'dan orang yang pengen aku jaga. \u2764\uFE0F',
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
function showDivider(id) {
    var el = document.getElementById(id);
    if (el) { el.style.display = 'block'; el.classList.add('show'); }
}

function showInteractiveSections() {
    const quiz = document.getElementById('quizSection');
    const scratch = document.getElementById('scratchSection');
    const timeline = document.getElementById('timelineSection');

    if (quiz) quiz.style.display = 'block';

    setTimeout(() => {
        showDivider('divScratch');
        if (scratch) {
            scratch.style.display = 'block';
            initScratchCard();
        }
    }, 500);

    setTimeout(() => {
        showDivider('divAlbum');
        var albumBtn = document.getElementById('albumBtnSection');
        if (albumBtn) albumBtn.style.display = 'block';
    }, 900);

    setTimeout(() => {
        showDivider('divTimeline');
        if (timeline) {
            timeline.style.display = 'block';
            animateTimeline();
        }
    }, 1300);
}

// ==================  Quiz Romantis  ==================
var quizReasonIndex = 0;
var quizReasonsList = [
    'Aku sayang semua hal yang ada pada dirimu — Mungkin dulu aku suka kamu karena sifat cerewetmu, tapi kalau sekarang kamu tanya lagi, jawabannya adalah karena aku sudah sayang dengan semua hal yang ada pada dirimu tanpa terkecuali. Bagiku, kamu adalah paket lengkap: lucu, menggemaskan, cantik, cerewet, bahkan hobi merajukmu pun membuatku makin sayang.',
    'Kamu adalah tipe idealku yang sebenarnya — Sejujurnya, susah sekali mencari perempuan seperti kamu karena semua kriteria yang aku cari ada padamu. Perasaanku rasanya sudah ter-setting default hanya untuk kamu, my little princess.',
    'Suaramu dan tawamu adalah obat bagiku — Aku sangat suka mendengar kamu bercerita dan mendengar suara tawamu yang khas karena itu terasa lucu dan menyenangkan. Bahkan, mendengar suaramu bercerita bisa menjadi "obat tidur" paling ampuh yang membuatku merasa nyaman dan tenang.',
    'Hanya denganmu aku merasa benar-benar "nyambung" — Sebagai orang yang pendiam, aku sering merasa tidak nyambung kalau bicara dengan orang lain. Tapi dengan kamu, obrolan kita selalu mengalir, dan aku merasa bisa menjadi diriku sendiri.',
    'Kamu cantik apa adanya — Di mataku, kamu selalu terlihat cantik bagaimanapun keadaanmu, bahkan tanpa riasan sekalipun (bare face). Melihat wajahmu saja sudah cukup membuatku merasa adem dan tenang.',
    'Kamu adalah cinta pertamaku yang sulit dilupakan — Sulit untuk berpaling atau move on kalau sudah berkaitan dengan cinta pertama, dan itulah alasan kenapa aku selalu ingin kembali berjuang untukmu. \u2764\uFE0F'
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

    // Split title and body by " — "
    var text = quizReasonsList[quizReasonIndex];
    var dashIdx = text.indexOf(' — ');
    var titleText = dashIdx !== -1 ? text.substring(0, dashIdx) : text;
    var bodyText = dashIdx !== -1 ? text.substring(dashIdx + 3) : '';

    // Number badge
    var numSpan = document.createElement('span');
    numSpan.className = 'reason-number';
    numSpan.textContent = quizReasonIndex + 1;
    item.appendChild(numSpan);

    // Title
    var titleSpan = document.createElement('span');
    titleSpan.className = 'reason-title';
    titleSpan.textContent = titleText;
    item.appendChild(titleSpan);

    // Body
    if (bodyText) {
        var bodySpan = document.createElement('span');
        bodySpan.className = 'reason-body';
        bodySpan.textContent = bodyText;
        item.appendChild(bodySpan);
    }

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

// ==================  Timeline System (Firebase)  ==================
var timelineEditIndex = -1; // -1 = adding new, >=0 = editing
var cachedTimeline = null; // local cache

var defaultTimeline = [
    { dot: '\uD83D\uDC95', date: '01 Mei 2024', event: 'Pertama kali jadian \uD83D\uDE0A' },
    { dot: '\uD83D\uDCA7', date: '18 April 2025', event: 'Hubungan kita kandas \uD83D\uDE3F' },
    { dot: '\u2764\uFE0F', date: '16 Januari 2026', event: 'Kita balikan lagi \uD83D\uDE39' },
    { dot: '\uD83C\uDF1F', date: 'Sekarang', event: 'Dan cerita kita terus berlanjut...' }
];

var timelineEmojis = ['\uD83D\uDC95', '\u2764\uFE0F', '\uD83D\uDCA7', '\uD83C\uDF1F', '\uD83C\uDF38', '\uD83D\uDC8D', '\uD83C\uDF89', '\u2728', '\uD83E\uDD70', '\uD83D\uDE0A'];

function saveTimeline(items) {
    cachedTimeline = items;
    if (typeof db !== 'undefined') {
        db.ref('timeline').set(items);
    }
}

function getTimelineItems() {
    return cachedTimeline !== null ? cachedTimeline : defaultTimeline.slice();
}

// Listen for real-time updates from Firebase
function initTimelineListener() {
    if (typeof db === 'undefined') return;
    db.ref('timeline').on('value', function (snapshot) {
        var data = snapshot.val();
        if (data && Array.isArray(data)) {
            cachedTimeline = data;
        } else {
            cachedTimeline = defaultTimeline.slice();
        }
        renderTimeline();
    });
}

function renderTimeline() {
    var container = document.getElementById('timeline');
    if (!container) return;
    container.innerHTML = '';

    var items = getTimelineItems();
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var div = document.createElement('div');
        div.className = 'timeline-item visible';

        var dot = document.createElement('div');
        dot.className = 'timeline-dot';
        dot.textContent = item.dot;
        div.appendChild(dot);

        var date = document.createElement('div');
        date.className = 'timeline-date';
        date.textContent = item.date;
        div.appendChild(date);

        var ev = document.createElement('div');
        ev.className = 'timeline-event';
        ev.textContent = item.event;
        div.appendChild(ev);

        var actions = document.createElement('div');
        actions.className = 'timeline-item-actions';

        var editBtn = document.createElement('button');
        editBtn.className = 'timeline-edit-btn';
        editBtn.textContent = '\u270F\uFE0F Edit';
        editBtn.setAttribute('data-idx', i);
        editBtn.addEventListener('click', function (e) {
            e.preventDefault();
            showTimelineForm(parseInt(this.getAttribute('data-idx')));
        });
        editBtn.addEventListener('touchend', function (e) {
            e.preventDefault();
            e.stopPropagation();
            showTimelineForm(parseInt(this.getAttribute('data-idx')));
        });
        actions.appendChild(editBtn);

        var delBtn = document.createElement('button');
        delBtn.className = 'timeline-delete-btn';
        delBtn.textContent = '\uD83D\uDDD1\uFE0F Hapus';
        delBtn.setAttribute('data-idx', i);
        delBtn.addEventListener('click', function (e) {
            e.preventDefault();
            deleteTimelineItem(parseInt(this.getAttribute('data-idx')));
        });
        delBtn.addEventListener('touchend', function (e) {
            e.preventDefault();
            e.stopPropagation();
            deleteTimelineItem(parseInt(this.getAttribute('data-idx')));
        });
        actions.appendChild(delBtn);

        div.appendChild(actions);
        container.appendChild(div);
    }
}

function deleteTimelineItem(idx) {
    var items = getTimelineItems();
    if (idx < 0 || idx >= items.length) return;
    items.splice(idx, 1);
    saveTimeline(items);
    renderTimeline();
}

function showTimelineForm(editIdx) {
    // Remove existing form if any
    var existing = document.querySelector('.timeline-form-overlay');
    if (existing) existing.remove();

    timelineEditIndex = (typeof editIdx === 'number') ? editIdx : -1;
    var items = getTimelineItems();
    var isEdit = timelineEditIndex >= 0 && timelineEditIndex < items.length;
    var current = isEdit ? items[timelineEditIndex] : { dot: '\u2764\uFE0F', date: '', event: '' };

    var overlay = document.createElement('div');
    overlay.className = 'timeline-form-overlay';

    var form = document.createElement('div');
    form.className = 'timeline-form';

    var title = document.createElement('div');
    title.className = 'timeline-form-title';
    title.textContent = isEdit ? 'Edit Momen' : 'Tambah Momen Baru';
    form.appendChild(title);

    // Emoji select
    var emojiSel = document.createElement('select');
    emojiSel.id = 'tlFormEmoji';
    for (var e = 0; e < timelineEmojis.length; e++) {
        var opt = document.createElement('option');
        opt.value = timelineEmojis[e];
        opt.textContent = timelineEmojis[e];
        if (timelineEmojis[e] === current.dot) opt.selected = true;
        emojiSel.appendChild(opt);
    }
    form.appendChild(emojiSel);

    // Date input
    var dateInp = document.createElement('input');
    dateInp.type = 'text';
    dateInp.id = 'tlFormDate';
    dateInp.placeholder = 'Tanggal (cth: 01 Mei 2024)';
    dateInp.value = current.date;
    form.appendChild(dateInp);

    // Event input
    var eventInp = document.createElement('input');
    eventInp.type = 'text';
    eventInp.id = 'tlFormEvent';
    eventInp.placeholder = 'Apa yang terjadi?';
    eventInp.value = current.event;
    form.appendChild(eventInp);

    // Buttons
    var btns = document.createElement('div');
    btns.className = 'timeline-form-buttons';

    var saveBtn = document.createElement('button');
    saveBtn.className = 'timeline-form-save';
    saveBtn.textContent = isEdit ? 'Simpan' : 'Tambah';
    saveBtn.addEventListener('click', function () { saveTimelineForm(); });
    btns.appendChild(saveBtn);

    var cancelBtn = document.createElement('button');
    cancelBtn.className = 'timeline-form-cancel';
    cancelBtn.textContent = 'Batal';
    cancelBtn.addEventListener('click', function () { closeTimelineForm(); });
    btns.appendChild(cancelBtn);

    form.appendChild(btns);
    overlay.appendChild(form);

    overlay.addEventListener('click', function (ev) {
        if (ev.target === overlay) closeTimelineForm();
    });

    document.body.appendChild(overlay);
}

function saveTimelineForm() {
    var emoji = document.getElementById('tlFormEmoji');
    var dateInp = document.getElementById('tlFormDate');
    var eventInp = document.getElementById('tlFormEvent');
    if (!dateInp || !eventInp) return;

    var d = dateInp.value.trim();
    var ev = eventInp.value.trim();
    if (!d || !ev) return;

    var items = getTimelineItems();
    var newItem = {
        dot: emoji ? emoji.value : '\u2764\uFE0F',
        date: d,
        event: ev
    };

    if (timelineEditIndex >= 0 && timelineEditIndex < items.length) {
        items[timelineEditIndex] = newItem;
    } else {
        items.push(newItem);
    }

    saveTimeline(items);
    closeTimelineForm();
    renderTimeline();
}

function closeTimelineForm() {
    var overlay = document.querySelector('.timeline-form-overlay');
    if (overlay) overlay.remove();
    timelineEditIndex = -1;
}

function animateTimeline() {
    renderTimeline();
}

// ==================  Photo Slideshow  ==================
// (removed - replaced by album page with Cloudinary upload)

// ============================================================
//   PHOTO ALBUM SYSTEM + CLOUDINARY UPLOAD
//   Foto default ada di defaultPhotos.
//   Foto yang diupload dari web disimpan di localStorage +
//   Cloudinary cloud. Tinggal upload dari halaman album!
// ============================================================

var CLOUD_NAME = 'dmi7faczx';
var UPLOAD_PRESET = 'love_album';

// Default photos (bawaan, selalu ada)
var defaultPhotos = [];
var cachedPhotos = []; // local cache for uploaded photos

var currentAlbum = 'Semua';
var albumViewMode = 'overview'; // 'overview' or 'detail'
var isManageMode = false;
var currentLbPhotos = [];
var currentLbIndex = 0;

// Load uploaded photos from cache
function loadUploadedPhotos() {
    return cachedPhotos;
}

// Save uploaded photos to Firebase
function saveUploadedPhotos(photos) {
    cachedPhotos = photos;
    if (typeof db !== 'undefined') {
        db.ref('photos').set(photos);
    }
}

// Listen for real-time updates from Firebase
function initPhotosListener() {
    if (typeof db === 'undefined') return;
    db.ref('photos').on('value', function (snapshot) {
        var data = snapshot.val();
        cachedPhotos = (data && Array.isArray(data)) ? data : [];
        // Refresh album view if currently visible
        var page3 = document.getElementById('page3');
        if (page3 && page3.style.display !== 'none') {
            updateAlbumSelectOptions();
            if (albumViewMode === 'overview') {
                renderAlbumOverview();
            } else {
                renderAlbumGallery();
            }
        }
    });
}

// Get all photos (default + uploaded)
function getAllPhotos() {
    return defaultPhotos.concat(loadUploadedPhotos());
}

// Get unique album names
function getAlbumNames() {
    var photos = getAllPhotos();
    var names = {};
    for (var i = 0; i < photos.length; i++) {
        if (photos[i].album) names[photos[i].album] = true;
    }
    return Object.keys(names);
}

// Get photos filtered by album
function getFilteredPhotos(albumName) {
    var all = getAllPhotos();
    if (albumName === 'Semua') return all;
    return all.filter(function (p) { return p.album === albumName; });
}

// ==================  Open / Close Album Page  ==================
function openAlbumPage() {
    var page3 = document.getElementById('page3');
    if (!page3) return;
    page3.style.display = 'block';
    page3.offsetHeight;
    page3.classList.add('visible');

    isManageMode = false;
    albumViewMode = 'overview';
    currentAlbum = 'Semua';
    updateAlbumSelectOptions();
    renderAlbumOverview();
    updateManageBtn();
}

function closeAlbumPage() {
    var page3 = document.getElementById('page3');
    if (!page3) return;
    page3.classList.remove('visible');
    setTimeout(function () {
        page3.style.display = 'none';
    }, 300);
}

// ==================  Album Select for Upload  ==================
function updateAlbumSelectOptions() {
    var sel = document.getElementById('uploadAlbumSelect');
    if (!sel) return;
    var names = getAlbumNames();
    var val = sel.value;
    sel.innerHTML = '';
    for (var i = 0; i < names.length; i++) {
        var opt = document.createElement('option');
        opt.value = names[i];
        opt.textContent = names[i];
        sel.appendChild(opt);
    }
    var newOpt = document.createElement('option');
    newOpt.value = '__new__';
    newOpt.textContent = '+ Album Baru';
    sel.appendChild(newOpt);
    // Restore previous value if exists
    if (val && sel.querySelector('option[value=\"' + val + '\"]')) {
        sel.value = val;
    }
    // Auto-show new album input if __new__ is the current value
    onAlbumSelectChange();
}

function onAlbumSelectChange() {
    var sel = document.getElementById('uploadAlbumSelect');
    var inp = document.getElementById('newAlbumInput');
    if (!sel || !inp) return;
    if (sel.value === '__new__') {
        inp.classList.add('show');
        inp.focus();
    } else {
        inp.classList.remove('show');
    }
}

// ==================  Upload Photo via Cloudinary API  ==================
function doUploadPhoto() {
    var sel = document.getElementById('uploadAlbumSelect');
    var newAlbumInp = document.getElementById('newAlbumInput');
    var captionInp = document.getElementById('captionInput');
    var statusEl = document.getElementById('uploadStatus');

    var targetAlbum = sel ? sel.value : 'Kenangan';
    if (targetAlbum === '__new__') {
        targetAlbum = newAlbumInp ? newAlbumInp.value.trim() : '';
        if (!targetAlbum) {
            if (statusEl) statusEl.textContent = '\u26A0\uFE0F Masukkan nama album baru dulu!';
            return;
        }
    }
    var caption = captionInp ? captionInp.value.trim() : '';

    // Open file picker
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = function () {
        var files = input.files;
        if (!files || !files.length) return;
        if (statusEl) statusEl.textContent = '\u23F3 Uploading ' + files.length + ' foto...';

        var uploaded = 0;
        var failed = 0;
        var total = files.length;

        for (var i = 0; i < files.length; i++) {
            (function (file, idx) {
                var formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', UPLOAD_PRESET);
                formData.append('folder', 'love_album');

                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://api.cloudinary.com/v1_1/' + CLOUD_NAME + '/image/upload');

                xhr.onload = function () {
                    if (xhr.status === 200) {
                        var resp = JSON.parse(xhr.responseText);
                        var saved = loadUploadedPhotos();
                        saved.push({
                            src: resp.secure_url,
                            caption: caption || 'Foto baru \u2764\uFE0F',
                            album: targetAlbum,
                            publicId: resp.public_id,
                            uploadedAt: new Date().toISOString()
                        });
                        saveUploadedPhotos(saved);
                        uploaded++;
                    } else {
                        failed++;
                    }
                    checkDone();
                };

                xhr.onerror = function () {
                    failed++;
                    checkDone();
                };

                xhr.send(formData);
            })(files[i], i);
        }

        function checkDone() {
            if (uploaded + failed >= total) {
                if (failed > 0) {
                    statusEl.textContent = '\u2705 ' + uploaded + ' berhasil, \u274C ' + failed + ' gagal';
                } else {
                    statusEl.textContent = '\u2705 ' + uploaded + ' foto berhasil diupload!';
                }
                if (captionInp) captionInp.value = '';
                if (newAlbumInp) { newAlbumInp.value = ''; newAlbumInp.classList.remove('show'); }
                // Refresh gallery
                updateAlbumSelectOptions();
                if (albumViewMode === 'overview') {
                    renderAlbumOverview();
                } else {
                    renderAlbumGallery();
                }
                setTimeout(function () {
                    if (statusEl) statusEl.textContent = '';
                }, 3000);
            } else {
                statusEl.textContent = '\u23F3 Uploading... (' + (uploaded + failed) + '/' + total + ')';
            }
        }
    };
    input.click();
}

// ==================  Manage Mode (Delete)  ==================
function toggleManageMode() {
    isManageMode = !isManageMode;
    updateManageBtn();
    if (albumViewMode === 'overview') {
        renderAlbumOverview();
    } else {
        renderAlbumGallery();
    }
}

function updateManageBtn() {
    var btn = document.getElementById('manageToggle');
    if (!btn) return;
    if (isManageMode) {
        btn.textContent = '\u2705 Selesai';
        btn.classList.add('active');
    } else {
        btn.textContent = '\uD83D\uDDD1\uFE0F Kelola';
        btn.classList.remove('active');
    }
}

function deletePhoto(src) {
    var saved = loadUploadedPhotos();
    saved = saved.filter(function (p) { return p.src !== src; });
    saveUploadedPhotos(saved);
    renderAlbumGallery();
    // If album is now empty and we're in detail, go back to overview
    var remaining = getFilteredPhotos(currentAlbum);
    if (remaining.length === 0 && currentAlbum !== 'Semua') {
        backToAlbumOverview();
    }
}

function deleteAlbum(albumName) {
    var saved = loadUploadedPhotos();
    saved = saved.filter(function (p) { return p.album !== albumName; });
    saveUploadedPhotos(saved);
    updateAlbumSelectOptions();
    renderAlbumOverview();
}

function showRenameAlbumForm(oldName) {
    var existing = document.querySelector('.album-rename-overlay');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.className = 'album-rename-overlay';

    var form = document.createElement('div');
    form.className = 'album-rename-form';

    var title = document.createElement('div');
    title.className = 'album-rename-title';
    title.textContent = 'Rename Album';
    form.appendChild(title);

    var inp = document.createElement('input');
    inp.type = 'text';
    inp.className = 'album-rename-input';
    inp.value = oldName;
    inp.placeholder = 'Nama album baru...';
    form.appendChild(inp);

    var btns = document.createElement('div');
    btns.className = 'album-rename-buttons';

    var saveBtn = document.createElement('button');
    saveBtn.className = 'album-rename-save';
    saveBtn.textContent = 'Simpan';
    saveBtn.addEventListener('click', function () {
        var newName = inp.value.trim();
        if (newName && newName !== oldName) {
            renameAlbum(oldName, newName);
        }
        closeRenameAlbumForm();
    });
    btns.appendChild(saveBtn);

    var cancelBtn = document.createElement('button');
    cancelBtn.className = 'album-rename-cancel';
    cancelBtn.textContent = 'Batal';
    cancelBtn.addEventListener('click', function () {
        closeRenameAlbumForm();
    });
    btns.appendChild(cancelBtn);

    form.appendChild(btns);
    overlay.appendChild(form);

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeRenameAlbumForm();
    });

    document.body.appendChild(overlay);
    inp.focus();
    inp.select();
}

function closeRenameAlbumForm() {
    var overlay = document.querySelector('.album-rename-overlay');
    if (overlay) overlay.remove();
}

function renameAlbum(oldName, newName) {
    var saved = loadUploadedPhotos();
    for (var i = 0; i < saved.length; i++) {
        if (saved[i].album === oldName) {
            saved[i].album = newName;
        }
    }
    saveUploadedPhotos(saved);
    updateAlbumSelectOptions();
    renderAlbumOverview();
}

// ==================  Render Album Overview (Cover Cards)  ==================
function renderAlbumOverview() {
    var overview = document.getElementById('albumOverview');
    var detail = document.getElementById('albumDetail');
    if (!overview) return;

    // Show overview, hide detail
    overview.style.display = 'grid';
    if (detail) detail.style.display = 'none';
    albumViewMode = 'overview';

    overview.innerHTML = '';
    overview.className = 'album-overview' + (isManageMode ? ' manage-mode' : '');

    var albumNames = getAlbumNames();
    var allPhotos = getAllPhotos();

    // Show empty state if no photos at all
    if (allPhotos.length === 0) {
        overview.style.display = 'none';
        var empty = document.getElementById('albumEmpty');
        if (empty) { empty.style.display = 'block'; empty.parentNode === detail ? null : overview.parentNode.appendChild(empty); }
        return;
    }

    // "Semua Foto" card first
    var allCard = createCoverCard('Semua Foto', allPhotos.length, allPhotos[0].src, true, false);
    allCard.addEventListener('click', function () {
        if (!isManageMode) openAlbumDetail('Semua');
    });
    overview.appendChild(allCard);

    // Individual album cards
    for (var i = 0; i < albumNames.length; i++) {
        var name = albumNames[i];
        var photos = getFilteredPhotos(name);
        if (photos.length === 0) continue;
        var card = createCoverCard(name, photos.length, photos[0].src, false, true);
        (function (albumName) {
            card.addEventListener('click', function () {
                if (!isManageMode) openAlbumDetail(albumName);
            });
        })(name);
        card.style.animationDelay = ((i + 1) * 0.08) + 's';
        overview.appendChild(card);
    }
}

function createCoverCard(name, count, coverSrc, isAll, canDelete) {
    var card = document.createElement('div');
    card.className = 'album-cover-card' + (isAll ? ' all-photos' : '');

    // Delete album button (not for 'Semua Foto')
    if (canDelete) {
        var delBtn = document.createElement('button');
        delBtn.className = 'album-cover-delete-btn';
        delBtn.textContent = '\u2715';
        delBtn.setAttribute('data-album', name);
        delBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            deleteAlbum(this.getAttribute('data-album'));
        });
        delBtn.addEventListener('touchend', function (e) {
            e.stopPropagation();
            e.preventDefault();
            deleteAlbum(this.getAttribute('data-album'));
        });
        card.appendChild(delBtn);

        var editBtn = document.createElement('button');
        editBtn.className = 'album-cover-edit-btn';
        editBtn.textContent = '\u270F\uFE0F';
        editBtn.setAttribute('data-album', name);
        editBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            showRenameAlbumForm(this.getAttribute('data-album'));
        });
        editBtn.addEventListener('touchend', function (e) {
            e.stopPropagation();
            e.preventDefault();
            showRenameAlbumForm(this.getAttribute('data-album'));
        });
        card.appendChild(editBtn);
    }

    var img = document.createElement('img');
    img.className = 'album-cover-img';
    img.src = coverSrc;
    img.alt = name;
    img.loading = 'lazy';
    card.appendChild(img);

    var overlay = document.createElement('div');
    overlay.className = 'album-cover-overlay';

    var nameEl = document.createElement('div');
    nameEl.className = 'album-cover-name';
    nameEl.textContent = name;
    overlay.appendChild(nameEl);

    var countEl = document.createElement('div');
    countEl.className = 'album-cover-count';
    countEl.textContent = count + ' foto';
    overlay.appendChild(countEl);

    card.appendChild(overlay);
    return card;
}

// ==================  Album Detail View  ==================
function openAlbumDetail(albumName) {
    var overview = document.getElementById('albumOverview');
    var detail = document.getElementById('albumDetail');
    var titleEl = document.getElementById('albumDetailTitle');
    if (!detail) return;

    // Hide overview, show detail
    if (overview) overview.style.display = 'none';
    detail.style.display = 'block';
    albumViewMode = 'detail';
    currentAlbum = albumName;

    var displayName = albumName === 'Semua' ? 'Semua Foto' : albumName;
    if (titleEl) titleEl.textContent = displayName + ' 📸';

    renderAlbumGallery();
}

function backToAlbumOverview() {
    albumViewMode = 'overview';
    isManageMode = false;
    updateManageBtn();
    renderAlbumOverview();
}

// ==================  Render Album Gallery  ==================
function renderAlbumGallery() {
    var gallery = document.getElementById('albumGallery');
    var empty = document.getElementById('albumEmpty');
    if (!gallery) return;

    var photos = getFilteredPhotos(currentAlbum);
    gallery.innerHTML = '';
    gallery.className = 'album-gallery' + (isManageMode ? ' manage-mode' : '');

    if (photos.length === 0) {
        gallery.style.display = 'none';
        if (empty) empty.style.display = 'block';
        return;
    }

    gallery.style.display = 'grid';
    if (empty) empty.style.display = 'none';

    for (var i = 0; i < photos.length; i++) {
        var card = document.createElement('div');
        card.className = 'album-card';
        if (i === 0 && photos.length > 2) card.classList.add('wide');
        card.style.animationDelay = (i * 0.06) + 's';

        // Delete button (shown in manage mode)
        {
            var delBtn = document.createElement('button');
            delBtn.className = 'photo-delete-btn';
            delBtn.textContent = '\u2715';
            delBtn.setAttribute('data-src', photos[i].src);
            delBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                e.preventDefault();
                deletePhoto(this.getAttribute('data-src'));
            });
            delBtn.addEventListener('touchend', function (e) {
                e.stopPropagation();
                e.preventDefault();
                deletePhoto(this.getAttribute('data-src'));
            });
            card.appendChild(delBtn);
        }

        var img = document.createElement('img');
        img.className = 'album-card-img';
        img.src = photos[i].src;
        img.alt = photos[i].caption || '';
        img.loading = 'lazy';
        card.appendChild(img);

        if (photos[i].caption) {
            var cap = document.createElement('div');
            cap.className = 'album-card-caption';
            cap.textContent = photos[i].caption;
            card.appendChild(cap);
        }

        // Lightbox on click (only when not in manage mode)
        (function (idx) {
            card.addEventListener('click', function () {
                if (!isManageMode) openLightbox(photos, idx);
            });
        })(i);

        gallery.appendChild(card);
    }
}

// ==================  Lightbox  ==================
function openLightbox(photos, index) {
    currentLbPhotos = photos;
    currentLbIndex = index;

    var lb = document.getElementById('lightbox');
    var img = document.getElementById('lbImg');
    var caption = document.getElementById('lbCaption');
    var counter = document.getElementById('lbCounter');
    if (!lb || !img) return;

    img.src = photos[index].src;
    if (caption) caption.textContent = photos[index].caption || '';
    if (counter) counter.textContent = (index + 1) + ' / ' + photos.length;

    lb.style.display = 'flex';
    lb.offsetHeight;
    lb.classList.add('visible');

    // Hide prev/next if only 1 photo
    var prevBtn = lb.querySelector('.lb-prev');
    var nextBtn = lb.querySelector('.lb-next');
    if (prevBtn) prevBtn.style.display = photos.length > 1 ? 'flex' : 'none';
    if (nextBtn) nextBtn.style.display = photos.length > 1 ? 'flex' : 'none';
}

function closeLightbox(e) {
    if (e && e.target && !e.target.classList.contains('lightbox') && !e.target.classList.contains('lb-close')) return;
    var lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.classList.remove('visible');
    setTimeout(function() { lb.style.display = 'none'; }, 300);
}

function lbNav(dir, e) {
    if (e) { e.stopPropagation(); e.preventDefault(); }
    if (currentLbPhotos.length <= 1) return;

    currentLbIndex += dir;
    if (currentLbIndex < 0) currentLbIndex = currentLbPhotos.length - 1;
    if (currentLbIndex >= currentLbPhotos.length) currentLbIndex = 0;

    var img = document.getElementById('lbImg');
    var caption = document.getElementById('lbCaption');
    var counter = document.getElementById('lbCounter');

    if (img) img.src = currentLbPhotos[currentLbIndex].src;
    if (caption) caption.textContent = currentLbPhotos[currentLbIndex].caption || '';
    if (counter) counter.textContent = (currentLbIndex + 1) + ' / ' + currentLbPhotos.length;
}

function lbPrev(e) { lbNav(-1, e); }
function lbNext(e) { lbNav(1, e); }

// Swipe support for lightbox
(function() {
    var startX = 0;
    var lb = null;
    document.addEventListener('DOMContentLoaded', function() {
        lb = document.getElementById('lightbox');
    });
    document.addEventListener('touchstart', function(e) {
        if (!lb || lb.style.display === 'none') return;
        startX = e.changedTouches[0].screenX;
    }, { passive: true });
    document.addEventListener('touchend', function(e) {
        if (!lb || lb.style.display === 'none') return;
        var diff = startX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 60) {
            if (diff > 0) lbNext();
            else lbPrev();
        }
    }, { passive: true });
})();


