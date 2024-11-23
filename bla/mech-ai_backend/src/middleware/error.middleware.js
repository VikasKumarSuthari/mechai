const errorHandler = (err, req, res, next) => {
    // Determine status code, default to 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
    // Detailed error response
    res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
      errors: err.errors || null,
      timestamp: new Date().toISOString(),
      path: req.originalUrl
    });
  };
  
  // 404 Not Found Middleware
  const notFoundHandler = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  export {
    errorHandler,
    notFoundHandler
  };