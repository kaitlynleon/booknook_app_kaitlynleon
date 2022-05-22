// book class: represents a book

class Book {
  constructor(title, author, series) {
    this.title = title;
    this.author = author;
    this.series = series;
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
      <td>${book.series}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      <td><a href="#" class="btn btn-warning btn-sm delete"><i class="fas fa-edit"></i></a></td>
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

  static removeBook(series) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.series === series) {
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
  const series = document.querySelector("#series").value;

  // validation
  if (title === "" || author === "" || series === "") {
    // show NOT VALIDATED alert
    UI.showAlert("All fields must be completed to add a book!", "danger");
  } else {
    // instantiate book
    const book = new Book(title, author, series);

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

// **********************************************************************//
//public functions for search, edit, and print functions in local storage

//add preexising books to the collection to test

function authorSearch() {
  //store the user input in a variable
  const userSearch = document.querySelector("#search").value;
  var data = JSON.parse(localStorage.getItem("books"));

  for (let { author } of data) {
    if (userSearch === author) {
      let pre = document.querySelector("#msg2 pre");
      pre.textContent = "\n" + JSON.stringify(author, "\t", 2);
      console.log(author + " was found in your collection");
      console.log(data);
      inCollection();
    } else {
      if (userSearch !== author) {
        console.log("this author is not in your collection");
        notInCollection();
      }
    }
    // clears the search bar for user to search a different book
    clearSearchBar();
  }
}
//this function will print the entire collection
function printStoredCollection() {
  var keys = Object.keys(localStorage);
  var values = Object.values(localStorage);
  console.log(
    "These are the key value pairs in local storage: " + keys + values
  );
  // var data = JSON.parse(localStorage.getItem("books"));

  // console.log("this is the entire collection:" + JSON.stringify(data));
  // document.getElementById("my-books").innerText=data;
}

function sortBooks() {
  console.log("sorted");
}

//gives message to user that the author is not in the collection
function inCollection() {
  $("#customModal")
    .html("This Author is in your Book Collection!")
    .delay(3000)
    .fadeOut(300);
}
//gives message to user that the author is not in the collection
function notInCollection() {
  $("#2customModal")
    .html("Sorry, the Author you requested is not your Book Collection.")
    .delay(3000)
    .fadeOut(300);
}

// book collection modal

const modal = document.querySelector(".book-modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".book-close-button");

function toggleModal() {
  modal.classList.toggle("book-show-modal");
  printstoredCollection();
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

// **********************************************************************//
// the code below has not been integrated into the UI yet but can still be tracked in the console and application tabs

//this is a collection of books that already exist in the collection
class existingBook {
  constructor(exTitle, exAuthor, exSeries) {
    this.exTitle = exTitle;
    this.exAuthor = exAuthor;
    this.exSeries = exSeries;
  }
}

//creating existing book objects to add to an exisingBooks array in local storage
const existingBooks = JSON.parse(localStorage.getItem("existingBooks")) || [];
const myFirstBook = new existingBook(
  "1",
  "Bisco Hatori",
  "Ouron High School Host Club"
);
const mySecondBook = new existingBook(
  "2",
  "Arina Tenamura",
  "Sakura Hime Kaden"
);
const myThirdBook = new existingBook("3", "Masashi Kishimoto", "Naruto");
const myFourthBook = new existingBook("10", "Kaori Yuki", "Angel Sanctuary");
existingBooks.push(myFirstBook, mySecondBook, myFourthBook);
localStorage.setItem("existingBooks", JSON.stringify(existingBooks));

//sort existing books in local storage by alphabetical order of series name
existingBooks.sort(function (a, b) {
  if (b.exSeries > a.exSeries) {
    return 1;
  } else {
    return -1;
  }
});
console.log(
  "These are the exisiting books in alphabetical order by the name of the series: "
);
console.log(existingBooks);
printStoredCollection();
