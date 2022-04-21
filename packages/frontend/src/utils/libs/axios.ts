import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI
const airAxios = axios.create({
  baseURL,
})


const errorCallback = (err: any) => {
  return err
}

const responseCallback = (response: any): any => response

airAxios.interceptors.response.use(responseCallback, errorCallback)
export default airAxios
