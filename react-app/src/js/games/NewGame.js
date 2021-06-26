import React from 'react';
import { Route,Switch} from 'react-router-dom'
import { withRouter } from 'react-router';　//withRouter
import '../../css/games/Game.css';
import NewGameCreateRoom  from './NewGameCreateRoom';
import GameNameSetup from './GameNameSetup';
import ShareGameRoom from './ShareGameRoom';
import GameRoomSetup from './GameRoomSetup';



class NewGame extends React.Component {

  render(){



      return (
        <div className="NewGame">


        <div>
          <h1>新しく書き始める</h1>
          </div>
            <Switch>
              <Route exact path='/NewGame' component={NewGameCreateRoom}/>
              <Route path='/NewGame/ShareGameRoom' component={ShareGameRoom}/>
              <Route path='/NewGame/GameNameSetup' component={GameNameSetup}/>
              <Route path='/NewGame/GameRoomSetup' component={GameRoomSetup}/>
            </Switch>

        </div>
      );
    }



}

export default withRouter(NewGame);　//withRouter
