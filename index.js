var express = require('express')
  , exec = require('child_process').exec;

var githubIPs = ['127.0.0.1', '207.97.227.253', '50.57.128.197', '108.171.174.178'];

module.exports.port = 8855;
module.exports.cmd = '';

module.exports.start = function() {
  var app = express();
  var port = module.exports.port;
  var cmd = module.exports.cmd;
  app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(function(req, res, next) {
      if (githubIPs.indexOf(req.ip) === -1) {
        return res.send('Request does not come from a known Github IP.');
      }

      exec(cmd, function(err, stdout, stderr) {
        if(err) return next(err);
        console.log(stdout);
        console.log(stderr); 
        res.send('Hook executed!');
      });
    });
    app.use(express.errorHandler());
  });

  app.listen(port, function() {
    console.log('Nodehook listening on port ' + port);          
  });
}
