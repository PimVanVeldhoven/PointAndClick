document.getElementById("mainTitle").innerText = "Point And Click Adventure"

//Game window reference
const gameWindow = document.getElementById("gameWindow");

//inventory
let inventory = [];
const inventoryList = document.getElementById("inventoryList")
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
    if (e.target.id != "heroImage") {
        mainCharacter.style.left = x - offsetCharacter + "px";
        mainCharacter.style.top = y - offsetCharacter + "px";
    }

    switch (e.target.id) {
        case "door":
            if (checkItem("Rusty key")) {
                console.log("Door opened");
                door1.style.opacity = 0.5;
            } else if (checkItem("Coin")) {
                console.log("Money cannot open a door and the coin broke");
                removeItem(Coin, coin);
            } else {
                console.log("Door stuck help");
            }
            break
        case "key":
            getItem("Rusty key", "rustyKey");
            break
        case "lake":
            getItem("Holy water", "holyWater");
            getItem("Coin", "coin");
            break

        default: door1.style.opacity = 1;
    }



    /**
     * checks if the value exists within the array if not it adds the value to the array and uses show item function
     * @param {string} itemName 
     * @param {string} itemId 
     */
    function getItem(itemName, itemId) {
        if (!checkItem(itemName)) {
            inventory.push(itemName);
            showItem(itemName, itemId);
        }
        console.log(inventory);
    }

    function checkItem(itemName) {
        return inventory.includes(itemName);
    }
    /**
     * Needs a name for displaying item and htlm id name
     * @param {string} itemName 
     * @param {string} itemId 
     */
    function showItem(itemName, itemId) {
        console.log("you found a " + itemName + "!")
        const keyElement = document.createElement("li");
        keyElement.id = itemId;
        keyElement.innerText = itemName;
        inventoryList.appendChild(keyElement);
    }

    function removeItem(itemName, itemId) {
        inventory = inventory.filter(function (newInventory) {
            return newInventory !== itemName;
        });
        document.getElementById(itemId).remove
    }

}