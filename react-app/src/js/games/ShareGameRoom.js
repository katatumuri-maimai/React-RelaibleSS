import React from 'react';
import '../../css/games/Game.css';
import *as Comp from '../../js/components/Texts';
import *as Btn from '../../js/components/Btn';
import *as M from '../../js/components/Modals';
import { withRouter } from 'react-router';　//withRouter


function CreateShareURL(){
  const PATH = window.location.href;
  const URL =PATH.replace("ShareGameRoom","GameNameSetup");
  return(URL)
}


class ShareGameRoom extends React.Component {
  constructor(props) {
   super(props);
  this.mounted = false;
   this.state = {
   isLinkShareOpen: false,
     isSubmitted: false,
     iscopedOPen:false,
     iscopyToClipboard:false
   };
   this.LinkShareOpen = this.LinkShareOpen.bind(this);
   this.LinkShareClose = this.LinkShareClose.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.ModalChenge = this.ModalChenge.bind(this);
   this.isClickInput = this.isClickInput.bind(this);
 };


 LinkShareOpen(){
   this.setState({isLinkShareOpen: true})
 }

 LinkShareClose(){
   this.setState({isLinkShareOpen: false});
   this.setState({iscopedOPen: false});
 }

 ModalChenge(){
            this.setState({isLinkShareOpen: false})
            this.setState({iscopedOPen: true})
            this.setState({iscopyToClipboard: true})
        }

isClickInput(){
    this.setState({iscopyToClipboard: true})
}



  handleSubmit(){
    if(this.state.iscopyToClipboard){
      const PATH = window.location.pathname;
      const RoomPATH = PATH.replace("ShareGameRoom","GameNameSetup");
      this.props.history.push(RoomPATH);　//withRouter

    }else{
      document.getElementById("infomationArea").innerText="招待リンクをコピーしてね"
    }
  }





        // }
       // モーダルをモーダル外をクリックしても閉じる

LinkShareClose3(e){
    if(!e.target.closest('.modal') && !e.target.closest('.btn_square')) {
       this.setState({isLinkShareOpen: false})
       this.setState({iscopedOPen: false})
     }
}



       // マウント時、アンマウント時に実行させる。
   componentDidMount() {
      this.eventHandler = this.LinkShareClose3.bind(this);
      document.addEventListener('click',this.eventHandler)
   }

   componentWillUnmount(){
       document.removeEventListener('click',this.eventHandler)
   }


  render(){

    let Modal;
    if(this.state.isLinkShareOpen){
      Modal = (
        <M.LinkShareModal
          value={CreateShareURL()}
          user_function_click_input={()=>{this.isClickInput()}}
          user_function={()=>{this.ModalChenge()}}
          />
      )
    }

    if(this.state.iscopedOPen){

      Modal = (
        <M.LinkShareModal_copied
          user_function={()=>{this.LinkShareClose()}}
          />

      )


    }





      return (
        <div>


          {Modal}
          <Comp.MainColorMidashiH2
            texts="ShareGameRoom"
            />

          <Comp.InfomationArea
            texts="一緒に遊ぶ仲間に<br>リンクをシェアしてはじめよう！"
            />


          <div onClick={() => {this.LinkShareOpen()}}>
            <Btn.MainColorBtn texts="招待リンクをシェア"/>
          </div>



          <Comp.InfomationArea
            id="infomationArea"
            texts="友達にリンクをシェアできたら<br>完了ボタンを押してね"
            />


          <div onClick={(event) => {this.handleSubmit(event)}}>
            <Btn.MainColorBtn texts="完了ボタン"/>
          </div>

        </div>

      );
    }



}

export default withRouter(ShareGameRoom);　//withRouter
