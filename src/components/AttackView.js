import React from 'react';
import {FABButton, Icon, Tooltip } from 'react-mdl';
import OverlayList from './Overlay';
import Map from './Ipmap';

const AttackView = (props) => (
    <div>
    <main className="dashboard__main">
    <Map attacks={props.attacks} dataCol={props.dataCol} />
    <Tooltip label="Open Pane" position="bottom">
        <FABButton className="overlay-open" onClick={props.overlayOpen} colored ripple>
            <Icon name="last_page" />
        </FABButton>
    </Tooltip>
    </main> 
    <OverlayList attacks={props.attacks} overlayClose={props.overlayClose} open={props.open} />
    </div>
);

export default AttackView;

