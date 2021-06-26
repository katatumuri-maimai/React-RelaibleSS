import React from 'react';
import '../../css/components/Texts.css';
import '../../css/components/Btn.css';
import {Kaigyo} from './original-function'




class MainColorMidashiH2 extends React.Component {

  render(){

    return(
      <div className="btn_maincolor btn_square h2">
        <h2>{this.props.texts}</h2>
      </div>

    )

      }

}



class AccentColorMidashiH2 extends React.Component {

  render(){

    return(
      <div className="btn_accentcolor btn_square h2">
        <h2>{this.props.texts}</h2>
      </div>
    )

      }

}


class InfomationArea extends React.Component {

  render(){
    let InfomationText = Kaigyo(this.props.texts);
    return(
      <div className="InfomationArea" id={this.props.id}>
        {InfomationText}
      </div>

    )

      }

}

class InputNumber extends React.Component {

  render(){

    return(
      <div className="InputNumber" >

      <label htmlFor={this.props.InputNumberFor}>{this.props.texts}</label>
        <input id={this.props.InputNumberFor} type="number" placeholder={this.props.placeholder} max={this.props.max}  min={this.props.min} />

    </div>
    )

      }

}

class InputText extends React.Component {

  render(){
    const className="InputText "+this.props.className

    return(
      <div className={className} >

      <label htmlFor={this.props.InputTextFor}>{this.props.texts}</label>
        <input id={this.props.InputTextFor}  placeholder={this.props.placeholder}   maxLength={this.props.max}  minLength={this.props.min}  />

    </div>
    )

      }

}

class TextArea extends React.Component {

  render(){
    return(
      <div className="textarea">

      <label htmlFor={this.props.InputTextFor}>{this.props.texts}</label>
        <textarea onChange={this.props.onChange} onFocus={this.props.onFocus}  id={this.props.InputTextFor} className={this.props.className} defaultValue={this.props.value} placeholder={this.props.placeholder}  disabled={this.props.disabled}  maxLength={this.props.max}  minLength={this.props.min} ></textarea>

    </div>
    )

      }

}

class SironukiText extends React.Component {

  render(){

    return(
      <div className="SironukiText" >

      <div className="Text_label">{this.props.label}</div>
        <div id={this.props.id} className="SironukiText_Text">
          {this.props.texts}
          </div>

    </div>
    )

      }

}



export {MainColorMidashiH2};
export {AccentColorMidashiH2};
export {InfomationArea};
export {InputNumber}
export {InputText}
export {TextArea}
export {SironukiText}
