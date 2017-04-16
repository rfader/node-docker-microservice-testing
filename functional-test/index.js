const { expect } = require('chai');
const request = require('request');


describe('Users', () => {
    it('return users', (done) => {

        request.get({
            url: 'http://users_service:3000/users',
            headers: {
                Authorization: 'authToken'
            },
            json: true
        }, (error, response, body) => {
            expect(error).to.not.exist;
            expect(response.statusCode).to.equal(200);

            expect(body).to.have.lengthOf(2);
            expect(body[0].id).to.equal(1);
            expect(body[0].name).to.equal('john');
            expect(body[1].id).to.equal(2);
            expect(body[1].name).to.equal('jane');

            done();
        });
    });
});
