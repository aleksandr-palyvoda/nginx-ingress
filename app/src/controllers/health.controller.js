exports.status = (req, res) => {
    res.status(200).send({
        code: 200,
        message: 'Ok'
    });
};

exports.configs = (req, res) => {
    res.status(200).send({
        code: 200,
        message: JSON.stringify(process.env)
    });
};
