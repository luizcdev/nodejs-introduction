const Project = require('./project.js');
const express = require('express');



const server = express();
server.use(express.json());

const projects = [];
var requisicoes = 0;


function checkProjectIdIsInArray(req, res, next) {
 
  let {id} = req.params;

  let project = projects.find(e => {
    return e.id == id;
  });

  if (project) {
    req.project = project;
    return next();
  } else
    return res.status(400).json({error: 'Project does not exists'});

}

server.use((req, res, next) =>{
  requisicoes += 1;
  console.log(`Requisições realizadas: ${requisicoes}`);

  return next();
})


server.get('/projects', (req, res) => {
  return res.json(projects);
})


server.post('/projects', (req, res) => {

  let { id, title } = req.body;
  let project = new Project(id, title);
  
  projects.push(project);

  return res.send();

})


server.put('/projects/:id', checkProjectIdIsInArray, (req, res) => {

  let { id } = req.params;
  let { title } = req.body;

  req.project.title = title;

  return res.send();

})


server.post('/projects/:id/tasks', checkProjectIdIsInArray, (req, res) => {

  let { title } = req.body;
  
  req.project.tasks.push(title);

  return res.send();

})


server.delete('/projects/:id', checkProjectIdIsInArray, (req, res) => {

  let i = projects.indexOf(req.project);
  projects.splice(i, 1);

  return res.send();

})


server.listen(3000);