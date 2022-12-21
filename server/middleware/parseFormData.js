const formidable = require('formidable');

function parseFormData(req, res, next) {
    // Parse multipart form data into formidable object and set static file save location
    const form = formidable();
    form.uploadDir = `${__dirname}/../public/`;

    form.parse(req, (err, fields, files) => {
        req.body = fields;
        req.files = files;
        return next();
    });
}

module.exports = parseFormData;
