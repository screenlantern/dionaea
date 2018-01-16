import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Navigation } from 'react-mdl';

const SideBar = (props) => {
    return(
        <Drawer className="dashboard__sidebar" title="">
            <Navigation>
                <Link to="/">Attacks Per Country</Link>
                <Link to="/protocols">Connections Per Protocol</Link>
            </Navigation>
        </Drawer>
    );
}

export default SideBar;
