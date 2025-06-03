import _axios from 'axios'
import toast from 'react-hot-toast'

const axios = (baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}api/v1`, method = 'POST') => {
  const instance = _axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
    baseURL,
    method,
    timeout: 30000,
    responseType: 'json',
  })

  return instance
}

const handleCatchError = (err) => {
  if (err.response.status === 500) {
    toast.error('伺服器錯誤')
  } else if (err.response) {
    toast.error(err.response.data.message)
  } else {
    toast.error(`${err.code} ${JSON.stringify(err)}`)
  }

  return err
}

const axs = (apiName, payload, method) =>
  // eslint-disable-next-line no-undef
  new Promise((resolve, reject) => {
    axios()({
      url: apiName,
      data: payload,
      method,
    })
      .then((data) => {
        const { code, message } = data.data
        if (code === 0) {
          resolve(data.data)
        } else {
          toast.error(message)
          reject(message)
        }
      })
      .catch((error) => {
        reject(handleCatchError(error))
      })
  })

export default axios
export { axs }
