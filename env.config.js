// 环境配置
const envs = [
  {
    name: 'localhost',
    publicPath: '/api/conweb/',
    api: 'http://127.0.0.1:8000/api/v0/',
  },
  {
    name: 'test.aicaring.com',
    publicPath: '/api/conweb/',
    api: 'http://test.aicaring.com/api/v0/',
  },
  {
    name: '47.104.132.173',
    publicPath: '/api/conweb/',
    api: 'http://test.aicaring.com:9997/ring/',
  },
  {
    name: 'aicaring.com',
    publicPath: '/api/conweb/',
    api: 'https://api.aicaring.com/api/v0/',
  },
  {
    name: 'www.aicaring.com',
    publicPath: '/api/conweb/',
    api: 'https://www.aicaring.com/prerelease/ring/',
  },
]

export default {
  envName: 'VITE_BASE_ENV',
  cli: 'vite',
  envs,
}

