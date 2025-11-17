/* ----------------------------------------------------
   CrypTech King — MAIN JS
   Theme toggle • Live crypto data • Tools UI handlers
----------------------------------------------------- */

/* -------------------------------
   1) THEME TOGGLE
--------------------------------- */
(function themeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme;
    const next = current === "light" ? "ultra-dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("ctk_theme", next);
  });
})();

/* -------------------------------
   2) LIVE CRYPTO TICKER
--------------------------------- */

async function fetchTicker() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd");
    const data = await res.json();

    // BTC
    const btc = data.bitcoin.usd.toLocaleString();
    document.getElementById("tick-btc").textContent = `$${btc}`;

    // ETH
    const eth = data.ethereum.usd.toLocaleString();
    document.getElementById("tick-eth").textContent = `$${eth}`;

    // Fear & Greed Index
    const fgRes = await fetch("https://api.alternative.me/fng/?limit=1");
    const fgData = await fgRes.json();
    document.getElementById("tick-fg").textContent = fgData.data[0].value;

    // Gas fees (ETH)
    const gasRes = await fetch("https://api.blocknative.com/gasprices/blockprices", {
      headers: { "Authorization": "" }
    }).catch(() => null);

    if (gasRes && gasRes.ok) {
      const gas = await gasRes.json();
      const gwei = Math.round(gas.blockPrices[0].baseFeePerGas);
      document.getElementById("tick-gas").textContent = `${gwei} gwei`;
    } else {
      document.getElementById("tick-gas").textContent = "—";
    }

  } catch (err) {
    console.log("Ticker fetch failed:", err);
  }
}

// Refresh every 14 seconds
fetchTicker();
setInterval(fetchTicker, 14000);

/* -------------------------------
   3) BASIC FADE-IN ANIMATIONS
--------------------------------- */

function fadeInOnScroll() {
  const els = document.querySelectorAll(".fade-in");
  els.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0px)";
    }
  });
}
window.addEventListener("scroll", fadeInOnScroll);
setTimeout(fadeInOnScroll, 500);

/* -------------------------------
   4) FREE TOOLS — INPUT HANDLERS
--------------------------------- */
/*
   Structure:
   Each FREE tool will have:
   <input class="input" id="tool-wallet">
   <button onclick="runWalletTool()">Scan</button>
   <div id="result-wallet"></div>
*/

function showResultCard(id, title, content, status = "neutral") {
  const el = document.getElementById(id);
  if (!el) return;

  let color =
    status === "good" ? "var(--gold)" :
    status === "bad" ? "var(--red)" :
    "var(--text)";

  el.innerHTML = `
    <div class="tool-result fade-in" style="border-color:${color};">
      <div style="font-size:16px;font-weight:700;color:${color};margin-bottom:6px;">
        ${title}
      </div>

      <div style="margin-bottom:10px;">
        ${content}
      </div>

      <!-- Share Buttons (image generation in Part 6) -->
      <div style="display:flex;gap:10px;margin-top:12px;">
        <button class="btn-main" style="padding:8px 16px;font-size:13px;">Share on X</button>
        <button class="btn-line" style="padding:8px 16px;font-size:13px;">Share on Telegram</button>
      </div>

      <div class="watermark">© CrypTechKing • cryptechking.com</div>
    </div>
  `;
  fadeInOnScroll();
}

/* -------------------------------
   5) TOOL LOGIC — BASIC DEMO
--------------------------------- */

function runWalletTool() {
  const wallet = document.getElementById("tool-wallet").value.trim();
  if (!wallet) {
    showResultCard("result-wallet", "Error", "Please enter a wallet address.", "bad");
    return;
  }

  // Placeholder — real logic will be added in PART 5/6
  showResultCard(
    "result-wallet",
    "Wallet Scan Completed",
    `Wallet <b>${wallet}</b> scanned successfully.<br/>Real data will load here.`,
    "good"
  );
}

function runHoneypotTool() {
  const token = document.getElementById("tool-token").value.trim();
  if (!token) {
    showResultCard("result-honey", "Error", "Please enter a token address.", "bad");
    return;
  }

  showResultCard(
    "result-honey",
    "Honeypot Scan Result",
    `Token <b>${token}</b> scanned.<br/>Full honeypot risk logic will be added next.`,
    "neutral"
  );
}

/* -------------------------------
   6) ADVANCED TOOLS — (TG Gated)
--------------------------------- */

function requireTG() {
  alert("Join @CrypTechKingAlpha to unlock advanced tools.");
  window.open("https://t.me/CrypTechKingAlpha", "_blank");
}

/* -------------------------------
   7) TWEET GENERATOR — UI BASE
--------------------------------- */

function generateTweets() {
  const style = document.getElementById("tweet-style").value || "general";

  const ideas = {
    general: [
      "Crypto moves when silence speaks. Build now, flex later.",
      "Real alpha? Learn to survive when the market sleeps.",
      "No hype. Just execution. That's where legends are made."
    ],
    meme: [
      "1 ETH = retirement plan (copium edition)",
      "When dev says 'soon' — check your wallet again.",
      "Crypto devs at 3AM: fixing bugs they created at 2AM."
    ],
    alpha: [
      "Next bull winner will be infra + data indexing layer.",
      "Watch liquidity, not influencers. Smart money leaves footprints.",
      "Build bots. Automate. Observe. It pays more than hoping."
    ],
    motivation: [
      "Building alone is still building. Keep going.",
      "If it was easy, everyone would do it.",
      "Every day you delay — someone else executes."
    ]
  };

  const pick = ideas[style];
  const output = pick.map(t => `<div class="card" style="margin-bottom:14px;">${t}</div>`).join("");

  document.getElementById("tweet-output").innerHTML = output;
}

/* -------------------------------
   8) DEBUG LOG
--------------------------------- */
console.log("CrypTech King JS loaded successfully.");
