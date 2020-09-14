import request from '@/utils/request'
// import qs from 'qs'

export function getListHomepage(data) {
  return request.service({
    url: 'http://121.36.73.246:9004/api/http/GetEmissionCostParm',
    method: 'GET',
    params: data
  })
}
