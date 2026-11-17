
/* =========================================
   SHAMIHA BIRTHDAY WEBSITE
   GRAND CINEMATIC SURPRISE SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       1. ELEMENT SELECTION
    ===================================== */

    const cakeButton = document.getElementById("birthdayCake");
    const surpriseOverlay = document.getElementById("birthdaySurprise");
    const closeButton = document.getElementById("closeSurprise");

    const surpriseContent = surpriseOverlay?.querySelector(
        ".surprise-content"
    );

    if (!cakeButton || !surpriseOverlay || !closeButton) {
        console.error("Surprise system: Required HTML elements not found.");
        return;
    }


    /* =====================================
       2. STATE MANAGEMENT
    ===================================== */

    let surpriseActive = false;

    let confettiInterval = null;
    let finalExplosionTimeout = null;

    let previousBodyOverflow = "";


    /* =====================================
       3. FIREWORK COLORS
    ===================================== */

    const fireworkColors = [
        "#ff4f91",
        "#ff85b3",
        "#ffc1d8",
        "#ffffff",
        "#ffd700",
        "#ffb347",
        "#e6a8ff",
        "#ff6b9d"
    ];


    /* =====================================
       4. GRAND OPENING EXPLOSION
    ===================================== */

    function openingExplosion() {

        if (typeof window.confetti !== "function") {
            console.warn("Confetti library is not loaded.");
            return;
        }

        // Main central explosion
        window.confetti({
            particleCount: 240,
            spread: 160,
            startVelocity: 65,
            gravity: 0.85,
            decay: 0.91,
            ticks: 220,
            scalar: 1.2,
            origin: {
                x: 0.5,
                y: 0.58
            },
            colors: fireworkColors
        });

        // Left side explosion
        window.confetti({
            particleCount: 130,
            angle: 60,
            spread: 100,
            startVelocity: 55,
            origin: {
                x: 0.05,
                y: 0.65
            },
            colors: fireworkColors
        });

        // Right side explosion
        window.confetti({
            particleCount: 130,
            angle: 120,
            spread: 100,
            startVelocity: 55,
            origin: {
                x: 0.95,
                y: 0.65
            },
            colors: fireworkColors
        });
    }


    /* =====================================
       5. INDIVIDUAL FIREWORK EXPLOSION
    ===================================== */

    function createFirework(x, y) {

        if (typeof window.confetti !== "function") return;

        // Main explosion
        window.confetti({
            particleCount: 95,
            spread: 360,
            startVelocity: 42,
            gravity: 0.9,
            decay: 0.92,
            ticks: 170,
            scalar: 1,
            origin: {
                x: x,
                y: y
            },
            colors: fireworkColors
        });

        // Secondary sparkling particles
        window.confetti({
            particleCount: 35,
            spread: 120,
            startVelocity: 28,
            gravity: 1.1,
            ticks: 110,
            scalar: 0.7,
            origin: {
                x: x,
                y: y
            },
            colors: [
                "#ffffff",
                "#ffd700",
                "#ffc1d8"
            ]
        });
    }


    /* =====================================
       6. CONTINUOUS FIREWORKS
    ===================================== */

    function startContinuousFireworks() {

        stopContinuousFireworks();

        const duration = 7000;
        const endTime = Date.now() + duration;

        confettiInterval = setInterval(() => {

            if (!surpriseActive || Date.now() >= endTime) {
                stopContinuousFireworks();
                return;
            }

            const x = 0.08 + Math.random() * 0.84;
            const y = 0.08 + Math.random() * 0.42;

            createFirework(x, y);

        }, 320);


        // Final grand explosion
        finalExplosionTimeout = setTimeout(() => {

            if (!surpriseActive) return;

            window.confetti({
                particleCount: 280,
                spread: 180,
                startVelocity: 65,
                gravity: 0.85,
                decay: 0.9,
                ticks: 250,
                scalar: 1.3,
                origin: {
                    x: 0.5,
                    y: 0.55
                },
                colors: fireworkColors
            });

            // Additional side explosions
            setTimeout(() => {

                if (!surpriseActive) return;

                createFirework(0.18, 0.25);
                createFirework(0.82, 0.25);

            }, 200);

        }, 5200);
    }


    /* =====================================
       7. STOP FIREWORKS
    ===================================== */

    function stopContinuousFireworks() {

        if (confettiInterval !== null) {
            clearInterval(confettiInterval);
            confettiInterval = null;
        }

    }


    function stopAllFireworks() {

        stopContinuousFireworks();

        if (finalExplosionTimeout !== null) {
            clearTimeout(finalExplosionTimeout);
            finalExplosionTimeout = null;
        }

        if (typeof window.confetti === "function") {
            window.confetti.reset();
        }

    }


    /* =====================================
       8. FLOATING HEARTS
    ===================================== */

    let heartInterval = null;
    let floatingHearts = [];


    function createFloatingHeart() {

        if (!surpriseActive) return;

        const heart = document.createElement("span");

        heart.className = "surprise-floating-heart";

        heart.textContent = Math.random() > 0.5 ? "❤️" : "💕";

        heart.style.left = Math.random() * 100 + "%";

        heart.style.fontSize =
            Math.random() * 15 + 15 + "px";

        heart.style.animationDuration =
            (Math.random() * 2 + 5) + "s";

        surpriseOverlay.appendChild(heart);

        floatingHearts.push(heart);

        setTimeout(() => {

            heart.remove();

            floatingHearts = floatingHearts.filter(
                item => item !== heart
            );

        }, 7500);
    }


    function startFloatingHearts() {

        stopFloatingHearts();

        heartInterval = setInterval(() => {

            createFloatingHeart();

        }, 700);
    }


    function stopFloatingHearts() {

        if (heartInterval !== null) {
            clearInterval(heartInterval);
            heartInterval = null;
        }

        floatingHearts.forEach(heart => heart.remove());

        floatingHearts = [];
    }


    /* =====================================
       9. OPEN SURPRISE
    ===================================== */

    function openSurprise() {

        if (surpriseActive) return;

        surpriseActive = true;

        previousBodyOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        surpriseOverlay.classList.add("active");

        surpriseOverlay.setAttribute(
            "aria-hidden",
            "false"
        );

        // Start celebration
        openingExplosion();

        setTimeout(() => {

            if (!surpriseActive) return;

            startContinuousFireworks();

        }, 300);

        startFloatingHearts();

        // Focus close button
        closeButton.focus();

        console.log("Grand Birthday Surprise Started! 🎆");
    }


    /* =====================================
       10. CLOSE SURPRISE
    ===================================== */

    function closeSurprise() {

        if (!surpriseActive) return;

        surpriseActive = false;

        surpriseOverlay.classList.remove("active");

        surpriseOverlay.setAttribute(
            "aria-hidden",
            "true"
        );

        // Stop every animation
        stopAllFireworks();

        stopFloatingHearts();

        // Restore scrolling
        document.body.style.overflow = previousBodyOverflow;

        // Return focus
        cakeButton.focus();

        console.log("Birthday Surprise Closed ❤️");
    }


    /* =====================================
       11. EVENT LISTENERS
    ===================================== */

    // Cake click
    cakeButton.addEventListener("click", openSurprise);

    // Close button click
    closeButton.addEventListener("click", closeSurprise);

    // Click outside content
    surpriseOverlay.addEventListener("click", (event) => {

        if (event.target === surpriseOverlay) {
            closeSurprise();
        }

    });

    // Prevent content click from closing
    if (surpriseContent) {

        surpriseContent.addEventListener("click", (event) => {
            event.stopPropagation();
        });

    }

    // Escape key
    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape" && surpriseActive) {
            closeSurprise();
        }

    });


    /* =====================================
       12. INITIALIZATION
    ===================================== */

    surpriseOverlay.classList.remove("active");

    surpriseOverlay.setAttribute(
        "aria-hidden",
        "true"
    );

    console.log(
        "%c SHAMIHA GRAND SURPRISE READY! 🎆❤️ ",
        "background:#ff4f91;color:white;padding:10px;font-size:14px;"
    );

});