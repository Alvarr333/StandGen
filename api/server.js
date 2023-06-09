const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

mongoose.connect("mongodb://127.0.0.1:27017/mern-standgen", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("DB Connected!"))
    .catch(console.error);

const StandGen = require('./models/standgen');

app.get("/standgen", async (req, res) => {
    const stand = await StandGen.find();
    console.log(req.body);
    res.json(stand);
});

app.get("/standgen/:id", async (req, res) => {
    const stand = await StandGen.findById(req.params.id);
    res.json(stand);
  });
  

app.post('/standgen/new', (req, res) => {
    const stand = new StandGen({
        user: req.body.user,
        personality: req.body.personality,
        name: req.body.name,
        appereance: req.body.appereance,
        standAbility: req.body.standAbility,
        power: req.body.power,
        speed: req.body.speed,
        range: req.body.range,
        durability: req.body.durability,
        precision: req.body.precision,
        potential: req.body.potential
    });

    stand.save();

    res.json(stand);
});

app.delete('/standgen/delete/:id', async (req, res) => {
    const result = await StandGen.findByIdAndDelete(req.params.id);
    res.json(result);
});

app.put('/standgen/update/user/:id', async (req, res) => {
    const stand = await StandGen.findById(req.params.id);
    stand.user = req.body.user;
    stand.save();
    res.json(stand);
});

app.put('/standgen/update/image/:id', async (req, res) => {
    const stand = await StandGen.findById(req.params.id);
    stand.image = req.body.image;
    stand.save();
    res.json(stand);
});

app.put('/standgen/update/personality/:id', async (req, res) => {
    const stand = await StandGen.findById(req.params.id);
    stand.personality = req.body.personality;
    stand.save();
    res.json(stand);
});

app.put('/standgen/update/name/:id', async (req, res) => {
    const stand = await StandGen.findById(req.params.id);
    stand.name = req.body.name;
    stand.save();
    res.json(stand);
});

app.put('/standgen/update/appereance/:id', async (req, res) => {
    const stand = await StandGen.findById(req.params.id);
    stand.appereance = req.body.appereance;
    stand.save();
    res.json(stand);
});

app.put('/standgen/update/standAbility/:id', async (req, res) => {
    const stand = await StandGen.findById(req.params.id);
    stand.standAbility = req.body.standAbility;
    stand.save();
    res.json(stand);
});

app.put('/standgen/update/stats/:id', async (req, res) => {
    const stand = await StandGen.findById(req.params.id);
    stand.power = req.body.power;
    stand.speed = req.body.speed;
    stand.range = req.body.range;
    stand.durability = req.body.durability;
    stand.precision = req.body.precision;
    stand.potential = req.body.potential;
    
    stand.save();
    res.json(stand);
});


app.listen(3001, () => console.log("Server running on port 3001"));