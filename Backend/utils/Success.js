const Success = (res, statusCode, data) => {
  res.status(statusCode).json({
    data,
  });
};

export default Success;
