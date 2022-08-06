// IMPORTING MODULES
require("dotenv").config();
const db = require("./config/dbconn");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const jwt = require("json-web-token");
const { genSalt, compare, hash } = require("bcrypt");

const app = express();

const router = express.Router();

const port = parseInt(process.env.Port) || 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// add cors to the app variable
app.use(router, cors(), express.json(),
    express.urlencoded({
    extended: true})
);

// allow access to fetch data from the api externally by  Seting header
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

router.get('/', (req, res) => {
    res.sendFile('./  ')
});

// Get all products
router.get("/products", (req, res) => {
    // Query
    const strQry = `
    SELECT product_id, title, category, description, img, price, created_by
    FROM products;
    `;
    db.query(strQry, (err, results) => {
        if (err) throw err;
        res.json({
            status: 200,
            results: results,
        });
    });
});

// Get one product
router.get("/products/:id", (req, res) => {
    // Query
    const strQry = `
    SELECT product_id, title, category, description, img, price, created_by
    FROM products
    WHERE product_id = ?;
    `;
    db.query(strQry, [req.params.id], (err, results) => {
        if (err) throw err;
        res.json({
            status: 200,
            results: results.length <= 0 ? "Sorry, no product was found." : results,
        });
    });
});