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

export default
class IpMap extends Component {
    constructor(props) {
        super(props)
        console.log(props);
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
                width="1680"
                height="960"
                projectionConfig={{
                    scale: 350,
                    rotation: [-10,0,0],
                    yOffset: 65,
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
                              fill: "#666",
                              stroke: "#F6F6F6",
                              strokeWidth: 0.5,
                              outline: "none",
                            },
                            hover:   { fill: "#999" },
                            pressed: { fill: "#000" },
                          }}
                        />
                    ))}
                    </Geographies>
                    <Markers>
                    { this.props.dataCol.map((m, i) => (
                        <Marker
                        key={ i }
                        marker={{ coordinates: m.properties.coords }}
                        onClick={ this.handleMClick }
                        style={{
                            default: { fill: "#F95724", stroke:"#000", strokeWidth: 1.25 },
                            hover:   { fill: "#2B7784", stroke:"#000", strokeWidth: 1.25  },
                            pressed: { fill: "#000" },
                        }}
                        >
                        <circle cx={ 0 } cy={ 0 } r={ 7 } />
                        </Marker>
                    ))}
                    </Markers>
                    <Annotations>
                    {
                    this.props.dataCol.map((a, i) => (
                    <Annotation
                        key={i}
                        dx={ -30 }
                        dy={ 30 }
                        subject={  a.properties.coords}
                        strokeWidth={ 1 }
                        stroke="#F95724"
                        curve={0.5}
                        >
                        <text fill="#F95724">
                        { a.properties.country }
                        </text>
                        </Annotation>
                        ))
                    }
                    </Annotations>
                </ZoomableGroup>
                </ComposableMap>
            </div>
        );
    }
}