function findAccountById(accounts, id) {

  //use find function

  return accounts.find(account => account.id === id)

}

function sortAccountsByLastName(accounts) {
  //return an array sorted by last name, alphabetically
  //sort function takes 2 accounts and checks if the first one's last name is less than the second one's last name
  //if yes, return -1, if no, return 1

  let sortedArray = accounts.sort((account1, account2) => {
    return account1.name.last < account2.name.last ? -1 : 1; 
  })

  return sortedArray;

}

function getTotalNumberOfBorrows(account, books) {
  //for each book, check if the account has borrowed the book
  //will want to use accumulator - the reduce() function
  //for each book, check if the author's id is present in the books borrows array. if it is, increment the total in the reduce function

  let accountID = account.id;
  let numberOfBorrows = books.reduce((total, book) => {
    total+= numberIdsInBorrows(book.borrows, accountID);
    return total;
  }, 0)
  return numberOfBorrows;
}

function numberIdsInBorrows (borrowsArray, accountID) {
  let number = borrowsArray.reduce((total, borrowEvent) => {
    if(borrowEvent.id === accountID) {
      total += 1;
    }
    return total;
  }, 0)

  return number;
}

function getBooksPossessedByAccount(account, books, authors) {
  //find ids of books currently checked out by the account - use filter - double loop. condition is book.borrows[obj].id === account ID
  //
  // add the author key & value to those books (map the books array) - condition to do it if the authorid matches book.authorid
  // return those books in an array 

  const accountID = account.id;

  let currentlyCheckedOut = books.filter( (book => {
    let bookToBeAdded = bookCurrentlyBorrowed(book.borrows, accountID)
    return bookToBeAdded;
  }))

  let withAuthor = currentlyCheckedOut.map(book => {
    let authorToAdd = authors.find( author => {
      return author.id === book.authorId;
    })

    book["author"] = authorToAdd;
    return book;

  })
  
  return withAuthor;

}

function bookCurrentlyBorrowed(bookBorrowsArray, accountID) {
  let isBorrowed = bookBorrowsArray.some(borrowEvent => {
    return ((borrowEvent.id === accountID) && (!borrowEvent.returned))
  })

  return isBorrowed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
/* ---------testing ------ */

