import React from 'react';
import '../../css/components/GameStates.css';



class GameStatesNum extends React.Component {
  constructor(props){
    super(props);
    this.state={
    };
  };

id(){
  const num=this.props.num
  const id = "GameState_Num_"+num

  return(id)
}

  render(){

    return(
      <div id={this.id()} className={this.props.className} >
        {this.props.num}
      </div>
    )
  // }


};
}

class GameStatesT extends React.Component {
  constructor(props){
    super(props);
    this.state={
    };
  };

id(){
  const num=this.props.num
  const id = "GameState_T_"+num

  return(id)
}

  render(){

    return(
      <div id={this.id()}  className={this.props.className} >
        <i className="fas fa-caret-right"></i>
      </div>
    )
  // }


};
}

export {GameStatesNum};

export {GameStatesT};
