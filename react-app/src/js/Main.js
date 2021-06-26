import React from 'react';
import { Route,Switch } from 'react-router-dom'
import '../css/Main.css';
import TopPage from './pages/Top';
import Mypage from './pages/Mypage';
import Login from './pages/Login';
import HowToUse from './pages/HowToUse';
import NewGame from './games/NewGame';
import GameRoom from './games/GameRoom';
import WriteRoom from './games/WriteRoom';
import GameResult from './games/GameResult';




class Main extends React.Component {

  render(){
      return (
        <main>
          <Switch>
            <Route exact path='/' component={TopPage}/>
            <Route path='/Mypage' component={Mypage}/>
            <Route path='/Login' component={Login}/>
            <Route path='/HowToUse' component={HowToUse}/>
            <Route path='/NewGame' component={NewGame}/>
            <Route path='/GameRoom' component={GameRoom}/>
            <Route path='/WriteRoom' component={WriteRoom}/>
            <Route path='/GameResult' component={GameResult}/>
          </Switch>
        </main>

      );
    }



}

export default Main;
