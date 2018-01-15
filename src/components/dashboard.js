import React, { Component } from 'react';
import { Layout, FABButton, Icon, Tooltip } from 'react-mdl';
import { itemsPerCollection } from '../utils';
import HeaderBar from './Header';
import Sidebar from './Sidebar';
import Map from './Ipmap';
import OverlayList from './Overlay';
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
            <div className="dashboard">
                <Layout>
                    <HeaderBar />
                    <Sidebar />
                    <main className="dashboard__main">
                        <Map attacks={this.state.perCountry} dataCol={this.state.data} />
                        <Tooltip label="Open Pane" position="bottom">
                            <FABButton className="overlay-open" onClick={this.overlayOpen} colored ripple>
                                <Icon name="last_page" />
                            </FABButton>
                        </Tooltip>
                    </main> 
                    <OverlayList attacks={this.state.perCountry} overlayClose={this.overlayClose} open={this.state.overlay} />
                </Layout>
               
            </div>
        );
    }
}