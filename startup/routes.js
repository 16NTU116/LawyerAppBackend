const express = require('express');
// const genres = require('../routes/genres');
const customer = require('../routes/customer');
const lawyerPost = require('../routes/lawyerPosts');
const complaint = require('../routes/complaint');
const chat = require('../routes/chat');
const cuser = require('../routes/users');
const luser = require('../routes/lusers');
const order = require('../routes/orders');
const auth = require('../routes/auth');
const lawyerAuth = require('../routes/lawyerAuth');
const checkToken = require('../middlewares/auth');
const err = require('../middlewares/error');

module.exports = function (app) {
    app.use(express.json());
    app.use(express.static('uploads'))
    // app.use('/api/genres', genres);
    app.use('/api/clientpost', customer);
    app.use('/api/lawyerpost', lawyerPost);
    app.use('/api/complaint', complaint);
    app.use('/api/order', order);
    app.use('/api/chat', chat);
    app.use('/api/clientusers', cuser);
    app.use('/api/lawyerusers', luser);
    app.use('/api/auth', auth);
    app.use('/api/lauth', lawyerAuth);
    app.use(err);
}