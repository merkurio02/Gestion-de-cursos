const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { getAll, save, update, deleteOne } = require('./CursoService');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000, () => console.log('Server started on port 3000'));
var index=1;


    

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/cursos', async (req, res) => {
    const cursos=await getAll();
    res.send(cursos);

});

app.post('/curso',async (req, res) => {
    const data = req.body;
    let curso = await save(data);
    res.send(curso);
});
app.put('/curso',async (req, res) => {
    const data = req.body;
    let curso = await update(data);
    res.send(curso);
});


app.delete('/cursos/:id', async(req, res) => {
    const id = req.params.id;
    let curso = await deleteOne(id);
    res.send(curso);
});






