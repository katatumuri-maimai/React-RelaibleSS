import React,{useState,useEffect,useMemo} from 'react';
import { withRouter } from 'react-router';　//withRouter
import '../../css/games/Game.css';
import '../../css/games/GameRoom.css';
import *as Comp from '../../js/components/Texts';
import *as Btn from '../../js/components/Btn';
import firebase from "firebase/app";
import 'firebase/app';
import "../../firebase/config.js";
import {SetSuffuledData} from '../components/SetGameDataShuffle';
import '../../py/trimming.py';


function GetDocID(){
  const Path = window.location.pathname
  const RoomID = Path.replace(/\/GameRoom\/[a-z]+/i,"").replace("/","")
  const DocID = RoomID.split((/-/))[0]
  return DocID
}

function SetSuffuled(){
  const[Data,setData]=useState(null)
  useEffect(()=>{
    console.log("useEffect");
      SetSuffuledData().then((e)=>{
        setData(e)
    })
  },[])

  return null
}


async function getRoomTitle(){

  const DocID = GetDocID()
  let Title_List =[]

  if(DocID!==""){
    let case1 = true
    let case2 = true
    let p = 0;
    let time=1000

    while (case1 ||case2 ) {
    console.log("Titlewhile");
    if(p>=10){
      console.log("処理を中断");
      break;
    }



    const Db
     =firebase.firestore().collection('CreateGameRoom').doc(DocID).collection('GameRoom').doc(DocID).collection('GameRoomSettings').doc("Title")
     await Db.get({source: 'server'}).then(async(snap)=>{
     const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

       case1 = (!snap.data())
       case2 = snap.metadata.hasPendingWrites

        console.log(case1);
       if(!snap.data()===false && snap.metadata.hasPendingWrites===false){
          console.log(snap.data());
         var source = snap.metadata.hasPendingWrites ? 'Local' : 'Server';
          console.log(source);
          const data = snap.data()
         for (var i = 0; i < Object.keys(data).length; i++) {
           const key = "Title_"+(i+1)
           Title_List.push(data[key])
         }
     }else{
       await _sleep(time);
     }

   })
   p++
   time=1000*p
 }




 // .then(snap =>{
 //   if(!snap){
 //     console.log("成功");
 //   }else{
 //     console.log("失敗");
 //   }
 // }).catch(error =>{
 //   console.log(error);
 // })

   console.log(Title_List);

   if(!Title_List===false){
   const Len = Title_List.length
   if(Len>=3){
     return Title_List
 }}
}
}

function Title(){
  const[Title_List,setTitle_List]=useState(null)
  useEffect(()=>{
    if(!Title_List){
    getRoomTitle().then((e)=>{
      setTitle_List(e)
    })
  }
  },[Title_List])

  let Tite;
  if(!Title_List){
    Tite=(<p className="loading"></p>)
  }else{
    Tite=(
      <div>
        {Title_List.map((e,i)=>{
          const id = "Title_"+(i+1)
          let text;
          if(i<=1){
            text = e + "の"
          }else if(i===2){
            text = e
          }
          i++
          return( <p id={id} key={id}>{text}</p>)
        })
        }
      </div>

    )
  }
  return(
    <div>
    <div className="Text_label">タイトル</div>
      <div id="title" className="SironukiText_Text">
        {Tite}
        </div>
    </div>
  )

}

async function getRoomGene(){
  const DocID = GetDocID()
  let Gene_List =[]

  if(DocID!==""){
    let case1 = true
    let case2 = true
    let i = 0;
    while (case1 ||case2 ) {
    console.log("while");
    if(i>=10){
      console.log("処理を中断");
      break;
    }
    i++

  const Db
   =firebase.firestore().collection('CreateGameRoom').doc(DocID).collection('GameRoom').doc(DocID).collection('GameRoomSettings').doc("Gene")
   await Db.get({source: 'server'}).then((snap)=>{
       case1 = (!snap.data())
       case2 = snap.metadata.hasPendingWrites
     if(!snap.data()===false && snap.metadata.hasPendingWrites===false){
       var source = snap.metadata.hasPendingWrites ? 'Local' : 'Server';
        console.log(source);
       const data = snap.data()
       for (var i = 0; i < Object.keys(data).length; i++) {
         const key = "Gene_"+(i+1)
         Gene_List.push(data[key])
       }
     }else{
        return Db.get({source: 'server'})
     }

   })
 }
   // .then(snap =>{
   //   if(!snap){
   //     console.log("成功");
   //   }else{
   //     console.log("失敗");
   //   }
   // }).catch(error =>{
   //   console.log(error);
   // })


   if(!Gene_List===false){
    const Len = Gene_List.length
   if(Len>=2){
     return(Gene_List)
 }
}}
}

function Gene(){
  const[Gene_List,setGene_List]=useState(null)
  useEffect(()=>{
    if(!Gene_List){
    getRoomGene().then((e)=>{
      setGene_List(e)
    })
  }
  },[Gene_List])

  let Gene;
  if(!Gene_List){
    Gene=(<p className="loading"></p>)
  }else{
    Gene=(
      <div  className="flex_row">
        {Gene_List.map((e)=>{
          return(
            <div id={e} key={e} className="Genre_Ch btn_shadow" ></div>
          )
        })}
      </div>
    )
  }
  return(
    <div >
    <div className="Text_label">ジャンル</div>
      <div id="Gene" className="SironukiText_Text">
        {Gene}
        </div>
        </div>
  )
}


