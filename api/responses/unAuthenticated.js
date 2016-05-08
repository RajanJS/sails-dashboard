/**
 * Created by rajan on 5/8/16.
 */

module.exports = function unAuthenticated(){
  var res = this.res;

  res.status(401);
  res.redirect('/signin');
}
