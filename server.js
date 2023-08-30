import Express from "express"
import pool from "./db/conn.js"
import path from "path"
import { fileURLToPath } from 'url';
const app = Express()
app.use(Express.urlencoded({extended: true}))
app.set("view engine", "ejs")
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
console.log(__dirname)

app.use(Express.static(path.join(__dirname, 'public')));

app.route("/books/insertbook")
    .get((req,res)=>{
    res.render("form")
})
    .post((req,res)=>{
    const title = req.body.title
    const pages = req.body.pages 
    const query =`INSERT INTO books(??,??) VALUES('?','?')`
    const data = ["title","Npages",title,pages]
    pool.query(query,data,(err)=>{
        if(err){console.log(err)}

        else {res.redirect("/")}
        res.redirect("/")

    })
})

app.get("/", (req,res)=>{
    res.render("home")
})

app.get("/books", (req,res)=>{
    const selectQeury = `SELECT * FROM books`
    pool.query(selectQeury, (err,data)=>{
        if (err) {console.log(err)}
        else{
            const books = data
            
            res.render("books", {books: books})
        }
    })
})


app.get("/book/:id",(req,res)=>{
        const ID = req.params.id
        const selectQeury = `SELECT * FROM books WHERE id = ${ID}`
        pool.query(selectQeury, (err,data)=>{
        if (err) {console.log(err)}
        else{
            const book = data
            console.log(book)
            res.render("book", {book: book[0]})
            
        }
        
    })
})
app.post("/book/:id",(req,res)=>{
        const ID = req.params.id
        const selectQeury = `SELECT * FROM books WHERE id = ${ID}`
        pool.query(selectQeury, (err,data)=>{
        if (err) {console.log(err)}
        else{
            const book = data
            console.log("book")
            res.render("book", {book: book[0]})
        }
        })
    
 })


app.get("/books/edit/:id",(req,res)=>{
    const ID = req.params.id
    const selectQeury = `SELECT * FROM books WHERE id = ${ID}`
    pool.query(selectQeury, (err,data)=>{
    if (err) {console.log(err)}
    else{
        const book = data
        
        res.render("editbook", {book: book[0]})
    }
    })
})  

app.post("books/edit/:id",(req,res)=>{
    const ID = req.params.id
    const newTitle = req.body.title
    console.log(newTitle)
    res.redirect("/books/edit/:id")
})





app.listen(3000,(req,res)=>{
    console.log("Ouvindo na porta", 3000)
})
