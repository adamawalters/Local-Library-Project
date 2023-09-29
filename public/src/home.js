function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
//use reduce function to go through book.array
//check if book is borrowed - if so, increment
const totalBooksBorrowed = books.reduce((total, book) => {
  const bookIsBorrowed = isBookBorrowed(book.borrows);
  if(bookIsBorrowed) {
    return total+1;
  }
  return total;
}, 0)

return totalBooksBorrowed;
}

function isBookBorrowed(bookArray) {
  //check if any item in the borrows event is currently checked out
  return bookArray.some(borrowEvent => {
    return !borrowEvent.returned;
  })
}

/*
function getMostCommonGenres(books) {
  //iterate through array of books
  //for each book, increment an object that contains the genre and a number for how many times genre is present in books
  // add each item from the object to an array
  // sort the array based on highest genre
  //truncate and return the array

  const genreRankings = {}
  const genreRankingsArray = []

  //this adds each genre and its value to an object
  books.forEach(book => {
    if(!Object.keys(genreRankings).includes(book.genre)) {
      genreRankings[book.genre] = 1;
    } else {
      genreRankings[book.genre] += 1;
    }
  })

  for (let genre in genreRankings) {
    const genreObj = {
      "name" : genre,
      "count" : genreRankings[genre]
    }
    genreRankingsArray.push(genreObj)
  }

  genreRankingsArray.sort((genre1, genre2) => {
    return genre2.count - genre1.count;
  })

  genreRankingsArray.length = 5;
  return genreRankingsArray;

}*/

function getMostCommonGenres(books) { 
  //another method - iterate through each book. for each book, find the relevant genre object in the array
  //if it exists, update the count, otherwise create the object and push it into the array

  //the array to return, full of most common genres
  const genreRankingsArray = [];

  //for each book - find the relevant genre object in the genreRankingsArray
  books.forEach(book => {
    const genreObj = genreRankingsArray.find(ranking => {
      return ranking.name === book.genre;
    })

    //if the genre object exists, increment it, otherwise create it and add it to the genres array
    if(genreObj) {
      genreObj.count += 1;
    } else {
      const newGenre = {
        name: book.genre,
        count: 1,
      }
      genreRankingsArray.push(newGenre);
    }
  })

  genreRankingsArray.sort((genre1, genre2) => {
    return genre2.count - genre1.count;
  })

  //limit the array to length 5
  genreRankingsArray.length = 5;
  return genreRankingsArray;

}

function getMostPopularBooks(books) {
  //iterate through each book and find number of times it's been borrowed. add to object
  //add each key value pair to an object in an array
  //sort the array
  //return the array

  const numBorrowed = [];

  //Iterate through each book - add the number of times it's been borrowed and its title to an object and push the object to an array
  books.forEach(book => {
    const numTimesBorrowed = book.borrows.length;
    const bookObj = {
        name : book.title,
        count : numTimesBorrowed,
    }
    numBorrowed.push(bookObj)
  })

  numBorrowed.sort((book1, book2) => {
    return book2.count - book1.count;
  })

  numBorrowed.length = 5;
  return numBorrowed;

}

function getMostPopularAuthors(books, authors) {
  //for each author - need to see how many times their books have been checked out and add it to an object (name: author, count: count)

  const popularAuthors = [];

  //for each author, create an object with the author name and count of times their books have been checked out - push object to array
  authors.forEach(author => {
    const count = getPopularity(books, author);

    const authorObj = {
      name: `${author.name.first} ${author.name.last}`,
      count, //object shorthand
    }

    popularAuthors.push(authorObj);
  })  

  popularAuthors.sort((author1, author2) => {
    return author2.count - author1.count;
  })

  popularAuthors.length = 5;
  return popularAuthors;

}


function getPopularity(books, author) {
  //find all books written by the author
  //for each of those books, count the number of times they've been borrowed (reduce)

  const authorBooks = books.filter(book => {
    return author.id === book.authorId;
  })

  const totalTimesBorrowed = authorBooks.reduce((total, book) => {
    const borrowArray = book.borrows;
    return total + borrowArray.length;
  }, 0) 

  return totalTimesBorrowed;


}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
