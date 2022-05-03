/* eslint-disable max-classes-per-file */
import date from './modules/date.js';
import Book from './modules/Book.js';
import {
  btnList,
  addNewBtn,
  contactBtn,
  listSection,
  addNewSection,
  contactSection,
} from './modules/nav_list.js';

btnList.addEventListener('click', () => {
  btnList.classList.add('active');
  addNewBtn.classList.remove('active');
  contactBtn.classList.remove('active');
  listSection.style.display = 'block';
  addNewSection.style.display = 'none';
  contactSection.style.display = 'none';
});

addNewBtn.addEventListener('click', () => {
  btnList.classList.remove('active');
  addNewBtn.classList.add('active');
  contactBtn.classList.remove('active');
  listSection.style.display = 'none';
  addNewSection.style.display = 'block';
  contactSection.style.display = 'none';
});

contactBtn.addEventListener('click', () => {
  btnList.classList.remove('active');
  addNewBtn.classList.remove('active');
  contactBtn.classList.add('active');
  listSection.style.display = 'none';
  addNewSection.style.display = 'none';
  contactSection.style.display = 'flex';
});

// handle dates actions

const handleTime = () => {
  const myDate = document.querySelector('#myClock');
  myDate.innerHTML = date;
};

handleTime();

class BookList {
  static getList() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addItem(book) {
    const books = BookList.getList();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static deleteItem(title) {
    const books = BookList.getList();
    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

class BookUI {
  static displayBooks() {
    const books = BookList.getList();
    books.forEach((book) => BookUI.addBooks(book));
  }

  static addBooks(book) {
    const list = document.querySelector('#book-Collection');
    const bookRow = document.createElement('tr');
    bookRow.innerHTML = `<th id="th1">${book.title}</th>
      <th id="th2">${`by ${book.author}`}</th>
     <th id="th3"> <button class="delete">Remove</button></th>
      `;
    list.appendChild(bookRow);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFilds() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

document.addEventListener('DOMContentLoaded', BookUI.displayBooks);
document.querySelector('#bookForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  const book = new Book(title, author);
  BookUI.addBooks(book);
  BookList.addItem(book);
  BookUI.clearFilds();
});

document.getElementById('book-Collection').addEventListener('click', (e) => {
  BookUI.deleteBook(e.target);
  // eslint-disable-next-line max-len
  BookList.deleteItem(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
});