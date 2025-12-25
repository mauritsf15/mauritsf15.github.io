import SpeedTest from 'https://esm.sh/@cloudflare/speedtest';

// --- Configuration ---
const REPORTING_URL = 'https://reqres.in/api/speedtest-logs'; // Replace with your server URL
// (reqres.in is a fake API for testing that will accept the POST and return 201)

const startBtn = document.getElementById('start-btn');
const statusText = document.getElementById('status-text');
const dlVal = document.getElementById('dl-val');
const ulVal = document.getElementById('ul-val');
const pingVal = document.getElementById('ping-val');
const jitterVal = document.getElementById('jitter-val');
const ipDisplay = document.getElementById('ip-display');

let clientIP = 'Unknown';

// 1. Fetch Client IP immediately on load
async function fetchClientInfo() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        clientIP = data.ip;
        ipDisplay.innerText = `Client IP: ${clientIP}`;
    } catch (e) {
        ipDisplay.innerText = 'Could not detect IP';
        console.error("IP Fetch Error:", e);
    }
}

fetchClientInfo();

// 2. Initialize Speed Test Engine
const engine = new SpeedTest({
    autoStart: false,
    measurements: [
        { type: 'latency', numPackets: 20 },
        { type: 'download', bytes: 50000000, count: 4 },
        { type: 'upload', bytes: 15000000, count: 3 }
    ]
});

// 3. Handle UI Updates during test
engine.onResultsChange = ({ type }) => {
    const summary = engine.results.getSummary();

    if (summary.download) dlVal.innerText = (summary.download / 1000000).toFixed(1);
    if (summary.upload) ulVal.innerText = (summary.upload / 1000000).toFixed(1);
    if (summary.latency) pingVal.innerText = summary.latency.toFixed(0);
    if (summary.jitter) jitterVal.innerText = summary.jitter.toFixed(0);

    // Update status text based on what is currently running
    if (type === 'download') statusText.innerText = 'Testing Download...';
    if (type === 'upload') statusText.innerText = 'Testing Upload...';
};

engine.onFinish = (results) => {
    const summary = results.getSummary();
    statusText.innerText = 'Test Complete';
    startBtn.disabled = false;
    startBtn.classList.remove('opacity-50', 'cursor-not-allowed', 'pulse-ring');
    startBtn.innerText = 'Restart Test';

    // Prepare Payload
    const payload = {
        timestamp: new Date().toISOString(),
        client: {
            ip: clientIP,
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screen: `${window.screen.width}x${window.screen.height}`
        },
        metrics: {
            download_mbps: parseFloat((summary.download / 1000000).toFixed(2)),
            upload_mbps: parseFloat((summary.upload / 1000000).toFixed(2)),
            latency_ms: summary.latency,
            jitter_ms: summary.jitter
        }
    };

    console.log('Sending Payload:', payload);
    sendReport(payload);
};

// 4. Send Report to Server
async function sendReport(data) {
    try {
        const response = await fetch(REPORTING_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            statusText.innerText = 'Test Complete';
        } else {
            console.error('Server returned error:', response.status);
        }
    } catch (error) {
        console.error('Network error sending report:', error);
    }
}

// 5. Start Button Logic
startBtn.addEventListener('click', () => {
    // Reset UI
    dlVal.innerText = '0.0';
    ulVal.innerText = '0.0';
    pingVal.innerText = '--';
    jitterVal.innerText = '--';
    
    // UI State: Running
    statusText.innerText = 'Initializing...';
    startBtn.disabled = true;
    startBtn.classList.add('opacity-50', 'cursor-not-allowed', 'pulse-ring');
    startBtn.innerText = 'Running...';

    // Start Test
    engine.restart();
});
