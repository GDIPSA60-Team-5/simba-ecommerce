-- Insert Categories
INSERT INTO categories (name)
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
INSERT INTO authors (name)
VALUES
    ('Lisa Allen'),
    ('Phyo Nyi Nyi Paing'),
    ('Amisha Sathi'),
    ('Kristin Dwyer'),
    ('Matthew Walker '),
    ('George R. R. Martin '),
    ('Dustin Thao'),
    ('Rebecca Yarros'),
    ('Jonathan Eig'),
    ('Nathan Hill'),
--    10
    ('Ann Napolitano'),
    ('S.A. Cosby'),
    ('Jean M. Twenge'),
    ('Catherine Cowles'),
    ('Rachel Schneider'),
    ('Catherine Lacey'),
    ('Lauren Groff'),
    ('Mariana Enriquez'),
    ('Teju Cole'),
    ('Esther Yi'),
--     20
    ('Nick Morgan'),
    ('Jeff Duntemann'),
    ('Donald Knuth'),
    ('Y.DANIEL LIANG'),
    ('Diana Wynne Jones'),
    ('Mike Unwin'),
    ('Planet Lonely'),
    ('Vera Storme'),
    ('Anthony Doerr'),
    ('Tom Turcich'),
--     30
    ('Jennifer Wintgens'),
    ('Daniel Kahneman'),
    ('Parmy Olson'),
    ('Erik Haugom'),
    ('Bill Davies'),
    ('E L James'),
    ('Lee Child'),
    ('Teresa Driscoll'),
    ('Kelly Rimmer');


-- Insert Books (Products)
INSERT INTO products (name, description, price, quantity, image_url, rating, author_id, category_id, product_type)
VALUES
    ('The Travel Book', 'Help you to learn to drive your dollar further during the travel.', 15.99, 100, '/images/books/book-1.png', 4.9, 1, 3, 'BOOK'),
    ('The Battle for the Fae King Throne', 'A battle for the Fea King Throne', 35.99, 50, '/images/books/book-2.png', 5.0, 2, 1, 'BOOK'),
    ('Beyond the Ocean Door', 'About a telepathy fantasy adventure', 21.99, 40, '/images/books/book-3.png', 5.0, 3, 10, 'BOOK'),
    ('The Atlas of Us', 'A breathtaking tour de force of angst and longing', 19.99, 30, '/images/books/book-4.png', 4.7, 4, 1, 'BOOK'),
    ('Why We Sleep', 'The New Science of Sleep and Dreams', 14.99, 200, '/images/books/book-5.png', 4.8, 5, 5, 'BOOK'),
    ('A Feast for Crows', 'An epic fantasy novel about a deadly competition to become an elite dragon rider.', 19.99, 150, '/images/books/book-6.png', 4.7, 6, 1, 'BOOK'),
    ('You''ve Reached Sam', 'How do you move forward when everything you love is on the line?', 24.99, 100, '/images/books/book-7.png', 4.6, 7, 5, 'BOOK'),
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
    ('The Covenant of Water', 'A novel about a family’s secrets and legacy.', 24.99, 80, '/images/books/book-20.png', 4.8, 20, 1, 'BOOK'),
    ('JavaScript for Kids', 'A Playful Introduction to Programming', 50, 60, '/images/books/book-21.png', 4.6, 21, 2, 'BOOK'),
    ('Assembly Language Step-by-Step: Programming with Linux','A very beginning explaining for assembly language',81,30,'/images/books/book-22.png',4.4,22,2,'BOOK'),
    ('Art of Computer Programming','The: MMIX -- A RISC Computer for the New Millennium',38.55,40,'/images/books/book-23.png',4.4,23,2,'BOOK'),
    ('Introduction to Java Programming and Data Structures', 'Introduction to Java Programming and Data Structures', 7.99, 50, '/images/books/book-24.png', 4.6, 24, 2, 'BOOK'),
    ('Howl’s Moving Castle','Humorous Fiction for Young Adults', 14.44, 50, '/images/books/book-25.png', 4.8, 25, 10, 'BOOK'),
    ('Around the World in 50 Birds: 1000 Piece Jigsaw','Spot birds from across the globe with this 1000-piece puzzle',38,70,'/images/books/book-26.png',4.8,26,3,'BOOK'),
    ('Lonely Planet Japan','Lonely Planet''s local travel experts reveal all you need to know to plan the trip of a lifetime to Japan',37.05,30,'/images/books/book-27.png',4.2,27,3,'BOOK'),
    ('Iceland Travel Guide 2025','With this guide, you’ll see more than just the famous places in Iceland.',27.10,80,'/images/books/book-28.png',3.5,28,3,'BOOK'),
    ('Four Seasons in Rome','a "dazzling" (Azar Nafisi, author of Reading Lolita in Tehran) memoir about art and adventures in Rome.',22.54,50,'/images/books/book-29.png',4.4,29,3,'BOOK'),
    ('The World Walk','The invigorating true story of a man and his dog who circled the globe on foot.',36.10,40,'/images/books/book-30.png',4.9,30,3,'BOOK'),
    ('Chile','Introduction of Chile',27.79,50,'/images/books/book-31.png',4.6,31,3,'BOOK'),
    ('Thinking, Fast and Slow','Help you change the way we think about thinking',11.9,50,'/images/books/book-32.png',4.6,32,4,'BOOK'),
    ('Supremacy: AI, ChatGPT and the Race That Will Change the World','Description of battle between two AI companies',26,40,'/images/books/book-33.png',4.3,33,4,'BOOK'),
    ('Essentials of Pricing Analytics: Tools and Implementation with Excel','This book provides a broad introduction to the field of pricing',78,40,'/images/books/book-34.png',4.6,34,4,'BOOK'),
    ('Essential Business Law and Practice for SQE1','explains the key principles of business law and practice as required for theSQE Part 1',63.83,60,'/images/books/book-35.png',4.5,35,4,'BOOK'),
    ('Fifty Shades of Grey: Book 1 of the Fifty Shades trilogy','A provocative contemporary romance',23.83,70,'/images/books/book-36.png',4.0,36,1,'BOOK'),
    ('Killing Floor: 1','A complex thriller with layer upon layer of mystery and violence and intrigue',17.99,100,'/images/books/book-37.png',4.6,37,9,'BOOK'),
    ('I Am Watching You','Perhaps one of the best psychological thrillers released this year',18,80,'/images/books/book-38.png',4.5,38,9,'BOOK'),
    ('The Things We Cannot Say: A WWII Historical Fiction Novel','An intense story of survival, hardship, and heartbreak',21.74,60,'/images/books/book-39.png',4.8,39,8,'BOOK');

