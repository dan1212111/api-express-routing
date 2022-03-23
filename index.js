const express = require("express");
const app = express();
const port = 3030;

const cors = require("cors");
const morgan = require("morgan");

const data = require("./data");

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.get("/users", (req, res) => {
  res.json({users: data.users})
})

app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id)
  const userArr = data.users.find( user => user.id === userId)
  res.send({users: userArr})
})

app.post("/users", (req, res) => {
    const newUser = {
    id: data.users.length+1,
    email: req.body.email
  }
  data.users.push(newUser)
  res.json({user: newUser})
})

/* FILMS ENDPOINT */
app.get("/films", (req, res) => {
  const films = data.films.filter( film => film.director === req.query.director)
  res.json({films: films})
})

app.get("/films/:id", (req, res) => {
  const filmsId = parseInt(req.params.id)
  const userArr = data.films.find( films => films.id === filmsId)
  res.json({films: userArr})
})

app.post("/users", (req, res) => {
  const newFilm = {
    id: data.films.length+1,
    director: req.body.director
  }
  data.films.push(newFilm)
  res.json({user: newFilm})
})

/* BOOKS ENDPOINT */
app.get("/books", (req, res) => {
  res.json({books: data.books})
})

app.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id)
  const userArr = data.books.find(books => books.id === bookId)
  res.json({books: userArr})
})

app.post("/books", (req, res) => {
  const newBook = {
    id: data.books.length+1,
    title: req.body.title
  }
  data.books.push(newBook)
  res.json({user: newBook})
})




/* START SERVER */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
