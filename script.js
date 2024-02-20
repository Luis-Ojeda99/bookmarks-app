//  Constans to store the different elements.
const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameElement = document.getElementById('website-name');
const websiteUrlElement = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

// Gloval variable to store the bookmarks
let bookmarks = [];

// Funciton to show the Modal
function showModal () {
    modal.classList.add('show-modal');
    websiteNameElement.focus();
}

// Even listener to show the modal.
modalShow.addEventListener('click', showModal);

// Event listener to close the modal when the close icon is clicked.
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));

// Event listener to close the modal when clicking outside of it.
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal'): false));

// Function to Validate data from the form
function validateForm(nameValue, urlValue) {
    // Create expresion to be use for validating that the provided link is valid.
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);

    // Check if both input fields in the form are filled out.
    if (!nameValue  || !urlValue) {
        alert('Please fill out both fields in the form.');
        return false;
    }
    // Check if the website URL is valid
    if (!urlValue.match(regex)) {
        alert('Please provide a valid website link.');
        return false;
    }

    // Valid form
    return true;
}

// Function to fetch bookmarks from localStorage
function fetchBookmarks() {
    // Get bookmarks from localStorage if they are available
    if (localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }
    else {
        // Create a bookmarks array in localStorage
        bookmarks = [
            {
                name: 'Ojeda Portfolio ',
                url: 'https://ojedaportfolio.com'
            }
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
}

// Function to handle the data from the Form
function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameElement.value;
    let urlValue = websiteUrlElement.value;

    // If the user have not included the full link with the Hypertext transfer protocol at the begining of it, add it to the link.
    if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
        urlValue = `https://${urlValue}`;
    }

    // Call validateForm function to validate the data on the form
    if (!validateForm(nameValue, urlValue)) {
        return false;
    }

    // Constant to store the submitted bookmark
    const bookmark = {
        name: nameValue,
        url: urlValue,
    };
    
    //Push the book saved bookmark into the bookmarks array
    bookmarks.push(bookmark);

    // Save the array to local Storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmark));
    fetchBookmarks();

    // Clear the form and take the user back to the Website name input field
    bookmarkForm.reset();
    websiteNameElement.focus();
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);

// On load, fetch Bookmarks
fetchBookmarks(); 