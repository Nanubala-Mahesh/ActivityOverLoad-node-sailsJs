/**
 * UserProfileController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  update(req, res){        
    let id = req.params.id;//req.body is an object
    let body = _.pick(req.body, ['name', 'picture'])    
    
    UserProfile.update(id).set(body)
    .fetch()
    .then(users => {
      res.ok(users);
    })
    .catch( err => res.serverError(err));
  },


  show(req,res){
    UserProfile.findOne({
      id: req.params.id
    }).populate('user')
    .then((userProfile) => res.ok(userProfile))
    .catch(err => res.serverError(err))
  },


  upload: function (req, res) {

    // console.log(req);
    // console.log( req.file(req.body.avatar)  );
    
    req.file('avatar').upload({
      adapter: require('skipper-s3'),
      key: 'API KEY',
      region: 'us-standard',
      secret: 'SECTER KEY',
      bucket: 'sailsdb'
    }, function whenDone(err, uploadedFiles) {
      
      if (err) return res.serverError(err);
      

      // console.log( '$$$$$$$$$$$$$$$', err   );
      

      return res.ok({
        files: uploadedFiles,
        textParams: req.allParams()
      });
    });
  
  }



};

