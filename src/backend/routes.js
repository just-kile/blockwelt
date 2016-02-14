function setup(app, handlers) {
    app.post('/rest/share/upload', handlers.share.upload);
    app.get('/rest/share/:id', handlers.share.get);
}

exports.setup = setup;