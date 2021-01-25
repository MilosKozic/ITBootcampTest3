import axios from 'axios'

const COMPANY_URL = 'https://api.spacexdata.com/v4/company'
const All_SATELITE_URL ='https://api.spacexdata.com/v4/starlink'
const ALL_lAUNCH_URL = 'https://api.spacexdata.com/v4/launches/next'
const ROCKET = 'https://api.spacexdata.com/v4/rockets'

export const getCompany=()=> axios.get(`${COMPANY_URL}`)
export const getAllLaunches=()=> axios.get(`${All_SATELITE_URL}`)
 export const getLaunches = ()=> axios.get(`${ALL_lAUNCH_URL}`)
export  const getRocket =()=>axios.get(`${ROCKET}`)




