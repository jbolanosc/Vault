export const errorResponse = (errorMsg: unknown) => {
  const response = {
    message: errorMsg,
    success: false,
  };
  return response;
};

export const successResponse = (successMsg: string, data: any) => {
  const response = {
    message: successMsg,
    success: true,
    data: data,
  };
  return response;
};
