// // Import required modules
// const express = require('express');
// const fs = require('fs');
// const path = require('path');

// // Initialize Express app
// const app = express();

// // Middleware to parse JSON requests
// app.use(express.json());

// // Path to the JSON file storing book data
// const booksFilePath = path.join(__dirname, 'books.json');

// // Helper function to read books from the JSON file
// const readBooks = () => {
//     if (!fs.existsSync(booksFilePath)) {
//         // If the file doesn't exist, create it with an empty array
//         fs.writeFileSync(booksFilePath, JSON.stringify([]));
//     }
//     const data = fs.readFileSync(booksFilePath, 'utf-8');
//     return JSON.parse(data);
// };

// // Helper function to write books to the JSON file
// const writeBooks = (books) => {
//     fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
// };

// // Create a new book (POST /books)
// app.post('/books', (req, res) => {
//     const newBook = req.body;

//     // Validate input
//     if (!newBook.book_id || !newBook.title || !newBook.author || !newBook.genre || !newBook.year || !newBook.copies) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     // Read existing books
//     const books = readBooks();

//     // Check if the book already exists
//     const existingBook = books.find((book) => book.book_id === newBook.book_id);
//     if (existingBook) {
//         return res.status(400).json({ error: 'Book with this ID already exists' });
//     }

//     // Add the new book
//     books.push(newBook);
//     writeBooks(books);

//     // Return the added book
//     res.status(201).json(newBook);
// });

// // Retrieve all books (GET /books)
// app.get('/books', (req, res) => {
//     const books = readBooks();
//     res.json(books);
// });

// // Retrieve a specific book by ID (GET /books/:id)
// app.get('/books/:id', (req, res) => {
//     const bookId = req.params.id;
//     const books = readBooks();

//     // Find the book by ID
//     const book = books.find((book) => book.book_id === bookId);
//     if (!book) {
//         return res.status(404).json({ error: 'Book not found' });
//     }

//     res.json(book);
// });

// // Update book information (PUT /books/:id)
// app.put('/books/:id', (req, res) => {
//     const bookId = req.params.id;
//     const updatedData = req.body;
//     const books = readBooks();

//     // Find the book by ID
//     const bookIndex = books.findIndex((book) => book.book_id === bookId);
//     if (bookIndex === -1) {
//         return res.status(404).json({ error: 'Book not found' });
//     }

//     // Update the book
//     books[bookIndex] = { ...books[bookIndex], ...updatedData };
//     writeBooks(books);

//     res.json(books[bookIndex]);
// });

// // Delete a book (DELETE /books/:id)
// app.delete('/books/:id', (req, res) => {
//     const bookId = req.params.id;
//     const books = readBooks();

//     // Find the book by ID
//     const bookIndex = books.findIndex((book) => book.book_id === bookId);
//     if (bookIndex === -1) {
//         return res.status(404).json({ error: 'Book not found' });
//     }

//     // Remove the book
//     const deletedBook = books.splice(bookIndex, 1);
//     writeBooks(books);

//     res.json({ message: 'Book deleted successfully', deletedBook });
// });

// // Start the server
// const PORT = 8080;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });