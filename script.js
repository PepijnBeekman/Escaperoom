document.addEventListener("DOMContentLoaded", () => {
    const rooms = document.querySelectorAll(".room");
    const body = document.body;

    function showRoom(roomId) {
        rooms.forEach((room) => room.classList.remove("active"));
        document.getElementById(roomId).classList.add("active");
    }

    document.getElementById("start-escape").addEventListener("click", () => {
        showRoom("room-1");
    });

    // Room 1 functionality
    const keyImages = ["images/key0.png", "images/key1.png", "images/key2.png", "images/key3.png"];
    let keyProgress = 0;
    const keyOutline = document.getElementById("key-outline");
    const nextRoomButton = document.getElementById("next-room-button");
    const hintButton = document.getElementById("hint-button");
    const hintText = document.getElementById("hint-text");

    const dropTargets = document.querySelectorAll("#room-1 .drop-target");
    const words = document.querySelectorAll("#room-1 .word");

    words.forEach((word) => {
        word.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", event.target.dataset.target);
        });
    });

    dropTargets.forEach((target) => {
        target.addEventListener("dragover", (event) => {
            event.preventDefault();
        });

        target.addEventListener("drop", (event) => {
            event.preventDefault();
            const targetId = event.target.id;
            const draggedTarget = event.dataTransfer.getData("text/plain");

            if (targetId === draggedTarget) {
                keyProgress++;
                keyOutline.src = keyImages[keyProgress];
                event.target.style.backgroundColor = "lightgreen"; // Feedback
                event.target.classList.add("completed");

                // Check if the key is complete
                if (keyProgress === keyImages.length - 1) {
                    nextRoomButton.classList.remove("hidden");
                }
            } else {
                event.target.style.backgroundColor = "red"; // Feedback for incorrect drop
                setTimeout(() => {
                    event.target.style.backgroundColor = "";
                }, 1000);
            }
        });
    });

    hintButton.addEventListener("click", () => {
        hintText.classList.toggle("hidden");
    });

    nextRoomButton.addEventListener("click", () => {
        showRoom("room-2");
    });
});
