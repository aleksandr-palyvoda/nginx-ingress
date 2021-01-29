exports.handle = (req, res) => {
    res.status(404).send({
        code: 404,
        message: 'Not found'
    });
};