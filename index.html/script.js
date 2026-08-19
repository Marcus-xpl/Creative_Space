/* =========================================
   ELEMENTOS
========================================= */

const enterScreen =
    document.getElementById("enterScreen");

const audio =
    document.getElementById("audio");

const playButton =
    document.getElementById("playButton");

const progress =
    document.getElementById("progress");

const progressDot =
    document.getElementById("progressDot");

const progressContainer =
    document.getElementById("progressContainer");

const currentTimeElement =
    document.getElementById("currentTime");

const durationElement =
    document.getElementById("duration");


/* =========================================
   ENTRAR NO SITE
========================================= */

enterScreen.addEventListener("click", async () => {

    enterScreen.classList.add("hidden");

    try {

        await audio.play();

        playButton.textContent = "Ⅱ";

    } catch (error) {

        console.log(
            "Não foi possível iniciar a música:",
            error
        );

    }

});


/* =========================================
   PLAY / PAUSE
========================================= */

playButton.addEventListener("click", () => {

    if (audio.paused) {

        audio.play();

        playButton.textContent = "Ⅱ";

    } else {

        audio.pause();

        playButton.textContent = "▶";

    }

});


/* =========================================
   QUANDO A MÚSICA TERMINAR
========================================= */

audio.addEventListener("ended", () => {

    playButton.textContent = "▶";

});


/* =========================================
   DURAÇÃO DA MÚSICA
========================================= */

audio.addEventListener("loadedmetadata", () => {

    durationElement.textContent =
        formatTime(audio.duration);

});


/* =========================================
   ATUALIZAR PLAYER
========================================= */

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    const percentage =
        (audio.currentTime / audio.duration) * 100;


    progress.style.width =
        `${percentage}%`;


    progressDot.style.left =
        `${percentage}%`;


    currentTimeElement.textContent =
        formatTime(audio.currentTime);

});


/* =========================================
   CLICAR NA BARRA
========================================= */

progressContainer.addEventListener(
    "click",
    (event) => {

        if (!audio.duration) return;


        const rect =
            progressContainer.getBoundingClientRect();


        const clickPosition =
            event.clientX - rect.left;


        const percentage =
            clickPosition / rect.width;


        audio.currentTime =
            percentage * audio.duration;

    }
);


/* =========================================
   FORMATAR TEMPO
========================================= */

function formatTime(seconds) {

    if (!seconds || isNaN(seconds)) {

        return "0:00";

    }


    const minutes =
        Math.floor(seconds / 60);


    const remainingSeconds =
        Math.floor(seconds % 60);


    return `${minutes}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;

}


/* =========================================
   TECLADO
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.code === "Space") {

            event.preventDefault();

            if (audio.paused) {

                audio.play();

                playButton.textContent = "Ⅱ";

            } else {

                audio.pause();

                playButton.textContent = "▶";

            }

        }

    }
);


/* =========================================
   ANIMAÇÃO EXTRA DO FUNDO
========================================= */

document.addEventListener(
    "mousemove",
    (event) => {

        const x =
            (event.clientX / window.innerWidth - 0.5);

        const y =
            (event.clientY / window.innerHeight - 0.5);


        const background =
            document.querySelector(".background");


        background.style.transform =
            `
            scale(1.05)
            translate(
                ${x * -8}px,
                ${y * -8}px
            )
            `;

    }
);