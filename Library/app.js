const myLibrary = [];
const container = document.querySelector('.container');
const bookForm = document.getElementById('addBookForm');
const close_btn = document.getElementById('closeFormButton');
const form_container = document.getElementById('bookForm-container');
const add_book = document.querySelector('.add-book-btn');
const save_btn = document.getElementById('save-btn');

let total_collection = document.querySelector('.total-collection');
let total_read = document.querySelector('.total-read');
let total_read_num = 0;
let total_not_read = document.querySelector('.total-not-read');
let total_not_read_num = 0;

function Book(name, author, numOfPages, isRead) {
    this.name = name;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

close_btn.addEventListener('click', () => {
    form_container.classList.add('hidden');
    add_book.style.display = 'block';
    container.style.gridTemplateColumns = '250px 4fr 0';
})


add_book.addEventListener('click', (e) => {
    e.preventDefault();
    form_container.classList.remove('hidden');
    add_book.style.display = 'none';
    container.style.gridTemplateColumns = '250px 4fr 1fr';
})

save_btn.addEventListener('click', (e) => {
    e.preventDefault();
    const bookName = document.getElementById('bookName').value;
    const authorName = document.getElementById('authorName').value;
    const numOfPages = document.getElementById('numOfPages').value;
    const isRead = document.getElementById('isRead').checked;
    const newBook = new Book(bookName, authorName, numOfPages, isRead);
    addBookToLibrary(newBook);
    bookForm.reset();
    form_container.classList.add('hidden');
    add_book.style.display = 'block';
    container.style.gridTemplateColumns = '250px 4fr 0';
    generateBookOptions();
    displayBooks();
})

function update_collection() {
    total_collection.textContent = myLibrary.length;
    total_read_num = 0;
    total_not_read_num = 0;
    myLibrary.forEach(function(lib) {
        if(lib.isRead){
            total_read_num += 1;
        } else {
            total_not_read_num += 1;
        }
    })

    total_read.textContent = total_read_num;
    total_not_read.textContent = total_not_read_num;
}

function generateBookOptions() {
    const collection_options = document.getElementById('collection-options');
    const read_options = document.getElementById('read-options');
    const not_read_options = document.getElementById('not-read-options');
    collection_options.innerHTML = '';
    read_options.innerHTML = '';
    not_read_options.innerHTML = '';
    
    const colors = ['#F0F8FF', '#E6E6FA'];

    let index = 0;
    myLibrary.forEach(function(book) {
        const option = document.createElement('a');
        option.href = '#';
        option.textContent = book.name;
        //option.style.backgroundColor = colors[index % colors.length];
        option.style.borderBottom = '1px dashed lightgray';

        if (book.isRead) {
          read_options.appendChild(option);
        } else {
          not_read_options.appendChild(option);
        }
        
        collection_options.appendChild(option.cloneNode(true));
        index++;
      });
      update_collection();
  }

  function displayBooks() {
    let idx = 0;
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';
    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        if (idx === 7){
            idx = 0;
        }
        const bookDetails = `
          <img src="images/book-cover${idx}.jpg" alt="Book Cover">
          <div class="book-info">
            <h4>${book.name}</h4>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.numOfPages}</p>
          </div>
          <div class="card-bottom">
            <div id="checkbox-container">
                <input type="checkbox" class="isRead" name="agree" ${book.isRead ? 'checked' : ''}>
                <label class="read-label"for="isRead">Read</label>
            </div>
            <button class="delete-btn">Delete</button>
          </div>  
        `;
        idx++;
        bookCard.innerHTML = bookDetails;

        mainContent.appendChild(bookCard);

        const delete_btn = bookCard.querySelector('.delete-btn');
        delete_btn.addEventListener('click', () => {
            const bookInfo = bookCard.querySelector('.book-info');
            const bookNameElement = bookInfo.querySelector('h4');
            const bookIndex = myLibrary.findIndex(book => book.name === bookNameElement.textContent);
            myLibrary.splice(bookIndex, 1);
            displayBooks();
            generateBookOptions();
        })

        const toggleRead = bookCard.querySelector('.isRead');
        toggleRead.addEventListener('change',  () => {
            const bookInfo = bookCard.querySelector('.book-info');
            const bookNameElement = bookInfo.querySelector('h4');
            let bookToUpdate = myLibrary.find(book => book.name == bookNameElement.textContent);
            if(bookToUpdate){
                bookToUpdate.isRead = !bookToUpdate.isRead;
            }
            generateBookOptions();
        })
      });
    }



  

  


