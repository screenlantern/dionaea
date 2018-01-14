import React, { Component } from 'react';
import { FABButton, Icon } from 'react-mdl';
import AttackList from './AttackList';
export default
class Overlay extends Component{
    constructor(props) {
        super(props);
    }

    componentDidUpdate(){
        console.log(this.props);
    }

    attacksList(){
        const list = [];
        for(const [country, value] of Object.entries(this.props.attacks)) {
            list.push({country, attacks: value.length});
        }
        return list;
    }

    render(){
        return(
            <div className={`overlay overlay-door ${ (this.props.open === 'open')? 'open' : '' }`}>
                <div className="overlay-content">
                <h1>Attacks Per Country</h1>
                    {
                        this.attacksList().map( obj => (
                            <AttackList country={obj.country} amount={obj.attacks} />
                        ))
                    }
                </div>
                <FABButton className="overlay-close" onClick={this.props.overlayClose} colored ripple>
                    <Icon name="first_page" />
                </FABButton>
            </div>
        );
    }

}