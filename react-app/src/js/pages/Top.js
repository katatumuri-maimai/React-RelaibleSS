import React from 'react';
import {MainColorBtn,AccentColorBtn}  from '../components/Btn';
import '../../css/Main.css';




class TopPage extends React.Component {

  render(){
      return (
        <main>
          <h1>SSリレー小説ゲーム</h1>
          <div className="start_menu">
            <div className="flex_row">
            <MainColorBtn
              link = "/NewGame"
              texts = "新しく書き始める"
            />
            <MainColorBtn
              link = "/HowToUse"
              texts = "使い方を見る"
            />
            </div>

            <div className="flex_column">
              <AccentColorBtn
                link = "/Login"
                texts = "ログイン/無料会員登録"
                />
            </div>
            </div>
        </main>

      );
    }



}

export default TopPage;
