import React, { Component } from 'react';
import { LineChart, Legend, Tooltip, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

export default
class Chart extends Component{
    constructor(props) {
        super(props);
    }

    populateChart(){
        const list = [];
        for(const [country, value] of Object.entries(this.props.attacks)) {
            list.push({name:country, pv: value.length, amt: value.length});
        }
        return list;
    }

    render(){
        return(
            <LineChart width={730} height={250} data={this.populateChart()}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#F95724" />
            </LineChart>
        );
    }

}