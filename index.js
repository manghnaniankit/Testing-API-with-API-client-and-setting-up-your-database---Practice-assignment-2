const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON

// Load existing book data from data.json
const loadBooks = () => {
    try {
        const data = fs.readFileSync("data.json");
        return JSON.parse(data);
    } catch (error) {
        return []; // Return an empty array if file doesn't exist or is empty
    }
};

// Save books data to data.json
const saveBooks = (books) => {
    fs.writeFileSync("data.json", JSON.stringify(books, null, 2));
};

// Retrieve all books
app.get("/books", (req, res) => {
    const books = loadBooks();
    res.json(books);
});

// Retrieve a specific book by ID
app.get("/books/:id", (req, res) => {
    const books = loadBooks();
    const book = books.find(b => b.book_id == req.params.id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
});

// Add a new book
app.post("/books", (req, res) => {
    const books = loadBooks();
    const { book_id, title, author, genre, year, copies } = req.body;

    // Validate input
    if (!book_id || !title || !author || !genre || !year || !copies) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if book ID already exists
    if (books.some(book => book.book_id == book_id)) {
        return res.status(400).json({ message: "Book ID already exists" });
    }

    // Add the new book
    const newBook = { book_id, title, author, genre, year, copies };
    books.push(newBook);
    saveBooks(books);

    res.status(201).json(newBook);
});

// Update book details
app.put("/books/:id", (req, res) => {
    const books = loadBooks();
    const bookIndex = books.findIndex(b => b.book_id == req.params.id);

    if (bookIndex === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Update book details
    books[bookIndex] = { ...books[bookIndex], ...req.body };
    saveBooks(books);

    res.json(books[bookIndex]);
});

// Delete a book
app.delete("/books/:id", (req, res) => {
    let books = loadBooks();
    const bookIndex = books.findIndex(b => b.book_id == req.params.id);

    if (bookIndex === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    books.splice(bookIndex, 1);
    saveBooks(books);

    res.json({ message: "Book deleted successfully" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});