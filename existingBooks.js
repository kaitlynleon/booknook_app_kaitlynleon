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
// existingBooks.sort(function (a, b) {
//   if (b.exSeries > a.exSeries) {
//     return 1;
//   } else {
//     return -1;
//   }
// });
// console.log(
//   "These are the exisiting books in alphabetical order by the name of the series: "
// );
// console.log(existingBooks);

// sort existing books by title (volume number)
existingBooks.sort(function(a,b){
    return a.exTitle - b.exTitle;
});
console.log(existingBooks);
