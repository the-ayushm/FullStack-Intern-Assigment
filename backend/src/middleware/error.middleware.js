export const notFound = (request, response) => {
  response.status(404).json({
    success: false,
    message: `Route not found: ${request.originalUrl}`,
  });
};

export const errorHandler = (error, request, response, next) => {
  const statusCode = response.statusCode && response.statusCode !== 200 ? response.statusCode : 500;

  response.status(statusCode).json({
    success: false,
    message: error.message || 'Internal server error',
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
  });
};
