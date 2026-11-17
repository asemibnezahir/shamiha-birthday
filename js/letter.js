/* =========================================
   SHAMIHA BIRTHDAY WEBSITE
   PERSONAL LETTER SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* 1. ELEMENT SELECTION */

    const mailButton = document.getElementById("openLetter");
    const mailBox = document.getElementById("letterOverlay");
    const closeButton = document.getElementById("closeLetter");
    const messageElement = document.getElementById("letterText");

    if (!mailButton || !mailBox || !closeButton || !messageElement) {
        console.error("Letter system: Required elements not found.");
        return;
    }


    /* 2. BIRTHDAY MESSAGE */

    const birthdayMessage = `My Dear Lovely Wife, ❤️

শুভ জন্মদিন বউ পাখি আমার! 🥺❤️ জানো, তোমাকে নিয়ে কী লিখব ভাবতে গেলেই কেমন যেন সবকিছু গুলিয়ে যায়। কত কথা বলতে ইচ্ছা করে, অথচ লিখতে বসলে মনে হয় কিছুই ঠিকভাবে প্রকাশ করতে পারছি না। তবুও আজ তোমার জন্মদিনে তোমাকে কিছু কথা বলতে চাই। 🥺

তুমি জানো, তোমাকে আমি কত নামে ডাকি—Shamiha, Bou, Jaan, koliza, pakhi কখনো আবার অন্য কত কী! কিন্তু প্রতিটা নামের মধ্যেই আমার একটু একটু করে ভালোবাসা লুকিয়ে আছে। তোমাকে শুধু ভালোবাসি বললে হয়তো আমার অনুভূতিটা পুরোপুরি বোঝানো হবে না। তুমি আমার কাছে কতটা আপন, সেটা হয়তো সবসময় মুখে বলে বোঝানোই যাবেনা। 🥺🥺

তোমার সাথে ছোট ছোট মুহূর্তগুলোও আমার কাছে অনেক special। তোমার সাথে কথা বলা, তোমার অভিমান, তোমার হাসি, তোমার ছোট ছোট আবদার—সবকিছুই আমার ভীষণ প্রিয়। মাঝে মাঝে তোমাকে একটু জ্বালাই, দুষ্টুমি করি, হয়তো সবসময় ঠিকভাবে তোমার মনের কথাও বুঝতে পারি না। 😔😔 But trust me, তোমাকে ভালো রাখার ইচ্ছেটা আমার সবসময়ই থাকে। 🥺

আর একটা কথা, আমার Jaan, কখনো নিজের হাসিটা হারিয়ে ফেলো না।😊 তুমি যখন হাসো, তোমাকে অসম্ভব সুন্দর লাগে। 😍 তোমার জীবনের সব স্বপ্ন পূরণ হোক, জীবনে অনেক দূর এগিয়ে যাও। তোমার যেকোনো প্রয়োজনে তোমার এই পাগল জামাইটা হাজির আছে। 🤗🤗 তোমার মন খারাপের দিনগুলোও যেন খুব তাড়াতাড়ি ভালো হয়ে যায়।🥺 আর যখনই কোনো কিছু নিয়ে মন খারাপ হবে, মনে রেখো, তোমার পাশে তোমার Asem আছে। ❤️

আমি জানি না ভবিষ্যতে আমাদের জন্য কত রকম দিন অপেক্ষা করছে। তবে ভালো দিন হোক কিংবা একটু কঠিন সময়, আমি চাই আমরা দুজন একসাথে সবকিছু সামলে নিই। মাঝে মাঝে ঝগড়া হবে, রাগ হবে, অভিমান হবে—তারপর আবার ঠিক হয়ে যাব।🥺🥺 কারণ দিনশেষে তুমিই আমার ভালো থাকার চাবি 🥺😘

আজকে তোমার Birthday, তাই আজ একটু বেশিই আদর 😘😘, একটু বেশিই ভালোবাসা 😘😘😘 আর তোমার সব আবদার মেনে নেওয়া হবে।😍😍 Hehe! 😁😁

Thank you for coming into my life and making so many ordinary moments feel special. 🌹🌹

আর বেশি কিছু বলব না। শুধু এটুকু বলি, তুমি আমার খুব শখের গো পাখি... নিজের খেয়াল রাখবে, অনেক হাসবে, আর এভাবেই আমার আদুরে বউ হয়ে থাকবে। 🥺🥺

**Happy Birthday once again, My Shamiha!** ❤️
I love you so much..... More than these little words can ever explain. 


With all my love and endless kisses,😘😘😘😘
Your Asem 😘❤️`;


    /* 3. STATE */

    let isLetterOpen = false;
    let typingInterval = null;
    let currentCharacter = 0;

    const typingSpeed = 35;


    /* 4. TYPEWRITER */

    function stopTyping() {
        if (typingInterval !== null) {
            clearInterval(typingInterval);
            typingInterval = null;
        }
    }


    function startTyping() {

        stopTyping();

        currentCharacter = 0;
        messageElement.textContent = "";

        typingInterval = setInterval(() => {

            if (!isLetterOpen) {
                stopTyping();
                return;
            }

            if (currentCharacter < birthdayMessage.length) {

                messageElement.textContent +=
                    birthdayMessage.charAt(currentCharacter);

                currentCharacter++;

            } else {
                stopTyping();
            }

        }, typingSpeed);
    }


    /* 5. OPEN LETTER */

    function openLetter() {

        if (isLetterOpen) return;

        isLetterOpen = true;

        mailBox.classList.add("active");

        mailBox.setAttribute("aria-hidden", "false");

        mailButton.setAttribute("aria-expanded", "true");

        document.body.style.overflow = "hidden";

        // Ensure close button is visible
        closeButton.style.display = "flex";

        setTimeout(() => {

            if (isLetterOpen) {
                startTyping();
            }

        }, 900);

        setTimeout(() => {
            closeButton.focus();
        }, 100);
    }


    /* 6. CLOSE LETTER */

    function closeLetter() {

        if (!isLetterOpen) return;

        isLetterOpen = false;

        stopTyping();

        mailBox.classList.remove("active");

        mailBox.setAttribute("aria-hidden", "true");

        mailButton.setAttribute("aria-expanded", "false");

        messageElement.textContent = "";

        currentCharacter = 0;

        document.body.style.overflow = "";

        mailButton.focus();
    }


    /* 7. EVENT LISTENERS */

    mailButton.addEventListener("click", openLetter);

    closeButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        closeLetter();
    });


    /* 8. ESCAPE KEY */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape" && isLetterOpen) {
            closeLetter();
        }

    });


    /* 9. KEYBOARD SUPPORT */

    mailButton.addEventListener("keydown", (event) => {

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openLetter();
        }

    });


    /* 10. INITIAL STATE */

    mailBox.classList.remove("active");

    mailBox.setAttribute("aria-hidden", "true");

    mailButton.setAttribute("aria-expanded", "false");

    console.log("Birthday Letter System Initialized ❤️");

});