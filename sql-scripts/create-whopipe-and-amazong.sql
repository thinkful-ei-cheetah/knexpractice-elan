CREATE TABLE IF NOT EXISTS whopipe_video_views (
  view_id SERIAL PRIMARY KEY,
  video_name TEXT NOT NULL,
  region TEXT NOT NULL,
  date_viewed TIMESTAMP DEFAULT now() NOT NULL
);

DROP TYPE IF EXISTS department;
CREATE TYPE department as ENUM (
  'Electronics',
  'Cleaning',
  'Grocery',
  'Furniture',
  'Stationery',
  'Clothing',
  'DIY',
  'Sports',
  'Homeware',
  'Games',
  'Transport'
);

CREATE TABLE IF NOT EXISTS amazong_products (
  product_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price decimal(12, 2) NOT NULL,
  image TEXT,
  category department NOT NULL
);