async function getRoomMember(){
  const DocID = GetDocID()
  let Member_List;

  if(DocID!==""){
    let case1 = true
    let case2 = true
    let i = 0;
    while (case1 ||case2 ) {
    console.log("while");
    if(i>=10){
      console.log("処理を中断");
      break;
    }
    i++

  const Db
   =firebase.firestore().collection('CreateGameRoom').doc(DocID).collection('GameRoom').doc(DocID).collection('GameRoomSettings').doc("Member")
   await Db.get({source: 'server'}).then((snap)=>{
       case1 = (!snap.data())
       case2 = snap.metadata.hasPendingWrites
     if(!snap.data()===false && snap.metadata.hasPendingWrites===false){
       var source = snap.metadata.hasPendingWrites ? 'Local' : 'Server';
        console.log(source);
       Member_List=snap.data()
     }else{
        return Db.get({source: 'server'})
     }

   })
 }
   // .then(snap =>{
   //   if(!snap){
   //     console.log("成功");
   //   }else{
   //     console.log("失敗");
   //   }
   // }).catch(error =>{
   //   console.log(error);
   // })

    return(Member_List)
 }
}

function Member() {
  const MyId = window.location.search.replace("?userId=","")
  const[Member_List,setMember_List]=useState(null)
  useEffect(()=>{

    if(!Member_List){
    getRoomMember().then((e)=>{
      setMember_List(e)
    })
  }
  },[Member_List])



  let Member;
  let Member_div=[];
  if(!Member_List){
    Member=(<p className="loading"></p>)

  }else {
    console.log(Member_List);

    for (var key in Member_List) {
       const tag_num = key
       const turne = key.replace("Member_","")
       const name_num = "Member_Name_"+turne
       const tag = Member_List[key].userId
       const name = Member_List[key].userName

      Member_div.push(
        <div id={tag} key={tag} className={tag===MyId?"Member_m My_name":"Member_m"}>
          <div className="Member_m_label">
            {turne}
          </div>
          <div id={tag_num} className="Member_m_circle">
          </div>
          <div id={name_num} className="Member_m_name">
            {name}
          </div>
        </div>
      )

    }

  //
  //   console.log(Member_List.length);
  //   const People = Object.keys(Member_List).length
  //   for (var i = 0; i < People; i++) {
  //    const tag_num = "Member_"+(i+1)
  //    const name_num = "Member_Name_"+(i+1)
  //    const tag = Member_List[tag_num]
  //    const name = Member_List[name_num]
  //
  //    Member_div.push(
  //      <div id={tag} key={tag} className={tag===MyId?"Member_m My_name":"Member_m"}>
  //        <div className="Member_m_label">
  //          {i+1}
  //        </div>
  //        <div id={tag_num} className="Member_m_circle">
  //        </div>
  //        <div id={name_num} className="Member_m_name">
  //          {name}
  //        </div>
  //      </div>
  //    )
  // }

  Member=(
    Member_div.map((e)=>{
      return e
    })
  )

}


  return(
    <div className="SironukiText" >
    <div className="Text_label">メンバー・順番</div>
    <div id="Member" className="SironukiText_Text">
      {Member}

    </div>
    </div>
  )
}


//
//
//
//
//


class GameRoomConfirm extends React.Component {

    constructor(props){
      super(props);
        this.state={
        };
        // this.shuffle = React.createRef()
      }

  setNowStates(){
      this.props.isConfpage()
  }

  // async  SetStates(){
  //     if(!this.shuffle.current.setName()){
  //     await this.shuffle.current.setName()
  //   }
  //
  //   if(!this.shuffle.current.setTitle()){
  //     await this.shuffle.current.setTitle()
  //   }
  //
  //     if(!this.shuffle.current.setGene()){
  //     await this.shuffle.current.setGene()
  // }
  //   }

componentDidMount(){
      this.setNowStates()
      // this.SetStates()
      // this.getRoomMember()
     }




onClick(){
    const PATH = window.location.pathname;
    const UserSearch =  window.location.search
    const RoomPATH = PATH.replace("GameRoom","WriteRoom").replace("/GameRoomConfirm","")+UserSearch;
    this.props.history.push(RoomPATH);
}


  render(){

      return (
        <div>
          <Comp.MainColorMidashiH2
            texts="③小説の設定を確認"
            />
          <Comp.InfomationArea
              texts="みんなの提案からランダムに<br>タイトルとジャンルが選定されました♪<br>さっそく書き始めてください！"
              />


            <div className="RoomSetting">
              <Title/>
              <Gene/>
              <Member/>




          </div>
          <div onClick={()=>{this.onClick()}}>
          <Btn.MainColorBtn
            texts="小説を書き始める"
            id="write_start"
            />
          </div>

          <SetSuffuled/>
        </div>
      );
    }



}

export default withRouter(GameRoomConfirm);　//withRouter
