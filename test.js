// JavaScript code
function search_animal() {
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  let x = document.getElementsByClassName("animals");

  for (i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "list-item";
    }
  }
}

//using find
let scores = [0, 55, 85, 90, 100, 95];
let score = scores.find((element) => element > 90);
console.log("this is the score: " + score);

class Book {
  constructor(author, title, isbn) {
    this.author = author;
    this.title = title;
    this.isbn = isbn;
  }
}
//here is an array to keep the books
let books = [];
//here are a bunch of books

let book = new Book("author1", "naruto", "isbn1");
let book2 = new Book("author2", "my hero academia", "isbn2");
let book3 = new Book("author3", "dragonball z", "isbn3");

books.push(book, book2, book3);
console.log(books);

// search all info in collection
let bookshelf1 = books.find(function (elem, index, books) {
  console.log("here is some book stuff: ");
  console.log(elem);
  console.log(index);
  console.log(books);
});

//search authors in collection
