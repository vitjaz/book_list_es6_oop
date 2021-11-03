// Book constructor
function Book(title, author, isdn) {
  this.title = title;
  this.author = author;
  this.isdn = isdn;
}
// UI constructor
function UI() {}

// Add Book To List
UI.prototype.addBookToList = function (book) {
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
};

// Delete book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
    // Show message
    this.showAlert("Книга удалена", "success");
  }
};
// Clear all fields
UI.prototype.clearFields = function () {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#isdn").value = "";
};

// Show alert message
UI.prototype.showAlert = function (msg, className) {
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
};

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
    // Add book to list
    ui.addBookToList(book);

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

  e.preventDefault();
});
