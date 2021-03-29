import axios from 'axios';

axios.defaults.baseURL = 'https://uxcandy.com/~shapoval/test-task-backend/v2';
axios.defaults.headers.get['Accept'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'multipart/form-data';