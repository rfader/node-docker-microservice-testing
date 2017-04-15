const expect = require('chai').expect;
const sinon = require('sinon');

const db = require('../../db');
const stubServer = require('../stub-server.js');
const users = require('../../users');
const sandbox = sinon.sandbox.create();
let connection;

describe('Users', () => {
    let req, res, next;

    before(() => {
        connection = db({
            host: 'users_mysql',
            database: 'database_development',
            user: 'root',
            password: 'root-password',
            port: '3306'
        });

        connection.query([
            'CREATE TEMPORARY TABLE users (',
            '`id` int(11) unsigned NOT NULL AUTO_INCREMENT,',
            '`name` varchar(255),',
            'PRIMARY KEY (`id`)',
            ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'
        ].join('\n'));

        connection.query('INSERT INTO users SET ?? = ?, ?? = ?', ['id', 1, 'name', 'john']);
        connection.query('INSERT INTO users SET ?? = ?, ?? = ?', ['id', 2, 'name', 'jane']);

        return stubServer(3001);
    });

    beforeEach(() => {
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
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('return users', (done) => {
        res.send = (body) => {
            expect(res.status.calledOnce).to.be.true;
            expect(res.status.calledWith(200)).to.be.true;

            expect(body).to.have.lengthOf(2);
            expect(body[0].id).to.equal(1);
            expect(body[0].name).to.equal('john');
            expect(body[1].id).to.equal(2);
            expect(body[1].name).to.equal('jane');

            expect(next.called).to.be.false;
            done();
        };
        users(connection)(req, res, next);

    });
});
