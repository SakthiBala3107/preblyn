const errorMiddlerWare = (err, req, res, next) => {
  try {
    // making a copy of the  error obj
    let error = { ...err };

    error.message = err.message;
    console.error(err);

    // common-errors
    // MONGOOSE BAD OBJECTID
    if (err.name === "CastError") {
      const message = "Resource not found";

      error = new Error(message);
      err.statusCode = 404;
    }

    // MONGOOSE DUPLICTAE KEY
    if (err.name === 11000) {
      error = new Error("Duplictae field value entered");
      error.statusCode = 400;
    }

    // validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(","));
      error.statusCode = 400;
    }

    //
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });

    //
  } catch (err) {
    //   if the errors isnt solved or getting new error  pass it to the next error handler
    next(err);
  }
};

export default errorMiddlerWare;
