const e = require("express");
const express = require("express");

const app = express();

app.use(express.json());

app.listen(8080, () => {
  console.log("O server está ativo na porta 8080");
});

// Declaração do banco de tasks
let tasks = [
  {
    id: '00001',
    title: 'louça',
    description: 'Lavar a louça',
    completed: false
  },
  {
    id: '00002',
    title: 'estudos',
    description: 'Estudar JavaScript',
    completed: true
  }
];

// FUNÇÃO PARA GERAR ID
let createId = () => {
  let id = ''
  for(i = id.length; i < 5; i++){
    id += (Math.floor(Math.random() * 9)).toString();
  }
  return id;
}
// FUNÇÃO VERIFICA ID REPETIDO RETORNANDO UM ID VALIDO
let validId = () => {
  let newId = createId();
  while (tasks.find((e)=>e.id === newId)) {
    newId = createId();
  }
  return newId;
}

// GET /tasks: Retorna todas as tarefas da lista
app.get('/tasks', (req, res) => {
  res.send(JSON.stringify(tasks))
});
