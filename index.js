const express = require("express");
const { json } = require("express/lib/response");
const fs = require("fs/promises");
const path = require("path")

const filePath = path.normalize(__dirname + '/db/users.json')

const app = express();
app.listen(5000, () => console.log('Serever is runnig on the port 5000'));

app.get('/users', async (req, res) => {
    try {
        const users = JSON.parse(await fs.readFile(filePath));
        res.json(users);
    } catch (e) {
        res.json({ error: e.message })
    }

})
app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const users = JSON.parse(await fs.readFile(filePath));

        const user = users.filter((user) => user.id === id);
        res.json(user);
    } catch (e) {
        res.json({ error: e.message });
    }
})

// app.post('/users', (req, res) => { })
// app.put('/users/:id', (req, res) => { })

// app.delete('/users/:id', (req, res) => { })