function findAuthorById(authors, id) {

  return authors.find(author => {
    return author.id === id;
  })

}

function findBookById(books, id) {
  return books.find(book => {
    return book.id === id;
  })
}

function partitionBooksByBorrowedStatus(books) {
//find books that are currently checked out (at least one borrowEvent has returned false)
//find books that are returned (all borrowEvents have returned as true)
//return these arrays together in an array

const checkedOut = [];
const returned = [];

books.forEach(book => {
  let isCheckedOut = isCheckedOutFunction(book.borrows);
  isCheckedOut ? checkedOut.push(book) : returned.push(book);
})

return [checkedOut, returned];
}

function isCheckedOutFunction (borrowsArray) {
   const checkedOut = borrowsArray.some(borrowEvent => {
    return !borrowEvent.returned;
  })
  return checkedOut;
}

function getBorrowersForBook(book, accounts) {
  //filter the accounts to the accounts that have checked out the book
  //add account["returned"] - find the borrowEvent where the account ID equals the book ID and add that value
  //iterate through all accounts - if they've checked out the book,  - add the returned value and add that object to an array

    const relevantAccounts = accounts.filter(account => {
      return accountHasCheckedOutBook(book, account)
    })

    const accountsWithReturned = addReturned(relevantAccounts, book.borrows);

    return accountsWithReturned;

}

function addReturned(relevantAccounts, borrowsArray) {
  const accountsWithReturned = relevantAccounts.map(account => {
    const relevantBorrow = borrowsArray.find(borrow => {
      return borrow.id === account.id;
    })
    account["returned"] = relevantBorrow.returned;
    return account;
  })
  return accountsWithReturned;
}


function accountHasCheckedOutBook({borrows : borrowsArray}, account) {
  const checkedOut = borrowsArray.some(borrowEvent => {
    return borrowEvent.id === account.id;
  })
  return checkedOut;
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
