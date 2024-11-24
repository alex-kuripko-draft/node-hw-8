import express from 'express';
import sequelize from './config/db.js';
import Book from "./models/book.js";

const app = express();

app.use(express.json());

sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch((err) => console.error('Error connecting to database:', err));


app.get('/books', async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

app.post('/books', async (req, res) => {
    try {
        const { title, author, year } = req.body;
        const newBook = await Book.create({ title, author, year });
        res.status(201).json(newBook);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create book' });
    }
});

app.put('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, year } = req.body;
        const updatedBook = await Book.update(
            { title, author, year },
            { where: { id } }
        );
        res.json({ message: 'Book updated', updatedBook });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update book' });
    }
});

app.delete('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Book.destroy({ where: { id } });
        res.json({ message: 'Book deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete book' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});