document.addEventListener("DOMContentLoaded", () => {
    const rooms = document.querySelectorAll(".room");
    const body = document.body;

    function showRoom(roomId) {
        console.log(`Showing room: ${roomId}`);
        rooms.forEach((room) => {
            if (!room.classList.contains("active")) {
                console.log(`Hiding room: ${room.id}`);
                room.style.opacity = "0";
                setTimeout(() => {
                    room.style.display = "none";
                }, 500); // Matches the transition duration
            } else {
                room.classList.remove("active");
            }
        });

        const newRoom = document.getElementById(roomId);
        newRoom.style.display = "flex";
        setTimeout(() => {
            console.log(`Fading in room: ${roomId}`);
            newRoom.style.opacity = "1";
            newRoom.classList.add("active");
        }, 10);
    }

    // Intro page logic
    document.getElementById("start-escape").addEventListener("click", () => {
        console.log("Start Escape Room clicked");
        showRoom("room-1");
    });

    // Room-specific logic
    const keyImages = ["images/key0.png", "images/key1.png", "images/key2.png", "images/key3.png"];
    let keyProgress = 0;
    const keyOutline = document.getElementById("key-outline");
    const nextRoomButton = document.getElementById("next-room-button");
    const hintButton = document.getElementById("hint-button");
    const hintText = "Sleep de juiste woorden naar de juiste plek";

    const dropTargets = document.querySelectorAll("#room-1 .drop-target");
    const words = document.querySelectorAll("#room-1 .word");

    // Ensure words are draggable
    words.forEach((word) => {
        word.setAttribute("draggable", "true"); // Make words draggable
        word.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", word.dataset.target);
            console.log(`Dragging word: ${word.textContent}`);
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
                console.log(`Word correctly dropped on target: ${targetId}`);
                keyProgress++;
                keyOutline.src = keyImages[keyProgress];
                event.target.style.backgroundColor = "lightgreen"; // Feedback

                // Remove matched word
                const word = document.querySelector(`.word[data-target='${draggedTarget}']`);
                if (word) word.remove();

                if (keyProgress === keyImages.length - 1) {
                    console.log("All targets matched. Showing next room button.");
                    nextRoomButton.classList.remove("hidden");
                }
            } else {
                console.log(`Word incorrectly dropped on target: ${targetId}`);
            }
        });
    });

    hintButton.addEventListener("click", () => {
        console.log("Hint button clicked");
        alert(hintText); // Show hint text as a browser alert
    });

    nextRoomButton.addEventListener("click", () => {
        console.log("Next room button clicked");
        showRoom("room-2");
    });

    // Initial setup to hide all rooms except the active one
    rooms.forEach((room) => {
        if (!room.classList.contains("active")) {
            console.log(`Initial hide: ${room.id}`);
            room.style.opacity = "0";
            room.style.display = "none";
        } else {
            console.log(`Initial show: ${room.id}`);
            room.style.opacity = "1";
            room.style.display = "flex";
        }
        room.style.transition = "opacity 0.5s ease-in-out";
    });

    // Ensure Room 1 starts with only the hint text and next button hidden
    nextRoomButton.classList.add("hidden");
});
