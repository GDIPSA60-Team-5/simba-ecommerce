DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS delivery_types;
DROP TABLE IF EXISTS payment_types;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS users;

/* ---------- USERS ---------- */
CREATE TABLE IF NOT EXISTS users (
                                     id              INT AUTO_INCREMENT PRIMARY KEY,
                                     username        VARCHAR(50)  NOT NULL UNIQUE,
                                     password        VARCHAR(255) NOT NULL,
                                     first_name      VARCHAR(50)  NOT NULL,
                                     last_name       VARCHAR(50)  NOT NULL,
                                     phone_number    VARCHAR(20),
                                     email           VARCHAR(255) NOT NULL UNIQUE,
                                     address         VARCHAR(255),
                                     date_of_birth   DATE,
                                     role            VARCHAR(20)  NOT NULL  -- stores Enum Role as STRING
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* ---------- AUTHORS ---------- */
CREATE TABLE IF NOT EXISTS authors (
                                      id   INT AUTO_INCREMENT PRIMARY KEY,
                                      name VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* ---------- CATEGORIES ---------- */
CREATE TABLE IF NOT EXISTS categories (
                                          id   INT AUTO_INCREMENT PRIMARY KEY,
                                          name VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* ---------- DELIVERY TYPES ---------- */
CREATE TABLE IF NOT EXISTS delivery_types (
                                              id          INT AUTO_INCREMENT PRIMARY KEY,
                                              name        VARCHAR(255) NOT NULL,
                                              description VARCHAR(1000),
                                              fee         FLOAT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* ---------- PAYMENT TYPES ---------- */
CREATE TABLE IF NOT EXISTS payment_types (
                                             id   INT AUTO_INCREMENT PRIMARY KEY,
                                             name VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* ---------- PRODUCTS  (single‑table inheritance) ---------- */
CREATE TABLE IF NOT EXISTS products (
                                        id            INT AUTO_INCREMENT PRIMARY KEY,
                                        product_type  VARCHAR(31)  NOT NULL,           -- discriminator
                                        name          VARCHAR(100) NOT NULL,
                                        description   VARCHAR(1000),
                                        price         FLOAT        NOT NULL,
                                        quantity      INT          NOT NULL,
                                        image_url     VARCHAR(500),
                                        rating        FLOAT,
                                        category_id   INT,
                                        author_id     INT,                              -- only used by Book
                                        CONSTRAINT fk_products_category
                                            FOREIGN KEY (category_id) REFERENCES categories(id)
                                                ON DELETE SET NULL,
                                        CONSTRAINT fk_products_author
                                            FOREIGN KEY (author_id)  REFERENCES authors(id)
                                                ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* ---------- CART ITEM ---------- */
CREATE TABLE IF NOT EXISTS cart_items (
                                          id         INT AUTO_INCREMENT PRIMARY KEY,
                                          user_id    INT  NOT NULL,
                                          product_id INT  NOT NULL,
                                          quantity   INT  NOT NULL,
                                          CONSTRAINT fk_cart_user
                                              FOREIGN KEY (user_id)    REFERENCES users(id)     ON DELETE CASCADE,
                                          CONSTRAINT fk_cart_product
                                              FOREIGN KEY (product_id) REFERENCES products(id)  ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* ---------- ORDERS ---------- */
CREATE TABLE IF NOT EXISTS orders (
                                      id               INT AUTO_INCREMENT PRIMARY KEY,
                                      user_id          INT         NOT NULL,
                                      payment_type_id  INT         NOT NULL,
                                      delivery_type_id INT         NOT NULL,
                                      status           VARCHAR(50) NOT NULL,
                                      date_time        DATETIME    NOT NULL,
                                      shipping_address VARCHAR(255),
                                      goods_service_tax FLOAT      NOT NULL,
                                      CONSTRAINT fk_orders_user
                                          FOREIGN KEY (user_id)          REFERENCES users(id),
                                      CONSTRAINT fk_orders_payment
                                          FOREIGN KEY (payment_type_id)  REFERENCES payment_types(id),
                                      CONSTRAINT fk_orders_delivery
                                          FOREIGN KEY (delivery_type_id) REFERENCES delivery_types(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* ---------- ORDER ITEM ---------- */
CREATE TABLE IF NOT EXISTS order_items (
                                           id                       INT AUTO_INCREMENT PRIMARY KEY,
                                           order_id                 INT   NOT NULL,
                                           product_id               INT   NOT NULL,
                                           quantity                 INT   NOT NULL,
                                           unit_price_at_transaction FLOAT NOT NULL,
                                           CONSTRAINT fk_orderitems_order
                                               FOREIGN KEY (order_id)   REFERENCES orders(id)    ON DELETE CASCADE,
                                           CONSTRAINT fk_orderitems_product
                                               FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
