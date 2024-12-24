document.addEventListener("DOMContentLoaded", () => {
    const rooms = document.querySelectorAll('.room');
    const body = document.body;

    function showRoom(roomId, backgroundImage) {
        rooms.forEach(room => room.classList.remove('active'));
        document.getElementById(roomId).classList.add('active');
        body.style.backgroundImage = `url('${backgroundImage}')`;
    }

    // Event listeners for room navigation
    document.getElementById('start-escape').addEventListener('click', () => {
        showRoom('room-1', 'Room1.jpg');
    });

    document.getElementById('to-room-2').addEventListener('click', () => {
        showRoom('room-2', 'Room2.jpg');
    });

    document.getElementById('unlock-room-3').addEventListener('click', () => {
        showRoom('room-3', 'Room3.jpg');
    });

    document.getElementById('finish-game').addEventListener('click', () => {
        showRoom('end-screen', 'EndScreen.jpg');
    });

    // Room 1: Matching phrases
    const phrases = document.querySelectorAll(".phrase");
    const objects = document.querySelectorAll(".object");
    phrases.forEach(phrase => {
        phrase.addEventListener("dragstart", event => {
            event.dataTransfer.setData("text/plain", event.target.dataset.match);
        });
    });
    objects.forEach(object => {
        object.addEventListener("dragover", event => event.preventDefault());
        object.addEventListener("drop", event => {
            const match = event.dataTransfer.getData("text/plain");
            if (match === event.target.id) {
                event.target.style.backgroundColor = "#d4edda"; // Success color
            }
        });
    });

    // Room 2: Find numbers
    const items = document.querySelectorAll(".item");
    const lockInput = document.getElementById("lock-input");
    items.forEach(item => {
        item.addEventListener("click", () => {
            alert(`Number: ${item.dataset.number}`);
        });
    });
    lockInput.addEventListener("input", () => {
        if (lockInput.value === "132025") {
            document.getElementById("unlock-room-3").disabled = false;
        }
    });

    // Room 3: Final input
    const cityInput = document.getElementById("city-input");
    cityInput.addEventListener("input", () => {
        if (cityInput.value.toLowerCase() === "düsseldorf") {
            document.getElementById("finish-game").disabled = false;
        }
    });
});
