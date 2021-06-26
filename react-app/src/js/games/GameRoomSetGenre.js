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



class GameRoomSetGenre extends React.Component {
  constructor(props){
    super(props);
      this.state={
        isSubmited:false,
        isSetGenre:0,
        MenberID:[]
      };
  }

  setNowStates(){
    this.props.isGenepage()
  }

  componentDidMount() {
    this.mounted = true;
    this.setNowStates();
  }


onClickGenre(id){
  const get_Btn_id_classList=document.getElementById(id).classList;
  const Btn_on_count = document.getElementsByClassName("Btn_on").length;
  if(get_Btn_id_classList.contains("Btn_on")){
    const i= Btn_on_count-1
      get_Btn_id_classList.remove("Btn_on")
      this.setState({isSetGenre:i})
  }else{
      const i= Btn_on_count+1
      this.setState({isSetGenre:i})

    if(Btn_on_count<=2){
        get_Btn_id_classList.add("Btn_on")
    }else if(Btn_on_count>2){

  }
  }


}

getGeneidList(){
  if(this.state.isSetGenre>=2){
    const Btn_on =document.getElementsByClassName("Btn_on")
    const Btn_on_count = Btn_on.length
    let Genre_id_List=[];

    if(Btn_on_count===1){
      Genre_id_List ={
        Genre_id_1:Btn_on[0].id
      };

    }else if(Btn_on_count===2){
      Genre_id_List ={
        Genre_id_1:Btn_on[0].id,
        Genre_id_2:Btn_on[1].id
      };
    }else if(Btn_on_count===3){
      Genre_id_List ={
        Genre_id_1:Btn_on[0].id,
        Genre_id_2:Btn_on[1].id,
        Genre_id_3:Btn_on[2].id
      };
    }
          return(Genre_id_List)
}
  }

  setData(){
    const Path = window.location.pathname
    const UserID =  window.location.search.replace("?userId=","")
    const RoomID = Path.replace(/\/GameRoom\/[a-z]+/i,"").replace("/","")
    const DocID = RoomID.split((/-/))[0]
    const Genre_id_List =this.getGeneidList()
    if(DocID!==undefined){
      firebase.firestore().collection('CreateGameRoom').doc(DocID).collection("GameRoom").doc(DocID).collection("Gene").doc(UserID).set(
        Genre_id_List
    , { merge: true })
    }


  }

  async isSubmit(){
    if(this.state.isSetGenre>1){
      this.props.isT2page()
    this.setState({isSubmited:true})
    await this.setData();
    await this.isTitleAllSet();
  }
  }

  ChangePage(){
    const PATH = window.location.pathname;
    const UserSearch =  window.location.search
    const RoomPATH = PATH.replace("GameRoomSetGenre","GameRoomConfirm")+UserSearch;
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
              const Db_Title =  firebase.firestore().collection('CreateGameRoom').doc(DocID).collection("GameRoom").doc(DocID).collection("Gene")
              Db_Title.onSnapshot({includeMetadataChanges: true},(snap)=>{
                const size = snap.size

                if(MemberID_List.length>size){
                }else{
                    if(document.getElementById("InfomationArea")!==null){
                    document.getElementById("InfomationArea").innerHTML ="みんなそろったみたいだよ！"
                  }
                  this.ChangePage()
                }
      })}

}
}




  render(){

    // SetGene
    // ここを増やすときは、Game.cssのSetGeneも増やす
    const GenreList=[
      "love","mystery","fantasy","sf","horror","history","fairy-tale"
    ];




        let errmsg;
        if(this.state.isSetGenre<=1){
          errmsg=(
            <div className="has_Error_message">
            2つ以上選んでね(*´ω｀)
            </div>
          )
        }

        let msg ;
        if(this.state.isSubmited){
          msg=(
            <div>
              <Comp.MainColorMidashiH2
                texts="②ジャンルを決めよう！"
                />
              <Comp.InfomationArea
                texts="只今ジャンル選定中…<br>しばらくお待ちください。"
                />


            </div>
          )

        }else{
          msg=(
            <div>
              <Comp.MainColorMidashiH2
                texts="②ジャンルを決めよう！"
                />
              <Comp.InfomationArea
                texts="好きなジャンルを3つ選択してください♪<br>チームみんなの提案の中から<br>ランダムにジャンルが選ばれます。"
                />
              <div id="GenreArea" className="GenreArea flex_row">
                {GenreList.map((e)=>{
                  const geneid=e
                  return(
                    <div key={geneid} onClick={()=>{this.onClickGenre(geneid)}}>
                    <div id={geneid} className="Genre_Ch btn_shadow" ></div>
                    </div>
                  )
                })}


              </div>
              {errmsg}
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
          {msg}

        </div>
      );

    }



}

export default withRouter(GameRoomSetGenre);　//withRouter
