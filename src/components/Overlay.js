import React, { Component } from 'react';
import { FABButton, Icon } from 'react-mdl';
import AttackList from './AttackList';
import AttackChart from './AttackChart';
export default
class Overlay extends Component{
    constructor(props) {
        super(props);
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
                    <div className="overlay-row">
                        <div className="col">
                            {
                                this.attacksList().map( (obj, i) => (
                                    <AttackList key={i} country={obj.country} amount={obj.attacks} />
                                ))
                            }
                        </div>
                        <div className="col">
                            <AttackChart attacks={this.props.attacks} />
                        </div>
                    </div>
                </div>
                <FABButton className="overlay-close" onClick={this.props.overlayClose} colored ripple>
                    <Icon name="first_page" />
                </FABButton>
            </div>
        );
    }

}