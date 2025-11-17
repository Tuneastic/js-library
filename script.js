const myLibrary = [];

function Book(title, author, pages) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(title, author, pages) {

    const newBook = new Book (title, author, pages);
    myLibrary.push(newBook);
    return myLibrary;
}

console.log(addBookToLibrary("The Hobbit", "Tolkien", 295));