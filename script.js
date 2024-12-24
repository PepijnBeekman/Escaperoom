document.addEventListener("DOMContentLoaded", () => {
    const rooms = document.querySelectorAll(".room");
    const body = document.body;

    function showRoom(roomId) {
        rooms.forEach((room) => {
            if (!room.classList.contains("active")) {
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
            newRoom.style.opacity = "1";
            newRoom.classList.add("active");
        }, 10);
    }

    // Intro page logic
    document.getElementById("start-escape").addEventListener("click", () => {
        showRoom("room-1");
    });

    // Room-specific logic
    const keyImages = ["images/key0.png", "images/key1.png", "images/key2.png", "images/key3.png"];
    let keyProgress = 0;
    const keyOutline = document.getElementById("key-outline");
    const nextRoomButton = document.getElementById("next-room-button");
    const hintButton = document.getElementById("hint-button");
    const hintText = document.getElementById("hint-text");

    const dropTargets = document.querySelectorAll("#room-1 .drop-target");
    const words = document.querySelectorAll("#room-1 .word");

    words.forEach((word) => {
        word.addEventListener("click", () => {
            const targetId = word.dataset.target;
            const targetElement = document.getElementById(targetId);

            if (targetElement && !targetElement.classList.contains("completed")) {
                keyProgress++;
                keyOutline.src = keyImages[keyProgress];
                targetElement.style.backgroundColor = "lightgreen"; // Feedback
                targetElement.classList.add("completed");

                if (keyProgress === keyImages.length - 1) {
                    nextRoomButton.classList.remove("hidden");
                }
            }
        });
    });

    hintButton.addEventListener("click", () => {
        hintText.classList.toggle("hidden");
    });

    nextRoomButton.addEventListener("click", () => {
        showRoom("room-2");
    });

    // Initial setup
    rooms.forEach((room) => {
        room.style.opacity = "0";
        room.style.transition = "opacity 0.5s ease-in-out";
        if (!room.classList.contains("active")) {
            room.style.display = "none";
        } else {
            room.style.opacity = "1";
        }
    });

    // Ensure Room 1 starts with only the next button hidden
    if (document.getElementById("room-1").classList.contains("active")) {
        nextRoomButton.classList.add("hidden");
    }
});
