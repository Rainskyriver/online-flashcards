DROP TABLE IF EXISTS tags CASCADE;
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20)
);