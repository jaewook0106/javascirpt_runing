import Vue from 'vue'
import VueRouter from 'vue-router'
import {NavData} from '../util/data.js'
import Home from '../components/Home'
import Chapter01 from '../components/Chapter01'
import Chapter02 from '../components/Chapter02'
import Chapter03 from '../components/Chapter03'
import Chapter04 from '../components/Chapter04'
import NotFound from '../components/NotFound'


const routerDataArr = [
  {
    componentName:Chapter01
  },
  {
    componentName:Chapter02
  },
  {
    componentName:Chapter03
  },
  {
    componentName:Chapter04
  }
]


const routerData = function(routerDataArr,NavData,homeIn){
  const dataList = [];

  if(homeIn === true){
    dataList.push({path:'/', component: Home})
  }
 
  routerDataArr.forEach( (item,idx) => {
    const objList = {};

    objList.path = NavData[idx].linkName;
    objList.component = item.componentName;
    objList.name = NavData[idx].navName;
    dataList.push(objList);
    // routerList[idx].path = ''
    // routerList.push({"path:'" + item +"/'" , component: Home}
  });
  dataList.push({path:'/404', component: NotFound, name: '404'})
  dataList.push({path:'*', redirect:{name:'404'}})
  console.log(dataList)
  return dataList
}

Vue.use(VueRouter)

const router = new VueRouter({
  mode:'history',
  routes: routerData(routerDataArr,NavData,true),
  linkExactActiveClass:'exact_active',
  linkActiveClass:'active'
})

export default router



