import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "seb",
    database: "mydb",
});

app.get("/", (req, res) => {
    res.json("test");
});

app.get("/persons", (req, res) => {
    const query = "SELECT * FROM PERSON";
    db.query(query, (err, data) => {
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.post("/persons", (req, res) => {
  const query = "INSERT INTO PERSON (`id`, `name`, `age`) VALUES (?)";
  const values = [
    req.params.id,
    req.params.name,
    req.params.age,
  ]
  db.query(query, [values], (err, data) => {
    if(err) return res.json(err)
    return res.json("created");
  })
})

app.delete("/persons/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM PERSON WHERE id= ?";
  db.query(query, [id], (err, data) => {
    if(err) return res.json(err)
    return res.json("deleted");
  })
})

app.put("/person/id", (req, res) => {
  const values = [
    req.params.id,
    req.params.name,
    req.params.age,
  ]
  const query = "UPDATE person SET `id` = ?, `name` = ?, `age` = ? WHERE id = ?";
  db.query(query, [...values, id], (err, data) => {
    if(err) return res.json(err)
    return res.json("updated");
  })
})

app.listen(8800, () => {
    console.log("ok");
});