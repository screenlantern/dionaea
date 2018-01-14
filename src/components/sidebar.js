import React from 'react';
import { Drawer, Navigation } from 'react-mdl';

const SideBar = (props) => {
    return(
        <Drawer className="dashboard__sidebar" title="">
            <Navigation>
                <a href="#">Attacks Per Country</a>
            </Navigation>
        </Drawer>
    );
}

export default SideBar;