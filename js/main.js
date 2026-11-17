/* =========================================
   SHAMIHA BIRTHDAY WEBSITE
   MAIN JAVASCRIPT CONTROLLER
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       1. ELEMENT SELECTION
    ===================================== */

    const body = document.body;


    /* =====================================
       2. BACKGROUND MUSIC CONTROLLER
    ===================================== */

    const music = new Audio(
        "./assets/music/birthday-song.mp3"
    );

    music.loop = true;
    music.volume = 0.35;

    let musicPlaying = false;


    /* =====================================
       3. CREATE MUSIC BUTTON
    ===================================== */

    const musicButton = document.createElement("button");

    musicButton.className = "music-control";

    musicButton.type = "button";

    musicButton.innerHTML =
        '<i class="fa-solid fa-music"></i>';

    musicButton.setAttribute(
        "aria-label",
        "Play background music"
    );

    musicButton.title = "Play Music";

    body.appendChild(musicButton);


    /* =====================================
       4. MUSIC TOGGLE
    ===================================== */

    musicButton.addEventListener("click", async () => {

        try {

            if (!musicPlaying) {

                await music.play();

                musicPlaying = true;

                musicButton.innerHTML =
                    '<i class="fa-solid fa-pause"></i>';

                musicButton.title = "Pause Music";

                musicButton.setAttribute(
                    "aria-label",
                    "Pause background music"
                );

                musicButton.classList.add("playing");

            } else {

                music.pause();

                musicPlaying = false;

                musicButton.innerHTML =
                    '<i class="fa-solid fa-music"></i>';

                musicButton.title = "Play Music";

                musicButton.setAttribute(
                    "aria-label",
                    "Play background music"
                );

                musicButton.classList.remove("playing");

            }

        } catch (error) {

            console.error(
                "Music playback failed:",
                error
            );

        }

    });


    /* =====================================
       5. MUSIC ERROR HANDLING
    ===================================== */

    music.addEventListener("error", () => {

        console.warn(
            "Birthday music could not be loaded. Check the music file path."
        );

    });


    /* =====================================
       6. PAGE INITIALIZATION
    ===================================== */

    console.log(
        "%c Happy Birthday Shamiha! ❤️ ",
        "background: #ff4f91; color: white; padding: 10px; font-size: 16px; border-radius: 8px;"
    );

    console.log(
        "Birthday Website Initialized Successfully!"
    );


    /* =====================================
   LETTER CLOSE / BACK FUNCTIONALITY
===================================== */

const letterOverlay = document.getElementById("letterOverlay");
const openLetterButton = document.getElementById("openLetter");
const closeLetterButton = document.getElementById("closeLetter");

function closeBirthdayLetter() {

    if (!letterOverlay) return;

    letterOverlay.classList.remove("active");

    letterOverlay.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    if (openLetterButton) {
        openLetterButton.focus();
    }
}


// Close button
if (closeLetterButton) {

    closeLetterButton.addEventListener(
        "click",
        closeBirthdayLetter
    );

}


// Escape key
document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        letterOverlay?.classList.contains("active")
    ) {
        closeBirthdayLetter();
    }

});

/* =====================================
   BIRTHDAY INSTRUCTION CONTROLLER
===================================== */

const cakeInstruction = document.getElementById("cakeInstruction");
const letterInstruction = document.getElementById("letterInstruction");

const cakeButton = document.getElementById("birthdayCake");
const letterButton = document.getElementById("openLetter");

if (cakeButton && cakeInstruction && letterInstruction) {

    cakeButton.addEventListener("click", () => {

        cakeInstruction.style.display = "none";

        letterInstruction.style.display = "flex";

    });

}

if (letterButton && letterInstruction) {

    letterButton.addEventListener("click", () => {

        letterInstruction.style.display = "none";

    });

}

});