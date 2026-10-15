import axios from 'axios'
import { config } from '@/constants/config.ts'

export const api = axios.create({
  baseURL: config.baseURL,
})
