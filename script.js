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
    const hintText = document.getElementById("hint-text");

    const dropTargets = document.querySelectorAll("#room-1 .drop-target");
    const words = document.querySelectorAll("#room-1 .word");

    words.forEach((word) => {
        word.addEventListener("click", () => {
            const targetId = word.dataset.target;
            const targetElement = document.getElementById(targetId);

            if (targetElement && !targetElement.classList.contains("completed")) {
                console.log(`Word matched: ${word.textContent}`);
                keyProgress++;
                keyOutline.src = keyImages[keyProgress];
                targetElement.style.backgroundColor = "lightgreen"; // Feedback
                targetElement.classList.add("completed");

                if (keyProgress === keyImages.length - 1) {
                    console.log("All words matched. Showing next room button.");
                    nextRoomButton.classList.remove("hidden");
                }
            }
        });
    });

    hintButton.addEventListener("click", () => {
        console.log("Hint button clicked");
        hintText.classList.toggle("hidden");
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

    // Ensure Room 1 starts with only the next button hidden
    if (document.getElementById("room-1").classList.contains("active")) {
        nextRoomButton.classList.add("hidden");
    }
});
