// --- MATRIX ENGINE ---
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight; canvas.width = window.innerWidth;
const chars = "0101XYZ$#@%"; const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);
function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00f2ff"; ctx.font = fontSize + "px monospace";
    drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}
setInterval(drawMatrix, 50);

// --- NAVIGATION ---
function switchPage(id, el) {
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + id).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    el.classList.add('active');
    if(window.innerWidth < 768) document.getElementById('sidebar').classList.remove('active');
}
document.getElementById('menuToggle').onclick = () => document.getElementById('sidebar').classList.toggle('active');

// --- MALWARE AI LOGIC (EVIL & GANAS) ---
const termInput = document.getElementById('termInput');
const termBody = document.getElementById('termBody');
const AI_DATABASE = {
    "halo": "Gausah kakean cangkem, mau nge-hack apa kita hari ini?",
    "siapa": "Gue Malware-AI, asisten digital papitoXplo¡T paling elit.",
    "hacker": "Hacker itu aksi, bukan cuma pasang foto topeng anonymous.",
    "ddos": "[SIMULATING DDOS...]\nTarget: 127.0.0.1\nPackets: 65535/s\nStatus: FLOODING SUCCESS!",
    "sqli": "[EXPLOITING SQL...]\nPayload: ' OR 1=1 --\nDatabase: Found admin:password123",
    "deface": "[DEFACING...]\nTarget index replaced with: Hacked by papitoXplo¡T",
    "tolol": "Lo yang tolol, ngetik perintah aja masih typo!",
    "p": "Apa P P? Ngajak ribut?"
};

termInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        const val = termInput.value.toLowerCase();
        const line = document.createElement('div');
        line.innerHTML = `<span style="color:#00f2ff">root@papito:~#</span> ${termInput.value}`;
        termBody.appendChild(line);

        setTimeout(() => {
            const aiRes = document.createElement('div');
            aiRes.style.color = "#ff0055";
            aiRes.style.fontWeight = "bold";
            let response = "Gak paham gue! Ngomong yang bener atau gue format harddisk lo.";
            
            for(let key in AI_DATABASE) {
                if(val.includes(key)) { response = AI_DATABASE[key]; break; }
            }
            
            aiRes.innerHTML = `[AI]: ${response}`;
            termBody.appendChild(aiRes);
            termBody.scrollTop = termBody.scrollHeight;
        }, 400);
        termInput.value = "";
    }
});

// --- TOOLS LOGIC ---
async function fetchSource() {
    const url = document.getElementById('targetUrl').value;
    if(!url) return alert("URL Mana bos?");
    try {
        const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        const data = await res.json();
        document.getElementById('codeResult').value = data.contents;
        document.getElementById('codeModal').style.display = 'flex';
    } catch(e) { alert("Bypass Gagal!"); }
}
function generatePass() {
    const p = Math.random().toString(36).slice(-12).toUpperCase();
    document.getElementById('passRes').innerText = p;
}
function sendWA() {
    const n = document.getElementById('waNum').value;
    if(n) window.open(`https://wa.me/${n}`);
}
function closeModal() { document.getElementById('codeModal').style.display = 'none'; }
function copyCode() {
    const c = document.getElementById('codeResult'); c.select();
    document.execCommand('copy'); alert("Copied!");
}

// --- AUDIO ---
let isPlaying = false;
function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    const btn = document.getElementById('musicBtn');
    if(!isPlaying) {
        audio.play(); btn.innerHTML = '<i class="fas fa-pause"></i> AUDIO: ON'; isPlaying = true;
    } else {
        audio.pause(); btn.innerHTML = '<i class="fas fa-play"></i> AUDIO: OFF'; isPlaying = false;
    }
}
