document.addEventListener("DOMContentLoaded", () => {
    const rooms = document.querySelectorAll(".room");

    function showRoom(roomId) {
        rooms.forEach((room) => room.classList.remove("active"));
        document.getElementById(roomId).classList.add("active");
    }

    document.getElementById("start-escape").addEventListener("click", () => {
        showRoom("room-1");
    });

    // Drag-and-drop functionality for Room 1
    const words = document.querySelectorAll("#room-1 .word");
    const dropTargets = document.querySelectorAll("#room-1 .drop-target");
    const keyOutline = document.getElementById("key-outline");
    const hintText = document.getElementById("hint-text");
    const hintButton = document.getElementById("hint-button");
    const nextRoomButton = document.getElementById("next-room-button");

    let correctPlacements = 0;

    words.forEach((word) => {
        word.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", event.target.dataset.target);
        });
    });

    dropTargets.forEach((target) => {
        target.addEventListener("dragover", (event) => event.preventDefault());
        target.addEventListener("drop", (event) => {
            const draggedTarget = event.dataTransfer.getData("text/plain");
            if (target.id === draggedTarget) {
                correctPlacements++;
                updateKeyOutline(correctPlacements);
            }
        });
    });

    function updateKeyOutline(count) {
        keyOutline.src = `images/key${count}.png`;
        if (count === 3) nextRoomButton.classList.remove("hidden");
    }

    hintButton.addEventListener("click", () => {
        hintText.classList.toggle("hidden");
    });
});
