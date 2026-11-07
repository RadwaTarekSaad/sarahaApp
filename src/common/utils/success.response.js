export const successResponse = ({
  statusCode = 200,
  message = "Done",
  data = {},
  res
} = {}) => {
  return res.status(statusCode).json({ message, data });
};
