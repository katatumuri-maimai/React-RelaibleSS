import React ,{useState,useEffect}from 'react';
import { withRouter } from 'react-router';　//withRouter
import '../../css/games/Game.css';
import '../../css/games/GameRoom.css';
import '../../css/games/WriteRoom.css';
import *as Comp from '../components/Texts';
import *as Btn from '../components/Btn';
import "firebase";
import firebase from "firebase/app";
import 'firebase/app';
import "../../firebase/config.js";
import *as Mo from '../components/Modals';


function GetDocID(){
  const Path = window.location.pathname
  const RoomID = Path.replace("/WriteRoom/","")
  const DocID = RoomID.split((/-/))[0]
  return DocID
}

function scrollToBottom(){
    var element = document.getElementById("GameRoomWrite_wrap");
    // var nobel_text = document.getElementById("nobel_text");
    var bottom = element.scrollHeight - element.clientHeight;
      element.scroll(0, bottom);
      // console.log(bottom);
    // element.scrollIntoView(false)
    // nobel_text.scrollIntoView(false)
    // console.log("scrollToBottom");

}


function NovelHeader(props){
  const[Data,setData]=useState(null)
  const[isInfoOpen,setisInfoOpen]=useState(false)

  useEffect(()=>{
    getNovelInfo().then((e)=>{
      setData(e)
    })
  },[])

  useEffect(()=>{
    setisInfoOpen(props.isInfoOpen)
  },[props.isInfoOpen])



  if(!Data){
    return(<p className="loading"></p>)
  }
  const HeadTitle=Data.Title


  return(
    <div id="nobel_header">
      <div className="nobel_header_wrap">
        {HeadTitle}
        <div className="nobel_header_info" onClick={()=>{props.onClick()}}>
        <i className="fas fa-info-circle"></i>
        <p>小説の詳細</p>
        </div>
      </div>
    </div>
  )

}



function NovelInfo(props){
  const[Data,setData]=useState(null)
  const[isInfoOpen,setisInfoOpen]=useState(false)

  useEffect(()=>{
    getNovelInfo().then((e)=>{
      setData(e)
    })
  },[])

  useEffect(()=>{
    setisInfoOpen(props.isInfoOpen)
  },[props.isInfoOpen])

  if(!Data){
    return(<p className="loading"></p>)
  }

  const Member_List=Data.Member_List
  const Title_text=Data.Title
  const Gene_List=Data.Gene_List
  let Mem;
  let Title;
  let Gene;
  let Mem_div_List=[]

  Title=(
      <div className="SironukiText" >
      <div className="Text_label">タイトル</div>
        <div id="title" className="SironukiText_Text flex_row">
          <p>{Title_text}</p>
          </div>
          </div>
  )

  Gene=(
    <div className="SironukiText" >
    <div className="Text_label">ジャンル</div>
      <div id="Gene" className="SironukiText_Text flex_row">
        <div id={Gene_List["Gene_1"]} className="Genre_Ch btn_shadow" ></div>
        <div id={Gene_List["Gene_2"]} className="Genre_Ch btn_shadow" ></div>
        </div>
        </div>
  )


  for(var key in Member_List){
    const turn = key.replace("Member_","")
    const id = Member_List[key].userIdid
    const name = Member_List[key].userName
    Mem_div_List.push(
      <div className="Member_m" id={id} key={key}>
        <div className="Member_m_label">{turn}</div>
        <div className="Member_m_circle" id={key}></div>
        <div className="Member_m_name">{name}</div>
      </div>
    )

  }

  Mem=(
    <div className="SironukiText" >
    <div className="Text_label">メンバー・順番</div>
    <div id="Member" className="SironukiText_Text">
     {Mem_div_List.map((e)=>{
       return e
     })}
    </div>
    </div>
  )

  if(isInfoOpen){
    return (
      <div className="nobel_info">
        <div className="nobel_info_wrap">
        <div onClick={()=>{props.onClick()}}>
        <Btn.ToggleBtn/>
        </div>
          {Title}
          {Gene}
          {Mem}
          </div>
        </div>
    )
  }

  return null
}




