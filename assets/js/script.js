// ================= HEADER =================
const header = document.getElementById("site-header");
window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
});

// ================= MOBILE NAV =================
const toggle = document.getElementById("navToggle");
const navList = document.getElementById("navList");
if (toggle && navList) {
    toggle.addEventListener("click", () => {
        const isOpen = navList.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });
    navList.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navList.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });
}

// ================= MENU TABS (accessible tablist) =================
const tabs = Array.from(document.querySelectorAll(".menu-tab"));
const panels = Array.from(document.querySelectorAll(".menu-panel"));

function activateTab(tab) {
    tabs.forEach(t => {
        const isActive = t === tab;
        t.classList.toggle("active", isActive);
        t.setAttribute("aria-selected", String(isActive));
        t.tabIndex = isActive ? 0 : -1;
    });
    panels.forEach(panel => {
        const isActive = panel.dataset.panel === tab.dataset.tab;
        panel.classList.toggle("active", isActive);
        if (isActive) {
            panel.removeAttribute("hidden");
        } else {
            panel.setAttribute("hidden", "");
        }
    });
}

tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (e) => {
        let newIndex = null;
        if (e.key === "ArrowRight") newIndex = (i + 1) % tabs.length;
        if (e.key === "ArrowLeft") newIndex = (i - 1 + tabs.length) % tabs.length;
        if (newIndex !== null) {
            e.preventDefault();
            tabs[newIndex].focus();
            activateTab(tabs[newIndex]);
        }
    });
});

// ================= SCROLL REVEAL =================
const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("in");
        }
    });
}, {
    threshold: 0.15
});
reveals.forEach(item => revealObserver.observe(item));

// ================= SHIP'S WHEEL: SPIN + CAPTAIN'S TIP =================
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const needle = document.getElementById("compass-needle");
if (needle && !prefersReducedMotion) {
    let angle = 0;
    function spinCompass() {
        angle += 0.3;
        if (angle >= 360) {
            angle = 0;
        }
        needle.style.transform = `rotate(${angle}deg)`;
        needle.style.transformOrigin = "50% 50%";
        needle.style.transformBox = "fill-box";
        requestAnimationFrame(spinCompass);
    }
    spinCompass();
}

const captainsTips = [
    "The Kraken's Catch pairs best with Ocean Teal Fizz.",
    "Ask your server for the crimson-hot glaze — it's not on the menu.",
    "Lower Deck seating is quietest for a long crew dinner.",
    "First Mate Veggie can be made dairy-free on request.",
    "Cannon Ball Buckets feed a crew of three, easy.",
    "Weekday afternoons are the calmest time to board.",
    "The Anchor Hall books up fastest on weekends — arrive early."
];

const compassBtn = document.getElementById("compassBtn");
const compassTip = document.getElementById("compassTip");
const compassTipText = document.getElementById("compassTipText");
if (compassBtn && compassTip && compassTipText) {
    compassBtn.addEventListener("click", () => {
        const isShown = compassTip.classList.toggle("show");
        compassBtn.setAttribute("aria-expanded", String(isShown));
        if (isShown) {
            const tip = captainsTips[Math.floor(Math.random() * captainsTips.length)];
            compassTipText.textContent = tip;
        }
    });
    document.addEventListener("click", (e) => {
        if (!compassBtn.contains(e.target) && !compassTip.contains(e.target)) {
            compassTip.classList.remove("show");
            compassBtn.setAttribute("aria-expanded", "false");
        }
    });
}

// ================= TODAY'S CATCH (daily special) =================
const dailySpecials = {
    0: "The Kraken's Catch, R74",   // Sunday
    1: "Dutchman Classic, R69",     // Monday
    2: "Galley Wrap, R71",          // Tuesday
    3: "Plank Tenders, R79",        // Wednesday
    4: "Cannon Ball Bucket, R145",  // Thursday
    5: "The Blackbeard Stack, R89", // Friday
    6: "First Mate Veggie, R65"     // Saturday
};
const dailySpecialEl = document.getElementById("dailySpecial");
if (dailySpecialEl) {
    const today = new Date().getDay();
    dailySpecialEl.textContent = `Today's Catch: ${dailySpecials[today]}`;
}

// ================= MESSAGE IN A BOTTLE (newsletter) =================
const bottleForm = document.getElementById("bottleForm");
const bottleConfirm = document.getElementById("bottleConfirm");
if (bottleForm && bottleConfirm) {
    bottleForm.addEventListener("submit", (e) => {
        e.preventDefault();
        bottleConfirm.classList.add("show");
        bottleForm.reset();
    });
}
