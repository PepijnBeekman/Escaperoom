// JavaScript for the Escape Room

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and initialized.");

    // Function to handle room transitions
    function showRoom(roomId) {
        console.log(`Showing room: ${roomId}`);
        const rooms = document.querySelectorAll(".room");
        rooms.forEach((room) => {
            if (room.id === roomId) {
                room.classList.add("active");
                room.style.display = "flex";
                room.style.opacity = "1";
            } else {
                room.classList.remove("active");
                room.style.display = "none";
                room.style.opacity = "0";
            }
        });
    }

    // Room 1: Drag and Drop Functionality
    const wordElements = document.querySelectorAll(".word");
    const dropTargets = document.querySelectorAll(".drop-target");
    let successfulDrops = 0; // Track the number of successful drops

    wordElements.forEach((word) => {
        word.setAttribute("draggable", "true");
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
            const draggedElement = [...wordElements].find((word) => word.dataset.target === expectedTarget);

            if (target.id === expectedTarget && draggedElement) {
                target.classList.add("correct");
                draggedElement.style.display = "none";
                successfulDrops++;
                console.log(`Successful drops: ${successfulDrops}`);

                updateKeyOutline(successfulDrops);

                if (successfulDrops === dropTargets.length) {
                    console.log("All targets matched. Unlocking next room.");
                    const keyOutline = document.getElementById("key-outline");
                    if (keyOutline && keyOutline.src.includes("key3.png")) {
                        document.getElementById("next-room-button").style.display = "block";
                    }
                }
            } else {
                console.log("Incorrect drop.");
            }
        });
    });

    function updateKeyOutline(level) {
        const keyOutline = document.getElementById("key-outline");
        if (keyOutline) {
            keyOutline.src = `images/key${level}.png`;
            console.log(`Key updated to level: ${level}`);
        }
    }

    // Room 1 Hint Button
    const hintButton = document.getElementById("hint-button");
    if (hintButton) {
        hintButton.addEventListener("click", () => {
            alert("Probeer te kijken naar de woorden en de objecten in de kamer.");
        });
    }

    // Room 2: Clickable Objects and Code Validation
    const objects = ["pizza", "sushi", "flag"];
    const clickedObjects = new Set();

    objects.forEach((objectId) => {
        const objectElement = document.getElementById(objectId);

        if (objectElement) {
            objectElement.addEventListener("click", () => {
                objectElement.style.display = "none";
                clickedObjects.add(objectId);

                if (clickedObjects.size === objects.length) {
                    document.getElementById("code-input-container").style.display = "block";
                }
            });
        }
    });

    const codeInput = document.getElementById("code-input");
    const submitCodeButton = document.getElementById("submit-code");
    const validCode = "132024";
    const alternateCodes = ["312024", "120243", "320241", "202431", "202413"];

    if (submitCodeButton && codeInput) {
        submitCodeButton.addEventListener("click", () => {
            const enteredCode = codeInput.value.trim();

            if (enteredCode === validCode) {
                showRoom("room-3");
            } else if (alternateCodes.includes(enteredCode)) {
                alert("Probeer anders 132024 even.");
            } else {
                alert("Foutieve code. Probeer opnieuw.");
            }
        });
    }

    // Room 3: Destination Input and Redirection
    const destinationInput = document.getElementById("destination-input");
    const goToDestinationButton = document.getElementById("go-to-destination");

    if (destinationInput && goToDestinationButton) {
        goToDestinationButton.addEventListener("click", () => {
            const destination = destinationInput.value.trim().toLowerCase();
            if (destination === "düsseldorf" || destination === "dusseldorf") {
                window.location.href = "prize.html";
            } else {
                alert("Probeer het nog eens. Tip: Het begint met een 'D'.");
            }
        });
    }

    // Start Button for Intro Room
    const startButton = document.getElementById("start-escape");
    if (startButton) {
        startButton.addEventListener("click", () => {
            showRoom("room-1");
        });
    }
});
