import axios from 'axios'
import router from '../router'


// const request = (method, url, data) =>{
//   return axios({
//     method,
//     url: DOMAIN + url,
//     data
//   }).then(result => result.data)
//     .catch(result => {
//       const{status} = result.response
//       console.log('status',status);

//       if(status === UNAUTHORIZED) return onUnauthrorized(result)
//       throw result
//     })
// }

const request = (mehod,url,data) =>{
  return axios({
    mehod,
    url: url,
    data
  }).then(response => {
    return response
  }).catch(ex => {
    console.log('err', ex)
    alert('호출 실패')
    throw ex
  })    
}

export const contactData = {
  contact(name){
    const url = 'http://sample.bmaster.kro.kr/contacts_long/search/' + name
    return request('get',url)
  }
}