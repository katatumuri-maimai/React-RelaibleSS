import React ,{useState,useEffect} from 'react';
import '../../css/games/Game.css';
import *as Comp from '../../js/components/Texts';
import *as Btn from '../../js/components/Btn';
import "firebase";
import firebase from "firebase/app";
import 'firebase/app';
import "../../firebase/config.js";
import { withRouter } from 'react-router';　//withRouter


function GetDocID(){
  const Path = window.location.pathname
  const RoomID = Path.replace(/\/NewGame\/[a-z]+/i,"").replace("/","")
  const DocID = RoomID.split((/-/))[0]
  return DocID
}

async function GetMember_onSet(){
  const DocID = GetDocID()
  let Member_onSet=0;

  if(DocID!=="" ){
    const Db =firebase.firestore().collection('CreateGameRoom').doc(DocID)

    await Db.get().then((e)=>{
      Member_onSet=e.data().people
    })
    return Member_onSet
}}

function GetMemberCurrent(props){
  const [Member_onSet, setMember_onSet] = useState(null);
  const [Member_count, setMember_count] = useState(null);
  const [userNameList, setUserNameList] = useState(null);
  const DocID = GetDocID()

  useEffect(() => {
    console.log("useEffect");
    GetMember_onSet().then(p => setMember_onSet(p))

  if(DocID!=="" ){
    const Db =firebase.firestore().collection('CreateGameRoom').doc(DocID)
    const Db_Member =Db.collection('GameRoom').doc(DocID).collection('Member')

    // Db_Member.onSnapshot((snap)=>{
    //   setMember_count(snap.size)
    // })
    if(Member_onSet>Member_count){

    Db_Member.onSnapshot({includeMetadataChanges: true},(doc)=>{
      setMember_count(doc.size)
      let NameList=[];
      doc.forEach((e)=>{
        const name =e.data().userName
        NameList.push(name)
      })
      setUserNameList(NameList)
    })
}}
}, [DocID,Member_count,Member_onSet]);


if (!Member_count|| !userNameList) {
  return <p className="loading"></p>;
}

let loadings;
let Members;
let StartBtn;
let Info;
let loading =[];
let Member=[];

if(Member_onSet>=Member_count){
for(var i=0 ;i<Member_count ; i++)
{Member.push(i)}
Members=(
  Member.map((e)=>{
    return(<div key={e} className="Member_Ch in_show">{userNameList[e]}</div>)
}))

for(var f=0 ;f<(Member_onSet-Member_count) ; f++)
{loading.push(f)}

loadings=(
  loading.map((e)=>{
    return (<p key={e} className="loading"></p>)
}))
}

if(Member_onSet!==Member_count){
  Info=(
    <Comp.InfomationArea
      id="InfomationArea"
      texts="只今メンバー集合中…<br>しばらくお待ちください。"
    />
  )

}else{
  Info=(
    <Comp.InfomationArea
      id="InfomationArea"
      texts="メンバー集合！<br>ゲームをスタートしてね♪"
    />
  )
  StartBtn=(
    <div id="GameStart" className="in_show" onClick={props.onClick}>
      <Btn.MainColorBtn texts="ゲームスタート！"/>
    </div>
  )
}

return (
  <div>
    {Info}
  <div id="Member" className="Member flex_column">
    {Members}
    {loadings}
  </div>
  {StartBtn}
  </div>
)
}


//
// ここからクラスコンポーネント
//
class GameNameSetup extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     isMemberMeet: false,
   };
   this.isSubmit = this.isSubmit.bind(this);
 };

isSubmit(){
 const Path = window.location.pathname
 const UserID =  window.location.search
 const GameRoomURL = Path.replace("/NewGame/GameRoomSetup/","/GameRoom/GameRoomsetTitle/")
  this.props.history.push(GameRoomURL+UserID)
}

  render(){
      return (
        <div>

          <Comp.MainColorMidashiH2
            texts="チームメンバー集合！"
          />

        <GetMemberCurrent onClick={()=>{this.isSubmit()}}/>

        </div>
      );
    }
}

export default withRouter(GameNameSetup);
