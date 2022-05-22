// book class: represents a book

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI class: handles UI tasks

class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  // NOT VALIDATED alert
  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container-fluid");
    const table = document.querySelector(".table");
    container.insertBefore(div, table);
    // remove alert after 4 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 4000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
    document.querySelector("#series").value = "";
  }
}

// Store class: handles (local) storage - within the browser

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }

}

// event: display books

document.addEventListener("DOMContentLoaded", UI.displayBooks);

// event: add a book

document.querySelector("#book-form").addEventListener("submit", (e) => {
  // prevent actual submit
  e.preventDefault();

  // get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;
  const series = document.querySelector("#series").value;

  // validation
  if (title === "" || author === "" || isbn === "" || series === "") {
    // show NOT VALIDATED alert
    UI.showAlert("All fields must be completed to add a book!", "danger");
  } else {
    // instantiate book
    const book = new Book(title, author, isbn);

    // add book to UI
    UI.addBookToList(book);

    // add book to Store
    Store.addBook(book);

    // show VALIDATED alert
    UI.showAlert("Your book was successfully added!", "success");

    //clear fields
    UI.clearFields();
  }
});

// event: remove a book

document.querySelector("#book-list").addEventListener("click", (e) => {
  //remove book from UI
  UI.deleteBook(e.target);

  // remove book from Store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // show BOOK REMOVED SUCCESS alert
  UI.showAlert("Book successfully removed!", "warning");
});

//search for a book
document.querySelector("#search").addEventListener("submit2", (e) => {
  // prevent actual submit of search form
  e.preventDefault();
});

function authorSearch() {
  //store the user input in a variable
  const userSearch = document.querySelector("#search").value;
  var data = JSON.parse(localStorage.getItem("books"));

  for (let { author } of data) {
    if (userSearch === author) {
      console.log(author + " was found in your collection");
      let pre = document.querySelector("#msg2 pre");
      pre.textContent = "\n" + JSON.stringify(author, "\t", 2);
      setTimeout(() => document.querySelector("#msg2 pre").remove(), 3000).delay(3000).fadeOut(300);
    } else{
      if (userSearch !== author) {
        console.log("this author is not in your collection");
        $("#customModal").html("this author is not in your collection.").delay(3000).fadeOut(300);
        
        
      }
    }
    // clears the search bar for user to search a different book
    clearSearchBar();
  }
}
//this print the entire collection
function printstoredCollection() {
  var data = JSON.parse(localStorage.getItem("books"));
  console.log("this is the entire collection:" + JSON.stringify(data));
  console.log();
}

function clearSearchBar() {
  document.querySelector("#search").value = "";
}

function sortBooks(){

}


