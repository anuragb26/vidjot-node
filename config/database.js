if (process.env.NODE_ENV === "production") {
  module.exports = {
    DATABASE_URI:
      "mongodb+srv://anuragb26:anuragb26@cluster0-nx9b3.mongodb.net/vidjot?retryWrites=true&w=majority"
  };
} else {
  module.exports = { DATABASE_URI: "mongodb://localhost:27017/vidjot" };
}
