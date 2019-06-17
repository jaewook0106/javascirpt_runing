import React, { Component } from 'react'
import './index.scss'
import { TitleBox } from '../../components'
import { korean } from '../../languages'





class NewsList extends Component {

  // myState={id:1}

  // mysetState = (obj) =>{
  //   this.myState = Object.assign(this.myState,obj)
  //   console.log(this.myState)
  //   console.log('render')
  // } 


  

  state = {
    DATA : {
      newsData : [
        { 
          id:1,
          name:'edward.jw',
          title:'edward 세계 1위 기업으로 성장한 배경 강의',
          desc:'어쩌구 저쩌구 성공비법 어쩌구 저쩌구 성공비법 어쩌구 저쩌구 성공비법 어쩌구 저쩌구 성공비법',
          imgSrc:'http://cfile209.uf.daum.net/image/2109813E547FB6D52BED2D',
          imgInfo:'',
          shadow:true,
          link:'https://daum.net'
        },
        { 
          id:2,
          name:'shawn.thecool',
          title:'쫀더꿀에 신기한 개발이야기',
          desc:'어쩌구 저쩌구 성공비법 어쩌구 저쩌구 성공비법 어쩌구 저쩌구 성공비법 어쩌구 저쩌구 성공비법',
          imgSrc:'http://img.danawa.com/images/descFiles/4/465/3464769_1506721322508.jpeg',
          imgInfo:'',
          shadow:true,
          link:''
        },
        { 
          id:3,
          name:'del.ete',
          title:'모든지 할 수 있다 나만의 노하우',
          desc:'어쩌구 저쩌구 성공비법 어쩌구 저쩌구 성공비법 어쩌구 저쩌구 성공비법 어쩌구 저쩌구 성공비법',
          imgSrc:'https://ae01.alicdn.com/kf/HTB186mRRXXXXXcAXFXXq6xXFXXXS/galaxy-sci-fi-24x40.jpg',
          imgInfo:'',
          shadow:true,
          link:'https://naver.com'
        },
        { 
          id:4,
          name:'merlin.ho',
          title:'아 몰랑',
          desc:'어쩌구 저쩌구 성공비법 어쩌구 저쩌구 성공비법 어쩌구 저쩌구 성공비법 어쩌구 저쩌구 성공비법',
          imgSrc:'http://pds26.egloos.com/pds/201502/08/11/d0017711_54d77873087ab.jpg',
          imgInfo:'',
          shadow:false,
          link:''
        },
        { 
          id:5,
          name:'brad.bang',
          title:'빵 만드는 최고의 비법',
          desc:'어쩌구 저쩌구 성공비법 어쩌구 저쩌구 성공비법 어쩌구 저쩌구 성공비법 어쩌구 저쩌구 성공비법',
          imgSrc:'https://c.wallhere.com/photos/56/22/1600x900_px_abstract_nebula_space_Space_Art_TylerCreatesWorlds-784091.jpg!d',
          imgInfo:'',
          shadow:false,
          link:''
        }
      ],
      realData:[]
    },
    
    sliceNum : 1,
    dataDefaultNumber :0,
    dataLength:1,
    
    //셀렉트 숫자 보여지고 싶은 갯수
    selectPagingNum:[1,3,5,10]

    
  }

  componentWillMount(){
    console.log('will')
    const stateData = this.state
    const chunkData = this.chunkEvent(stateData.DATA.newsData,stateData.sliceNum)
    const chunkLength = chunkData.length

    this.setState((state,props)=>{
      state.DATA.realData = chunkData
      state.dataLength = chunkLength

    })

  }

  shouldComponentUpdate(){
    console.log('shouldUpdate')
    return true
  }
  componentDidMount(){

    console.log('did')
    console.log('test did',this.state.dataDefaultNumber)
    console.log('length' , this.state.dataLength)
  }
  componentDidUpdate(){
    console.log('test did update',this.state.dataDefaultNumber)
  }

  componentWillUpdate(){
    console.log('test will update')
  }


  chunkEvent = (DATA,sliceNum)=>{
    const copyData = DATA.slice()
    const chunkData = []
    let i
    let chuckNum = sliceNum
   
    for(i = 0; i < copyData.length; i += chuckNum){
      chunkData.push(copyData.slice(i, i + chuckNum))
    }
    // console.log(chunkData[idx])
    return chunkData
  }

  chunkIdxEvent = (idx)=>{
    console.log('idx',idx)
    
    this.setState((state,props)=>{
      return (
        state.dataDefaultNumber = idx
      )
    })
    console.log('paging',this.state.DATA.realData)
  }