async function getNovelInfo() {
  const DocID = GetDocID()
  let Member_List=[]
  let Title_List=[]
  let Title="";
  let Gene_List=[]

  if(DocID!==""){
    const Db =firebase.firestore().collection('CreateGameRoom').doc(DocID).collection('GameRoom').doc(DocID).collection('GameRoomSettings')

    await Db.doc("Member").get().then((e)=>{
      const data =e.data()
      Member_List=data
    })
    await Db.doc("Title").get().then((e)=>{
      const data =e.data()
      Title_List=data
    })

    Title= Title_List["Title_1"]+"の"+Title_List["Title_2"]+"の"+Title_List["Title_3"]


    await Db.doc("Gene").get().then((e)=>{
      const data =e.data()
      Gene_List=data
    })

return({
  Member_List:Member_List,
  Title_List:Title_List,
  Title:Title,
  Gene_List:Gene_List,
})
}}



async function getRoomdata() {
  const UserID = window.location.search.replace("?userId=","")
  const DocID = GetDocID()
  let people=0;
  let gamelaps=0;
  let my_turne=0;
  let my_name="";
  let before_my_turne=0;
  let my_turn_List=[];

  if(DocID!==""){
    const Db =firebase.firestore().collection('CreateGameRoom').doc(DocID)
    const Db_Settings =Db.collection('GameRoom').doc(DocID).collection('GameRoomSettings')
    await Db.get().then((e)=>{
      people=e.data().people;
      gamelaps=e.data().gamelaps;

    })

    await Db_Settings.doc("Member").get().then((e)=>{
      const data =e.data()
      for(var key in data){
        if(data[key].userId===UserID){
          my_turne=key.replace("Member_","")
          my_name = data[key].userName
        }
      }
    })

    for(var i=0;i<gamelaps;i++){
      const turne = Number(my_turne)+Number(people)*i
      my_turn_List.push(turne)
    }

      if(Number(my_turne)===1){
        before_my_turne = people
      }else {
        before_my_turne = my_turne -1
      }


return({
  people:people,
  gamelaps:gamelaps,
  my_turne:my_turne,
  my_name:my_name,
  before_my_turne:before_my_turne,
  my_turn_List:my_turn_List
})
}}

// async function calcNow() {
//   const DocID = GetDocID()
//   const Data =await getRoomdata()
//   const your_turn = Number(Data.my_turne)
//   const gamelaps = Number(Data.gamelaps)
//   const member_count=Number(Data.people);
//
//
//
//   //
//   // console.log(your_turn);
//   // console.log(gamelaps);
//   // console.log(member_count);
//   // console.log(my_turn_List);
// }



function Texts(){
  const[Data,setData]=useState(null)
  const[Texts,setTexts]=useState(null)

  useEffect(()=>{
    getRoomdata().then((e)=>{
      setData(e)
    })
  },[])

  useEffect(()=>{
    console.log("useEffect");
  const DocID = GetDocID()
  if(DocID!==""){
    const Db =firebase.firestore().collection('CreateGameRoom').doc(DocID).collection('GameRoom').doc(DocID).collection('Novel')
    Db.onSnapshot({includeMetadataChanges: true},(snap)=>{
      if(!snap===false){
        let Texts= [];
        snap.docs.forEach((item, i) => {
          const NovelId = item.id
          const data = item.data()
          const userName = data.userName
          const member_turn = data.your_turn
          const userId = data.userId
          const texts = data.texts

          Texts.push({
            NovelId:NovelId,
            userName:userName,
            member_turn:member_turn,
            userId:userId,
            texts:texts
          })
        });
        setTexts(Texts)
    }
    })

    scrollToBottom()
}


},[])

if(!Texts || !Data){
  return(<p className="loading"></p>)
}



const my_turne = Number(Data.my_turne)
const before_my_turne =Number(Data.before_my_turne)

return(
  <div id="nobel_text">
  {Texts.map((e)=>{
    let className = "novel_entry_wrap novel_left"
    const member_turn = Number(e.member_turn)
    const tag ="Member_" + member_turn
    let text =e.texts

    if(member_turn===my_turne){
      className = "novel_entry_wrap novel_right"
    }
    if(member_turn!==my_turne && member_turn!==before_my_turne){
      className = "novel_entry_wrap novel_left text_dot"
      text =""
    }


    return (
      <div key={e.NovelId} className={className}>
          <div className="Member_m" id={e.userId}>
            <div className="Member_m_label">{e.member_turn}</div>
            <div className="Member_m_circle" id={tag}></div>
            <div className="Member_m_name">{e.userName}</div>
          </div>

          <div className="novel_entry_text_wrap">
            <div className="novel_entry_text">
              {text}
            </div>
          </div>

      </div>
    )
  })}
  </div>
)
}

