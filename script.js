/* ==========================================
   CASA CASTELMERLO
   SCRIPT.JS
========================================== */


/* ==========================================
   CONFIGURAZIONE
========================================== */

const phoneNumber = "393381285212";

const youtubeVideoId = "5wxOXoLYeKs";


/* ==========================================
   STATO GENERALE
========================================== */

let currentScreen = 1;

let envelopeOpened = false;

let revealedClues = new Set();

let musicPanelOpen = false;


/* ==========================================
   ELEMENTI
========================================== */

const progressBar = document.getElementById(
    "progressBar"
);

const musicPanel = document.getElementById(
    "musicPanel"
);

const musicToggle = document.getElementById(
    "musicToggle"
);

const youtubePlayer = document.getElementById(
    "youtubePlayer"
);


/* ==========================================
   NAVIGAZIONE
========================================== */

function nextScreen(number) {

    if (number < 1 || number > 5) {
        return;
    }

    const current = document.getElementById(
        "screen" + currentScreen
    );

    const next = document.getElementById(
        "screen" + number
    );

    if (!next) {
        return;
    }

    if (current) {

        current.classList.remove("active");

    }

    next.classList.add("active");

    currentScreen = number;

    updateProgress();

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}


/* ==========================================
   PROGRESS BAR
========================================== */

function updateProgress() {

    const progress = (currentScreen / 5) * 100;

    progressBar.style.width = progress + "%";

}


/* ==========================================
   APERTURA BUSTA
========================================== */

function openEnvelope() {

    if (envelopeOpened) {
        return;
    }

    envelopeOpened = true;

    const envelope = document.getElementById(
        "envelope"
    );

    const letter = document.getElementById(
        "letterContent"
    );

    const hint = document.getElementById(
        "envelopeHint"
    );

    envelope.classList.add("open");

    hint.textContent = "Una lettera speciale per voi ♡";

    setTimeout(() => {

        letter.classList.remove("hidden");

        letter.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 900);

}


/* ==========================================
   COLONNA SONORA YOUTUBE
========================================== */

function toggleMusicPanel() {

    musicPanelOpen = !musicPanelOpen;

    if (musicPanelOpen) {

        musicPanel.classList.remove("hidden");

        musicToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        youtubePlayer.src =
            `https://www.youtube-nocookie.com/embed/${youtubeVideoId}?rel=0`;

    } else {

        musicPanel.classList.add("hidden");

        musicToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        // Svuotando src interrompiamo il video.

        youtubePlayer.src = "";

    }

}


/* ==========================================
   INDIZI CULINARI
========================================== */

const clues = {

    1: "Un ingrediente semplice, ma fondamentale nella cucina di casa.",

    2: "Un grande classico italiano, protagonista di infinite ricette.",

    3: "Un piccolo tocco finale. Apprezzato da alcuni, evitato da altri."

};


function revealClue(number) {

    if (!clues[number]) {
        return;
    }

    revealedClues.add(number);

    const clueText = document.getElementById(
        "clueText"
    );

    clueText.textContent = clues[number];

    const buttons = document.querySelectorAll(
        ".ingredient"
    );

    const selectedButton = buttons[number - 1];

    if (selectedButton) {

        selectedButton.classList.add("selected");

    }

    if (revealedClues.size === 3) {

        setTimeout(() => {

            clueText.textContent =
                "Tre indizi. Una ricetta. E una certa pressione sullo chef.";

            document.getElementById(
                "memeReveal"
            ).classList.remove("hidden");

        }, 800);

    }

}
/* ==========================================
   PREFERENZE ALIMENTARI
========================================== */

function getFoodPreferences() {

    const andre = document.getElementById(
        "andreFood"
    ).value.trim();

    const enrico = document.getElementById(
        "enricoFood"
    ).value.trim();

    const dessert = document.getElementById(
        "dessertPreference"
    ).value.trim();

    return {

        andre: andre || "Nessuna preferenza indicata",

        enrico: enrico || "Nessuna preferenza indicata",

        dessert: dessert || "Nessuna preferenza indicata"

    };

}

/* ==========================================
   WHATSAPP
========================================== */

function openWhatsApp(message) {

    const encodedMessage = encodeURIComponent(
        message
    );

    const url =
        `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Navigazione diretta: funziona bene anche
    // su browser mobili e WhatsApp.

    window.location.href = url;

}


/* ==========================================
   CONFERMA
========================================== */

function confirmAttendance() {

    document.getElementById(
        "confirmationOverlay"
    ).classList.remove("hidden");

}


function closePopup() {

    document.getElementById(
        "confirmationOverlay"
    ).classList.add("hidden");

}

/* ==========================================
   CONFERMA WHATSAPP
========================================== */

function sendWhatsApp() {

    const preferences = getFoodPreferences();

    const message =
`🍎 CASA CASTELMERLO
DESPERATE HOUSEWIVES — DINNER EDITION

Care padrone di casa,

dopo un'attenta valutazione,
abbiamo deciso di accettare
il vostro prestigiosissimo invito.

Confermiamo la nostra presenza
martedì 13 ottobre alle 20:30!

Siamo pronti ad affrontare
il viaggio verso i sobborghi bolognesi.

📋 I NOSTRI SEGRETI CULINARI

ANDRE:
${preferences.andre}

ENRICO:
${preferences.enrico}

🍰 THE SWEETEST CONFESSION

${preferences.dessert}

Con affetto,
i vostri ospiti d'onore.

P.S. Bree sarebbe fiera di voi.
Forse. 🍎`;

    openWhatsApp(message);

}

/* ==========================================
   RINVIO
========================================== */

function declineAttendance() {

    const message =
`🍎 CASA CASTELMERLO
DESPERATE HOUSEWIVES — DINNER EDITION

Care padrone di casa,

con grande dispiacere dobbiamo comunicarvi
che preferiremmo rimandare la nostra cena.

Non è colpa vostra.
Non è colpa dello chef.
E forse non è nemmeno colpa dei sobborghi.

Promettiamo però di recuperare presto!

Con affetto,
Andre & Enrico ♡`;

    openWhatsApp(message);

}


/* ==========================================
   CHIUSURA POPUP
========================================== */

const confirmationOverlay = document.getElementById(
    "confirmationOverlay"
);

confirmationOverlay.addEventListener(
    "click",
    function(event) {

        if (event.target === this) {

            closePopup();

        }

    }
);


/* ==========================================
   TASTO ESC
========================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closePopup();

            if (musicPanelOpen) {

                toggleMusicPanel();

            }

        }

    }
);


/* ==========================================
   INIZIALIZZAZIONE
========================================== */

updateProgress();