/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  // // Create a user
  // create(req,res) {

  //   // console.log('************************',  req.param('email'));
  //   // console.log('************************',  req.param('password'));
  //   // console.log('************************',  req.param('tasks'));
    
  //   User.create({
  //     email: req.param('email'),
  //     password: req.param('password'),
  //     tasks: req.param('tasks')
  //   }).fetch()
  //   .then( user => { res.ok(user) })
  //   .catch( err => res.serverError(err) );
  // },

  // // find all the users
  // find(req, res) {
  //   User.find().populate('tasks')
  //     .then(users => res.ok(users))
  //     .catch( err => res.serverError(err) );
  // },

  // // delete a user
  // delete(req, res){
  //   User.destroy({
  //     id: req.params.id
  //   })
  //   .then((user) => res.ok(user))
  //   .catch( err => res.serverError(err) );
  // },

  // // update a user
  // update(req, res){    

  //   let attributes = {};
    
  //   if (req.param('email')){
  //     attributes.email = req.param('email')
  //   }
  //   if (req.param('qty')){
  //     attributes.qty = req.param('qty')
  //   }
  //   User.update({
  //     id : req.params.id
  //   }).set({email: attributes.email })
  //   .fetch()
  //   .then(users => {
  //     res.ok(users);
  //   })
  //   .catch( err => res.serverError(err));
  // },

  // // get a single user
  // show(req,res){
  //   User.findOne({
  //     id: req.params.id
  //   }).populate('tasks')
  //   .then((user) => res.ok(user))
  //   .catch(err => res.serverError(err))
  // }


};

