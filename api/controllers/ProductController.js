/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  // Create a product
  create(req,res) {
    
    Product.create({
      name : req.param('name'),
      qty: req.param('qty') 
    }).fetch()
    .then( product => { res.ok(product) })
    .catch( err => res.serverError(err) );
  },

  // find all the products
  find(req, res) {
    Product.find()
      .then(products => res.ok(products))
      .catch( err => res.serverError(err) );
  },

  // delete a product
  delete(req, res){
    Product.destroy({
      id: req.params.id
    })
    .then((product) => res.ok(product))
    .catch( err => res.serverError(err) );
  },

  // update a product
  update(req, res){    

    let attributes = {};
    
    if (req.param('name')){
      attributes.name = req.param('name')
    }
    if (req.param('qty')){
      attributes.qty = req.param('qty')
    }
    Product.update({
      id : req.params.id
    }).set({name: attributes.name })
    .fetch()
    .then(products => {
      res.ok(products);
    })
    .catch( err => res.serverError(err));
  },

  // get a single product
  show(req,res){
    Product.findOne({
      id: req.params.id
    })
    .then((product) => res.ok(product))
    .catch(err => res.serverError(err))
  }

};

