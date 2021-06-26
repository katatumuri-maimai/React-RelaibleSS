import React from 'react';
import '../../css/games/Game.css';
import *as Comp from '../../js/components/Texts';
import *as Btn from '../../js/components/Btn';
import "firebase";
import firebase from "firebase/app";
import 'firebase/app';
import "../../firebase/config.js";
import {randomName} from '../components/original-function'
import { withRouter} from 'react-router';　//withRouter








function CreateRandomName() {
  const[name,setName]=React.useState("");

  const createrandomName = React.useMemo(
    () => {
    randomName();
    return(randomName())
    },
    []
  );

  React.useMemo(
    () => {
    setName(createrandomName);
    },
    [createrandomName]
      );

      return(name)

}


function ChangeName(){

  const inputName =document.getElementById("setUserName").value;
  const defName =document.getElementById("setUserName").placeholder;
  if(inputName===""){
    // this.setState({iscreateRoomPeopleName:false});
        return(defName)
  }else{
    // this.setState({iscreateRoomPeopleName:true});
        return(inputName)
  }
}



function SetRoomPeopleData(userName){
  document.getElementById("Btn").setAttribute("disabled", true);
  const PATH = window.location.pathname;
  const RoomID =PATH.replace("/NewGame/GameNameSetup/","");
  const DocId = RoomID.split(/-/)[0];
  const dbRef = firebase.firestore().collection('CreateGameRoom').doc(DocId);
  const dbdbRef = dbRef.collection("GameRoom").doc(DocId).collection("Member").doc()
  const UserId = dbdbRef.id
  dbdbRef.set({
    userId: UserId,
    userName: userName
  });

  // const SSSKK = useLocation();
  const URL =PATH.replace("GameNameSetup","GameRoomSetup");
  // console.log(SSSKK.pathname)

  if(UserId!==""){
    window.history.pushState('','',URL+"?userId="+UserId);

  }
}

function DisplayName(){
  return(
    <div>
    <input  id="setUserName"  placeholder={CreateRandomName()}  onChange={()=>{ChangeName()}}/>
      </div>
  )
}

function SubmitData() {

  return (

      <div id="Btn" onClick={()=>{SetRoomPeopleData(ChangeName())}}>
        <Btn.MainColorBtn
          texts="名前を設定する"
          />
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
     isSubmitted: false,
   };
   this.isSubmit = this.isSubmit.bind(this);
   // this.createPath = this.createPath.bind(this);
 };

isSubmit(){
  const path =window.location.pathname;
  const search =window.location.search
  const newPath = path + search
  // const PATH = URL
 this.setState({isSubmitted: true});
 this.props.history.push(newPath)
 }


  render(){
    let msg;
    if(this.state.isSubmitted){

      msg = (

        <div>
          <Comp.MainColorMidashiH2
            texts="チームメンバー集合！"
          />


          <Comp.InfomationArea
            texts="只今メンバー集合中…<br>しばらくお待ちください。"
          />



      </div>

      )

    }else{
      msg = (
        <div>
          <Comp.MainColorMidashiH2
            texts="チームメンバー集合！"
          />


          <Comp.InfomationArea
            texts="名前を登録してね。"
          />
          <DisplayName/>

          <div onClick={()=>{this.isSubmit()}}>
            <SubmitData />
          </div>

        </div>
      )
    }

      return (
        <div>

         {msg}

        </div>
      );
    }



}

export default withRouter(GameNameSetup);
