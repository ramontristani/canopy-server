var should = require('chai').should()
	, expect = require('chai').expect
	, supertest = require('supertest')
	, api = supertest('http://localhost:1337');

var invalidCredentials = { email: 'publicuser@canopyserver.com', secret: 'canop' };
var invalidAccount = { email: 'user@something.com', secret: 'test' };
var credentials = { email: 'publicuser@canopyserver.com', secret: 'canopy' };
var epUrl = '/api/v1/users/authentication';
var loginAttempts = [1, 2, 3, 4, 5];

describe('User API', function () {
	describe('Authentication Endpoint', function () {
		it('should return a 200 response when invoked', function (done) {
			api.get('/api/v1/users/authentication')
				.set('Accept', 'application/json')
				.expect(200, done);
		});

		it('should accept a credentials object', function (done) {
			api.post('/api/v1/users/authentication')
				.send(credentials)
				.set('Accept', 'application/json')
				.expect(200, done);
		});

		it('should return an user object', function (done) {
			api.post(epUrl)
				.send(credentials)
				.set('Accept', 'application/json')
				.expect(200)
				.end(function (error, response) {
					var result = response.body;

					describe('User Object Properties', function () {
						it('should be an object', function () {
							expect(result).to.be.an('object');
						});

						it('should contain "email" property that is not null or empty', function () {
							expect(result).to.have.property('email');
							expect(result.email).to.not.be.null;
							expect(result.email).to.not.be.empty;
						});

						it('should contain a "displayname" property that is not null or empty', function () {
							expect(result).to.have.property('displayname');
							expect(result.displayname).to.not.be.null;
							expect(result.displayname).to.not.be.empty;
						});

						it('should contain a "token" property that is not null or empty', function () {
							expect(result).to.have.property('token');
							expect(result.token).to.not.be.null;
							expect(result.token).to.not.be.empty;
						});
					});

					done();
				});
		});

		it('should return an error object when account is not found', function (done) {
			api.post(epUrl)
				.send(invalidAccount)
				.end(function (error, response) {
					var result = response.body;

					describe('Account not found error testing', function () {
						it('server error should not be null', function () {
							expect(error).to.not.be.null;
						});

						it('response body should be an object', function () {
							expect(result).to.be.an('object');
						});

						it('response body should have an "error" property that is not null and contain relevant messaging', function () {
							expect(result).to.have.property('error');
							expect(result.error).to.not.be.null;
							expect(result.error).to.not.be.empty;
							expect(result.error).to.equal('Account not found');
						});
					});

					done();
				});
		});

		loginAttempts.forEach(function (attempt) {
			it('Attempt: ' + attempt + ': ' + 'should fail login attempts with wrong credentials', function (done) {
				api.post(epUrl)
					.send(invalidCredentials)
					.end(function (error, response) {
						var result = response.body;
						describe('Invalid account credentials error testing', function () {
							it('server error should not be null', function () {
								expect(error).to.not.be.null;
							});

							it('response body should be an object', function () {
								expect(result).to.be.an('object');
							});

							it('response body should have an "error" property that is not null and contain relevant messaging', function () {
								expect(result).to.have.property('error');
								expect(result.error).to.not.be.null;
								expect(result.error).to.not.be.empty;
								expect(result.error).to.equal('Invalid account credentials');
							});
						});

						done();
					});
			});
		});

		it('should lock account after 5 consecutive failed login attempts', function (done) {
			api.post(epUrl)
				.send(credentials)
				.end(function (error, response) {
					var result = response.body;
					describe('Locked account testing', function () {
						it('server error object should not be null', function () {
							expect(error).to.not.be.null;
						});

						it('response body should be an object', function () {
							expect(result).to.be.an('object');
						});

						it('response body should have an "error" property that is not null and contain relevant messaging', function () {
							expect(result).to.have.property('error');
							expect(result.error).to.not.be.null;
							expect(result.error).to.not.be.empty;
							expect(result.error).to.equal('Account locked');
						});
					});
				});

			done();
		});

	});
});