function TextInputAerea(props) {
  const DocID = GetDocID()
  const UserID = window.location.search.replace("?userId=","")
// calcNow()
  const[Data,setData]=useState(null)
  const[now_turn,setNow_turn]=useState(null)
  const[now_gamelaps,setNow_gamelaps]=useState(null)
  const[is_my_turne,setIs_my_turne]=useState(false)
  const[isOnFocus,setIsOnFocus]=useState(false)
  const[inputText,setInputText]=useState("")
  const[isAllNovel,setIsAllNovel]=useState(false)



  useEffect(()=>{
    getRoomdata().then((e)=>{
      setData(e)
    })
  },[])

  useEffect(()=>{
    getRoomdata().then((e)=>{
      setData(e)
    })
  },[])

  useEffect(()=>{
    if(!Data===false){
      const member_count=Number(Data.people);
      const my_turn_List = Data.my_turn_List

      if(DocID!==""){
        const Db =firebase.firestore().collection('CreateGameRoom').doc(DocID).collection('GameRoom').doc(DocID).collection('Novel')
        Db.onSnapshot((snap)=>{
          const snap_turn= Number(snap.docs.length +1)
          const snap_gamelaps = Math.ceil(snap_turn / member_count)

          setNow_turn(snap_turn)
          setNow_gamelaps(snap_gamelaps)
          setIs_my_turne(my_turn_List.includes(now_turn))
      })
  }}
},[Data,DocID,now_turn])

  if(!Data || !now_turn || !now_gamelaps){
    return(<p className="loading"></p>)
  }

  const my_turne = Number(Data.my_turne)
  const my_name = Data.my_name
  const all_turn = Data.gamelaps * Data.people

  // テキスト入力エリアの設定
    function onFocus(){
      setIsOnFocus(true)
      document.getElementById("nobel_text").classList.add("textArea_focus_novel_text");
      scrollToBottom()
    }

    function onBlur(){
      setIsOnFocus(false)
      document.getElementById("nobel_text").classList.remove("textArea_focus_novel_text")
    }


    function onChange(e){
       let inputText=e.target.value
       setInputText(inputText)
      }

    function isSubmit(){
      const texts = inputText
      const NovelId = String(now_turn)
        if(10<=inputText.length<=140){
          document.getElementById("nobel_text_input").value=""
          const element = document.getElementById("word_count")
          element.innerHTML= "0/140"
          // this.setState({isSubmitTexts:false})
          setIs_my_turne(false)

        if(DocID!==""){
          const Db =firebase.firestore().collection('CreateGameRoom').doc(DocID).collection('GameRoom').doc(DocID).collection('Novel')
          const Db_Novel = Db.doc(NovelId)

          Db_Novel.set({
            userId:UserID,
            userName:my_name,
            your_turn:my_turne,
            texts:texts
          })}
        }


    }

    console.log(inputText);

    if(now_turn>all_turn && isAllNovel===false){
      setIsAllNovel(true)
    }

    // 次に進むモーダル
    let modal;
    if(isAllNovel){
      modal=(
        <Mo.EndMogdal
          onClick={()=>{props.onClick()}}
          className="modal"
          texts="小説の執筆が終わりました♪"
          btntexts="完成した小説を見る"
          />
      )
    }



  return(
    <div>
    {modal}
    <div id="nobel_text_sent" className={(is_my_turne === true?"":"no_input") || (isOnFocus === true?"textArea_focus_wrap":"")}>
      <div id="nobel_text_input_wrap" onFocus={()=>{onFocus()}} onBlur={()=>{onBlur()}}>
        <Comp.TextArea
        className={isOnFocus === true?"textArea_focus":""}
        onChange={(e)=>{onChange(e)}}
        disabled={is_my_turne === true?false:true}
        InputTextFor="nobel_text_input"
        placeholder={is_my_turne === true?"あなたの番です。（10～140文字以内）":"順番待ち中…"}
        max="140"
        min="10"
        />
        <div id="word_count" className={((10>inputText.length || inputText.length>140)? "word_count_error" : "" )  || (is_my_turne === true?"":"word_count_error no_input")}>{(inputText.length<=140? ( inputText.length +"/140")  :  ("-" + (inputText.length - 140))) }</div>
      </div>
      <div id="nobel_sent_btn" className={is_my_turne === true?"":"no_input"} onClick={()=>{isSubmit()}}>
        <i className="far fa-paper-plane"></i>
      </div>

    </div>
    </div>
  )

}


