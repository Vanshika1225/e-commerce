const ErrorMessage = (res, error, statusCode) => {
  console.error(error);
  res.status(statusCode).json({
    error,
  });
};

export default ErrorMessage;
