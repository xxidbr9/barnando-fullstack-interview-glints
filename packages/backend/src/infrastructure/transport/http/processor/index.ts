export const okResp = (data: any, message?: string, status = 200) => ({
  status: status,
  message: message || 'Success',
  data
});
