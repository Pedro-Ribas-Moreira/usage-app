const TARGET_GOAL = 5000;
const API_URL = "https://cxapi.yunoenergy.ie:8080/api/powertokens";
const STREAM_URL = "https://cxapi.yunoenergy.ie:8080/api/powertokens/stream";
const POLL_MS = 10000;
const STREAM_RECONNECT_MS = 4000;
const MAX_RECENT = 100;

// New audio for milestones
const milestoneSound = new Audio('./assets/mixkit-game-success-alert-2039.wav');
milestoneSound.volume = 0.6;
const coinDropSound = new Audio('./assets/coin-drop.wav');
coinDropSound.volume = 1;

let lastStageImage = "";

let seenBatches = new Set(); // Track human-readable batch IDs to prevent double-animation

const JAR_STAGES = [
    { threshold: 0.00, image: "./assets/Jar2-0.png" },
    { threshold: 0.14, image: "./assets/Jar2-1.png" },
    { threshold: 0.28, image: "./assets/Jar2-2.png" },
    { threshold: 0.42, image: "./assets/Jar2-3.png" },
    { threshold: 0.57, image: "./assets/Jar2-4.png" },
    { threshold: 0.71, image: "./assets/Jar2-5.png" },
    { threshold: 0.85, image: "./assets/Jar2-6.png" },
    { threshold: 1.00, image: "./assets/Jar2-7.png" }
];

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const PROGRESSIVE_IMAGES = [
    "assets/unicorn.png",
    "assets/unicorn.png",
    "assets/griffin.png",
    "assets/griffin.png",
    "assets/phoenix.png",
    "assets/phoenix.png",
    "assets/dragon.png",
    "assets/dragon.png",
    "assets/chimera.png",
    "assets/chimera.png",
];

const CELEBRATION_SOUNDS = [
    "assets/mixkit-ending-show-audience-clapping-478.wav",
];

const activeCelebrations = {};
const celebrationQueue = [];
let isProcessingCelebrationQueue = false;
const CELEBRATION_DURATION_MS = 12000;

let currentTokens = 0;
let recentTokens = [];
let seenIds = new Set();
let hasHydratedOnce = false;
let streamConnection = null;
let audioUnlocked = false;
let soundMuted = false;
const awardSound = new Audio();
awardSound.volume = 0.5;

// --- Initialization ---

document.addEventListener("DOMContentLoaded", () => {
    // console.log("DOM Content Loaded: Initializing app...");
    const now = new Date();
    // const monthYear = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
    const season = document.getElementById("current-season");
    if (season) season.innerText = "Season 1";
    initDashboard();
});

// --- Sound Controls ---

function updateSoundButton() {
    // console.log("Updating sound button UI. Unlocked:", audioUnlocked, "Muted:", soundMuted);
    const btn = document.getElementById("sound-toggle-btn");
    if (!btn) return;

    if (!audioUnlocked) {
        btn.innerText = "Enable Sound";
        return;
    }

    btn.innerText = soundMuted ? "Unmute Sound" : "Mute Sound";
    btn.setAttribute("aria-pressed", !soundMuted);
}

async function unlockAudioForPlayback() {
    // console.log("Attempting to unlock audio via user interaction...");
    awardSound.src = CELEBRATION_SOUNDS[0];
    awardSound.volume = 0;
    await awardSound.play();
    awardSound.pause();
    awardSound.currentTime = 0;
    awardSound.volume = 0.5;
    audioUnlocked = true;
    soundMuted = false;
    // console.log("Audio successfully unlocked.");
}

async function toggleSound() {
    // console.log("Toggle sound triggered.");
    try {
        if (!audioUnlocked) {
            await unlockAudioForPlayback();
        } else {
            soundMuted = !soundMuted;
        }
        updateSoundButton();
    } catch (error) {
        console.error("Audio toggle failed:", error);
    }
}

// --- UI & Display ---

