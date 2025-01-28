const bookTitleInput = document.getElementById("book-title");
const bookAuthorInput = document.getElementById("book-author");
const addBookBtn = document.getElementById("add-book");
const bookList = document.getElementById("book-list");

// Load saved books from localStorage
window.onload = function() { //When the page is loaded (window.onload), it checks localStorage for any saved books
    const savedBooks = JSON.parse(localStorage.getItem("books")) || [];
    savedBooks.forEach(book => {
        addBook(book.title, book.author);
    });
};

addBookBtn.addEventListener("click", () => {
    const title = bookTitleInput.value.trim();
    const author = bookAuthorInput.value.trim();
    
    if (title === "" || author === "") {
        alert("Please enter both title and author");
        return;
    }

    addBook(title, author);
    
    // Save the book data to localStorage
    saveBooks();

    bookTitleInput.value = "";
    bookAuthorInput.value = "";
});

function addBook(title, author) {
    const li = document.createElement("li");
    const details = document.createElement("span");

    details.className = "details";
    details.textContent = `${title} by ${author}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveBooks(); // Update the saved books in localStorage after deleting
    });

    li.appendChild(details);
    li.appendChild(deleteBtn);
    bookList.appendChild(li);
}

// Save the current list of books to localStorage
function saveBooks() {
    const books = [];
    const listItems = bookList.getElementsByTagName("li");
    for (let i = 0; i < listItems.length; i++) {
        const li = listItems[i];
        const details = li.getElementsByClassName("details")[0];
        const [title, author] = details.textContent.split(" by ");
        books.push({ title, author });
    }

    // Save to localStorage as a JSON string
    localStorage.setItem("books", JSON.stringify(books));
}
