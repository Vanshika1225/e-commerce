const ErrorMessage = (res, error, statusCode) => {
  console.log(error);
  res.status(statusCode).json({
    error,
  });
};

export default ErrorMessage;
