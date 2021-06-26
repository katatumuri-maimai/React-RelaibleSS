import React from 'react';
import '../../css/components/Modals.css';
import *as Btn from './Btn';
import {copyToClipboard} from './original-function'


class LinkShareModal extends React.Component{
  constructor(props){
    super(props);
    this.state={
    };
  };

  clickInput(){
    return(
      this.props.user_function_click_input()
    )
  }

  clickBtn(){
    copyToClipboard()
    return(
      this.props.user_function()
    )
  }

  render(){
    return(
      <div className="modal">
      <div>
      <p>仲間をチームに招待しよう！</p>
      <input id="copyTarget" value={this.props.value} readOnly onSelect={()=>{this.clickInput()}}></input>
      <div onClick={() => {this.clickBtn()}}>
        <Btn.MainColorBtn
          texts="共有リンクをコピー"
          />
        </div>
        </div>
      </div>
    )


}
};


class LinkShareModal_copied extends React.Component {
  constructor(props){
    super(props);
    this.state={
    };
  };

clickBtn(){
  return(
    this.props.user_function()
  )
}

  render(){

    return(
            <div className="modal copied">
            <div onClick={()=>{this.clickBtn()}}>
              <Btn.ToggleBtn/>
            </div>
            <p>コピー完了♪</p>
            </div>
    )
  // }


};
}

class EndMogdal extends React.Component{
  constructor(props){
    super(props);
    this.state={
    };
  };

  clickBtn(){
    return(
      this.props.user_function()
    )
  }

  render(){
    return(
      <div className={this.props.className}>
      <div>
      <p>{this.props.texts}</p>
      <div onClick={this.props.onClick}>
        <Btn.MainColorBtn
          texts={this.props.btntexts}
          />
        </div>
        </div>
      </div>
    )


}
};



export {LinkShareModal_copied};

export {LinkShareModal};
export {EndMogdal};
