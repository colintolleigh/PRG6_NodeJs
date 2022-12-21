//Notes router
const express = require("express");

const router = express.Router();

// Create a SomeModel model just by requiring the module
const Jdm = require("../models/jdmModel");
// const {application} = require("express");


//middleware checks content-type
router.get("/", (req, res, next) => {
    if(req.header("Accept") === "application/json"){
        next();
    } else {
        res.status(415).send();
    }
});


// //creates a route /
// router.get("/", async (req, res) => {
//     console.log("GET");
//
//     try {
//         let jdms = await Jdm.find();
//
//         //Create representation for collection as requested in assignment
//         // Items, _links, pagination
//
//         let jdmCollection = {
//             items: jdms,
//             _links: {
//                 self: {
//                     href: `${process.env.BASE_URI}jdms/`
//                 },
//                 collection: {
//                     href: `${process.env.BASE_URI}jdms/`
//                 },
//             },
//             pagination: "word nog gedaan"
//         }
//
//         res.status(200).json(jdmCollection);
//     } catch {
//         // No respond from DB
//         res.status(500).send
//     }
// });


// Create route / get
router.get("/", async (req, res) => {
    console.log("GET");

    if(req.header('Accept') !== "application/json"){
        res.status(415).send();
    }

    try {
        let jdms = await Jdm.find();

        let jdmCollection = {
            items: jdms,
            _links: {
                self: {
                    href: `${process.env.BASE_URI}jdms/`
                },
                collection: {
                    href: `${process.env.BASE_URI}jdms/`
                }
            },
            pagination: "MOET NOG INVULLEN"
        }

        res.json(jdmCollection);
    } catch {
        res.status(500).send();
    }
})


//Create route for the details
router.get("/:id", async(req, res) => {
    try {

        let jdm = await Jdm.findById(req.params.id)
        if (jdm == null) {
            res.status(404).send();
        } else {
            res.json(jdm);
        }
    } catch {
        res.status(415).send();
    }
})


// Middleware checks the header content-type in post
router.post("/", async(req, res, next) => {
    console.log("Middleware header check for content type")
    if (req.header ("Content-Type") !== "application/json" && req.header("Content-Type") !== "application/x-www-form-urlencoded") {
        res.status(400).send();
    } else {
        next();
    }
});


// Middleware for empty values
router.post("/", async (req, res, next) => {
    console.log("Middleware checks for empty value in post")
    if(req.body.brand && req.body.model && req.body.engine){
        next();
    } else{
        res.status(400).send();
    }
});


//creates a route for the post/
router.post("/", async (req, res) => {
    console.log("POST");

    //Info hier moet uit de request /
    let jdm = Jdm({
        brand: req.body.brand,
        model: req.body.model,
        engine: req.body.engine
    })

    try {
        await jdm.save();
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
});

//middleware for headers in put
router.put("/:_id", async (req, res, next) => {
    console.log("Middleware to check content type for post")
    if(req.header("Content-Type") !== "application/json" && req.header("Content-Type") !== "application/x-www-form-urlencoded"){
        res.status(400).send();
    } else{
        next();
    }
})

//middleware against empty values in the put
router.put("/:_id", async (req, res, next) => {
    console.log("PUT Middleware checks empty values for POST")
    if(req.body.brand && req.body.model && req.body.engine){
        next();
    } else{
        res.status(400).send();
    }
})


router.put("/:_id", async (req, res) => {

    let jdm = await Jdm.findOneAndUpdate(req.params,
        {
            brand: req.body.brand,
            model: req.body.model,
            engine: req.body.engine
        })

    try {
        jdm.save();
        res.status(203).send();
    } catch {
        res.status(500).send();
    }
})


//creates a route for delete /
router.delete("/:_id", async (req, res) => {
    try {
        await Jdm.findByIdAndDelete(req.params._id);

        res.status(204).send();
    } catch {
        res.status(404).send();
    }
    // console.log("DELETE");
    // res.send("Hello World");
});


//creates a route for options /
router.options("/", (req, res) => {
    console.log("OPTONS");
    res.setHeader('Allow', "GET, POST, OPTIONS");
    res.send("");
});


// options for detail: OPTIONS /id
router.options("/:_id", async (req, res) => {
    res.set({
        'Allow': 'GET, PUT, DELETE, OPTIONS'
    }).send();
})

module.exports = router;
