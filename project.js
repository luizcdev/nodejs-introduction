class Project {

  constructor(id, title, tasks){
    this.id = id;
    this.title = title;
    if (tasks) 
      this.tasks = tasks
    else
      this.tasks = [];
  }
}

module.exports = Project;