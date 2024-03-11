-- Table des Utilisateurs
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    password_hash VARCHAR(255),
    google_id VARCHAR(255), 
    profile_picture VARCHAR(255), 
    role_user ENUM("simple user", "admin", "root") NOT NULL,
    overview TEXT,
    date_registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT UNIQUE (email),
    CONSTRAINT UNIQUE (username),
    CONSTRAINT UNIQUE (google_id)
);

-- Table des Catégories
CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name_categorie VARCHAR(255) NOT NULL,
    coverPath TEXT NOT NULL,
    CONSTRAINT UNIQUE (name_categorie)
);

-- Table des Articles
CREATE TABLE Articles (
    article_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id INT,
    read_time_minutes INT,
    category_id INT,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Table des Likes
CREATE TABLE Likes (
    like_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    article_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (article_id) REFERENCES Articles(article_id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Table des Commentaires
CREATE TABLE Comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    article_id INT,
    content TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (article_id) REFERENCES Articles(article_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table des Suivis
CREATE TABLE Follows (
    follow_id INT AUTO_INCREMENT PRIMARY KEY,
    follower_id INT,
    following_id INT,
    FOREIGN KEY (follower_id) REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (following_id) REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Table des réseaux sociaux de l('utilisateur')
CREATE TABLE SocialMedia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    social_name TEXT,
    link TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

