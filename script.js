document.addEventListener("DOMContentLoaded", () => {
    const rooms = document.querySelectorAll(".room");
    const body = document.body;
    const clickAreas = document.querySelectorAll(".click-area");

    clickAreas.forEach((area) => {
        area.addEventListener("click", () => {
            const targetId = area.getAttribute("data-target");
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.style.display = "none"; // Hide the overlay
                area.style.display = "none"; // Hide the click area
            }

            // Check if all overlays are hidden
            const allHidden = [...document.querySelectorAll(".object-overlay")].every(
                (obj) => obj.style.display === "none"
            );

            if (allHidden) {
                alert("Alle objecten gevonden! De code is onthuld.");
            }
        });
    });


    function showRoom(roomId) {
        console.log(`Showing room: ${roomId}`);
        rooms.forEach((room) => {
            if (room.id !== roomId) {
                console.log(`Hiding room: ${room.id}`);
                room.classList.remove("active");
                room.style.opacity = "0";
                setTimeout(() => {
                    room.style.display = "none";
                }, 500); // Matches the transition duration
            } else {
                console.log(`Activating room: ${room.id}`);
                room.classList.add("active");
                room.style.display = "flex";
                setTimeout(() => {
                    room.style.opacity = "1";
                }, 10);
            }
        });
    }

    // Intro page logic
    const startEscapeButton = document.getElementById("start-escape");
    startEscapeButton.addEventListener("click", (event) => {
        console.log("Start Escape Room clicked");
        event.target.disabled = true; // Disable button after first click
        showRoom("room-1");
    });

    // Room-specific logic
    const keyImages = ["images/key0.png", "images/key1.png", "images/key2.png", "images/key3.png"];
    let keyProgress = 0;
    const keyOutline = document.getElementById("key-outline");
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
                keyOutline.style.display = "block"; // Ensure key is displayed
                event.target.style.backgroundColor = "lightgreen"; // Feedback

                // Remove matched word
                const word = document.querySelector(`.word[data-target='${draggedTarget}']`);
                if (word) word.remove();

                if (keyProgress === keyImages.length - 1) {
                    console.log("Key is fully revealed. Ready to load Room 2.");
                    keyOutline.style.cursor = "pointer"; // Indicate interactivity
                    keyOutline.addEventListener("click", () => {
                        showRoom("room-2");
                    }, { once: true }); // Ensure Room 2 only loads once on click
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

    // Ensure key0.png is displayed initially
    keyOutline.src = keyImages[0];
    keyOutline.style.display = "block";
});
