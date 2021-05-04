export default function promiseMiddleware() {
  return function (next) {
    return function (action) {
      const { promise, type, ...rest } = action;

      if (!promise || typeof promise.then !== "function") {
        return next(action);
      }
      const SUCCESS = `${type}_SUCCESS`;
      const FAILURE = `${type}_FAILURE`;
      const REQUEST = `${type}_REQUEST`;

      next({ type: REQUEST, ...rest });

      return promise
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          return next({ type: SUCCESS, payload: data, ...rest });
        })
        .catch((err) => {
          return next({ type: FAILURE, err, ...rest });
        });
    };
  };
}