const ctxProgress = document.getElementById("progressChart").getContext("2d");
const progressChart = new Chart(ctxProgress, {
    type: "doughnut",
    data: {
        datasets: [{
            data: [0, TARGET_GOAL],
            backgroundColor: ["#3b82f6", "#f1f5f9"],
            borderWidth: 0,
            borderRadius: 30,
            cutout: "80%"
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        animation: { duration: 2000, easing: "easeOutElastic" }
    }
});

function updateDisplay() {
    // console.log(`Updating display. Tokens: ${currentTokens}, Goal: ${TARGET_GOAL}`);
    // currentTokens = 300
    const ratio = Math.min(currentTokens / TARGET_GOAL, 1);
    const percent = Math.round(ratio * 100);
    
    document.getElementById("total-count-display").innerText = currentTokens.toLocaleString();
    document.getElementById("percentage-label").innerText = percent + "%";
    
    progressChart.data.datasets[0].data = [currentTokens, Math.max(0, TARGET_GOAL - currentTokens)];
    progressChart.update();

    const jarImage = document.getElementById("jar-background");
    const jarGroup = document.querySelector(".jar-group");
    const fillingLottie = document.getElementById("lottie-filling-container");

    if (jarImage) {
        const stage = [...JAR_STAGES].reverse().find(s => ratio >= s.threshold);
        
        if (stage && stage.image !== lastStageImage) {
            // console.log(`New milestone reached: ${stage.image}`);
            if (lastStageImage !== "") {
                triggerMilestoneCelebration(jarGroup, jarImage, fillingLottie, stage.image);
            } else {
                jarImage.src = stage.image;
            }
            lastStageImage = stage.image;
        }
    }
}

function triggerMilestoneCelebration(group, imgElement, lottie, newSrc) {
    // console.log("Triggering Milestone Celebration for:", newSrc);
    if (group) group.classList.add("jar-level-up");
    if (lottie) lottie.style.opacity = "1";

    setTimeout(() => {
        if (audioUnlocked && !soundMuted) {
            // console.log("Playing milestone sound.");
            milestoneSound.currentTime = 0;
           milestoneSound.play().catch(e => console.log("Audio play blocked", e));
        }
        imgElement.src = newSrc;
    }, 300);

    setTimeout(() => {
        if (group) group.classList.remove("jar-level-up");
        if (lottie) lottie.style.opacity = "0";
    }, 3000);
}

function spawnVisualCoin() {
    // console.log("Spawning visual coin...");
    const container = document.getElementById("coin-spawn-area");
    if (!container) return;

    const coin = document.createElement("img");
    coin.src = "./assets/coin.png";
    coin.className = "coin-drop";
    
   
    const randomRotation = Math.floor(Math.random() * 20);
    const landingY = 0; 

  
    coin.style.setProperty('--end-rotation', `${randomRotation}deg`);
    coin.style.setProperty('--y-offset', `${landingY}px`);
    coin.style.opacity = "1.2"
    
    container.appendChild(coin);

         if (audioUnlocked && !soundMuted) {
            // console.log("Playing milestone sound.");
            coinDropSound.currentTime = 0;
           coinDropSound.play().catch(e => console.log("Audio play blocked", e));
        }

    const jarGroup = document.querySelector(".jar-group");
    if (jarGroup) {
        jarGroup.classList.add("shake-anim");
        setTimeout(() => jarGroup.classList.remove("shake-anim"), 500);
    }

    setTimeout(() => {
        coin.style.transition = "opacity 0.5s ease";
        coin.style.opacity = "0";
        setTimeout(() => coin.remove(), 500);
    }, 3000);
}

// --- Celebrations ---

function triggerCelebration(name, reason, initialCount = 1, batchId = null) {
    // console.log(`[Queue Check] Attempting to queue: ${name} | Batch: ${batchId}`);

    // 1. If it's a batch, check if it's already in the queue waiting to be processed
    if (batchId) {
        const isAlreadyQueued = celebrationQueue.some(item => item.batchId === batchId);
        if (isAlreadyQueued) {
            console.warn(`[Queue Blocked] Batch ${batchId} is already in the queue. Skipping duplicate.`);
            return;
        }
    }

    // 2. Add to the queue including the batchId for future checks
    celebrationQueue.push({ name, reason, count: initialCount, batchId: batchId });
    // console.log(`[Queue Added] Current queue length: ${celebrationQueue.length}`);
    
    processCelebrationQueue();  
}

function processCelebrationQueue() {
    // console.log(`Processing queue. Remaining: ${celebrationQueue.length}, Currently busy: ${isProcessingCelebrationQueue}`);
    if (isProcessingCelebrationQueue || celebrationQueue.length === 0) return;

    isProcessingCelebrationQueue = true;
// UPDATED: Extract 'count' from the object shifted out of the queue
    const { name, reason, count } = celebrationQueue.shift();
    
    // UPDATED: Pass the count to showCelebration
    showCelebration(name, reason, count);

    setTimeout(() => {
        isProcessingCelebrationQueue = false;   
        processCelebrationQueue();
    }, CELEBRATION_DURATION_MS);
}

function updateCelebrationUI(name, count) {
    // console.log(`Updating UI for ${name} multiplier to x${count}`);
    // const bannerId = `celebration-${name.replace(/\s+/g, '-')}`;
    // const container = document.getElementById(bannerId);
    
    // if (container) {
    //     const badge = container.querySelector('.multiplier-badge');
    //     if (badge) {
    //         badge.innerText = `x${count}`;
    //         badge.classList.remove('scale-0');
    //         badge.style.transform = 'scale(1.2)';
    //         setTimeout(() => badge.style.transform = 'scale(1)', 200);
    //     }

    //     const imageEl = container.querySelector('.celebration-image');
    //     if (imageEl) {
    //         const imageIndex = Math.min(count - 1, PROGRESSIVE_IMAGES.length - 1);
    //         const newSrc = PROGRESSIVE_IMAGES[imageIndex];
            
    //         if (imageEl.src.indexOf(newSrc) === -1) {    //             imageEl.src = newSrc;
    //             imageEl.animate([
    //                 { transform: 'scale(1)', filter: 'brightness(1)' },
    //                 { transform: 'scale(1.3)', filter: 'brightness(1.5)' },
    //                 { transform: 'scale(1)', filter: 'brightness(1)' }
    //             ], { duration: 500 });
    //         }
    //     }
    // }
    return
}

function showCelebration(name, reason, count) {
    // console.log(`Showing banner for ${name}: "${reason}" with count: ${count}`);
    spawnVisualCoin();
    activeCelebrations[name] = { count: count };

    // Determine the correct image index based on count
    // Use Math.min to ensure we don't exceed the number of available images
    const imageIndex = Math.min(count - 1, PROGRESSIVE_IMAGES.length - 1);
    const selectedImage = PROGRESSIVE_IMAGES[imageIndex];

    if (audioUnlocked && !soundMuted) {
        const randomSound = CELEBRATION_SOUNDS[0];
        awardSound.src = randomSound;
        awardSound.volume = 0.5;
        awardSound.play().catch(() => {});
    }

    console.log({count})

    const container = document.createElement("div");
    container.className = "celebration-container";
    container.id = `celebration-${name.replace(/\s+/g, '-')}`;

    container.innerHTML = `
        <div class="celebration-banner relative">
            <div class="multiplier-badge absolute -top-4 -right-4 bg-red-500 text-white font-black rounded-full w-10 h-10 flex items-center justify-center border-4 border-white shadow-lg ${count > 1 ? 'scale-100' : 'scale-0'} transition-transform duration-300">
                x${count}
            </div>
            <div class="bg-yellow-400 p-3 rounded-2xl shadow-sm -rotate-3">
                <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
            </div>
            <div>
                <h4 class="text-blue-600 font-black uppercase tracking-widest text-[10px] mb-0.5">Power Token Received!</h4>
                <p class="text-2xl font-black text-slate-800 tracking-tight leading-tight">${name}</p>
                <p class="text-slate-500 italic text-sm font-medium">"${reason}"</p>
            </div>
        </div>
        <img src="${selectedImage}" class="celebration-image" alt="Celebration">
    `;

    container.style.setProperty('--start-y', Math.random() * 80 + 10 + '%');
    container.style.setProperty('--mid-y',   Math.random() * 80 + 10 + '%');
    container.style.setProperty('--end-y',   Math.random() * 80 + 10 + '%');

    document.body.appendChild(container);

    // --- Sparkle/Lottie Logic ---
    setTimeout(() => {
        const lottieContainer = document.getElementById("lottie-celebration-container");
        if (lottieContainer) {
            lottieContainer.classList.replace("opacity-0", "opacity-100");
            setTimeout(() => {
                lottieContainer.classList.replace("opacity-100", "opacity-0");
            }, 4000); 
        }
    }, 2000);

    // --- Audio Fade Out ---
    setTimeout(() => {
        // console.log(`Starting audio fade out for ${name}`);
        const fadeDuration = 6000;
        const fadeStep = 50;
        const volumeStep = awardSound.volume / (fadeDuration / fadeStep);

        const fadeOutInterval = setInterval(() => {
            if (awardSound.volume > volumeStep) {
                awardSound.volume -= volumeStep;
            } else {
                awardSound.pause();
                awardSound.currentTime = 0;
                awardSound.volume = 0.5;
                clearInterval(fadeOutInterval);
            }
        }, fadeStep);

    }, 8000); 

    // --- UI Cleanup ---
    setTimeout(() => {
        // console.log(`Cleaning up UI for ${name}`);
        container.remove();
        delete activeCelebrations[name];
    }, CELEBRATION_DURATION_MS);
}
// --- Networking ---

async function fetchTokens() {
    try {
        const response = await fetch(`${API_URL}?limit=${MAX_RECENT}`);
        const data = await response.json();
        
        const progressFromApi = Number(data.cycleProgress ?? data.totalMonth ?? 0);
        currentTokens = Number.isFinite(progressFromApi) ? progressFromApi : 0;
        const normalizedRecent = (data.recent || []).map(normalizeToken).filter(Boolean);
        recentTokens = sortTokensByCreatedDesc(normalizedRecent).slice(0, MAX_RECENT);
        
        if (!hasHydratedOnce) {
            // console.log("Initial hydration of seen IDs.");
            recentTokens.forEach(t => seenIds.add(t.id));
            hasHydratedOnce = true;
        } else {
        //  console.log(normalizedRecent)
          normalizedRecent.reverse().forEach(token => {
            if (!seenIds.has(token.id)) {
            seenIds.add(token.id);
                    
                    const countToAdd = token.count || 1;
                    // Check seenBatches
                    if (token.batchId && !seenBatches.has(token.batchId)) {
                        if (token.batchId) seenBatches.add(token.batchId);
                        triggerCelebration(token.agentName, token.reason, countToAdd, token.batchId);
                    } else if (!token.batchId) {
                        // Fallback for old rows without a batchId
                        triggerCelebration(token.agentName, token.reason, countToAdd, null);
                    }
                }
            }); 
        }

        updateDisplay();
        renderRecentList(recentTokens);
        setLastUpdated(new Date());
    } catch (error) { 
        console.error("Fetch failed", error); 
    }
}

function connectTokenStream() {
    // console.log("Initializing EventSource stream...");
    if (streamConnection) return;
    const source = new EventSource(STREAM_URL);
    streamConnection = source;

    source.addEventListener("token-batch", (event) => {
        // console.log("Received 'token-batch' from stream.");
        try {
            const payload = JSON.parse(event.data);
            const tokens = (payload.tokens || []).map(normalizeToken).filter(Boolean);
            let actualNewTokensAdded = 0;
            
            tokens.forEach(token => {
                // 1. Check if we've seen this specific DB ID (for count/counter logic)
                if (!seenIds.has(token.id)) {
                    seenIds.add(token.id);
                    
                    const countFromApi = token.count || 1; 
                    actualNewTokensAdded += countFromApi;

                    // 2. NEW: Check if we've already animated this BatchId
                    if (token.batchId && seenBatches.has(token.batchId)) {
                        // console.log(`Skipping animation for already seen batch: ${token.batchId}`);
                    } else {
                        if (token.batchId) seenBatches.add(token.batchId);
                        
                        // Only trigger celebration if it's a new batch
                        triggerCelebration(token.agentName, token.reason, countFromApi, token.batchId);
                    }
                }
            });
        
            if (actualNewTokensAdded > 0) {
                currentTokens += actualNewTokensAdded;
                updateDisplay();
                renderRecentList(recentTokens);
            }
        } catch (e) { 
            console.error("Stream parse error", e); 
        }
    });

    source.onerror = () => {
        console.warn("Stream connection error. Reconnecting...");
        source.close();
        streamConnection = null;
        setTimeout(connectTokenStream, STREAM_RECONNECT_MS);
    };
}

// --- Helpers ---

function normalizeToken(item) {
    if (!item) return null;
    return {
        id: item.id,
        batchId: item.batchId, // Ensure this is captured
        created: item.created ?? new Date().toISOString(),
        agentName: item.agentName ?? "Unknown Agent",
        reason: item.reason ?? "Great work!",
        count: item.count ? Number(item.count) : 1
    };
}
function sortTokensByCreatedDesc(items) {
    // console.log("Sorting tokens by date.");
    return [...items].sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
}
function groupRecentTokens(items) {
    // console.log("Grouping tokens for recent list display using server counts.");
    const map = new Map();
    
    (items || []).forEach((item) => {
        const agentName = (item.agentName || "Unknown Agent").trim();
        const reason = (item.reason || "Great work!").trim();
        const key = `${agentName}||${reason}`;

        // Ensure we are working with a valid number from the server
        const incomingCount = Number(item.count) || 1;

        if (map.has(key)) {
            const existing = map.get(key);
            
            // UPDATE: Add the server's count to the total instead of +1
            existing.count += incomingCount;
            
            // Keep the most recent timestamp
            if (new Date(item.created).getTime() > new Date(existing.created).getTime()) {
                existing.created = item.created;
            }
        } else {
            // Create a new entry starting with the server's count
            map.set(key, { ...item, agentName, reason, count: incomingCount });
        }
    });

    return Array.from(map.values()).sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
    );
}

function renderRecentList(items) {
    // console.log({items})
    // console.log("Rendering recent list UI.");
    const listContainer = document.getElementById("recent-list");
    if (!listContainer) return;

    const groupedItems = groupRecentTokens(items).slice(0, MAX_RECENT);
    // console.log({groupedItems})

    if (groupedItems.length === 0) {
        listContainer.innerHTML = `<div class="col-span-2 text-slate-300 text-center py-10 italic font-bold text-xl">Listening for good vibes...</div>`;
        return;
    }

    listContainer.innerHTML = groupedItems
        .map((item) => {
     
            const time = new Date(item.created).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            const badge = item.count > 1 ? `<span class="bg-red-500 text-white px-2 xl:px-3 py-1 rounded-full font-black uppercase tracking-widest">x${item.count}</span>` : "";

            return `
            <div class="recent-item p-3 2xl:p-5 rounded-[1.5rem] 2xl:rounded-[2rem] flex flex-col gap-0.5 2xl:gap-1 shadow-sm">
                    <div class="flex justify-between items-start gap-2 2xl:gap-3">
                        <span class="font-black text-slate-800 text-md xl:text-lg tracking-tight truncate">${item.agentName}</span>
                        
                        <div class="flex items-center gap-1 2xl:gap-2 shrink-0 text-xs 2xl:text-md">
                            ${badge}
                            <span class="bg-blue-100 text-blue-600 px-2 2xl:px-3 py-1 rounded-full font-black uppercase tracking-widest">
                                ${time}
                            </span>
                        </div>
                    </div>
                    <p class="text-sm 2xl:text-md text-slate-500 italic ">"${item.reason}"</p>
            </div>
            `;
        })
        .join("");
}

function setLastUpdated(date) {
    // console.log(`Setting last updated time to: ${date.toLocaleTimeString()}`);
    const el = document.getElementById("last-updated");
    if (el) el.innerText = `Last updated: ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`;
}

async function initDashboard() {
    // console.log("Starting dashboard initialization sequence.");
    await fetchTokens();
    const goalDisplay = document.getElementById("goal-display");
    if (goalDisplay) goalDisplay.innerText = `/ ${TARGET_GOAL} `;
    
    connectTokenStream();
    setInterval(fetchTokens, POLL_MS);
}