class WriteRoom extends React.Component {
    constructor(props) {
      super(props);
      this.state={
      //   my_turn_List:[],
      //   is_my_turne:"false",
      //   now_turn:0,
      //   gamelaps:0,
      //   now_gamelaps:0,
      //   MemberIDName_List:[],
      //   member_count:0,
      //   title_List:[],
      //   Gene_List:[],
      //   sentTexts:"",
      //   sendText:"",
      //   before_sendText:"",
      //   sentTexts_count:false,
      //   isSubmitTexts:false,
      //   isSetTexts:false,
        isInfoOpen:false,
        isAllNovel:false,
    };
  }





  // async componentDidMount(){
  //      // await this.WhoAmI()
  //      // this.getMyTurnList()
  //      // this.calcNow()
  //    }



//   async calcNow(){
//     const Path = window.location.pathname
//     const RoomID = Path.replace("WriteRoom/","").replace("/","")
//     const DocID = RoomID.split((/-/))[0]
//     const gamelaps= this.state.gamelaps
//     // const my_ture = this.state.my_turn_List
//     const member_count = this.state.member_count
//     const all_turn = gamelaps * member_count
//
//     let now_turn=0
//     // let now_gamelaps=0
//
//     if(DocID!=="" && gamelaps!==0){
//       // 部屋の周回数をとってくる
//       const Db =firebase.firestore().collection('CreateGameRoom').doc(DocID).collection('GameRoom').doc(DocID).collection('Novel')
//       await Db.onSnapshot((snap)=>{
//         now_turn= snap.docs.length +1
//
//         // now_gamelaps = Math.ceil(now_turn / member_count)
//
//         // this.setState({is_my_turne:my_ture.includes(now_turn)})
//         // this.setState({now_turn:now_turn})
//         // this.setState({now_gamelaps:now_gamelaps})
//         // // console.log("calcNow>is_my_turne>"+my_ture.includes(now_turn));
//         // // console.log("calcNow>now_turn>"+now_turn);
//         // // console.log("calcNow>now_gamelaps>"+now_gamelaps);
//         // // this.drawMyText()
//         // if(my_ture.includes(now_turn)===true){
//         //   this.state.sendText=""
//         // }
//
//         if(all_turn<now_turn){
//           this.setState({isAllNovel:true})
//         }
// })
// }
// }


setisAllNovel(){
  this.setState({isAllNovel:true})
}

//
//
// // 小説の設定を持ってくる
// // メンバーのデータをとってくる。
// // 自分の順番を確認
// async WhoAmI(){
//   // console.log("WhoAmI");
//   const UserID = window.location.search.replace("?userId=","")
//   const Path = window.location.pathname
//   const RoomID = Path.replace("WriteRoom/","").replace("/","")
//   const DocID = RoomID.split((/-/))[0]
//   let your_turn ="";
//   let your_name = "";
//   let before_your_turn ="";
//   let before_your_name="";
//   let MemberIDName_List=[];
//   let member_count=0;
//   let title_List=[];
//   let Gene_List=[];
//   let gamelaps="";
//
//   if(DocID!==""){
//     // 部屋の周回数をとってくる
//     const Db =firebase.firestore().collection('CreateGameRoom').doc(DocID)
//     Db.get().then((snap)=>{
//       gamelaps = snap.data().gamelaps
//     })
//
//     // 自分のターンとか名前とかをとってくる
//     const DbRoomSet =Db.collection('GameRoom').doc(DocID).collection('GameRoomSettings')
//     const Db_Member= DbRoomSet.doc("Member")
//     const Db_Title = DbRoomSet.doc("Title")
//     const Db_Gene = DbRoomSet.doc("Gene")
//
//     await Db_Member.get().then((snap)=>{
//       const Data = snap.data()
//       const Data_num = Object.keys(Data).length / 2
//       for(var key in Data){
//         MemberIDName_List =Data
//         member_count =Object.keys(MemberIDName_List).length /2
//         if(Data[key]===UserID){
//           your_turn = key.replace("Member_","")
//           if(your_turn-1!==0){
//             before_your_turn = (your_turn-1)
//           }else{
//             before_your_turn = Data_num
//           }
//         }
//       }
//       if(your_turn!==""){
//         const tag ="Member_Name_"+your_turn
//         your_name = Data[tag]
//         if(your_turn-1!==0){
//           const before_tag ="Member_Name_"+(your_turn-1)
//           before_your_name = Data[before_tag]
//         }else{
//           const before_tag = "Member_Name_"+ Data_num
//           before_your_name = Data[before_tag]
//         }
//       }
//     })
//
//     // Titleをとってくる
//     await Db_Title.get().then((snap)=>{
//       title_List =snap.data()
//     })
//     // Geneをとってくる
//     await Db_Gene.get().then((snap)=>{
//       Gene_List =snap.data()
//     })
//
//
//
//   this.setState({your_turn:your_turn})
//   this.setState({your_name:your_name})
//   this.setState({before_your_turn:before_your_turn})
//   this.setState({before_your_name:before_your_name})
//   this.setState({MemberIDName_List:MemberIDName_List})
//   this.setState({member_count:member_count})
//   this.setState({title_List:title_List})
//   this.setState({Gene_List:Gene_List})
//   this.setState({gamelaps:gamelaps})
//
//   this.getMyTurnList()
//   this.calcNow()
//
// }}
//

// 自分のターンを計算する
// async getMyTurnList(){
//   const your_turn = Number(this.state.your_turn)
//   const gamelaps = this.state.gamelaps
//   const member_count = this.state.member_count
//   let my_turn_List=[];
//
//   // if(your_turn!== 0 && your_turn!== "0" &&your_turn!== "1" && your_turn!== 1 ){
//   for(var i=0;i<gamelaps;i++){
//     const my_turn = Number(your_turn)+Number(member_count)*i
//     my_turn_List.push(my_turn)
//   }
//   this.setState({my_turn_List:my_turn_List})
// // }
// // if(your_turn=== 1 || your_turn=== "1"){
// //   for(var i=0;i<gamelaps;i++){
// //     const my_turn =Number(your_turn)+ Number(member_count)*i
// //     my_turn_List.push(my_turn)
// //   }
// //   this.setState({my_turn_List:my_turn_List})
// // }
// }







// 小説の詳細確認用
  openInfo(){
    this.setState({isInfoOpen:true})
  }

