use plp_bookstore

db.books.insertMany([
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: 'Charles Scribner\'s Sons'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: 'Chatto & Windus'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: 'Allen & Unwin'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    published_year: 1851,
    price: 12.50,
    in_stock: false,
    pages: 635,
    publisher: 'Harper & Brothers'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  }
])

//task 2
//Find all books in a specific genre eg Adventure
db.books.find({genre:"Adventure"})
//output
{
  _id: ObjectId('683f23438fb57d61d06c4bda'),
  title: 'Moby Dick',
  author: 'Herman Melville',
  genre: 'Adventure',
  published_year: 1851,
  price: 12.5,
  in_stock: false,
  pages: 635,
  publisher: 'Harper & Brothers'
}

//Find books published after a certain year
db.books.find({published_year:{$gt:1900}})

//Find books by a specific author
db.books.find({author:"Jane Austen"})

//Update the price of a specific book
db.books.updateOne(
  {title:"To Kill a Mockingbird "},
  {$set:{price:13.99 }}
)
//Delete a book by its title
db.book.deleteOne({title:"Animal Farm"})

//task 3
//find books that are both in stock and published after 2010 and projecting for title, author, price
db.books.find(
  { in_stock: true, published_year: { $gt: 2010 } },
  { title: 1, author: 1, price: 1, _id: 0 }
)
//sorting to display books by price (both ascending and descending)
db.books.find(
  {},
  {title: 1, author: 1, price: 1, _id: 0 }
).sort({price:-1})

db.books.find(
  {},
  {title: 1, author: 1, price: 1, _id: 0 }
).sort({price:1})

// `limit` and `skip` methods to implement pagination (5 books per page)
db.books.find({},
  {title: 1, author: 1, price: 1, _id: 0}
).skip(0).limit(5)

//tak 4: Aggregation Pipeline
//calculate the average price of books by genre
db.books.aggregate([
  {$group:{_id:"$genre", avg_price:{$avg:"$price"}}}
])

//find the author with the most books in the collection
db.books.aggregate([
  {$group:{_id:"$author",total_books:{$sum:1}}},
  {$sort:{total_books: -1}},
  {$limit:1}
])

//groups books by publication decade and counts them
db.books.aggregate([
  {
    $group: {
      _id: {
        $concat: [
          { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
          "s"
        ]
      },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])


//Task 5: Indexing
//index on the `title` field for faster searches
db.books.createIndex({title:1})

//compound index on `author` and `published_year`
db.books.createIndex({author:1,published_year:1})

//`explain()` method to demonstrate the performance improvement with your indexes
db.books.find({title:"The Alchemist"}).explain("executionStats")

db.books.find({ author: "The Alchemist", published_year: 1988 }).explain("executionStats")