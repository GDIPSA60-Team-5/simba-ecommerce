/* ---------- clean‑up (drop child tables first) ---------- */
DROP TABLE IF EXISTS order_item;
DROP TABLE IF EXISTS cart_item;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS delivery_type;
DROP TABLE IF EXISTS payment_type;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS author;
DROP TABLE IF EXISTS users;

/* ---------- USERS ---------- */
CREATE TABLE users (
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

/* ---------- AUTHOR ---------- */
CREATE TABLE author (
                        id   INT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* ---------- CATEGORY ---------- */
CREATE TABLE category (
                          id   INT AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* ---------- DELIVERY TYPE ---------- */
CREATE TABLE delivery_type (
                               id          INT AUTO_INCREMENT PRIMARY KEY,
                               name        VARCHAR(255) NOT NULL,
                               description VARCHAR(1000),
                               fee         FLOAT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* ---------- PAYMENT TYPE ---------- */
CREATE TABLE payment_type (
                              id   INT AUTO_INCREMENT PRIMARY KEY,
                              name VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* ---------- PRODUCTS  (single‑table inheritance) ---------- */
CREATE TABLE products (
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
                              FOREIGN KEY (category_id) REFERENCES category(id)
                                  ON DELETE SET NULL,
                          CONSTRAINT fk_products_author
                              FOREIGN KEY (author_id)  REFERENCES author(id)
                                  ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* ---------- CART ITEM ---------- */
CREATE TABLE cart_item (
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
CREATE TABLE orders (
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
                            FOREIGN KEY (payment_type_id)  REFERENCES payment_type(id),
                        CONSTRAINT fk_orders_delivery
                            FOREIGN KEY (delivery_type_id) REFERENCES delivery_type(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* ---------- ORDER ITEM ---------- */
CREATE TABLE order_item (
                            id                       INT AUTO_INCREMENT PRIMARY KEY,
                            order_id                 INT   NOT NULL,
                            product_id               INT   NOT NULL,
                            quantity                 INT   NOT NULL,
                            unit_price_at_transaction FLOAT NOT NULL,
                            CONSTRAINT fk_orderitem_order
                                FOREIGN KEY (order_id)   REFERENCES orders(id)    ON DELETE CASCADE,
                            CONSTRAINT fk_orderitem_product
                                FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
