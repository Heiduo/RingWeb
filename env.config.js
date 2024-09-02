// 环境配置
const envs = [
  {
    name: 'localhost',
    publicPath: '/api/conweb/',
    api: 'http://127.0.0.1:8000/donni/v1/',
  },
  {
    name: 'test.aicaring.com',
    publicPath: '/api/conweb/',
    api: 'http://test.aicaring.com/donni/v1/',
  },
  {
    name: '47.104.132.173',
    publicPath: '/api/conweb/',
    api: 'http://test.aicaring.com:9997/donni/v1/',
  },
  {
    name: 'aicaring.com',
    publicPath: '/api/conweb/',
    api: 'https://api.aicaring.com/donni/v1/',
  },
  {
    name: 'www.aicaring.com',
    publicPath: '/api/conweb/',
    api: 'http://api.aicaring.com/donni/v1/',
  },
]

export default {
  envName: 'VITE_BASE_ENV',
  cli: 'vite',
  envs,
}

