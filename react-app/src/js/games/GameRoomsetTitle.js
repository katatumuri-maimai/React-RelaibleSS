import React from 'react';
import { withRouter } from 'react-router';　//withRouter
import '../../css/games/Game.css';
import '../../css/games/GameRoom.css';
import *as Comp from '../../js/components/Texts';
import *as Btn from '../../js/components/Btn';
import "firebase";
import firebase from "firebase/app";
import 'firebase/app';
import "../../firebase/config.js";





class GameRoomsetTitle extends React.Component {
  constructor(props){
    super(props);
      this.state={
        isSubmited:false,
        isSetTitle:false,
        Title_input_1:"",
        Title_input_2:"",
        Title_input_3:"",
        Title_input_count:false,
        Title_input_different:false,
      };
  }

  setNowStates(){
    this.props.isTitlepage()

  }

  componentDidMount() {
    this.setNowStates();
  }

  async Change_Title_input_1(event){
    await this.setState({Title_input_1:event.target.value})
      this.nowState()
  }
  async Change_Title_input_2(event){
    await this.setState({Title_input_2:event.target.value})
      this.nowState()
  }
  async Change_Title_input_3(event){
    await this.setState({Title_input_3:event.target.value})
      this.nowState()
  }

  setData(){
    const Path = window.location.pathname
    const UserID =  window.location.search.replace("?userId=","")
    const RoomID = Path.replace("/GameRoom/GameRoomsetTitle/","")
    const DocID = RoomID.split((/-/))[0]
    const Db =  firebase.firestore().collection('CreateGameRoom').doc(DocID).collection("GameRoom").doc(DocID).collection("Title").doc(UserID)
    Db.set({
      Title_input_1:this.state.Title_input_1,
      Title_input_2:this.state.Title_input_2,
      Title_input_3:this.state.Title_input_3,
    }, { merge: true })
    return(Db.get())
  }

nowState(){
  const S1= this.state.Title_input_1
  const S2= this.state.Title_input_2
  const S3= this.state.Title_input_3
  let C1 =0;
  let C2 =0;
  let C3 =0;

  if(S1!=="" && ((S2!=="" && S1!==S2)|| (S3!=="" && S1!==S3))){
    C1=1
  }else{
    C1=0
  }
  if(S2!=="" && ((S1!=="" && S2!==S1) || (S3!=="" && S2!==S3))){
    C2=1
  }else{
    C2=0
  }
  if(S3!=="" && ((S1!=="" && S3!==S1) || (S2!=="" && S3!==S2))){
    C3=1
  }else{
    C3=0
  }

  let count = C1+C2+C3

  if(count<=1){
    this.setState({Title_input_count:false})
  }

  if(count>=2){
    this.setState({Title_input_count:true})
  }

}


  async isSubmit(){
    if(this.state.Title_input_count){
      this.props.isT1page()
      this.setState({isSubmited:true})
      await this.setData()
      await this.isTitleAllSet()

    }}

    ChangePage(){
      const PATH = window.location.pathname;
      const UserSearch =  window.location.search
      const RoomPATH = PATH.replace("GameRoomsetTitle","GameRoomSetGenre")+UserSearch;
      this.props.history.push(RoomPATH);
    }


    async isTitleAllSet(){
      const Path = window.location.pathname
      const RoomID = Path.replace(/\/GameRoom\/[a-z]+/i,"").replace("/","")
      const DocID = RoomID.split((/-/))[0]
      let MemberID_List =[]
      if(DocID!==""){
        const Db =
         firebase.firestore().collection('CreateGameRoom').doc(DocID).collection('GameRoom').doc(DocID).collection('Member')
        await Db.get().then((querySnapshot)=>{
          querySnapshot.forEach((doc) => {
            const id=doc.id
            MemberID_List.push(id)
        });
         })
      if(MemberID_List!==""){
          const Db_Title =  firebase.firestore().collection('CreateGameRoom').doc(DocID).collection("GameRoom").doc(DocID).collection("Title")
          Db_Title.onSnapshot({includeMetadataChanges: true},(snap)=>{
            const Title_size = snap.size
            if(MemberID_List.length>Title_size){
              // console.log(Title_size)
            }else{
                if(document.getElementById("InfomationArea")!==null){
                document.getElementById("InfomationArea").innerHTML ="みんなそろったみたいだよ！"
                }
                this.ChangePage()
            }
})
}
}
}




  render(){
    let Errmsg;
    let msg;

    if(this.state.Title_input_count===false){
      Errmsg=(
        <div className="has_Error_message">好きな単語を2つ以上入力してください</div>
      )
    }

    if(this.state.isSubmited){
      msg =(
        <div>
          <Comp.InfomationArea id="InfomationArea"
            texts="只今題名作成中…<br>しばらくお待ちください。"
            />

        </div>

      )
    }else{
      msg=(
        <div>
          <Comp.InfomationArea
            texts="好きな単語を3つ入力してください♪<br>チームみんなの単語の中から<br>ランダムに題名が作成されます。"
            />
          <div className="Title_input">
            <input placeholder="好きな単語を入力(10文字以内)" max="10" onChange={(event)=>{this.Change_Title_input_1(event)}}/>
            <input placeholder="好きな単語を入力(10文字以内)" max="10" onChange={(event)=>{this.Change_Title_input_2(event)}}/>
            <input placeholder="好きな単語を入力(10文字以内)" max="10" onChange={(event)=>{this.Change_Title_input_3(event)}}/>
          </div>
          {Errmsg}
          <div onClick={()=>{this.isSubmit()}}>
          <Btn.MainColorBtn
            texts="送信"
            />
        </div>

          </div>

      )
    }

      return (
        <div>
          <Comp.MainColorMidashiH2
            texts="①タイトルを決めよう！"
            />
          {msg}

          </div>
      );
    }



}

export default withRouter(GameRoomsetTitle);　//withRouter
