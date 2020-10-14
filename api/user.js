import request from '@/utils/request'
import proxy from '@/utils/proxy'
// import qs from 'qs'

export function getListHomepage(data) {
  return request.service({
    url: proxy.prefix + '/api/http/GetEmissionCostParm',
    method: 'GET',
    params: data
  })
}
