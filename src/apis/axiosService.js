import axios from 'axios';

class AxiosService {
  constructor() {
    const instance = axios.create({
      headers: {
        'Authorization': 'Bearer 221bb48deb17d17527143b584356c83b2df210492660a99cf0e6020a58330a10'
      }
    }
    );
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.instance = instance;
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    return Promise.reject(error);
  }

  get(url) {
    return this.instance.get(url);
  }

  post(url, body) {
    return this.instance.post(url, body);
  }

  put(url, body) {
    return this.instance.put(url, body);
  }

  delete(url) {
    return this.instance.delete(url);
  }
}

export default new AxiosService();
