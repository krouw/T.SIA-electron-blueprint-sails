/**
 * AuthController
 * @description :: Server-side logic for manage user's authorization
 */
var passport = require('passport');
/**
 * Triggers when user authenticates via passport
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} error Error object
 * @param {Object} admin User profile
 * @param {Object} info Info if some error occurs
 * @private
 */
	function _onPassportAuth(req, res, error, admin, info) {
	  if (error) return res.serverError(error);
	  if (!admin) return res.unauthorized(null, info && info.code, info && info.message);

	  return res.ok({
	    // TODO: replace with new type of cipher service
	    token: CipherService.createToken(admin),
	    admin: admin
	  });
	}

	module.exports = {
	  /**
	   * Sign up in system
	   * @param {Object} req Request object
	   * @param {Object} res Response object
	   */
	  signup: function (req, res) {
	    Admin
	      .create(_.omit(req.allParams(), 'id'))
	      .then(function (admin) {
	        return {
	          // TODO: replace with new type of cipher service
	          token: CipherService.createToken(admin),
	          admin: admin
	        };
	      })
	      .then(res.created)
	      .catch(res.serverError);
	  },

	  /**
	   * Sign in by local strategy in passport
	   * @param {Object} req Request object
	   * @param {Object} res Response object
	   */
	  signin: function (req, res) {
	    passport.authenticate('local',
	      _onPassportAuth.bind(this, req, res))(req, res);
	  },
		logout: function (req,res){
			req.logout();
			res.json(200,{action: 'AUTH_LOGOUT'});

		}
};