-- Insert Users
INSERT INTO users (username, password, first_name, last_name, phone_number, email, address, date_of_birth, role,profile_picture_url)
VALUES
    ('john_doe', 'password123', 'John', 'Doe', '123456789', 'john@example.com', '123 Main St', '1990-01-01', 'USER','/images/john.png'),
    ('admin_user', 'adminpass', 'Admin', 'User', '987654321', 'admin@example.com', '456 Admin Rd', '1985-05-15', 'ADMIN','/imag es/alice'),
    ('alice', 'pass123', 'Alice', 'Tan', '91234567', 'alice@example.com', '123 Orchard Rd', '1990-01-01', 'USER',''),
    ('bob', 'pass123', 'Bob', 'Lee', '98765432', 'bob@example.com', '456 Clementi Rd', '1985-05-15', 'ADMIN',''),
    ('carol', 'pass123', 'Carol', 'Lim', '92223333', 'carol@example.com', '789 Bukit Timah', '1992-07-10', 'USER','');

-- Insert Delivery Types
INSERT INTO delivery_types (name, description, fee)
VALUES
    ('Standard Delivery', 'Delivered within 3–5 working days', 3.50),
    ('Express Delivery', 'Delivered within 1–2 working days', 7.90),
    ('Same-Day Delivery', 'Delivered on the same day if ordered before 12pm', 12.00);

-- Insert Payment Types
INSERT INTO payment_types (name)
VALUES
    ('Credit Card'),
    ('PayPal'),
    ('Bank Transfer');

-- Insert Cart Items
INSERT INTO cart_items (user_id, product_id, quantity)
VALUES
    (1, 1, 2),   -- John Doe adds 2 Harry Potter books
    (1, 2, 1),   -- John Doe adds 1 copy of Java How to Program
    (2, 3, 1);   -- Admin adds 1 Rick Steves' Europe: Belgium

-- Insert Orders
INSERT INTO orders (
    user_id,
    payment_type_id,
    delivery_type_id,
    status,
    date_time,
    shipping_address,
    goods_service_tax,
    total_amount
)
VALUES
    (1, 1, 1, 'SHIPPING', NOW(), '123 Main St', 0.09, 67.97),
    (2, 2, 2, 'CANCELLED', NOW(), '456 Admin Rd', 0.09, 120.00);

-- Insert Order Items
INSERT INTO order_items (order_id, product_id, quantity, unit_price_at_transaction)
VALUES
    (1, 1, 2, 15.99),
    (1, 2, 1, 35.99),
    (2, 3, 1, 21.99);

-- Insert Reviews
INSERT INTO reviews (product_id, user_id, comment, rating)
VALUES
    (1, 1, 'Absolutely magical! A must-read for all ages.', 5.0),
    (2, 1, 'Great book for Java learners. Very detailed.', 4.5),
    (3, 2, 'Helped me plan my entire trip to Belgium. Excellent!', 5.0),
    (4, 2, 'Good financial advice, though a bit repetitive.', 4.0),
    (5, 1, 'Life-changing habits explained in a simple way.', 4.8),
    (6, 2, 'Exciting and full of fantasy action.', 4.7),
    (7, 1, 'Touching memoir with lots of emotion.', 4.6),
    (8, 2, 'A fun and quirky story about a strong woman in science.', 4.7),
    (9, 1, 'Could not put it down! Twists at every corner.', 4.5),
    (10, 2, 'Lighthearted romance with relatable characters.', 4.6);
    
    
