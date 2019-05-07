CREATE TABLE blogful_articles (
  id SERIAL PRIMARY key,
  title TEXT NOT NULL,
  date_published TIMESTAMP DEFAULT now() NOT NULL,
  content TEXT
);

