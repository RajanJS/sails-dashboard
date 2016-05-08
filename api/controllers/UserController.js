/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require( 'passport' );

module.exports = {
  signin: function (req, res) {
    passport.authenticate( 'local', function (err, user, info) {
      if ((err) || (!user)) {
        res.status( 403 );
        return res.send( {message: info.message} );
      }
      req.session.authenticated = true;
      res.status( 200 );
      return res.send( {message: info});
    } )( req, res );
  }
};

