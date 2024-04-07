CREATE TABLE IF NOT EXISTS fonts (
  font_id serial PRIMARY KEY,
  font_name VARCHAR(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS messages (
  message_id serial PRIMARY KEY,
  message_text VARCHAR(500),
  font_id INT NOT NULL,
  sent_on TIMESTAMP NOT NULL,
  FOREIGN KEY (font_id) REFERENCES fonts (font_id)
);
