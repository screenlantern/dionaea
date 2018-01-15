import React, { Component } from 'react';
import { Layout } from 'react-mdl';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { itemsPerCollection } from '../utils';
import HeaderBar from './Header';
import Sidebar from './Sidebar';
import AttackView from './AttackView';
import ProtocolView from './ProtocolView';
import './Dashboard.css';

export default
class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            perProtocol: {},
            perCountry: {},
            overlay: 'closed'
        }

        this.overlayOpen = this.overlayOpen.bind(this);
        this.overlayClose = this.overlayClose.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:9000/api/connections/200')
        .then(res => res.json())
        .then(data => {
            this.setState({
                data
            });
            this.perCountryCount();
        }); 
    }

    perCountryCount() {
        const countries = this.state.data.map((c) => c.locale_info.country );
        this.setState({
            perCountry: itemsPerCollection(countries)
        });
    }

    perProtocolCount() {
        const conns = this.state.data.map((p) => p.connection_protocol );
        this.setState({
            perProtocol: itemsPerCollection(conns)
        });
    }

    overlayOpen() {
        this.setState({
            overlay: 'open'
        });
    }

    overlayClose() {
        this.setState({
            overlay: 'closed'
        });
    }

    render() {
        return(
            <Router>
            <div className="dashboard">
                <Layout>
                    <HeaderBar />
                    <Sidebar />
                <AttackView 
                    attacks={this.state.perCountry} 
                    dataCol={this.state.data} 
                    open={this.state.overlay}
                    overlayOpen={this.overlayOpen}
                    overlayClose={this.overlayClose}
                />
                </Layout>
                <Route path="/protocol" component={ProtocolView} />
            </div>
            </Router>
        );
    }
}