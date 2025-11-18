document.addEventListener('DOMContentLoaded', function() {
    //functions to create the books
    const myLibrary = [];

    function Book(title, author) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        //initialize the read status of the book
        this.readStatus = false;
    }

    //toggle the read status of a book between read and unread
    Book.prototype.toggleReadStatus = function() {
    this.readStatus = !this.readStatus;
    };

    function addBookToLibrary(title, author) {

        const newBook = new Book (title, author);
        myLibrary.push(newBook);
        return myLibrary;
    }
    //what happens when add book button is clicked
    document.getElementById('addBook').addEventListener('click', function() {
        const forms = document.getElementById('forms');
        forms.innerHTML = '';

        //create title input
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.placeholder = 'Book Title';
        forms.appendChild(titleInput);

        //create author input
        const authorInput = document.createElement('input');
        authorInput.type = 'text';
        authorInput.placeholder = 'Author Name';
        forms.appendChild(authorInput);

        //create the submit button
        const submitButton = document.createElement('input');
        submitButton.type = 'submit';
        submitButton.value = 'Submit';
        submitButton.id = 'submitBook';
        forms.appendChild(submitButton);
        
        //what happend when submit is clicked
        submitButton.addEventListener('click', function() {
            //empty the container to initiate
            document.getElementById('container').innerHTML = "";
            
            //get information from the inputs and put them into the function to create a book
            //and add it to the library array
            const title = titleInput.value;
            const author = authorInput.value;
            addBookToLibrary(title, author);

            const numberOfRows = myLibrary.length;
            const cardContainer = document.getElementById('container');
            const tableCard = document.createElement('table');
            cardContainer.appendChild(tableCard);

            //iterate over the length of the library array
            //add this number of rows into the table
            //fill the cells of the rows with the data from the library array
            //create a delete button for each row of the table
            for (let i = 0; i < numberOfRows; i++){
                
                //create the different elements of the table
                const newRow = document.createElement('tr');
                const cellTitle = document.createElement('td');
                const cellAuthor = document.createElement('td');
                const cellButton = document.createElement('button');
                cellButton.innerText = "Delete";
                //create the read status button
                const cellButtonRead = document.createElement('button');
                cellButtonRead.textContent = myLibrary[i].readStatus ? "Mark as Unread" : "Mark as Read";
                //add functionality to the read status button
                cellButtonRead.addEventListener('click', function() {
                    myLibrary[i].toggleReadStatus();
                    cellButtonRead.textContent = myLibrary[i].readStatus ? "Mark as Unread" : "Mark as Read";
                    newRow.style.backgroundColor = myLibrary[i].readStatus ? "blue" : "";
                })
                

                //add functionality to the delete button to ensure it deletes the corresponding row
                //and adjusts the library array
                cellButton.addEventListener('click', function () {
                    const rowIndex = Array.from(tableCard.rows).indexOf(newRow);
                    myLibrary.splice(rowIndex, 1);
                    tableCard.removeChild(newRow);
                })
                //fill the cells with the information from the library array
                cellTitle.textContent = myLibrary[i].title;
                cellAuthor.textContent = myLibrary[i].author;
                newRow.appendChild(cellButtonRead);
                newRow.appendChild(cellTitle);
                newRow.appendChild(cellAuthor);
                newRow.appendChild(cellButton);
                tableCard.appendChild(newRow);
                newRow.value = myLibrary[i];
                
            }
            //remove the created inputs after the submit button is pushed
            //for a clean slate
            forms.innerHTML = "";
        })
    });

});