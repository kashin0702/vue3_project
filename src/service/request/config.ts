let BASE_URL = ''

if (process.env.NODE_ENV === 'development') {
  // BASE_URL = 'http://123.207.32.32:8000/'
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://xxxx.com/prod'
} else {
  BASE_URL = 'http://xxxx.com/test'
}

export { BASE_URL }
