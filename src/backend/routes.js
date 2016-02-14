function setup(app, handlers) {
    app.post('/rest/share/upload', handlers.share.upload);
}

exports.setup = setup;