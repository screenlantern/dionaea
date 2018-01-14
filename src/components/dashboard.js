import React, { Component } from 'react';
import { Layout, FABButton, Icon } from 'react-mdl';
import { ipsPerCountry } from '../utils';
import HeaderBar from './Header';
import Sidebar from './Sidebar';
import Map from './Ipmap';
import OverlayList from './Overlay';
import './dashboard.css';

export default
class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            ipData: [],
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
            this.buildMapObjects();
            this.perCountryCount();
        }); 
    }

    buildMapObjects(){
        const ips = this.state.data.map((obj) => {
            console.log(obj);
            return({
                "properties": {
                    "city": obj.locale_info.city,
                    "country": obj.locale_info.country,
                    "coords": [obj.locale_info.lon, obj.locale_info.lat],
                    "ip": obj.remote_host
                }
            });
        }); 
        this.setState({
            ipData: ips
        });
    }

    perCountryCount() {
        const countries = this.state.ipData.map((c) => c.properties.country );
        this.setState({
            perCountry: ipsPerCountry(countries)
        });
        console.log(this.state.perCountry);
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
                        <Map dataCol={this.state.ipData} />
                        <FABButton className="overlay-open" onClick={this.overlayOpen} colored ripple>
                            <Icon name="last_page" />
                        </FABButton>
                    </main> 
                    <OverlayList attacks={this.state.perCountry} overlayClose={this.overlayClose} open={this.state.overlay} />
                </Layout>
               
            </div>
        );
    }
}