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

// Function to build bookmarks DOM
function buildBookmarks() {
    // Remove all bookmark elements from bookmarks container
    bookmarksContainer.textContent = '';
    
    // Build items
    bookmarks.forEach((bookmark) => {
        const { name, url } = bookmark;

        // Item element
        const item = document.createElement('div');
        item.classList.add('item');

        // Close icon element
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fa-solid','fa-trash-can');
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`)

        // Favicon / website Link container element
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('bookmark-name');
        // Favicon element
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://www.google.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon');
        // Website Link element
        const webLink = document.createElement('a');
        webLink.setAttribute('href', `${url}`);
        webLink.setAttribute('target', '_blank');
        webLink.textContent = name;

        // Append the item to bookmarks container
        linkInfo.append(favicon, webLink);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.appendChild(item);
    });
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
                url: 'https://ojedaportfolio.com',
            },
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Call the build bookmarks function
    buildBookmarks();
}

// Function to delete bookmarks
function deleteBookmark(url) {
    bookmarks.forEach((bookmark, i) => {
        if(bookmark.url === url) {
            bookmarks.splice(i, 1);
        }
    });

    // Update bookmakrs array in localStorage without the removed bookmark, and re-populate the DOM.
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

// Function to handle the data from the Form
function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameElement.value;
    let urlValue = websiteUrlElement.value;

    // If the user has not included the full link with the Hypertext transfer protocol at the beginning of it, add it to the link.
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

    // Push the saved bookmark into the bookmarks array
    bookmarks.push(bookmark);

    // Save the array to local Storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();

    // Clear the form and take the user back to the Website name input field
    bookmarkForm.reset();
    websiteNameElement.focus();
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);

// On Load, Fetch Bookmarks
fetchBookmarks();