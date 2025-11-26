CREATE DATABASE IF NOT EXISTS green_tracker DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE green_tracker;

CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120),
  email VARCHAR(200) UNIQUE,
  preferences JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS plants (
  plant_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(200),
  type VARCHAR(150),
  species VARCHAR(150),
  date_added DATE,
  water_freq_days INT DEFAULT 7,
  fertilize_freq_days INT DEFAULT 30,
  notes TEXT,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS watering_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  plant_id INT NOT NULL,
  watered_on DATE,
  next_watering DATE,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (plant_id) REFERENCES plants(plant_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS fertilizer_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  plant_id INT NOT NULL,
  fertilizer_type VARCHAR(150),
  applied_on DATE,
  frequency_days INT,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (plant_id) REFERENCES plants(plant_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS growth_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  plant_id INT NOT NULL,
  height_cm DOUBLE,
  leaf_count INT,
  photo_url TEXT,
  logged_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (plant_id) REFERENCES plants(plant_id) ON DELETE CASCADE
);

-- Optional: seed a demo user
INSERT IGNORE INTO users (user_id, name, email) VALUES (1, 'Demo', 'demo@example.com');