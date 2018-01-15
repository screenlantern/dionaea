import React, { Component } from 'react';
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
    Markers,
    Marker,
    Annotations,
    Annotation
  } from "react-simple-maps"

import { scaleLinear } from "d3-scale"
const cityScale = scaleLinear()
  .domain([0,37843000])
  .range([1,25])


export default
class IpMap extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            zoom: 1
        }
    }

    handleZoomIn() {
        this.setState({
            zoom: this.state.zoom * 2,
        })
     }
    handleZoomOut() {
        this.setState({
            zoom: this.state.zoom / 2,
        })
    }

    handleGClick(geography, evt) {
        console.log("Geography data: ", geography)
    }

    handleMClick(marker, evt) {
        console.log("Marker data: ", marker)
    }

    render() {
        return(
            <div className="dashboard__map" >
                <ComposableMap
                width="1440"
                height="1080"
                projectionConfig={{
                    scale: 350,
                    rotation: [-10,0,0],
                    yOffset: 65,
                    xOffset: -15, 
                  }}
                >
                <ZoomableGroup zoom={ this.state.zoom }
                center={[0,0]}
                onMoveStart={this.handleMoveStart}
                onMoveEnd={this.handleMoveEnd} 
                >
                    <Geographies geography={ "../assets/world-50m-simplified.json" }>
                    {(geographies, projection) => geographies.map((geography, i) => (
                        <Geography key={ `geography-${i}` } geography={ geography } projection={ projection }
                        onClick={this.handleGClick} 
                        style={{
                            default: {
                              fill: "#999",
                              stroke: "#F6F6F6",
                              strokeWidth: 0.5,
                              outline: "none",
                            },
                            hover:   { fill: "#666" },
                            pressed: { fill: "#000" },
                          }}
                        />
                    ))}
                    </Geographies>
                    <Markers>
                    { this.props.dataCol.map((m, i) => {
                        const count = this.props.attacks[m.locale_info.country] || [];
                        return (
                                <Marker
                                key={ i }
                                marker={{ coordinates: [m.locale_info.lon, m.locale_info.lat] }}
                                onClick={ this.handleMClick }
                                style={{
                                    default: { fill: "rgba(255, 87, 34, 0.4)", stroke:"rgb(96, 125, 139)", strokeWidth: 1.25 },
                                    hover:   { fill: "rgba(43, 119, 132, 0.2)"  },
                                    pressed: { fill: "rgb(96, 125, 139)" },
                                }}
                                >
                                <circle cx={ 0 } cy={ 0 } r={count.length} />
                                </Marker>
                            );
                    })}
                    </Markers>
                    {/* <Annotations>
                    {
                    this.props.dataCol.map((a, i) => (
                        <Annotation
                            key={i}
                            dx={ -30 }
                            dy={ 30 }
                            subject={ [m.locale_info.lon, m.locale_info.lat] }
                            strokeWidth={ 1 }
                            stroke="#1B4E5D"
                            curve={-0.5}
                            zoom={2}
                            >
                            <text fill="#1B4E5D" strokeWidth={ 2 }>
                            { `${a.remote_host}` }
                            </text>
                        </Annotation>
                     ))
                    }
                    </Annotations> */}
                </ZoomableGroup>
                </ComposableMap>
            </div>
        );
    }
}