import React from 'react';
import { Header, Navigation } from 'react-mdl';

const HeaderBar = (props) => {
    return(
        <Header className="dasboard__header"  title="Dionaea" >
            <Navigation>
                <a href="#">Logout</a>
            </Navigation>
        </Header>
    );
}

export default HeaderBar;