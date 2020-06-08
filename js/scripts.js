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
console.log(getRandomUser(randomGeneratorAPI));
// Function that appends searchbar
function appendSearch () {
    searchContainer.innerHTML = `<form action="#" method="get">
                                    <input type="search" id="search-input" class="search-input" placeholder="Search...">
                                    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                                </form>`;
};

// Function that create cards for each employee
async function createCards () {
    appendSearch();
    const userList = await getRandomUser(randomGeneratorAPI);
    let userHTML = '';
    // For loop to create each card
    for (let i = 0; i < userList.results.length; i++) {
        const currUser = userList.results[i];
        // Template literal to add HTML
        userHTML += `<div class="card">
                        <div class="card-img-container">
                            <img class="card-img" src="${currUser.picture.large}" alt="profile picture">
                        </div>
                        <div class="card-info-container">
                            <h3 id="name" class="card-name cap">${currUser.name.first} ${currUser.name.last}</h3>
                            <p class="card-text">${currUser.email}</p>
                            <p class="card-text cap">${currUser.location.city}, ${currUser.location.state}</p>
                        </div>
                    </div><br>`;
    };
    // Adds userHTML to gallery div
    gallery.innerHTML = userHTML;
};
console.log(createCards());
