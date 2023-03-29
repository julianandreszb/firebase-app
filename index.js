import {initializeApp} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

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

const createShoppingListElements = function (itemList) {
    const shoppingListElements = [];
    itemList.forEach(element => {
        const shoppingListItemElement = createShoppingListItemElement(element);
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

onValue(shoppingListItemsInDB, (snapshot) => {
    const shoppingListElements = createShoppingListElements(Object.values(snapshot.val()));
    renderShoppingListElements(shoppingListElements);
});

const createShoppingListItemElement = function (itemText) {
    const listItem = document.createElement('li');
    listItem.innerHTML = itemText;
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