document.addEventListener('DOMContentLoaded', function() {

    const myLibrary = [];

    function Book(title, author) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
    }

    function addBookToLibrary(title, author) {

        const newBook = new Book (title, author);
        myLibrary.push(newBook);
        return myLibrary;
    }

    // addBookToLibrary("The Hobbit", "Tolkien");
    // addBookToLibrary("The Hunger Games", "Suzanne Collins");
    // addBookToLibrary("The Lord Of The Rings", "Tolkien");
    // addBookToLibrary("Twilight", "Stephenie Meyer");

    // console.log(myLibrary);

document.getElementById('addBook').addEventListener('click', function() {
    const forms = document.getElementById('forms');
    forms.innerHTML = '';

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Book Title';
    forms.appendChild(titleInput);

    const authorInput = document.createElement('input');
    authorInput.type = 'text';
    authorInput.placeholder = 'Author Name';
    forms.appendChild(authorInput);

    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Submit';
    submitButton.id = 'submitBook';
    forms.appendChild(submitButton);
    
    submitButton.addEventListener('click', function() {
        document.getElementById('container').innerHTML = "";
        
        const title = titleInput.value;
        const author = authorInput.value;
        
        addBookToLibrary(title, author);

        const numberOfRows = myLibrary.length;
        const cardContainer = document.getElementById('container');
        const tableCard = document.createElement('table');
        cardContainer.appendChild(tableCard);

        for (let i = 0; i < numberOfRows; i++){
            
            const newRow = document.createElement('tr');
            const cellTitle = document.createElement('td');
            const cellAuthor = document.createElement('td');
            const cellButton = document.createElement('button');
            cellButton.innerText = "Delete";
            cellButton.addEventListener('click', function () {
                const rowIndex = Array.from(tableCard.rows).indexOf(newRow);
                myLibrary.splice(rowIndex, 1);
                tableCard.removeChild(newRow);
            })

            cellTitle.textContent = myLibrary[i].title;
            cellAuthor.textContent = myLibrary[i].author;
            newRow.appendChild(cellTitle);
            newRow.appendChild(cellAuthor);
            newRow.appendChild(cellButton);
            tableCard.appendChild(newRow);
            newRow.value = myLibrary[i];
            
        }
        forms.innerHTML = "";
    })
});

});