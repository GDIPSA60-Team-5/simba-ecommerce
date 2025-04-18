-- Insert Categories
INSERT INTO category (name)
VALUES
    ('Fiction'),
    ('Coding'),
    ('Travel'),
    ('Business'),
    ('Self-Help'),
    ('Memoir'),
    ('Biography'),
    ('Historical Fiction'),
    ('Thriller'),
    ('Fantasy');

-- Insert Authors
INSERT INTO author (name)
VALUES
    ('J.K. Rowling'),
    ('Herbert Schildt'),
    ('Rick Steves'),
    ('Dave Ramsey'),
    ('James McBride'),
    ('Amanda Peters'),
    ('Michael Finkel'),
    ('Rebecca Yarros'),
    ('Jonathan Eig'),
    ('Nathan Hill'),
    ('Ann Napolitano'),
    ('S.A. Cosby'),
    ('Jean M. Twenge'),
    ('Catherine Cowles'),
    ('Rachel Schneider'),
    ('Catherine Lacey'),
    ('Lauren Groff'),
    ('Mariana Enriquez'),
    ('Teju Cole'),
    ('Esther Yi');

-- Insert Books (Products)

INSERT INTO products (name, description, price, quantity, image_url, rating, author_id, category_id, product_type)
VALUES
    ('Harry Potter and the Philosopher''s Stone', 'Fantasy novel about a young wizard attending Hogwarts.', 15.99, 100, '/images/books/book-1.png', 4.9, 1, 1, 'BOOK'),
    ('Java How to Program', 'An in-depth guide to mastering Java programming.', 35.99, 50, '/images/books/book-2.png', 4.5, 2, 2, 'BOOK'),
    ('Rick Steves'' Europe: Belgium', 'Travel guide to the beautiful countries of Belgium.', 21.99, 40, '/images/books/book-3.png', 5.0, 3, 3, 'BOOK'),
    ('The Total Money Makeover', 'A guide to taking control of your finances and eliminating debt.', 19.99, 30, '/images/books/book-4.png', 4.7, 4, 4, 'BOOK'),
    ('Atomic Habits', 'An easy & proven way to build good habits & break bad ones.', 14.99, 200, '/images/books/book-5.png', 4.8, 5, 5, 'BOOK'),
    ('Fourth Wing', 'An epic fantasy novel about a deadly competition to become an elite dragon rider.', 19.99, 150, '/images/books/book-6.png', 4.7, 6, 1, 'BOOK'),
    ('The Woman in Me', 'Memoir by Britney Spears detailing her life and career.', 24.99, 100, '/images/books/book-7.png', 4.6, 7, 6, 'BOOK'),
    ('Lessons in Chemistry', 'A novel about a scientist turned TV cooking show host.', 18.99, 120, '/images/books/book-8.png', 4.7, 8, 1, 'BOOK'),
    ('The Housemaid', 'A psychological thriller with a jaw-dropping twist.', 16.99, 180, '/images/books/book-9.png', 4.5, 9, 1, 'BOOK'),
    ('Bride', 'A romantic comedy about a woman who finds herself in unexpected situations.', 15.99, 160, '/images/books/book-10.png', 4.6, 10, 1, 'BOOK'),
    ('The Heaven & Earth Grocery Store', 'A novel about a diverse community and a hidden secret.', 22.99, 130, '/images/books/book-11.png', 4.8, 11, 1, 'BOOK'),
    ('The Berry Pickers', 'A debut novel exploring love, lies, and family bonds.', 17.99, 110, '/images/books/book-12.png', 4.7, 12, 1, 'BOOK'),
    ('The Art Thief', 'True story of love, crime, and a dangerous obsession.', 21.99, 90, '/images/books/book-13.png', 4.6, 13, 1, 'BOOK'),
    ('King: A Life', 'A definitive biography of Martin Luther King Jr.', 25.99, 100, '/images/books/book-14.png', 4.9, 14, 7, 'BOOK'),
    ('Wellness', 'A novel exploring the complexities of modern life.', 19.99, 80, '/images/books/book-15.png', 4.5, 15, 1, 'BOOK'),
    ('Hello Beautiful', 'A novel about the Padavano sisters and their deep bond.', 18.99, 150, '/images/books/book-16.png', 4.7, 16, 1, 'BOOK'),
    ('All the Sinners Bleed', 'A Southern Gothic serial killer mystery.', 20.99, 140, '/images/books/book-17.png', 4.8, 17, 1, 'BOOK'),
    ('Generations', 'Exploring the real differences between Gen Z, Millennials, Gen X, Boomers, and Silents.', 23.99, 110, '/images/books/book-18.png', 4.6, 18, 4, 'BOOK'),
    ('The Wager', 'A tale of shipwreck, mutiny, and murder.', 19.99, 90, '/images/books/book-19.png', 4.7, 19, 1, 'BOOK'),
    ('The Covenant of Water', 'A novel about a family’s secrets and legacy.', 24.99, 80, '/images/books/book-20.png', 4.8, 20, 1, 'BOOK');

/* ---------- USERS ---------- */
INSERT INTO users (username, password, first_name, last_name, phone_number, email, address, date_of_birth, role)
VALUES
    ('john_doe', 'password123', 'John', 'Doe', '123456789', 'john@example.com', '123 Main St', '1990-01-01', 'USER'),
    ('admin_user', 'adminpass', 'Admin', 'User', '987654321', 'admin@example.com', '456 Admin Rd', '1985-05-15', 'ADMIN');

/* ---------- DELIVERY TYPE ---------- */
INSERT INTO delivery_type (name, description, fee)
VALUES
    ('Standard Delivery', '5-7 business days', 5.99),
    ('Express Delivery', '1-2 business days', 15.99);

/* ---------- PAYMENT TYPE ---------- */
INSERT INTO payment_type (name)
VALUES
    ('Credit Card'),
    ('PayPal'),
    ('Bank Transfer');

/* ---------- CART ITEM ---------- */
INSERT INTO cart_item (user_id, product_id, quantity)
VALUES
    (1, 1, 2),   -- John Doe adds 2 Harry Potter books
    (1, 2, 1),   -- John Doe adds 1 copy of 1984
    (2, 3, 1);   -- Admin adds 1 Smartphone

/* ---------- ORDERS ---------- */
INSERT INTO orders (user_id, payment_type_id, delivery_type_id, status, date_time, shipping_address, goods_service_tax)
VALUES
    (1, 1, 1, 'Processing', NOW(), '123 Main St', 0.09),
    (2, 2, 2, 'Shipped', NOW(), '456 Admin Rd', 0.09);

/* ---------- ORDER ITEM ---------- */
INSERT INTO order_item (order_id, product_id, quantity, unit_price_at_transaction)
VALUES
    (1, 1, 2, 19.99),  -- Order 1: 2 Harry Potter books
    (1, 2, 1, 14.99),  -- Order 1: 1 copy of 1984
    (2, 3, 1, 499.99); -- Order 2: 1 Smartphone
