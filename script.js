document.addEventListener("DOMContentLoaded", () => {
    // Room navigation
    const room1 = document.getElementById("room-1");
    const room2 = document.getElementById("room-2");
    const room3 = document.getElementById("room-3");
    const endScreen = document.getElementById("end-screen");
    const toRoom2Button = document.getElementById("to-room-2");
    const unlockRoom3Button = document.getElementById("unlock-room-3");
    const finishGameButton = document.getElementById("finish-game");

    // Room 1: Matching phrases
    const phrases = document.querySelectorAll(".phrase");
    const objects = document.querySelectorAll(".object");
    phrases.forEach(phrase => {
        phrase.addEventListener("dragstart", event => {
            event.dataTransfer.setData("text/plain", event.target.dataset.match);
        });
    });
    objects.forEach(object => {
        object.addEventListener("dragover", event => event.preventDefault());
        object.addEventListener("drop", event => {
            const match = event.dataTransfer.getData("text/plain");
            if (match === event.target.id) {
                event.target.style.backgroundColor = "#d4edda"; // Success color
            }
        });
    });

    // Room 2: Find numbers
    const items = document.querySelectorAll(".item");
    const lockInput = document.getElementById("lock-input");
    items.forEach(item => {
        item.addEventListener("click", () => {
            alert(`Number: ${item.dataset.number}`);
        });
    });
    lockInput.addEventListener("input", () => {
        if (lockInput.value === "132025") {
            unlockRoom3Button.disabled = false;
        }
    });

    // Room 3: Final input
    const cityInput = document.getElementById("city-input");
    cityInput.addEventListener("input", () => {
        if (cityInput.value.toLowerCase() === "düsseldorf") {
            finishGameButton.disabled = false;
        }
    });

    // Room transitions
    toRoom2Button.addEventListener("click", () => {
        room1.classList.remove("active");
        room2.classList.add("active");
    });
    unlockRoom3Button.addEventListener("click", () => {
        room2.classList.remove("active");
        room3.classList.add("active");
    });
    finishGameButton.addEventListener("click", () => {
        room3.classList.remove("active");
        endScreen.classList.add("active");
    });

    // Start with Room 1 active
    room1.classList.add("active");
});
