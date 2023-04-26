// App for forbredelse til prøveeksamen
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Admin = require("./models/Admin");
const Prod = require("./models/Produkt");

const app = express();

dotenv.config();

app.set("view engine", "ejs");

// Database tilkobling MongoDB
mongoose.set("strictQuery", false);
const dbURI = "mongodb+srv://josteinla:Passord1@cluster1.ekux2ad.mongodb.net/Cluster1?retryWrites=true&w=majority";

mongoose.connect(dbURI)
  .then(() => {
    app.listen(80);
    console.log("listeining on port 80")
  })
  .catch((err) => {
    console.log(err)
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Laget en bruker som er innloggings bruker og som jeg sender til view filene
let bruker = "";

// Nettsider
app.get("/", (req, res) => {
    res.render("index.ejs", { title: "Hjem", produkt: produkt, user: bruker });
});

// Logg inn
app.get("/LoggInn", (req, res) => {
    res.render("LoggInn.ejs", { title: "LoggInn", user: bruker });
});
  
app.post("/loggInn", async (req, res) => {
    const { email, password } = req.body;
    console.log("loggInnBruker", email, password);
    // admin = 0; // Brukes for å sjekke om det er admin bruker

    let user = await Admin.findOne({ email: email });
    if (user) {
        if (user.password == password) {
            bruker = user;
            res.render("admin.ejs", { title: "Admin", user: user })
        } else {
            res.render("logginn.ejs", { info: "Passord feil" })
        }
    } else {
        user = await Bruker.findOne({ email: email });
        if (user) {
            if (user.password == password) {
                bruker = user;
                res.render("index.ejs", { title: "Hjem", user: user })
            } else {
                res.render("logginn.ejs", { info: "Passord feil" })
            }
        } else {
            console.log("Brukeren finnes ikke i systemet")
            res.render("logginn.ejs", { title: "Logg Inn", user: bruker })
        }
    }
});

app.post("/nyprod", async (req, res) => {
    const { tittel, modell, merke, pris, artikkelnummer, dato } = req.body;

    try {
        const user = await Prod.create({ tittel, modell, merke, pris, artikkelnummer, dato });
        res.render("admin.ejs", { title: "Admin", user: bruker })
    }
    catch (err) {
        console.log(err.message);
        res.render("admin.ejs", { title: "Admin", user: bruker })
    }
});

// Veileder
app.get("/Veileder", (req, res) => {
    res.render("veileder.ejs", { title: "veileder", user: bruker });
});

