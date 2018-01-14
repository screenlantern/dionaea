import React from 'react';
import { Drawer, Navigation } from 'react-mdl';

const SideBar = (props) => {
    return(
        <Drawer title="">
            <Navigation>
                <a href="#">Link</a>
            </Navigation>
        </Drawer>
    );
}

export default SideBar;