document.addEventListener("DOMContentLoaded", () => {
    const rooms = document.querySelectorAll(".room");
    const body = document.body;
    const keyOutline = document.getElementById("key-outline");
    const nextRoomButton = document.getElementById("next-room-button");
    const hintButton = document.getElementById("hint-button");
    const hintText = document.getElementById("hint-text");

    let correctPlacements = 0;

    // Function to show the selected room
    function showRoom(roomId) {
        rooms.forEach((room) => room.classList.remove("active"));
        document.getElementById(roomId).classList.add("active");
    }

    document.getElementById("start-escape").addEventListener("click", () => {
        showRoom("room-1");
    });

    // Room 1 drag-and-drop logic
    const words = document.querySelectorAll("#room-1 .word");
    const dropTargets = document.querySelectorAll("#room-1 .drop-target");

    words.forEach((word) => {
        word.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", event.target.dataset.target);
            event.dataTransfer.setData("text/language", event.target.dataset.language);
        });
    });

    dropTargets.forEach((target) => {
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
        if (count === 1) keyOutline.src = "images/key1.png";
        if (count === 2) keyOutline.src = "images/key2.png";
        if (count === 3) {
            keyOutline.src = "images/key3.png";
            nextRoomButton.classList.remove("hidden");
        }
    }

    // Hint Button
    hintButton.addEventListener("click", () => {
        hintText.classList.toggle("hidden");
    });

    // Transition to Room 2
    nextRoomButton.addEventListener("click", () => {
        showRoom("room-2");
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


