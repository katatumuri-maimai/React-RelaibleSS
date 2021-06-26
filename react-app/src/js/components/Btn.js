import React from 'react';
import { Link } from 'react-router-dom'
import '../../css/components/Btn.css';
import {animateScroll as scroll } from "react-scroll";




class MainColorBtn extends React.Component {
  render(){
      const link = this.props.link;
      const url = this.props.url;
      const id = this.props.id;
      const className = "btn_maincolor btn_icon btn_square btn_shadow";

      if(link !== undefined){
        return(
          <div className={className} id={id} onClick={this.props.onClick}>
            <Link to = {this.props.link}>{this.props.texts}</Link>
          </div>
        )
      }else if(url !== undefined){
        return(
          <div className={className} id={id} onClick={this.props.onClick}>
          <a href={this.props.url}>{this.props.texts}</a>
          </div>
        )
      }else{
      return(
        <div className={className} id={id} onClick={this.props.onClick}>
          <div className="a">
            {this.props.texts}
          </div>
        </div>
      )

      }

}

}


class AccentColorBtn extends React.Component {


  render(){
      let link;
      let url;
      link = this.props.link;
      url = this.props.url;
      const id = this.props.id;
      const className = "btn_accentcolor btn_icon btn_square btn_shadow";

      if(link !== undefined){
        return(
          <div className={className} id={id}  onClick={this.props.onClick}>
            <Link to = {this.props.link}>{this.props.texts}</Link>
          </div>
        )
      }else if(url !== undefined){
        return(
          <div className={className} id={id}  onClick={this.props.onClick}>
          <a href={this.props.url}>{this.props.texts}</a>
          </div>
        )
      }else{
      return(
        <div className={className} id={id}  onClick={this.props.onClick}>
          <div className="a">
            {this.props.texts}
          </div>
        </div>
      )

      }

}
}



class BackTopBtn extends React.Component {
   constructor(props) {
    super(props);
    this.state={
      isBtnActive:false,
    }
    this.ReturnTop = this.ReturnTop.bind(this);
    // this.ScrolllWindow = this.ScrolllWindow.bind(this);
    // this.useEffect = this.useEffect.bind(this);
    // this.state = {isBtnActive:false};
    // this.useEffectThrottled = throttle(this.useEffect, 1000);
    // this.TScrolllWindowhrottled = throttle(this.ScrolllWindow, 10);
  }

  ReturnTop(){
    scroll.scrollToTop();
  }

  componentDidMount(){
    this.useEffect()

  }

  ScrolllWindow(){
    const top = 100;
    let NowScroll = Math.max(window.pageYOffset,document.documentElement.scrollTop,document.body.scrollTop);
    // const target = document.getElementById('backtotop-btn');
    // console.log("aaa");

    if (top <= NowScroll) {
      if(this.state.isBtnActive!==true){
      this.setState({isBtnActive:true});
    }
    } else {
      if(this.state.isBtnActive!==false){
      this.setState({isBtnActive:false});
    }
    }
  }




  useEffect(){
    document.addEventListener("scroll", event => this.ScrolllWindow(), { passive: true });
    document.removeEventListener("scroll", event => this.ScrolllWindow(), { passive: true });
  }



  render(){
      // this.useEffectThrottled();
      // this.ScrolllWindow();

      // const normalStyle = "backtotop-btn";
      // const activeStyle = "backtotop-btn fadein";
      // const className = this.state.isBtnActive ? activeStyle : normalStyle;className={className}
      return(
        <div >
          <div id="backtotop-btn" className={this.state.isBtnActive?"backtotop-btn fadein":"backtotop-btn"} onClick={()=>{this.ReturnTop()}}>
            <i className="fas fa-caret-up"></i>
          </div>
        </div>

      )


    }
}

class ToggleBtn extends React.Component {

  render(){
    return(
      <div className="btn_maincolor btn_close" >
        <i className="far fa-window-close"></i>
        <p>閉じる</p>
      </div>

    )
      }

}




export {MainColorBtn};
export {AccentColorBtn};
export {BackTopBtn};

export {ToggleBtn};
