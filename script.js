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
            const draggedElement = [...wordElements].find(
                (word) => word.dataset.target === expectedTarget
            );

            if (target.id === expectedTarget && draggedElement) {
                console.log(`Correct drop: ${target.id}`);
                target.classList.add("correct");

                // Update key level
                const keyOutline = document.getElementById("key-outline");
                if (keyOutline) {
                    let currentLevel = parseInt(keyOutline.dataset.level || "0");
                    currentLevel++;
                    keyOutline.dataset.level = currentLevel;
                    keyOutline.src = `images/key${currentLevel}.png`;
                    keyOutline.style.cursor = "pointer"; // Make key clickable
                    console.log(`Key leveled up to: ${currentLevel}`);
                }

                // Remove the dragged word from the list
                draggedElement.style.display = "none";

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
            const keyOutline = document.getElementById("key-outline");
            const maxLevel = 3; // Replace with the number of key levels you have

            if (keyOutline && parseInt(keyOutline.dataset.level) === maxLevel) {
                showRoom("room-2");
            } else {
                alert("De sleutel is nog niet volledig geleveld!");
            }
        });
    }

    // Room 2 functionality
    const objects = ["pizza", "sushi", "flag"];
    const clickedObjects = new Set();

    objects.forEach((objectId) => {
        const objectElement = document.getElementById(objectId);

        if (objectElement) {
            console.log(`Binding click event to: ${objectId}`);
            objectElement.addEventListener("click", () => {
                console.log(`Clicked: ${objectId}`);
                objectElement.style.display = "none"; // Hide the object
                clickedObjects.add(objectId);

                // Check if all objects are clicked
                if (clickedObjects.size === objects.length) {
                    console.log("All objects clicked. Unlocking next step.");
                    document.getElementById("code-input-container").style.display = "block";
                }
            });
        } else {
            console.error(`Object not found: ${objectId}`);
        }
    });

    // Code input functionality
    const codeInput = document.getElementById("code-input");
    const submitCodeButton = document.getElementById("submit-code");
    const validCode = "132024";
    const alternateCodes = ["312024", "120243", "320241", "202431", "202413"];

    if (submitCodeButton && codeInput) {
        submitCodeButton.addEventListener("click", () => {
            const enteredCode = codeInput.value.trim();

            if (enteredCode === validCode) {
                console.log("Correct code entered. Transitioning to Room 3.");
                showRoom("room-3");
            } else if (alternateCodes.includes(enteredCode)) {
                alert("Probeer anders 132024 even.");
            } else {
                alert("Foutieve code. Probeer opnieuw.");
            }
        });
    }

    // Make key clickable when fully leveled
    const keyOutline = document.getElementById("key-outline");
    if (keyOutline) {
        keyOutline.addEventListener("click", () => {
            const maxLevel = 3; // Replace with the number of key levels you have
            if (parseInt(keyOutline.dataset.level) === maxLevel) {
                console.log("Key clicked. Transitioning to Room 2.");
                showRoom("room-2");
            } else {
                alert("De sleutel is nog niet volledig geleveld!");
            }
        });
    }
    
    // Room 3 functionality
    const destinationInput = document.getElementById("destination-input");
    const goToDestinationButton = document.getElementById("go-to-destination");

    if (destinationInput && goToDestinationButton) {
        goToDestinationButton.addEventListener("click", () => {
            const destination = destinationInput.value.trim().toLowerCase();
            if (destination === "düsseldorf" || destination === "dusseldorf") {
                console.log("Correct destination entered. Redirecting...");
                window.location.href = "dusseldorf.html"; // Adjust to your Düsseldorf page path
            } else {
                alert("Probeer het nog eens. Tip: Het begint met een 'D'.");
            }
        });
    }
});
