"use strict";

const bookList = [];
let yesChecked = document.getElementById("yes");
let noChecked = document.getElementById("no");

const cardShelf = document.querySelector(".card-shelf");

//* Making the ProtoType for the objects...
const bookProto = {
  addNewBookToShelf: function (bookName, bookAuthor, numberOfPages) {
    function didYouRead() {
      let didYouRead = "";
      if (yesChecked.checked == true) {
        didYouRead = "Yes";
      } else if (noChecked.checked == true) {
        didYouRead = "No";
      }
      return didYouRead;
    }
    function makeBookId() {
      let bookId = "";
      let id1 = bookName.trim();
      let id2 = bookAuthor.trim();
      bookId = id1 + "-" + id2 + "-" + numberOfPages;
      return bookId;
    }

    cardShelf.insertAdjacentHTML(
      "beforeend",
      `<div class="book-card" id="${makeBookId()}">
    <div class="book-title">
      <h2>Book Title</h2>
      <p class="the-title">${bookName}</p>
    </div>
    <div class="book-author">
      <h2>The Author</h2>
      <p class="the-author">${bookAuthor}</p>
    </div>
    <div class="book-number-of-pages">
      <h2>Number of pages</h2>
      <p class="the-number">${numberOfPages}</p>
    </div>
    <div class="did-you-read">
      <h2>Did you read</h2>
      <p class="yes-no">${didYouRead()}</p>
  
    </div>
    </div>`
    );

    clearFeilds();
  },
};

//* create the book object with bookProto as prototype...
function submitBook() {
  const obj = Object.create(bookProto, {
    bookName: { value: document.getElementById("inp-book-title").value },
    bookAuthor: { value: document.getElementById("inp-the-author").value },
    numberOfPages: {
      value: document.getElementById("inp-number-of-pages").value,
    },
  });

  //* push the object to bookList Array...
  bookList.push(obj);

  //* add new book to HTML...
  bookProto.addNewBookToShelf(
    bookList[bookList.length - 1].bookName,
    bookList[bookList.length - 1].bookAuthor,
    bookList[bookList.length - 1].numberOfPages
  );
  console.log("new book submited to book list at position " + bookList.length);
  console.log(bookList[bookList.length - 1]);
  console.log(bookList);
}

document.querySelector("#submit").addEventListener("click", submitBook);

//* Clear input feilds method...
function clearFeilds() {
  document.getElementById("inp-book-title").value = "";
  document.getElementById("inp-the-author").value = "";
  document.getElementById("inp-number-of-pages").value = null;
  yesChecked.checked = false;
  noChecked.checked = false;
}
