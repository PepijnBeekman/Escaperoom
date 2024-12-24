// JavaScript for the Escape Room

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and initialized.");

    // Function to handle room transitions
    function showRoom(roomId) {
        console.log(`Showing room: ${roomId}`);
        const rooms = document.querySelectorAll(".room");
        rooms.forEach((room) => {
            if (room.id === roomId) {
                console.log(`Activating room: ${roomId}`);
                room.classList.add("active");
                room.style.opacity = "1";
                room.style.display = "flex";
            } else {
                console.log(`Hiding room: ${room.id}`);
                room.classList.remove("active");
                room.style.opacity = "0";
                room.style.display = "none";
            }
        });
    }

    // Add event listener for the "Begin Escaperoom" button
    const startButton = document.getElementById("start-escape");
    if (startButton) {
        console.log("Start button found. Adding click event listener.");
        startButton.addEventListener("click", () => {
            console.log("Start button clicked. Transitioning to Room 1.");
            showRoom("room-1");
        });
    } else {
        console.error("Start button (#start-escape) not found.");
    }

    // Room 1 functionality
    const wordElements = document.querySelectorAll(".word");
    const dropTargets = document.querySelectorAll(".drop-target");

    wordElements.forEach((word) => {
        word.setAttribute("draggable", "true"); // Ensure words are draggable
        word.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", word.dataset.target || "");
            console.log(`Dragging: ${word.textContent}`);
        });
    });

    dropTargets.forEach((target) => {
        target.addEventListener("dragover", (e) => {
            e.preventDefault();
            target.classList.add("hover");
        });

        target.addEventListener("dragleave", () => {
            target.classList.remove("hover");
        });

        target.addEventListener("drop", (e) => {
            e.preventDefault();
            target.classList.remove("hover");

            const expectedTarget = e.dataTransfer.getData("text/plain");
            if (target.id === expectedTarget) {
                console.log(`Correct drop: ${target.id}`);
                target.classList.add("correct");

                const allCorrect = [...dropTargets].every((t) =>
                    t.classList.contains("correct")
                );

                if (allCorrect) {
                    console.log("All targets matched. Unlocking next room.");
                    document.getElementById("next-room-button").style.display = "block";
                }
            } else {
                console.log("Incorrect drop.");
            }
        });
    });

    const nextRoomButton = document.getElementById("next-room-button");
    if (nextRoomButton) {
        nextRoomButton.addEventListener("click", () => {
            console.log("Next room button clicked. Transitioning to Room 2.");
            showRoom("room-2");
        });
    }

    // Room 2 functionality
    const clickableAreas = [
        { id: "area-object1", target: "object1" },
        { id: "area-object2", target: "object2" },
        { id: "area-object3", target: "object3" },
    ];

    clickableAreas.forEach((area) => {
        const areaElement = document.getElementById(area.id);
        const targetElement = document.getElementById(area.target);

        if (areaElement) {
            console.log(`Binding click event to: ${area.id}`);
            areaElement.addEventListener("click", () => {
                console.log(`Clicked: ${area.id}`);
                if (targetElement) {
                    console.log(`Hiding overlay: ${area.target}`);
                    targetElement.style.display = "none"; // Hide the overlay
                    areaElement.style.display = "none"; // Hide the click area

                    // Check if all overlays are hidden
                    const allHidden = [...document.querySelectorAll(".object-overlay")].every(
                        (obj) => obj.style.display === "none"
                    );

                    if (allHidden) {
                        console.log("All overlays are hidden. Revealing the code.");
                        alert("Alle objecten gevonden! De code is onthuld.");
                    }
                }
            });
        } else {
            console.error(`Clickable area not found: ${area.id}`);
        }
    });
});
