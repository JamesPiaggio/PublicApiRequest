// Global variables
const randomGeneratorAPI = 'https://randomuser.me/api/?results=12';
const searchContainer = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
const body = document.querySelector('body');

// Function that fetches data and converts to JSON
async function getRandomUser (url) {
    // Uses Fetch API on url provided as parameter
    const user = await fetch(url);
    // Converts response data to JSON format
    const userJSON = await user.json();
    // Returns data in JSON
    return userJSON;
};

// Function that appends searchbar
function appendSearch () {
    searchContainer.innerHTML = `<form action="#" method="get">
                                    <input type="search" id="search-input" class="search-input" placeholder="Search...">
                                    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                                </form>`;
};

// Function to create card with user info
function appendCard (user, userHTML) {
    // Template literal to add HTML
    userHTML = `<div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="${user.picture.large}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                        <p class="card-text">${user.email}</p>
                        <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                    </div>
                </div>`;
    return userHTML;
};

// Function to create modal windows with user info
function appendModal (user, modalContainer) {
    modalContainer = `<div class="modal-container" hidden>
                            <div class="modal">
                                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                <div class="modal-info-container">
                                    <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                                    <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                                    <p class="modal-text">${user.email}</p>
                                    <p class="modal-text cap">${user.location.city}</p>
                                    <hr>
                                    <p class="modal-text">${user.phone}</p>
                                    <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                                    <p class="modal-text">Birthday: 10/21/2015</p>
                                </div>
                            </div>
                        </div>`;
    return modalContainer;
};

// Function that creates page
async function createPage () {
    appendSearch();
    // Fetches data for users
    const userList = await getRandomUser(randomGeneratorAPI);
    // Empty variables for Template literals
    let userHTML = '';
    let modalContainer = '';
    // For loop to create each card
    for (let i = 0; i < userList.results.length; i++) {
        const currUser = userList.results[i];
        gallery.innerHTML += appendCard(currUser, userHTML);
    };
    const cards = document.querySelectorAll('.card');
    console.log(cards);
    // For loop to create modal for each user
    for (let j = 0; j < userList.results.length; j++) {
        const currUser = userList.results[j];
        body.innerHTML += appendModal(currUser, modalContainer);
    };
    const modals = document.querySelectorAll('.modal-container');
    console.log(modals);
};

createPage();








