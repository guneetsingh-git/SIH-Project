function getHealth(_request, response) {
  response.status(200).json({
    status: 'ok',
    service: 'smriti-setu-api',
    timestamp: new Date().toISOString(),
  });
}

module.exports = { getHealth };
