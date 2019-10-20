 const express = require("express");
 const Recipe = require("./models/recipe");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();


 mongoose.connect("mongodb+srv://benson:a2mE.64KdzZf@cluster0-tffeu.mongodb.net/test?retryWrites=true&w=majority")
    .then( () => {
        console.log("connection to mongoDB atlas suscessful");
    })
    .catch( (error) => {
        console.log("unable to connect to mongoDB atlas");
        console.error(error);
    });

app.use(bodyparser.json());
app.use(cors())

 app.get("/api/recipes", (req, res, next) => {
    Recipe.find()
        .then( (recipe) => {
            res.status(201).json(recipe)
        }).catch( (error) => {
            res.status(400).json({
                error: error
            })
        })
 });

 app.get("/api/recipes/:id", (req, res, next) => {
    Recipe.findOne({_d: req.params.id}).then( (recipe) => {
        res.status(200).json(recipe)
    }).catch( (error) => {
        res.status(400).json({
            error: error
        })
    })
 });

 app.post("/api/recipes", (req, res, next) => {
     const recipe = new Recipe({
         title: req.body.title,
         ingredients: req.body.ingredients,
         instructions: req.body.instructions,
         difficulty: req.body.difficulty,
         time: req.body.time
     })
     recipe.save()
        .then( () => {
            res.status(200).json({
                message: "recipe created successfully"
            })
         }).catch( (error) => {
            res.status(400).json({
                error: error
            })
         })
 });

 app.put("/api/recipes/:id", (req, res, next) => {
    const recipe = new Recipe({
        title: req.body.title,
         ingredients: req.body.ingredients,
         instructions: req.body.instructions,
         difficulty: req.body.difficulty,
         time: req.body.time
    })
    Recipe.findOne({_d: req.params.id}, recipe).then( () => {
            res.status(201).json({
                message: "Recipe Updated Successfully"
            })
        }).catch( (error) => {
            res.status(400).json({
                error: error
            })
        })
 })

 app.delete("/api/recipes/:id", (req, res, next) => {
    Recipe.deleteOne({_d: req.params.id}).then( () => {
        res.status(201).json({
            message: "recipe deleted successfully"
        }).catch( (error) => {
            res.status(400).json({
                error: error
            })
        })
    })
 });


 module.exports = app;