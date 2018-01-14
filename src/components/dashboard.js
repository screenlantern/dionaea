import React, { Component } from 'react';
import { Layout } from 'react-mdl';
import HeaderBar from './header';
import Sidebar from './sidebar';
import Map from './ipmap';
import './dashboard.css';

export default
class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            ipData: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:9000/api/connections/25')
        .then(res => res.json())
        .then(data => {
            this.setState({
                data
            });
            this.buildMapObjects();
        }); 
    }

    buildMapObjects(){
        const ips = this.state.data.map((obj) => {
            console.log(obj);
            return({
                "properties": {
                    "city": obj.locale_info.city,
                    "country": obj.locale_info.country,
                    "coords": [obj.locale_info.lon, obj.locale_info.lat]
                }
            });
        }); 

        this.setState({
            ipData: ips
        });
    }

    render() {
        return(
            <div className="dashboard" >
                <Layout>
                    <HeaderBar />
                    <Sidebar />
                    <main className="dashboard__main">
                        <Map dataCol={this.state.ipData} />
                    </main>
                </Layout>
            </div>
        );
    }
}