// Navigasi
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
menuToggle.addEventListener('click', () => sidebar.classList.toggle('active'));

function switchPage(pageId, el) {
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    el.classList.add('active');
    if(window.innerWidth < 768) sidebar.classList.remove('active');
}

// Visitor Counter
function updateStats() {
    const counter = document.getElementById('visitor-count');
    let v = localStorage.getItem('v_papito') || 100;
    v = parseInt(v) + 1;
    localStorage.setItem('v_papito', v);
    counter.innerText = v;
}

// Music
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let isPlaying = false;
function toggleMusic() {
    if(!isPlaying) {
        bgMusic.play();
        musicBtn.innerHTML = '<i class="fas fa-volume-up"></i> Music: ON';
        musicBtn.style.color = 'var(--primary)';
        isPlaying = true;
    } else {
        bgMusic.pause();
        musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i> Music: OFF';
        musicBtn.style.color = '#6482a0';
        isPlaying = false;
    }
}

// Source Viewer (FIXED)
async function fetchSource() {
    const url = document.getElementById('webUrl').value;
    const status = document.getElementById('sourceStatus');
    const resultArea = document.getElementById('codeResult');
    
    if(!url.includes('http')) return alert("Gunakan http:// atau https://");

    status.innerText = "⚡ FETCHING...";
    
    try {
        // Metode Allorigins mentah (Mirip web yang lo kasih)
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        
        if (data.contents) {
            resultArea.value = data.contents;
            document.getElementById('codeModal').style.display = 'flex';
            status.innerText = "✅ SUCCESS";
        } else {
            status.innerText = "❌ EMPTY";
        }
    } catch (err) {
        status.innerText = "❌ ERROR";
        alert("Gagal mengambil data. Pastikan URL benar.");
    }
}

function closeModal() { document.getElementById('codeModal').style.display = 'none'; }
function copyCode() {
    const code = document.getElementById('codeResult');
    code.select();
    document.execCommand('copy');
    alert("Copied!");
}

// Others
function generatePass() {
    const p = Math.random().toString(36).slice(-10).toUpperCase();
    document.getElementById('passDisplay').innerText = p;
}
function sendWA() {
    const n = document.getElementById('waNumber').value;
    if(n) window.open(`https://wa.me/${n}`);
}
document.getElementById('themeBtn').onclick = () => {
    const d = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', d ? 'light' : 'dark');
};

window.onload = updateStats;
