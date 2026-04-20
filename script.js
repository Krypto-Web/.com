// --- IP & NETWORK LOGIC ---
async function fetchIP() {
    try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        document.getElementById('ip-display').innerText = data.ip || "Unknown";
        document.getElementById('location').innerText = `${data.city}, ${data.country_code}`;
        document.getElementById('isp').innerText = data.org;
        document.getElementById('timezone').innerText = data.timezone;
        document.getElementById('currency').innerText = data.currency;
    } catch (e) {
        document.getElementById('ip-display').innerText = "Limit Reached";
    }
}

// --- DEVICE INTELLIGENCE LOGIC ---
async function getDeviceDetails() {
    const ua = navigator.userAgent;
    
    // OS & Browser
    let os = "Unknown OS";
    if (ua.includes("Win")) os = "Windows";
    else if (ua.includes("Mac")) os = "MacOS";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("iPhone")) os = "iOS";

    let browser = "Browser";
    if (ua.includes("Chrome")) browser = "Chrome";
    else if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Safari")) browser = "Safari";

    document.getElementById('dev-os').innerText = os;
    document.getElementById('dev-browser').innerText = browser;
    document.getElementById('dev-type').innerText = /Mobi|Android/i.test(ua) ? "Mobile" : "Desktop";
    document.getElementById('dev-screen').innerText = `${window.screen.width} x ${window.screen.height}`;

    // Connection Type
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    document.getElementById('dev-net').innerText = conn ? (conn.effectiveType || "WiFi/LAN") : "Unknown";

    // Battery
    if (navigator.getBattery) {
        const battery = await navigator.getBattery();
        const updateBattery = () => {
            document.getElementById('dev-battery').innerText = `${Math.round(battery.level * 100)}% ${battery.charging ? '⚡' : ''}`;
        };
        updateBattery();
        battery.onchargingchange = updateBattery;
        battery.onlevelchange = updateBattery;
    } else {
        document.getElementById('dev-battery').innerText = "N/A";
    }
}

// --- TOOLS LOGIC ---
function generatePassword() {
    const c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let p = "";
    for(let i=0; i<16; i++) p += c.charAt(Math.floor(Math.random()*c.length));
    document.getElementById('password-output').value = p;
}

function analyzeText() {
    const v = document.getElementById('text-input').value;
    document.getElementById('word-count').innerText = v.trim() ? v.trim().split(/\s+/).length : 0;
    document.getElementById('char-count').innerText = v.length;
}

function convertCase(t) {
    const el = document.getElementById('text-input');
    el.value = (t === 'up') ? el.value.toUpperCase() : el.value.toLowerCase();
}

function formatJSON() {
    const i = document.getElementById('json-input');
    const o = document.getElementById('json-output');
    try {
        o.innerText = JSON.stringify(JSON.parse(i.value), null, 4);
        o.style.color = "#38bdf8";
    } catch(e) { o.innerText = "Invalid JSON"; o.style.color = "#f87171"; }
}

function handleBase64(m) {
    const i = document.getElementById('base64-input');
    try { i.value = m === 'encode' ? btoa(i.value) : atob(i.value); } catch(e) { alert("Error"); }
}

function convertPx() {
    const px = document.getElementById('px-input').value;
    document.getElementById('rem-result').innerText = (px / 16).toFixed(3);
}

function updateColor() {
    const col = document.getElementById('color-picker').value;
    document.getElementById('hex-code').innerText = col.toUpperCase();
}

// BOOT ENGINE
window.onload = () => {
    fetchIP();
    getDeviceDetails();
};
