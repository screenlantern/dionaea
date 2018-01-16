import React, { Component } from 'react';
import { AreaChart,
     Tooltip, 
     linearGradient, 
     XAxis, 
     YAxis, 
     ResponsiveContainer, 
     CartesianGrid, 
     Area } from 'recharts';

class ProtocolView extends Component {
    constructor(props) {
        super(props)
    }

    populateChart(){
        const list = [];
        for(const [protocol, value] of Object.entries(this.props.connections)) {
            list.push({name:protocol, connections: value.length, amt: value.length});
        }
        return list;
    }

    render(){
        return(
            <ResponsiveContainer width={700} height="33%">
            <AreaChart data={this.populateChart()}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis dataKey="amt"/>
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="connections" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart> 
            </ResponsiveContainer>
        );
    }

}

export default ProtocolView;