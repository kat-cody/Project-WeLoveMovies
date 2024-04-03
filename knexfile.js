const path = require("path");

require("dotenv").config();

//FROM THE ORIGINAL PROJECT FILE
// const {
//   DATABASE_URL = "postgresql://postgres@localhost/postgres",
// } = process.env;

//Attempt to connect with database
const {
  DATABASE_URL = "postgres://tbnpnykm:OIt66uuiSzEec0jkwXq_uqzmRhkAb_Xv@castor.db.elephantsql.com/tbnpnykm",
} = process.env;


module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL,
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
    connection: DATABASE_URL,
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