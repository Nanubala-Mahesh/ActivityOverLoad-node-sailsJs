/**
 * TaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  // Create a task
  create(req,res) {
    
    Task.create({
      name : req.param('name') 
    }).fetch()
    .then( task => { res.ok(task) })
    .catch( err => res.serverError(err) );
  },

  // find all the tasks
  find(req, res) {
    Task.find()
      .then(tasks => res.ok(tasks))
      .catch( err => res.serverError(err) );
  },

  // delete a task
  delete(req, res){
    Task.destroy({
      id: req.params.id
    })
    .then((task) => res.ok(task))
    .catch( err => res.serverError(err) );
  },

  // update a task
  update(req, res){    

    let attributes = {};
    
    if (req.param('name')){
      attributes.name = req.param('name')
    }
    if (req.param('qty')){
      attributes.qty = req.param('qty')
    }
    Task.update({
      id : req.params.id
    }).set({name: attributes.name })
    .fetch()
    .then(tasks => {
      res.ok(tasks);
    })
    .catch( err => res.serverError(err));
  },

  // get a single task
  show(req,res){
    Task.findOne({
      id: req.params.id
    })
    .then((task) => res.ok(task))
    .catch(err => res.serverError(err))
  }
};

