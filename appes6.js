class Book {
  constructor(title, author, isdn) {
    this.title = title;
    this.author = author;
    this.isdn = isdn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.querySelector("#book-list");
    // Create tr element
    const row = document.createElement("tr");
    // Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isdn}</td>
    <td><a href="#" class="delete">X</a></td>`;

    list.appendChild(row);
  }

  showAlert(msg, className) {
    // Create div
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));

    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
      // Show message
      this.showAlert("Книга удалена", "success");
    }
  }

  clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isdn").value = "";
  }
}

// Local Storage class
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

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function (book) {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isdn) {
    const books = Store.getBooks();
    books.forEach(function (book, index) {
      if (book.isdn === isdn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks());

// Event Listener for add book
document.querySelector("#book-form").addEventListener("submit", function (e) {
  // Get form values
  const title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isdn = document.querySelector("#isdn").value;

  // Instantiate book
  const book = new Book(title, author, isdn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === "" || author === "" || isdn === "") {
    // Error alert
    ui.showAlert("Пожалуйста введите информацию о книге", "error");
  } else {
    // Add book to UI
    ui.addBookToList(book);

    // Add to local storage
    Store.addBook(book);

    // Show success
    ui.showAlert("Книга добавлена", "success");

    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for delete book
document.querySelector("#book-list").addEventListener("click", function (e) {
  // Instantiate UI
  const ui = new UI();
  ui.deleteBook(e.target);

  // Remove from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  e.preventDefault();
});
