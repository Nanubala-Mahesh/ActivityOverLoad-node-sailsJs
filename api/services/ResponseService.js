module.exports = {
  json: function (status, res, message, data, meta) {
      var response = {
          response: {
              message: message
          }
      };
      console.log('resoponse', response);
      
      if (typeof data !== 'undefined') {
          console.log('responseservice if data undefined');
          response.response.data = data;
      }
      if (typeof meta !== 'undefined') {
        console.log('responseservice if meta undefined');
          response.response.meta = meta;
      }
      return res.status(status).json(response);
  }
};