CREATE DATABASE IF NOT EXISTS moflix;

USE moflix;

CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    status VARCHAR(20) DEFAULT 'accepted'
);


CREATE TABLE IF NOT EXISTS admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login_name VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE
);


CREATE TABLE IF NOT EXISTS movie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    release_year INT,
    added_at DATE DEFAULT CURRENT_DATE,
    duration INT,
    directors TEXT,
    actors TEXT,
    cover_img_url VARCHAR(255),
    trailer_url VARCHAR(255),
    film_url VARCHAR(255)
);




CREATE TABLE IF NOT EXISTS genre (
    name VARCHAR(50) UNIQUE PRIMARY KEY
);


CREATE TABLE IF NOT EXISTS pricing_plan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE,
    price DECIMAL(10, 2),
    duration INT,
    film_quality VARCHAR(50),
    description TEXT
);


CREATE TABLE IF NOT EXISTS label (
    name VARCHAR(50) UNIQUE PRIMARY KEY,
    description TEXT
);


CREATE TABLE IF NOT EXISTS movie_label (
    movie_id INT,
    label_name VARCHAR(50),
    PRIMARY KEY (movie_id, label_name),
    FOREIGN KEY (movie_id) REFERENCES movie(id),
    FOREIGN KEY (label_name) REFERENCES label(name)
);


CREATE TABLE IF NOT EXISTS movie_genre (
    movie_id INT,
    genre_name VARCHAR(50),
    PRIMARY KEY (movie_id, genre_name),
    FOREIGN KEY (movie_id) REFERENCES movie(id),
    FOREIGN KEY (genre_name) REFERENCES genre(name)
);


CREATE TABLE IF NOT EXISTS subtitle (
    movie_id INT,
    language VARCHAR(50),
    sub_text TEXT UNIQUE,
    PRIMARY KEY (movie_id, language),
    FOREIGN KEY (movie_id) REFERENCES movie(id)
);


CREATE TABLE IF NOT EXISTS user_rating (
    user_id INT,
    movie_id INT,
    value INT,
    time TIMESTAMP,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (movie_id) REFERENCES movie(id),
    CONSTRAINT CHK_RatingValue CHECK (value >= 1 AND value <= 5)
);


CREATE TABLE IF NOT EXISTS user_purchase (
    user_id INT,
    pricing_plan_id INT,
    purchase_date DATE DEFAULT CURRENT_DATE,
    PRIMARY KEY (user_id, pricing_plan_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (pricing_plan_id) REFERENCES pricing_plan(id)
);


CREATE TABLE IF NOT EXISTS comment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    movie_id INT,
    date DATE DEFAULT CURRENT_DATE,
    detail TEXT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (movie_id) REFERENCES movie(id)
);

CREATE TABLE IF NOT EXISTS user_plan (
    user_id INT,
    plan_id INT DEFAULT 1,
    start_date DATE DEFAULT CURRENT_DATE,
    exp_date DATE,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (plan_id) REFERENCES pricing_plan(id)
);


CREATE TABLE IF NOT EXISTS user_favorite (
    user_id INT,
    movie_id INT,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (movie_id) REFERENCES movie(id)
);


CREATE TABLE IF NOT EXISTS user_watchlist (
    user_id INT,
    movie_id INT,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (movie_id) REFERENCES movie(id)
);


CREATE TABLE IF NOT EXISTS user_history (
    user_id INT,
    movie_id INT,
    date DATE DEFAULT CURRENT_DATE,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (movie_id) REFERENCES movie(id)
);


CREATE TABLE IF NOT EXISTS movie_view (
    movie_id INT PRIMARY KEY,
    view INT,
    FOREIGN KEY (movie_id) REFERENCES movie(id),
);