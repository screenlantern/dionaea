import React, { Component } from 'react';
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
                <button onClick={this.props.overlayClose} type="button" className="overlay-close">Close</button>
            </div>
        );
    }

}