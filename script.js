document.addEventListener("DOMContentLoaded", () => {
    const rooms = document.querySelectorAll(".room");
    const body = document.body;

    // Helper Function: Show Room
    function showRoom(roomId, backgroundImage) {
        rooms.forEach((room) => room.classList.remove("active"));
        document.getElementById(roomId).classList.add("active");
        body.style.backgroundImage = `url('${backgroundImage}')`;
    }

    // Navigation Buttons
    document.getElementById("start-escape").addEventListener("click", () => {
        showRoom("room-1", "Room1.jpg");
    });

    document.getElementById("to-room-2").addEventListener("click", () => {
        showRoom("room-2", "Room2.jpg");
    });

    document.getElementById("unlock-room-3").addEventListener("click", () => {
        showRoom("room-3", "Room3.jpg");
    });

    document.getElementById("finish-game").addEventListener("click", () => {
        showRoom("end-screen", "EndScreen.jpg");
    });

    // Room 1 Logic
    const room1Words = document.querySelectorAll("#room-1 .word");
    const room1Targets = document.querySelectorAll("#room-1 .drop-target");
    const keyOutline = document.getElementById("key-outline");
    const nextRoomButton = document.getElementById("next-room-button");
    const hintButton = document.getElementById("hint-button");
    const hintText = document.getElementById("hint-text");

    let correctPlacements = 0;

    room1Words.forEach((word) => {
        word.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", event.target.dataset.target);
            event.dataTransfer.setData("text/language", event.target.dataset.language);
        });
    });

    room1Targets.forEach((target) => {
        target.addEventListener("dragover", (event) => event.preventDefault());
        target.addEventListener("drop", (event) => {
            const targetId = event.target.id;
            const draggedTarget = event.dataTransfer.getData("text/plain");
            const language = event.dataTransfer.getData("text/language");

            if (targetId === draggedTarget && language === "German") {
                correctPlacements++;
                event.target.style.backgroundColor = "#2ecc71"; // Success color
                updateKeyOutline(correctPlacements);
            }
        });
    });

    function updateKeyOutline(count) {
        if (count === 1) keyOutline.src = "key1.jpg";
        if (count === 2) keyOutline.src = "key2.jpg";
        if (count === 3) {
            keyOutline.src = "key3.jpg";
            nextRoomButton.classList.remove("hidden");
        }
    }

    hintButton.addEventListener("click", () => {
        hintText.classList.toggle("hidden");
    });

    nextRoomButton.addEventListener("click", () => {
        showRoom("room-2", "Room2.jpg");
    });

    // Room 2 Logic
    const room2Items = document.querySelectorAll("#room-2 .item");
    const lockInput = document.getElementById("lock-input");

    room2Items.forEach((item) => {
        item.addEventListener("click", () => {
            alert(`Number: ${item.dataset.number}`);
        });
    });

    lockInput.addEventListener("input", () => {
        if (lockInput.value === "132025") {
            document.getElementById("unlock-room-3").disabled = false;
        }
    });

    // Room 3 Logic
    const cityInput = document.getElementById("city-input");
    cityInput.addEventListener("input", () => {
        if (cityInput.value.toLowerCase() === "düsseldorf") {
            document.getElementById("finish-game").disabled = false;
        }
    });
});
