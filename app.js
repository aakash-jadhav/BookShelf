console.log("first")
const myLibrary = []
const addBtn = document.querySelector(".btn-add")
const bookContainer = document.querySelector(".content")

const book1 = new Book("The Alchemist", "Robert", 324, true)
myLibrary.push(book1)

//initialize
browseLibrary()

//event listener
addBtn.addEventListener("click", add)
bookContainer.addEventListener("click", function (event) {
  if (event.target.matches("#remove-button")) {
    const bookItem = event.target.closest(".book-item")
    bookItem.remove()
  }
})

function Book(name, author, pages, read) {
  this.name = name
  this.author = author
  this.pages = pages
  this.read = read
}

function browseLibrary() {
  myLibrary.forEach(function (book) {
    const bookItem = createBook(book)
    bookContainer.append(bookItem)
  })
}

function createBook(book) {
  const div = document.createElement("div")
  div.classList.add("book-item")

  const h2 = document.createElement("h2")
  h2.textContent = `Name: ${book.name}`

  const h3 = document.createElement("h3")
  h3.textContent = `Author: ${book.author}`

  const p = document.createElement("p")
  p.textContent = `Number of Pages: ${book.pages}`

  const checkBox = document.createElement("div")
  const label = document.createElement("label")
  label.setAttribute("for", "read")
  label.textContent = `Read? `

  const input = document.createElement("input")
  input.setAttribute("type", "checkbox")
  input.setAttribute("id", "read")
  input.checked = book.read

  checkBox.append(label, input)

  const btn = document.createElement("button")
  btn.setAttribute("type", "button")
  btn.setAttribute("id", "remove-button")
  btn.textContent = "Remove"
  div.append(h2, h3, p, checkBox, btn)
  return div
}

//add book to library
function add(e) {
  e.preventDefault()

  if (validateForm()) {
    const title = document.getElementById("name").value
    const author = document.getElementById("author").value
    const pages = document.getElementById("pages").value
    const read = document.getElementById("read").checked
    const book = new Book(title, author, pages, read)
    myLibrary.push(book)
    bookContainer.append(createBook(book))
    console.log(myLibrary)
    //clear form
    document.getElementById("name").value = ""
    document.getElementById("author").value = ""
    document.getElementById("pages").value = ""
  }
}

function validateForm() {
  const title = document.getElementById("name").value
  const author = document.getElementById("author").value
  const pages = document.getElementById("pages").value

  if (!title || !author || !pages) {
    alert("Please fill in all fields")
    return false
  }
  return true
}
