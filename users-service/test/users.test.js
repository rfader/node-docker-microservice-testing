const expect = require('chai').expect;
const sinon = require('sinon');
const request = require('request');

const users = require('../users');

const sandbox = sinon.sandbox.create();

describe('Users', () => {
    let req, res, next;

    beforeEach(() => {
       sandbox.stub(request, 'get').yields(null, { statusCode: 200 }, null);

        req = {
            get: (name) => {
                if (name === 'Authorization') return 'authToken';
                return null;
            }
        };
        res = {
            status: function() {
                return this;
            },
            send: function() {
                return this;
            }
        };
        next = sandbox.stub();

        sinon.spy(res, 'status');
        sinon.spy(res, 'send');
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('return users', () => {

        const query = sandbox.stub().yields(null, [{ id: 1, name: 'John' }]);

        users({ query })(req, res, next);

        expect(query.calledOnce).to.be.true;
        expect(res.status.calledOnce).to.be.true;
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.status.calledWith(300)).to.be.false;
        expect(res.send.calledOnce).to.be.true;
        expect(res.send.calledWith([{ id: 1, name: 'John' }])).to.be.true;
        expect(res.send.calledWith([{ id: 1, name: 'Jane' }])).to.be.false;
        expect(next.called).to.be.false;
    });
});
