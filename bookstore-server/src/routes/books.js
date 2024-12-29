import express from 'express';
import Book from '../models/Book.js';

const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search books
router.get('/search', async (req, res) => {
  const { query } = req.query;
  
  try {
    const searchResults = await Book.aggregate([
      {
        $match: {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { author: { $regex: query, $options: 'i' } },
            { category: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
          ]
        }
      },
      {
        $addFields: {
          score: {
            $add: [
              { $cond: [{ $regexMatch: { input: "$title", regex: query, options: "i" } }, 4, 0] },
              { $cond: [{ $regexMatch: { input: "$author", regex: query, options: "i" } }, 3, 0] },
              { $cond: [{ $regexMatch: { input: "$category", regex: query, options: "i" } }, 2, 0] },
              { $cond: [{ $regexMatch: { input: "$description", regex: query, options: "i" } }, 1, 0] }
            ]
          }
        }
      },
      { $sort: { score: -1 } }
    ]);

    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Seed initial books
router.post('/seed', async (req, res) => {
  const initialBooks = [
    {
      title: "The Art of Programming",
      author: "John Smith",
      category: "Technology",
      description: "A comprehensive guide to modern programming practices and patterns.",
      price: 49.99
    },
    {
      title: "Data Structures Explained",
      author: "John Smith",
      category: "Technology",
      description: "Deep dive into fundamental data structures and algorithms.",
      price: 39.99
    },
    {
      title: "The Mystery of the Lost Code",
      author: "Sarah Johnson",
      category: "Fiction",
      description: "A thrilling mystery about a programmer solving digital puzzles.",
      price: 19.99
    },
    {
      title: "Web Development Mastery",
      author: "Maria Garcia",
      category: "Technology",
      description: "Master modern web development with practical examples.",
      price: 45.99
    },
    {
      title: "Digital Dreams",
      author: "Sarah Johnson",
      category: "Fiction",
      description: "A fascinating journey through a digital wonderland.",
      price: 24.99
    },
    {
      title: "Python for Beginners",
      author: "David Wilson",
      category: "Technology",
      description: "Start your programming journey with Python programming language.",
      price: 29.99
    },
    {
      title: "The Digital Revolution",
      author: "Maria Garcia",
      category: "Technology",
      description: "Exploring the impact of technology on modern society.",
      price: 34.99
    },
    {
      title: "Code Poetry",
      author: "Alice Brown",
      category: "Literature",
      description: "Where programming meets artistic expression.",
      price: 22.99
    },
    {
      title: "Database Design Patterns",
      author: "David Wilson",
      category: "Technology",
      description: "Advanced patterns for database architecture and design.",
      price: 54.99
    },
    {
      title: "The Last Algorithm",
      author: "Alice Brown",
      category: "Fiction",
      description: "A science fiction tale about the future of artificial intelligence.",
      price: 27.99
    }
  ];

  try {
    await Book.deleteMany({});
    const books = await Book.insertMany(initialBooks);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;