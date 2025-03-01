import axios from 'axios'
export const getAccountByWalletAddress = async (walletAddress: string) => {
  const response = await axios.get('http://34.28.25.142:8080/v1/account/get', { params: { id: walletAddress } })
  return response?.data
}
export const getAccounts = async () => {
  const response = await axios.get('http://34.28.25.142:8080/v1/account/list-accounts')
  return response?.data
}
export const requestAccountCreation = async (walletAddress: string, verifying_key: string) => {
  const response = await axios.post('http://34.28.25.142:8080/v1/account/request-create', {
    id: walletAddress,
    verifying_key,
  })
  return response?.data
}
export const sendAccountCreation = async (walletAddress: string, verifying_key: string, signature: string) => {
  const response = await axios.post('http://34.28.25.142:8080/v1/account/send-create', {
    id: walletAddress,
    verifying_key,
    signature,
  })
  return response?.data
}
export const addKey = async (walletAddress: string, pubKey: string, signature: string) => {
  const response = await axios.post('http://34.28.25.142:8080/v1/account/add-key', {
    id: walletAddress,
    pubKey,
    signature,
  })
  return response?.data
}
export const addData = async (walletAddress: string, data: string, signature: string) => {
  const response = await axios.post('http://34.28.25.142:8080/v1/account/add-data', {
    id: walletAddress,
    data,
    data_signature: signature,
  })
  return response?.data
}
