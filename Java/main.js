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
    const sec = 1000;

    //Game state
    gameState = {
        "inventory": [],
        "coinPickUp": false,

    }
    const inventoryList = document.getElementById("inventoryList");

    //Main charachter
    const mainCharacter = document.getElementById("hero");
    const offsetCharacter = 16;

    //avatar
    const counterAvatar = document.getElementById("counterAvatar");

    //Speech bubbles
    const heroSpeech = document.getElementById("heroSpeech");
    const counterSpeech = document.getElementById("counterSpeech");

    //Audio for dialog
    const heroAudio = document.getElementById("heroAudio");
    const counterAudio = document.getElementById("counterAudio");

    //Objects
    const tree1 = document.getElementById("squareTree");
    const door1 = document.getElementById("door");
    const key1 = document.getElementById("key");

    //checks
    let checkDialog = false;

    gameWindow.onclick = function (e) {
        var rect = gameWindow.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        if (counterSpeech.style.opacity == 0 && heroSpeech.style.opacity == 0) {

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
                        showMessage(heroSpeech, "Money cannot open a door and the coin broke")
                        console.log("Money cannot open a door and the coin broke");
                        changeInventory("coin", "remove");
                    } else {
                        showMessage(heroSpeech, "Door stuck help")
                        console.log("Door stuck help");
                    }
                    break
                case "key":
                    document.getElementById("key").remove();
                    changeInventory("Rusty_Key", 'add');
                    break
                case "lake":
                    changeInventory("HolyWater", 'add');
                    break
                case "statue":
                    showMessage(heroSpeech, "Kind of a dull looking statue.", heroAudio)
                    setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec)
                    setTimeout(showMessage, 4 * sec, counterSpeech, "I can talk ye know.....", counterAudio)
                    setTimeout(showMessage, 8 * sec, heroSpeech, "Sorry...  Have you seen a key by chance", heroAudio)
                    setTimeout(showMessage, 12 * sec, counterSpeech, "I also have feelings if you didt realize that yet...", counterAudio)
                    setTimeout(showMessage, 16 * sec, heroSpeech, "I....  I apologize", heroAudio)
                    setTimeout(showMessage, 20 * sec, counterSpeech, "The key is brown from the rust", counterAudio)
                    setTimeout(function () { counterAvatar.style.opacity = 0; }, 24 * sec)
                    break
                case "coin":
                    document.getElementById("coin").remove()
                    changeInventory("coin", 'add');
                    break;
            }
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
    /**
     * it will show dialog. 
     * @param {getElementById} targetBubble 
     * @param {string} message 
     * @param {getElementById} targetSound
     */
    function showMessage(targetBubble, message, targetSound) {
        targetSound.currentTime = 0;
        targetSound.play();
        targetBubble.innerText = message;
        targetBubble.style.opacity = 1;
        setTimeout(hideMessage, 4 * sec, targetBubble, targetSound);
    }
    /**
     * //hides the text and ends th sound
     * @param {getElementById} targetBubble 
     * @param {getElementById} targetSound 
     */
    function hideMessage(targetBubble, targetSound) {
        targetSound.pause();
        targetBubble.innerText = "";
        targetBubble.style.opacity = 0;
    }
}