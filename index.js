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

// GET /tasks/id: Retorna a tarefa com id correspondente
app.get('/tasks/id/:id',(req, res) => {
  const { id } = req.params;
  let idExist = tasks.find((e) => e.id === id);
  if (!idExist) {
    res.status(404).send('ERRO! Passe um id válido');
    return
  }
  let task = tasks.find((e) =>e.id === id);
  res.send(JSON.stringify(task));
});

// POST /tasks: Cria uma nova tarefa na lista
// EXEMPLO DE BODY PARA O POST
  // {
  //   "title": "olá",
  //   "description": "dizer olá",
  //   "completed": true
  // }
  app.post('/tasks', (req, res) => {
    let idExist = tasks.find((e) => e.id === req.body.id);
    if (!req.body.title) {
      res.status(404).send('ERRO! Passe um título para a task!');
      return
    }
    // Cria a nova task com os dados do body
    newTask = {
      id: validId(),
      title: req.body.title,
      description: req.body.description || 'Add a description using put!',
      completed: req.body.completed || false
    }
    tasks.push(newTask);
    res.send(`Task de número ${newTask.id} foi criada com sucesso!`)
  });

// PUT /tasks/id: Atualiza a tarefa com id correspondente
app.put('/tasks/id/:id', (req, res) => {
  const { id } = req.params;
  let idExist = tasks.find((e) => e.id === id);
  if (!idExist) {
    res.status(404).send('ERRO! Passe um id válido');
    return
  }
  let taskIndex = tasks.findIndex((e) => e.id === id);
  tasks[taskIndex] = req.body;
  tasks[taskIndex].id = id;
  res.send(`A task de número ${id} foi alterada com sucesso!`)
})


// DELETE /tasks/id: Remove a tarefa com id correspondente
app.delete('/tasks/id/:id',(req, res) => {
  const { id } = req.params;
  let idExist = tasks.find((e) => e.id === id);
  if (!idExist) {
    res.status(404).send('ERRO! Passe um id válido');
    return
  }
  let taskIndex = tasks.findIndex((e) => e.id === id);
  tasks.splice(taskIndex, 1);
  res.send(`Task de número ${id} foi deletada com sucesso!`)
})