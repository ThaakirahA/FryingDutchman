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
        navList.classList.toggle("open");
    });

    navList.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navList.classList.remove("open");
        });
    });
}

// ================= MENU TABS =================
const tabs = document.querySelectorAll(".menu-tab");
const panels = document.querySelectorAll(".menu-panel");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        tabs.forEach(t => t.classList.remove("active"));
        panels.forEach(panel => panel.classList.remove("active"));

        tab.classList.add("active");

        const panel = document.querySelector(
            `.menu-panel[data-panel="${tab.dataset.tab}"]`
        );

        if (panel) {
            panel.classList.add("active");
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

// ================= COMPASS SPIN =================
const needle = document.getElementById("compass-needle");

if (needle) {

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
