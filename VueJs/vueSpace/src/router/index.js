import Vue from 'vue'
import VueRouter from 'vue-router'
import {NavData} from '../util/data.js'
import Home from '../components/Home'
import Chapter01 from '../components/Chapter01'
import Chapter02 from '../components/Chapter02'
import NotFound from '../components/NotFound'


const routerDataArr = [
  {
    componentName:Chapter01
  },
  {
    componentName:Chapter02
  }
]


const routerData = function(routerDataArr,NavData,homeIn){
  const dataList = [];

  if(homeIn === true){
    dataList.push({path:'/Home', component: Home})
  }
 
  routerDataArr.forEach( (item,idx) => {
    const objList = {};

    objList.path = NavData[idx].linkName;
    objList.component = item.componentName;
    dataList.push(objList);
    // routerList[idx].path = ''
    // routerList.push({"path:'" + item +"/'" , component: Home}
  });

  dataList.push({path:'*', component: NotFound})
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



