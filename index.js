import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = { 
        databaseURL: "https://we-are-the-champions-f4ad1-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const inventoryInDB = ref(database, "inventory")

const inputFieldEl = document.getElementById("input-field")
const publishButtonEl = document.getElementById("publishButton")
const inventoryListEl = document.getElementById("inventory-list")

publishButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    
    push(inventoryInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(inventoryInDB, function(snapshot){
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        
        clearInventoryListEl()
        
        for (let i = 0; i< itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToInventoryListEl(currentItem)
        }
    } else {
        inventoryListEl.innerHTML = "Nothing here, yet..."
    }
})

function clearInventoryListEl(){
   inventoryListEl.innerHTML = "" 
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}
function appendItemToInventoryListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database, `inventoryList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    inventoryListEl.append(newEl)
}

