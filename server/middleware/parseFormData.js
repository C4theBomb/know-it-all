const formidable = require('formidable');

function parseFormData(req, res, next) {
    var form = formidable();
    form.uploadDir = `${__dirname}/../public/`;

    form.parse(req, (err, fields, files) => {
        req.body = fields;
        req.files = files;
        return next();
    });
}

module.exports = parseFormData;
