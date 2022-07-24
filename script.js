"use strict";

const bookList = [];
let yesChecked = document.getElementById("yes");
let noChecked = document.getElementById("no");

const cardShelf = document.querySelector(".card-shelf");

//* Making the ProtoType for the objects...
const bookProto = {
  addNewBookToShelf: function (bookName, bookAuthor, numberOfPages, bookId) {
    function didYouRead() {
      let didYouRead = "";
      if (yesChecked.checked == true) {
        didYouRead = "Yes";
      } else if (noChecked.checked == true) {
        didYouRead = "No";
      }
      return didYouRead;
    }

    cardShelf.insertAdjacentHTML(
      "beforeend",
      `<div class="book-card" id="${bookList[bookList.length - 1].bookId}">
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
      <button id="${bookList[bookList.length - 1].bookId}-btn">Test</button>
    </div>
    </div>`
    );

    clearFelids();
  },
};

function GenerateRandomNumber() {
  let random;
  random = Math.floor(Math.random() * 10) * 10 + Math.floor(Math.random() * 10);
  return random;
}
function GenerateUniqueId() {
  let uniqueId = "";
  uniqueId = `book${GenerateRandomNumber()}-${GenerateRandomNumber()}-${GenerateRandomNumber()}`;
  return uniqueId;
}

//* create the book object with bookProto as prototype...
function submitBook() {
  Observe();
  const obj = Object.create(bookProto, {
    bookName: { value: document.getElementById("inp-book-title").value },
    bookAuthor: { value: document.getElementById("inp-the-author").value },
    numberOfPages: {
      value: document.getElementById("inp-number-of-pages").value,
    },
    bookId: {
      value: GenerateUniqueId(),
    },
  });

  //~ push the object to bookList Array...
  bookList.push(obj);

  //~ add new book to HTML...
  bookProto.addNewBookToShelf(
    bookList[bookList.length - 1].bookName,
    bookList[bookList.length - 1].bookAuthor,
    bookList[bookList.length - 1].numberOfPages
  );
  console.log("new book submitted to book list at position " + bookList.length);
  console.log(bookList[bookList.length - 1]);
  console.log(bookList);
}

function checkIndex() {
  console.log("checkIndex");
  const indexOfObject = bookList.findIndex((book) => {
    return book.bookName === "saeed";
  });
  console.log(indexOfObject);
  bookList.splice(indexOfObject, 1);
  console.log(bookList);
}
//todo ------------------------------------------------------------------
function Observe() {
  console.log("Observing changes to card shelf");
  const mutationObserver = new MutationObserver((entries) => {
    console.log(entries);
    console.log("Observe new");
    document
      .querySelector(`#${bookList[bookList.length - 1].bookId}`)
      .addEventListener("click", checkIndex);
  });
  mutationObserver.observe(cardShelf, { childList: true });
  setTimeout(() => {
    console.log("disconnect Observer function");
    mutationObserver.disconnect();
  }, 100);
}

document.querySelector("#submit").addEventListener("click", submitBook);

//* Clear input felids method...
function clearFelids() {
  document.getElementById("inp-book-title").value = "";
  document.getElementById("inp-the-author").value = "";
  document.getElementById("inp-number-of-pages").value = null;
  yesChecked.checked = false;
  noChecked.checked = false;
}
