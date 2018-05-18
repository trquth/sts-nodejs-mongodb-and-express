const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(done => {
    mongoose.connect('mongodb://localhost/users_test');
    mongoose.connection
        .then((db) => done())
        .catch((err) => done(err));
})


beforeEach((done) => {
    mongoose.connection
        .collections
        .users.drop(() => {
            done()
        })
})