  closeInfo(){
    this.setState({isInfoOpen:false})
  }


  // 小説を送ったり
//
// async onChange(e){
//    await this.setState({sentTexts:e.target.value})
//    const word_count= await this.state.sentTexts.length
//    const element = document.getElementById("word_count")
//    element.innerHTML= word_count +"/140"
//
//    if(10>word_count){
//      this.setState({sentTexts_count:false})
//      element.classList.add("word_count_error")
//    }else if(10<=word_count<=140){
//      this.setState({sentTexts_count:true})
//      element.classList.remove("word_count_error")
//    }
//    if(word_count>140){
//      this.setState({sentTexts_count:false})
//      element.classList.add("word_count_error")
//      element.innerHTML="-" + (word_count - 140)
//    }
//   }

//   async isSubmit(){
//     this.WhoAmI()
//     if(this.state.sentTexts_count){
//       document.getElementById("nobel_text_input").value=""
//       const element = document.getElementById("word_count")
//       element.innerHTML= "0/140"
//       this.setState({isSubmitTexts:false})
//       this.setState({is_my_turne:false})
//     const UserID = window.location.search.replace("?userId=","")
//     const Path = window.location.pathname
//     const RoomID = Path.replace("WriteRoom/","").replace("/","")
//     const DocID = RoomID.split((/-/))[0]
//
//     if(DocID!==""){
//       const Db =firebase.firestore().collection('CreateGameRoom').doc(DocID).collection('GameRoom').doc(DocID).collection('Novel')
//
//       const now_turn = String(this.state.now_turn)
//       const your_turn =this.state.your_turn
//       const texts = this.state.sentTexts
//       const your_name = this.state.your_name
//       const Db_Novel = Db.doc(now_turn)
//
//       Db_Novel.set({
//         userId:UserID,
//         userName:your_name,
//         your_turn:your_turn,
//         texts:texts
//       })}
//     }
//
// }




// GameRoomResultへ
changePage(){
    const PATH = window.location.pathname;
    const UserSearch =  window.location.search
    const RoomPATH = PATH.replace("WriteRoom","GameResult")+UserSearch;
    this.props.history.push(RoomPATH);

}


