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

    if (quiz) quiz.style.display = 'block';

    setTimeout(() => {
        if (scratch) {
            scratch.style.display = 'block';
            initScratchCard();
        }
    }, 500);

    setTimeout(() => {
        if (timeline) {
            timeline.style.display = 'block';
            animateTimeline();
        }
    }, 1000);

    // Show album button
    var albumBtn = document.getElementById('albumBtnSection');
    setTimeout(function() {
        if (albumBtn) albumBtn.style.display = 'block';
    }, 1200);
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
// (removed - replaced by album page with Cloudinary upload)

// ============================================================
//   PHOTO ALBUM SYSTEM + CLOUDINARY UPLOAD
//   Foto default ada di defaultPhotos.
//   Foto yang diupload dari web disimpan di localStorage +
//   Cloudinary cloud. Tinggal upload dari halaman album!
// ============================================================

var CLOUD_NAME = 'dmi7faczx';
var UPLOAD_PRESET = 'love_album';
var STORAGE_KEY = 'loveAlbumPhotos';

// Default photos (bawaan, selalu ada)
var defaultPhotos = [
    { src: 'images/foto1.jpeg', caption: 'Momen indah kita \u2764\uFE0F', album: 'Kenangan', isDefault: true },
    { src: 'images/foto2.jpeg', caption: 'Selalu tersenyum bersamamu \u{1F60A}', album: 'Kenangan', isDefault: true },
    { src: 'images/foto3.jpeg', caption: 'Foto favorit aku \u{1F970}', album: 'Favorit', isDefault: true },
    { src: 'images/foto4.jpeg', caption: 'Cantik banget \u2728', album: 'Favorit', isDefault: true },
];

var currentAlbum = 'Semua';
var isManageMode = false;
var currentLbPhotos = [];
var currentLbIndex = 0;

// Load uploaded photos from localStorage
function loadUploadedPhotos() {
    try {
        var saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        return [];
    }
}

// Save uploaded photos to localStorage
function saveUploadedPhotos(photos) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
    } catch (e) {
        console.log('Storage save error');
    }
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
    currentAlbum = 'Semua';
    updateAlbumSelectOptions();
    renderAlbumTabs();
    renderAlbumGallery();
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
                renderAlbumTabs();
                renderAlbumGallery();
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
    renderAlbumGallery();
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
    if (!confirm('Hapus foto ini?')) return;
    var saved = loadUploadedPhotos();
    saved = saved.filter(function (p) { return p.src !== src; });
    saveUploadedPhotos(saved);
    renderAlbumTabs();
    renderAlbumGallery();
}

// ==================  Render Album Tabs  ==================
function renderAlbumTabs() {
    var container = document.getElementById('albumTabs');
    if (!container) return;
    container.innerHTML = '';

    var names = ['Semua'].concat(getAlbumNames());

    for (var i = 0; i < names.length; i++) {
        var count = names[i] === 'Semua' ? getAllPhotos().length : getFilteredPhotos(names[i]).length;
        var tab = document.createElement('div');
        tab.className = 'album-tab' + (names[i] === currentAlbum ? ' active' : '');
        tab.textContent = names[i] + ' (' + count + ')';
        tab.setAttribute('data-album', names[i]);
        tab.addEventListener('click', function () {
            currentAlbum = this.getAttribute('data-album');
            renderAlbumTabs();
            renderAlbumGallery();
        });
        container.appendChild(tab);
    }
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

        // Delete button (only for uploaded photos, shown in manage mode)
        if (!photos[i].isDefault) {
            var delBtn = document.createElement('button');
            delBtn.className = 'photo-delete-btn';
            delBtn.textContent = '\u2715';
            delBtn.setAttribute('data-src', photos[i].src);
            delBtn.addEventListener('click', function (e) {
                e.stopPropagation();
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

        // Lightbox on click
        (function (idx) {
            card.addEventListener('click', function () {
                openLightbox(photos, idx);
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


