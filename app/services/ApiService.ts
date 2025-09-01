import BaseService from './BaseService';

const ApiService = {
  fetchData<Response = unknown, Request = Record<string, unknown>>(
    param: any
  ) {
    return new Promise<any>((resolve, reject) => {
      BaseService(param)
        .then((response: any) => {
          resolve(response);
        })
        .catch((errors: any) => {
          reject(errors);
        });
    });
  },
};

export default ApiService;
