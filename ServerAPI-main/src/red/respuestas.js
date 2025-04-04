exports.success = function (req, res, status = 200, msg = '') {
  res.status(status).send({
    status: status,
    error: false,
    body: msg,
    severity: 'success'
  });
};

exports.error = function (req, res, status = 500, msg = '') {
  res.status(status).send({
    status: status,
    error: true,
    body: msg,
    severity: 'error'
  });
};
