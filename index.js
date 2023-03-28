import {initializeApp} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

const appSettings = {
    projectId: "playground-3dc69",
    databaseUrl: "https://playground-3dc69-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const moviesInDB = ref(database, "shoppingList");

const addButtonEl = document.getElementById('add-button');
const inputFieldEl = document.getElementById('input-field');
const shoppingList = document.getElementById('shopping-list');

const createListElement = function (itemText) {
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
    push(moviesInDB, inputValue);

    // Update interface with the new item
    const listItem = createListElement(inputValue);
    shoppingList.appendChild(listItem);
    clearInputField();
});