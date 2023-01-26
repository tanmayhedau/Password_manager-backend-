const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const { encrypt, decrypt } = require("./encryptionHandler");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Tanmay@619300974",
  database: "passwordmanager",
});

app.post("/addpassword", (req, res) => {
  let { password, title } = req.body;
  let hashedPassword = encrypt(password);

  db.query(
    "INSERT INTO passwords (password , title,iv) VALUES (?,?,?)",
    [hashedPassword.password, title, hashedPassword.iv],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});

app.get("/showpasswords", (req, res) => {
  db.query("SELECT * FROM passwords", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/decryptpassword", (req, res) => {
  res.send(decrypt(req.body));
});

app.listen(PORT, () => {
  console.log("express app is running");
});
