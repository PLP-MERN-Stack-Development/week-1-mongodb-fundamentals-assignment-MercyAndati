1. Open your command prompt or terminal.
2. Start the MongoDB shell by typing:
bash
mongosh
3. Switch to the plp_bookstore database (this will create it if it doesn't exist):
use plp_bookstore
4. Insert the initial book data by pasting the following command and pressing Enter:
db.books.insertMany([{....}])
5. open compass and refresh the local host to see the created plp_bookstore.
6. Use the MongoDB shell or MongoDB Compass to run the queries and commands provided in the scripts.