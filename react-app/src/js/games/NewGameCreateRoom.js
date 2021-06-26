import React from 'react';
import '../../css/games/Game.css';
import *as Comp from '../../js/components/Texts';
import *as Btn from '../../js/components/Btn';
import "firebase";
import firebase from "firebase/app";
import 'firebase/app';
import "../../firebase/config.js";
import {CreatedSeq} from '../components/original-function'
import { withRouter } from 'react-router';　//withRouter




class NewGameCreateRoom extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     isSubmitted: false,
     InputNumberForTeamPeople: '2',
     InputNumberForGameLaps:'2',
     hasPeopleError: true,
     hasGameLapsError: true,
     isRoomCreated:false
   };
   this.handlePeopleChange = this.handlePeopleChange.bind(this);
   this.handleGameLapsChange = this.handleGameLapsChange.bind(this);
   this.isSubmit = this.isSubmit.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
 };




//
//人数がエラーの時、hasPeopleErrorのステートを変更
//
 handlePeopleChange(event) {
   const TeamPeople = event.target.value;
   if(TeamPeople>=2 && TeamPeople<=10){
     this.setState({hasPeopleError:true});
     this.setState({InputNumberForTeamPeople:TeamPeople});

   }else {
     this.setState({hasPeopleError:false});
   }

 }

//
//周回数がエラーの時、hasGameLapsErrorのステートを変更
//

 handleGameLapsChange(event) {
   const GameLaps = event.target.value;
   if(GameLaps>=1 && GameLaps<=5){
     this.setState({hasGameLapsError:true});
     this.setState({InputNumberForGameLaps:GameLaps});
   }else {
     this.setState({hasGameLapsError:false});
   }

 }


 //
 //データベースに送信
 //


isSubmit(){
  const colleName = 'CreateGameRoom';
  const dbRef = firebase.firestore().collection(colleName).doc();
  const RoomID = dbRef.id +"-"+ CreatedSeq();
  const RoomURL = "./NewGame/ShareGameRoom/"+ RoomID;
  const People = Number(this.state.InputNumberForTeamPeople);
  const GameLaps = Number(this.state.InputNumberForGameLaps);
  this.setState({isRoomCreated:true});

  dbRef.set({
    roomid: RoomID,
    people: People,
    gamelaps:GameLaps,
    created: firebase.firestore.FieldValue.serverTimestamp(),
  });


// URLにRoomIDを渡す
  // window.history.pushState('','',RoomURL);　//withRouter
  this.props.history.push(RoomURL);　//withRouter

// ブラウザバックした場合、新規作成ページに戻る
// if (this.state.isRoomCreated){
//     return;
//    }else{
//      window.onpopstate=function(){
//      window.location.reload();}
//    }

  }

 //
 //送信時に入力値が不正かどうか調べて、正しい場合に送信画面を出す。
 //

 handleSubmit() {
   //人数と周回数が正しい時
   if(this.state.hasPeopleError && this.state.hasGameLapsError){
       this.setState({isSubmitted: true});
       this.isSubmit();

   //周回数が正しい時
   }else if(this.state.hasGameLapsError){
       this.setState({isSubmitted: false});

   //人数が正しい時
   }else if(this.state.hasPeopleError){
       this.setState({isSubmitted: false});

   //人数と周回数が不正の時
   }else {
         this.setState({isSubmitted: false});
   }
}





  render(){
//
//人数のエラーメッセージ
//
    let Error_People;
    if(this.state.hasPeopleError){

        Error_People = (
          <div className='has_Error_message'>
          </div>
        )
    }else {

        Error_People = (
          <div className='has_Error_message'>
            2～10人で作成してください。
          </div>
        )
    }
//
//周回数のエラーメッセージ
//
      let Error_GameLaps;
      if(this.state.hasGameLapsError){
          Error_GameLaps = (
            <div className='has_Error_message'>
            </div>
          )
      }else {
          Error_GameLaps = (
            <div className='has_Error_message'>
              1～5周で作成してください。
            </div>
          )
      }

//
//送信前のエラーメッセージ
//
      let Error_CreateRooms;
      //人数と周回数が正しい時
      if(this.state.hasPeopleError && this.state.hasGameLapsError){
          Error_CreateRooms = (
            <div className='has_Error_message'>
            </div>
          )
      //周回数が正しい時
      }else if(this.state.hasGameLapsError){
          Error_CreateRooms = (
            <div className='has_Error_message'>
            人数は2～10人で作成してください。
            </div>
          )
      //人数が正しい時
      }else if(this.state.hasPeopleError){
          Error_CreateRooms = (
            <div className='has_Error_message'>
              周回数は1～5周で作成してください。
            </div>
          )
      //人数と周回数が不正の時
      }else {
        Error_CreateRooms = (
          <div className='has_Error_message'>
            人数と周回数を見直してください
          </div>
        )
      }

//
//送信時のメッセージ
//
      let isSubmittedMsg;
      if(this.state.isSubmitted){

        isSubmittedMsg = (
          <div>
          <Comp.MainColorMidashiH2
            texts="ルームを作成しよう！"
            />

          <Comp.InfomationArea
            texts="ルーム作成中…。<br>しばらくお待ちください。"
            />

          <div>送信しました</div>


        </div>
        )


      }else {
        isSubmittedMsg = (
          <div>
            <Comp.MainColorMidashiH2
              texts="ルームを作成しよう！"
              />

            <Comp.InfomationArea
              texts="人数と何周するか決めて<br>ルーム作成ボタンを押してください♪<br>※1人につき何回書くか決めます。"
              />

            {Error_People}
            <div onChange={(event) => {this.handlePeopleChange(event)}}>
              <Comp.InputNumber texts="人数" InputNumberFor="InputNumberForTeamPeople" placeholder="2" max="10" min="2"/>
            </div>

            {Error_GameLaps}
            <div onChange={(event) => {this.handleGameLapsChange(event)}}>
              <Comp.InputNumber texts="何周しますか？" InputNumberFor="InputNumberForGameLaps" placeholder="2" max="5" min="1"/>
            </div>

            {Error_CreateRooms}

            <div onClick={(event) => {this.handleSubmit(event)}}>
              <Btn.MainColorBtn texts="ルーム作成♪"/>
            </div>
          </div>
        )
      }


      return (
        <div>
          {isSubmittedMsg}
        </div>
      );
    }



}

export default withRouter(NewGameCreateRoom); //withRouter
