document.getElementById("mainTitle").innerText = "Point And Click Adventure"

//Game window reference
const gameWindow = document.getElementById("gameWindow");

//Main charachter
const mainCharacter = document.getElementById("hero");
const offsetCharacter = 16;

const tree1 = document.getElementById("squareTree");
const door1 = document.getElementById("door");
const key1 = document.getElementById("key");

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    //todo  calc offset based on charachter
    mainCharacter.style.left = x - offsetCharacter + "px";
    mainCharacter.style.top = y - offsetCharacter + "px";

    switch (e.target.id) {
        case "squareTree": tree1.style.opacity = 0.5;
            break;
        case "door": door1.style.opacity = 0.5;
            break;
        case "key": key1.style.opacity = 0;
            break;

        default: tree1.style.opacity = 1; door1.style.opacity = 1;
    }

}