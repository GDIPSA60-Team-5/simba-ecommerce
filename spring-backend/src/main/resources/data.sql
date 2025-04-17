-- Insert Categories
INSERT INTO category (name)
VALUES
    ('Fiction'),
    ('Coding'),
    ('Travel'),
    ('Business');

-- Insert Authors
INSERT INTO author (name)
VALUES
    ('J.K. Rowling'),
    ('Herbert Schildt'),
    ('Rick Steves'),
    ('Dave Ramsey');

-- Insert Books (Products)

INSERT INTO products (name, description, price, quantity, image_url, rating, author_id, category_id, product_type)
VALUES
    ('Harry Potter and the Philosopher''s Stone', 'Fantasy novel about a young wizard attending Hogwarts.', 15.99, 100, '/images/books/book-1.png', 4.9, 1, 1, 'BOOK'),
    ('Java How to Program', 'An in-depth guide to mastering Java programming.', 35.99, 50, '/images/books/book-2.png', 4.5, 2, 2, 'BOOK'),
    ('Rick Steves'' Europe: Belgium', 'Travel guide to the beautiful countries of Belgium.', 21.99, 40, '/images/books/book-3.png', 5.0, 3, 3, 'BOOK'),
    ('The Total Money Makeover', 'A guide to taking control of your finances and eliminating debt.', 19.99, 30, '/images/books/book-4.png', 4.7, 4, 4, 'BOOK'),
    ('The Hobbit', 'A fantasy novel by J.R.R. Tolkien.', 12.99, 80, '/images/books/book-5.png', 4.8, 1, 1, 'BOOK'),
    ('Effective Java', 'A guide to programming in Java with best practices.', 40.00, 60, '/images/books/book-6.png', 4.9, 2, 2, 'BOOK'),
    ('Lonely Planet Belgium', 'A travel guide to Belgium with detailed information.', 22.99, 70, '/images/books/book-7.png', 4.7, 3, 3, 'BOOK'),
    ('Rich Dad Poor Dad', 'Personal finance book by Robert Kiyosaki.', 18.99, 90, '/images/books/book-1.png', 4.6, 4, 4, 'BOOK'),
    ('The Lord of the Rings', 'Epic fantasy novel by J.R.R. Tolkien.', 20.00, 150, '/images/books/book-2.png', 5.0, 1, 1, 'BOOK'),
    ('Spring in Action', 'A hands-on guide to Spring Framework.', 45.00, 100, '/images/books/book-3.png', 4.8, 2, 2, 'BOOK'),
    ('Europe Through the Back Door', 'Travel guide to Europe with tips for budget travelers.', 24.99, 60, '/images/books/book-4.png', 4.9, 3, 3, 'BOOK'),
    ('The Millionaire Next Door', 'A guide to understanding wealth and finances.', 21.99, 50, '/images/books/book-5.png', 4.7, 4, 4, 'BOOK');
