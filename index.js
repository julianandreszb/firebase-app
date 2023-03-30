import {initializeApp} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

const appSettings = {
    projectId: "playground-3dc69",
    databaseUrl: "https://playground-3dc69-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListItemsInDB = ref(database, "shoppingList");

const addButtonEl = document.getElementById('add-button');
const inputFieldEl = document.getElementById('input-field');
const shoppingList = document.getElementById('shopping-list');

const createShoppingListElements = function (shoppingListEntries) {
    const shoppingListElements = [];
    shoppingListEntries.forEach(itemListEntry => {
        const shoppingListItemElement = createShoppingListItemElement(itemListEntry);
        shoppingListElements.push(shoppingListItemElement);
    });
    return shoppingListElements;
}

const clearShoppingListEl = function () {
    shoppingList.innerHTML = '';
}

const renderShoppingListElements = function (shoppingListElements) {
    clearShoppingListEl();
    shoppingListElements.forEach(listItem => {
        shoppingList.appendChild(listItem);
    });
}

function removeShoppingListItemFromDB(listItemId) {
    const listItemRefDB = ref(database, `shoppingList/${listItemId}`)
    remove(listItemRefDB);
}

const addDoubleClickEventHandlerToShoppingListElements = function (shoppingListElements) {
    shoppingListElements.forEach(listItem => {
        listItem.addEventListener('dblclick', function (event){
            const listItemId = listItem.getAttribute('id');
            removeShoppingListItemFromDB(listItemId);
        });
    });
}

onValue(shoppingListItemsInDB, (snapshot) => {
    const shoppingListElements = createShoppingListElements(Object.entries(snapshot.val()));
    addDoubleClickEventHandlerToShoppingListElements(shoppingListElements);
    renderShoppingListElements(shoppingListElements);
});

const createShoppingListItemElement = function (itemListEntry) {
    const listItem = document.createElement('li');
    const itemId = itemListEntry[0];
    const itemName = itemListEntry[1];
    listItem.setAttribute('id', itemId);
    listItem.innerHTML = itemName;
    return listItem;
}

const clearInputField = function () {
    inputFieldEl.text = '';
}

addButtonEl.addEventListener('click', function (event) {
    event.preventDefault();

    // Push item to database
    const inputValue = inputFieldEl.value;
    push(shoppingListItemsInDB, inputValue);
    clearInputField();
});