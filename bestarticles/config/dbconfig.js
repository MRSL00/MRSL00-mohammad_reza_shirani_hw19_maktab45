module.exports = {
  Url: "mongodb://localhost:27017/final19",
  Use: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  CheckConnection: (err) => {
    if (err) return console.log("[!] Database connection failed.");
    console.log("[+] Database connected succesfully.");
  },
};
