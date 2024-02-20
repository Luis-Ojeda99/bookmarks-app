// Create constants to store the different elements.
const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameElement = document.getElementById('website-name');
const websiteUrlElement = document.getElementById('webiste-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

// Funciton to show the Modal
function showModal () {
    modal.classList.add('show-modal');
    websiteNameElement.focus();
}

// Event Listeners for the Modal.

// Even listener to show the modal.
modalShow.addEventListener('click', showModal);

// Event listener to close the modal when the close icon is clicked.
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));

// Event listener to close the modal when clicking outside of it.
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal'): false));