    // console.log("count>>"+this.state.sentTexts_count);
    // console.log("length>>"+this.state.sentTexts.length);

  // isSubmitTexts:false,

//
//
//
//////////////レンダー
//
//


  render(){
    //
    // let Title;
    // let HeadTitle;
    // if(this.state.title_List!=={}){
    //   const Title_List= this.state.title_List
    //   Title=(
    //     <div className="SironukiText" >
    //     <div className="Text_label">タイトル</div>
    //       <div id="title" className="SironukiText_Text flex_row">
    //         <p id="Title_1">{Title_List["Title_1"]}</p>の
    //         <p id="Title_2">{Title_List["Title_2"]}</p>の
    //         <p id="Title_3">{Title_List["Title_3"]}</p>
    //         </div>
    //         </div>
    //   )
    //
    //   HeadTitle=(
    //     <div id="nobel_Title">「<p id="Title_1">{Title_List["Title_1"]}</p>の
    //     <p id="Title_2">{Title_List["Title_2"]}</p>の
    //     <p id="Title_3">{Title_List["Title_3"]}</p>」</div>
    //   )
    // }

    // let Gene;
    // if(this.state.Gene_List!=={}){
    //   const Gene_List=this.state.Gene_List
    //   Gene=(
    //     <div className="SironukiText" >
    //     <div className="Text_label">ジャンル</div>
    //       <div id="Gene" className="SironukiText_Text flex_row">
    //         <div id={Gene_List["Gene_1"]} className="Genre_Ch btn_shadow" ></div>
    //         <div id={Gene_List["Gene_2"]} className="Genre_Ch btn_shadow" ></div>
    //         </div>
    //         </div>
    //   )
    // }

//     let Mem;
//     if(this.state.MemberIDName_List!=={}){
//       const Member = this.state.MemberIDName_List;
//       const Member_List=[];
//
//       for(var i=0 ;i < Object.keys(Member).length /2 ;i++){
//         const turn = (i+1)
//         const tdtag = "Member_"+turn
//         const nametag = "Member_Name_"+turn
//         Member_List.push({
//           turn: turn,
//           id:Member[tdtag],
//           name:Member[nametag]
//         })}
//         Mem=(
//           <div className="SironukiText" >
//           <div className="Text_label">メンバー・順番</div>
//           <div id="Member" className="SironukiText_Text">
//            {Member_List.map((e,i=1)=>{
//              const tag = "Member_" +(i+1)
//              i=i+1
//              const turn = e.turn
//              const id = e.id
//              const name = e.name
//
//              return(
//              <div className="Member_m" id={id} key={i}>
//                <div className="Member_m_label">{turn}</div>
//                <div className="Member_m_circle" id={tag}></div>
//                <div className="Member_m_name">{name}</div>
//              </div>
//            )
//            })}
//           </div>
//           </div>
//
//         )
//
// }

    // let info;
    // if(this.state.isInfoOpen){
    //   info=(
    //       <div className="nobel_info">
    //         <div className="nobel_info_wrap">
    //         <div onClick={()=>{this.closeInfo()}}>
    //         <Btn.ToggleBtn/>
    //         </div>
    //
    //           {Title}
    //
    //          {Gene}
    //
    //
    //
    //           </div>
    //         </div>
    //     )
    // }





      return (
        <div className="GameRoomWrite">
          <div id="GameRoomWrite_wrap" className="GameRoomWrite_wrap">


          <NovelHeader
          onClick={()=>{this.openInfo()}}
          isInfoOpen={this.state.isInfoOpen}
          />

          <NovelInfo
          onClick={()=>{this.closeInfo()}}
          isInfoOpen={this.state.isInfoOpen}
          />



            <Texts  />
            <TextInputAerea
            onClick={()=>{this.changePage()}}
            />
          </div>

        </div>
      );
    }



}

export default withRouter(WriteRoom);　//withRouter
