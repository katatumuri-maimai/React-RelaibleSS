import React from 'react';
import { Route,Switch} from 'react-router-dom'
import { withRouter } from 'react-router';　//withRouter
import '../../css/games/GameRoom.css';
import "firebase";
import "../../firebase/config.js";
import *as St from '../../js/components/GameStates';
import GameRoomsetTitle from './GameRoomsetTitle';
import GameRoomSetGenre from './GameRoomSetGenre';
import GameRoomConfirm from './GameRoomConfirm';


class GameRoom extends React.Component {
  constructor(props){
    super(props);
      this.state={
        isTitlepage:false,
        isT1page:false,
        isGenepage:false,
        isT2page:false,
        isConfpage:false,

      };
  }

async setTitlepageStates(){
  await this.setState({isTitlepage:true})
  // console.log(this.state.isTitlepage);
}
async setT1pageStates(){
  await this.setState({isT1page:true})
  // console.log(this.state.isT1page);
}
async setGenepageStates(){
  await this.setState({isGenepage:true})
  // console.log(this.state.isGenepage);
}
async setT2pageStates(){
  await this.setState({isT2page:true})
  // console.log(this.state.isT2page);
}
async setConfpageStates(){
  await this.setState({isConfpage:true})
  // console.log(this.state.isConfpage);
}

  render(){

      return (
        <div className="GameRoom">
          <div>
            <h1>ゲーム開始</h1>
            </div>

          <div id="GameState" className="GameState flex_row">
            <St.GameStatesNum
              className={this.state.isTitlepage?"GameState_Num GameState_Num_Now":"GameState_Num"}
              num="1"
              />
              <St.GameStatesT
                className={this.state.isT1page?"GameState_T GameState_T_Now":"GameState_T"}
                num="1"
                />
            <St.GameStatesNum
              className={this.state.isGenepage?"GameState_Num GameState_Num_Now":"GameState_Num"}
              num="2"
              />
              <St.GameStatesT
                className={this.state.isT2page?"GameState_T GameState_T_Now":"GameState_T"}
                num="2"
                />
            <St.GameStatesNum
              className={this.state.isConfpage?"GameState_Num GameState_Num_Now":"GameState_Num"}
              num="3"
              />


          </div>


            <Switch>
              <Route exact path='/GameRoom' component={GameRoomsetTitle}/>
              <Route path='/GameRoom/GameRoomsetTitle' component={GameRoomsetTitle}>
                <GameRoomsetTitle
                  isTitlepage={()=>{this.setTitlepageStates()}}
                  isT1page={()=>{this.setT1pageStates()}}
                  />
              </Route>
              <Route path='/GameRoom/GameRoomSetGenre' component={GameRoomSetGenre}>
                <GameRoomSetGenre
                  isGenepage={()=>{this.setGenepageStates()}}
                  isT2page={()=>{this.setT2pageStates()}}
                  />
              </Route>
              <Route path='/GameRoom/GameRoomConfirm' component={GameRoomConfirm}>
                <GameRoomConfirm
                  isConfpage={()=>{this.setConfpageStates()}}
                  />
              </Route>
            </Switch>


        </div>
      );
    }



}

export default withRouter(GameRoom);　//withRouter
