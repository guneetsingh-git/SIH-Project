function getApiInfo(_request, response) {
  response.status(200).json({
    name: 'Smriti Setu API',
    version: 'v1',
    endpoints: {
      health: 'GET /health',
    },
  });
}

module.exports = { getApiInfo };