  selectEvent = (e)=>{
    // console.log('number',Number(e.target.value))
    const numberChangeValue = Number(e.target.value)
    const chunkData = this.chunkEvent(this.state.DATA.newsData,numberChangeValue)
    const chunkLength = chunkData.length

    
    
    this.setState((state,props)=>{
      return (
        state.sliceNum = numberChangeValue,
        state.DATA.realData = chunkData,
        state.dataLength = chunkLength,
        state.dataDefaultNumber = 0
      )
    })
    console.log('selectEvent',this.state.DATA.realData)
    
  }

  // render
  renderImg = ({imgSrc, title}) =>{
    return (
      <div className="wrap_thumb">
        <img src={imgSrc} className="img_thumb" alt={title}/>
      </div>
    )
  }

  renderInfo = ({imgSrc, title, name, desc}) => {
    return (
      <>
        <div className="news_thumb">
          {this.renderImg({imgSrc, title})}
          <div className="tag_name">
            <span className="txt_name">{name}</span>
          </div>
        </div>
        <div className="news_info">
          <strong className="tit_news">{title}</strong>
          <p className="desc_info">{desc}</p>
        </div>
      </>
    )
  }
  

  renderItem = ({id, name, title, desc, imgSrc, imgInfo, shadow, link}, index)=>{
    return(
      <li key={id}>
        {
          link && link !== '' 
            ? <a href={link} className="news_cont link_cont">{this.renderInfo({imgSrc, title, name, desc})}</a>
            : <div className="news_cont">{this.renderInfo({imgSrc, title, name, desc})}</div>
        }
      </li>
    )
  }

  renderPaging = (item,idx) =>{
    
    return(
      <li key={idx + 1}>
        <a href="javascript:;" className="link_paging" onClick={()=>this.chunkIdxEvent(idx)}>{idx + 1}</a>
      </li>
    )
  }

  renderSelectPaing = (item,idx) =>{
    return(
      <option key={idx + 1} value={item}>{item}</option>
    )
  }

  

  render(){
    console.log('render')

    return(
      <div className="comp_news_content">
        <TitleBox {...korean.route.news} />
        <div>
          <select className="" onChange={this.selectEvent}>
            {this.state.selectPagingNum.map(this.renderSelectPaing)}
          </select>
        </div>
        <div className="comp_content_box">
          <ul className="list_news">
            {this.state.DATA.realData[this.state.dataDefaultNumber] && 
              this.state.DATA.realData[this.state.dataDefaultNumber].map(this.renderItem)}
          </ul>
          <div>
            {
              this.state.dataLength !== 1 ? 
            <ul>
              {this.state.DATA.realData.map(this.renderPaging)}
            </ul>
            :
            <></>
            }
          </div>
        </div>
      </div>
    )
  }
}
 
export default NewsList






// class NewslistContent extends Component{

//   _renderLinkSelect = (data)=>{
//     return (
//       <a href={data.link} className="news_cont link_cont">
//         <NewsDetailContent item={data} />
//       </a>
//     )
//   }
//   _renderDivsionSelect = (data)=>{
//     return(
//       <div className="news_cont">
//         <NewsDetailContent item={data} />
//       </div>
//     )
//   }

  
//   render(){
//     console.log(this.props.listItem)   
//     return(
//       <ul className="list_news">
//         {this.props.listItem.map((item, idx)=>{
//           return (
//             <li key={idx}>
//               {item.link ? this._renderLinkSelect(item) : this._renderDivsionSelect(item)}
//             </li>
//           )
//         })}  
//       </ul>
      
//     )
//   }
// }


// // list 컴포넌트
// class NewsDetailContent extends Component{

//   render(){

//     const detailData = this.props.item

//     return(
//       <>
//         <div className="news_thumb">
//           <ImageContent imageData={detailData}/>
//           <div className="tag_name">
//             <span className="txt_name">{detailData.name}</span>
//           </div>
//         </div>
//         <div className="news_info">
//           <strong className="tit_news">{detailData.title}</strong>
//           <p className="desc_info">{detailData.desc}</p>
//         </div>
//       </>
//     )
//   }
// }



// // 이미지 컴포넌트
// class ImageContent extends Component{
//   render(){
//     console.log(this.props)
//     const imgData = this.props.imageData;
//     return(
      
//       <div className="wrap_thumb">
//         <img src={imgData.imgSrc} className="img_thumb" alt={imgData.title} />
//       </div>
//     )
//   }
// } 
