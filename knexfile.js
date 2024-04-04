const path = require("path");

require("dotenv").config();

const {
//   DATABASE_URL = "postgresql://postgres@localhost/postgres",
DATABASE_URL = "postgresql://postgres:Kathleen01@localhost:5001/postgres"
 } = process.env;

const {
  NODE_ENV = "development",
  DEVELOPMENT_DATABASE_URL,
  PRODUCTION_DATABASE_URL,
} = process.env;
const URL =
  NODE_ENV === "production"
    ? PRODUCTION_DATABASE_URL
    : DEVELOPMENT_DATABASE_URL;

module.exports = {
  development: {
    client: "postgresql",
    connection: "postgresql://postgres:Kathleen01@localhost:5001/postgres",
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: "postgresql://postgres:Kathleen01@localhost:5001/postgres",
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};