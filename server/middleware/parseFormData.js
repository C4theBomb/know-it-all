const formidable = require("formidable");

function parseFormData(req, res, next) {
    const form = formidable();

    form.parse(req, (err, fields, files) => {
        req.body = fields;
        req.files = files;
        return next();
    });
}

module.exports = parseFormData;
