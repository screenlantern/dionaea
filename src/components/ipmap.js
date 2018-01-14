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
    handleMoveStart(currentCenter) {
        console.log("New center: ", currentCenter)
    }
      
    handleMoveEnd(newCenter) {
        console.log("New center: ", newCenter)
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
                  }}
                >
                <ZoomableGroup zoom={ this.state.zoom }
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
                              stroke: "#FFF",
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
                            default: { fill: "#BE465B" },
                            hover:   { fill: "#2B7784" },
                            pressed: { fill: "#000" },
                        }}
                        >
                        <circle cx={ 0 } cy={ 0 } r={ 10 } />
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
                        >
                        <text>
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