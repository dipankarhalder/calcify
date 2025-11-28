module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    supportBigNumbers: true,
    bigNumberStrings: true,
    decimalNumbers: true
  },
  define: {
    paranoid: true,
    timestamps: true,
    underscored: true
  },
  benchmark: true,
  logging: console.log
}
