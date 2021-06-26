import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.svg';
import '../css/Header.css';
import HeaderLink,{HeaderSNSLink} from './components/HeaderLink';
import *as Btn from './components/Btn';





class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isGlobalMenuOpen: false
    };
  }

  handleClickGlobalMenu() {
    this.setState({isGlobalMenuOpen: true});
  }

  handleClickGlobalMenuClose() {
    this.setState({isGlobalMenuOpen: false});
  }

  render() {
    let global_menu;
    const HeaderTextLinkList = [
      {
        name:"ホーム",
        iclassName:"fas fa-home",
        linkto:"/"
      },
      {
        name:"マイページ",
        iclassName:"far fa-user-circle",
        linkto:"/Mypage"
      },
      {
        name:"使い方を見る",
        iclassName:"fas fa-book-reader",
        linkto:"/HowToUse"
      },
      {
        name:"新しく書き始める",
        iclassName:"fas fa-plus",
        linkto:"/"
      },
      {
        name:"ログイン",
        iclassName:"fas fa-sign-in-alt",
        linkto:"/"
      },
      {
        name:"無料会員登録",
        iclassName:"far fa-address-book",
        linkto:"/"
      },
      {
        name:"お問い合わせ",
        iclassName:"far fa-envelope",
        linkto:"/"
      }
      ];

      const HeaderSNSLinkList = [{
        name:"Twitter",
        iclassName:"fab fa-twitter-square",
        iconcolor:{color: '#00D3FF'},
        linkto:"./"
      }
    ];


    // if文を用意してください
    if (this.state.isGlobalMenuOpen) {
      global_menu = (
        <nav id="global_menu" className="global_menu">
        <div id="global_menu_btn_close" onClick={()=> {this.handleClickGlobalMenuClose()}}>
          <Btn.ToggleBtn/>
        </div>

        <div className="global_menu_list flex_row" onClick={()=> {this.handleClickGlobalMenuClose()}}>
          {HeaderTextLinkList.map((HeaderTextLinkItem)=>{
            return(
              <HeaderLink
                name={HeaderTextLinkItem.name}
                iclassName={HeaderTextLinkItem.iclassName}
                linkto={HeaderTextLinkItem.linkto}
                />
            );
          })}
        </div>

        <div className="global_menu_sns flex_row" onClick={()=> {this.handleClickGlobalMenuClose()}}>

        {HeaderSNSLinkList.map((HeaderSNSLinkItem)=>{
          return(
            <HeaderSNSLink
              name={HeaderSNSLinkItem.name}
              iclassName={HeaderSNSLinkItem.iclassName}
              iconcolor={HeaderSNSLinkItem.iconcolor}
              linkto={HeaderSNSLinkItem.linkto}
              />
          );
        })}

      </div>


      </nav>);
    }

    return (<div className="Header">

      <header>
        <div id="global_menu_btn" className="global_menu_btn" onClick={() => {this.handleClickGlobalMenu()}}>
          <i className="fas fa-bars"></i>
          <p>メニュー</p>
        </div>
        <div id="logo" className="logo">
          <Link to = "/"><img src={logo} alt="logo"/></Link>
        </div>

        {global_menu}

        <div className="global_menu_mypage_btn" onClick={()=> {this.handleClickGlobalMenuClose()}}>
            <Link to ="/Mypage">
            <i className="far fa-user-circle"></i>
            <p>マイページ</p></Link>

        </div>

      </header>

    </div>);
  }

}



export default Header;
