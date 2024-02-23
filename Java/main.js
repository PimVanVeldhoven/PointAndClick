document.getElementById("mainTitle").innerText = "Point And Click Adventure"

//load data from a save file
fetch('save.json').then((response) => {
    if (response.status == 404) {
        alert("file not found!")
    } else {
        return response.json();
    }
}).then((reJson) => {
    gameState = reJson;
    runGame();
}).catch((error) => {
    console.error(error);
})

function runGame() {
    //Game window reference
    const gameWindow = document.getElementById("gameWindow");

    //Game state
    gameState = {
        "inventory": [],
        "coinPickUp": false,

    }
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
                if (checkItem("Rusty_Key")) {
                    console.log("Door opened");
                    changeInventory("Rusty_Key", "remove")
                    door1.style.opacity = 0.5;
                } else if (checkItem("coin")) {
                    console.log("Money cannot open a door and the coin broke");
                    changeInventory("coin", "remove");
                } else {
                    console.log("Door stuck help");
                }
                break
            case "key":
                document.getElementById("key").remove();
                changeInventory("Rusty_Key", 'add');
                break
            case "lake":
                changeInventory("Holy water", 'add');
                break
            case "statue":
                console.log("Have you come looking for the key well i can tell you where it is..... it is the yellow block");
                break
            case "coin":
                document.getElementById("coin").remove()
                changeInventory("coin", 'add');
                break;
        }

        function checkItem(itemName) {
            return gameState.inventory.includes(itemName);
        }
        /**
         * 
         * @param {string} itemName 
         * @param {string} action 
         */
        function changeInventory(itemName, action) {
            if (itemName == null || action == null) {
                console.error("invalid parameters given to changeInventory");
                return;
            }
            switch (action) {
                case 'add':
                    gameState.inventory.push(itemName);
                    break;
                case "remove":
                    gameState.inventory = gameState.inventory.filter(function (newInventory) {
                        return newInventory !== itemName;
                    })
                    document.getElementById("inv-" + itemName).remove();
                    break;

            }
            updateInventory(gameState.inventory, inventoryList);
        }

        function updateInventory(inventory, inventoryList) {
            inventoryList.innerHTML = '';
            inventory.forEach(function (item) {
                const inventoryItem = document.createElement("li");
                inventoryItem.id = 'inv-' + item;
                inventoryItem.innerText = item;
                inventoryList.appendChild(inventoryItem);
            })
        }

    }

}