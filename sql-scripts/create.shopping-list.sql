DROP TYPE IF EXISTS grocery;
CREATE TYPE grocery AS ENUM (
  'Main',
  'Snack',
  'Lunch',
  'Breakfast'
);

CREATE TABLE IF NOT EXISTS shopping_list (
  id SERIAL primary key,
  name text NOT NULL,
  price decimal(12,2) NOT NULL,
  date_added TIMESTAMP default now() NOT NULL,
  checked BOOLEAN default false,
  category grocery NOT NULL
);