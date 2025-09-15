import { ValidationError } from "sequelize";

const errorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        err.status = 400;
    }
    
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
};

export default errorHandler;