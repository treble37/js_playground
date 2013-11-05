require "sqlite3"
require "json"

db = SQLite3::Database.new "./db/races_test.db"

rows = db.execute <<-SQL
  drop table races;
SQL

rows = db.execute <<-SQL
  create table races (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    race_name text,
    race_date text,
    race_time text,
    race_distance text
  );
SQL