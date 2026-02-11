export const ok = (body) => {
  return {
    success: true,
    statusCode: 200,
    body: body,
  };
};

export const notFound = () => {
  return {
    success: true,
    statusCode: 404,
    body: "Not found",
  };
};

export const serverError = (error) => {
  return {
    success: true,
    statusCode: 500,
    body: error,
  };
};
