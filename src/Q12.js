// Q: 12
// Title:
// L0 - Fixing Array and Object Operations

// Problem Statement:
// You have been provided with a script that is intended to handle a system for tracking book collections in a small library. The script uses arrays and objects to manage information but contains logical errors and syntax misuse, especially around ES6 features.

// Code Sample:

// const library = {

// books: [{ title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 }],

// addBook(book) {

// if (!book.title || !book.author || !book.year) {

// console.log("Book information is incomplete.");

// return;

// }
// this.books.push(book);

// },

// findBookByTitle(title) {

// return this.books.find(book => book.title === title);

// },

// removeBook(title) {

// const index = this.books.findIndex(book => book.title === title);

// if (index !== -1) {

// this.books.splice(index, 1);

// } else {

// console.log("Book not found.");

// } } };

// library.addBook({ author: "George Orwell", year: 1949 });

// console.log(library.books.length);

// Steps:

// Debug and improve the addBook method to ensure all books added are valid and fully specified.
// Read about the methods provided above in MDN
// Review and correct the output of the system based on operations performed.
// Refactor the code for better error handling and data integrity.
// Submission Guidelines:
// Please submit your masai git directory link.
// All changes saved

// Enter your answer here


const library = {
    books: [
      { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 }
    ],
  
    // Add a new book only if all required fields are present and valid
    addBook(book) {
      const { title, author, year } = book;
  
      if (
        typeof title !== "string" || title.trim() === "" ||
        typeof author !== "string" || author.trim() === "" ||
        typeof year !== "number" || year <= 0
      ) {
        console.log("❌ Book information is incomplete or invalid.");
        return;
      }
  
      this.books.push({ title: title.trim(), author: author.trim(), year });
      console.log(`✅ Book "${title}" added successfully.`);
    },
  
    // Find a book by title
    findBookByTitle(title) {
      return this.books.find(book => book.title === title);
    },
  
    // Remove a book by title
    removeBook(title) {
      const index = this.books.findIndex(book => book.title === title);
  
      if (index !== -1) {
        const removed = this.books.splice(index, 1);
        console.log(`✅ Book "${removed[0].title}" removed.`);
      } else {
        console.log("❌ Book not found.");
      }
    }
  };
  
  // Attempt to add an incomplete book (missing title)
  library.addBook({ author: "George Orwell", year: 1949 });
  
  // Add a valid book
  library.addBook({ title: "1984", author: "George Orwell", year: 1949 });
  
  // Show total books after additions
  console.log("📚 Total books in library:", library.books.length);
  
  // Optional: find and log a book
  const found = library.findBookByTitle("1984");
  console.log("🔍 Found book:", found);
  
  // Optional: remove a book
  library.removeBook("1984");
  console.log("📚 Total books after removal:", library.books.length);
  