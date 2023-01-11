const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const port = 3302;
const app = express();
app.use(bodyParser.urlencoded({ "extended": false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(cors({
    origin: "*"
}));
app.listen(port, () => console.log(`Server running at on port ${port}`));

const con = mysql.createConnection({
    "host": "localhost",
    "user": "root",
    "password": "admin",
    "database": "infosys"
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected successfully");
});

app.get("/data", (req, res) => {
    if (Object.keys(req.query).length == 0) {
        con.query("select * from spring order by emp_id", (err, result) => {
            if (err) res.status(404).send("Error");
            else res.status(200).send(result);
        })
    } else {
        if (req.query.loc != undefined) {
            con.query(`select * from spring where emp_location like '${req.query.loc}%' order by emp_id`, (err, result) => {
                if (err) res.status(404).send("Not Found")
                else res.status(200).send(result);
            })
        } else{
            con.query(`select * from spring where emp_salary > ${req.query.sal} order by emp_id`, (err, result) => {
                if (err) res.status(404).send("Not Found")
                else res.status(200).send(result);
            })
        }
    }
})

app.get("/delete", (req, res) => {
    console.log("delete")
    con.query(`delete from spring where emp_id =${req.query.id}`, (err, result) => {
       if (err) res.status(404).send("employee Not Found")
       else res.sendStatus(200);
   }) 
});

app.post("/save", (req, res) => {
    //data = [null, req.body.emp_name, req.body.emp_desg, req.body.emp_dept, req.body.emp_salary, req.body.emp_location]
    con.query(`insert into spring values (${null}, '${req.body.emp_name}', '${req.body.emp_desg}', '${req.body.emp_dept}', ${req.body.emp_salary}, '${req.body.emp_location}')`, (err, result) => {
        if (err) res.status(404).send("employee Not Found")
       else res.sendStatus(200);
    })
})

app.get("/edit", (req, res) => {
    con.query(`update spring set emp_location='${req.query.loc}' where emp_id=${req.query.id}`, (err, result) => {
        if (err) res.status(404).send("employee Not Found")
       else res.sendStatus(200);
    })
})