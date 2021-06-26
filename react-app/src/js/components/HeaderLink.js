import React from 'react';
import { Link } from 'react-router-dom'
import '../../css/components/HeaderLink.css';




class HeaderLink extends React.Component {

  render(){

    const className = "global_menu_list_Item";

    return(
      <div className={className}>
        <Link to = {this.props.linkto}><i className={this.props.iclassName}></i>{this.props.name}</Link>
      </div>

)
}
    }

    class HeaderSNSLink extends React.Component {

      render(){
        return(
            <div>
              <Link to = {this.props.linkto}><i className={this.props.iclassName} style={this.props.iconcolor}></i>{this.props.name}</Link>
            </div>

    )
    }
        }



export default HeaderLink;
export  {HeaderSNSLink};
