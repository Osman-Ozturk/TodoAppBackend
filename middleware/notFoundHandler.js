const notFoundHandler = (req, res, next) => {
        const error = new Error("Diesen Endpunkt gibt es nicht.");
        error.statusCode = 404;
        next(error);
      };
      
      export default notFoundHandler;