const books = [
  {
    title: "Atomic Habits",
    authorName: "Charlie Kirk",
    releaseYear: 2000
  },
  {
    title: "Everyting is Alright",
    authorName: "James Bond",
    releaseYear: 2005
  },
  {
    title: "Nuclear War",
    authorName: "Bintang",
    releaseYear: 2026
  }
];

function sortByYear(book1, book2) {
  if (book1.releaseYear < book2.releaseYear) {
    return -1;
  } else if (book1.releaseYear > book2.releaseYear) {
    return 1;
  } else {
    return 0;
  }
}

const filteredBooks = books.filter((book) => book.releaseYear <= 2020);
filteredBooks.sort(sortByYear);
