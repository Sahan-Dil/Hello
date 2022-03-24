import React from 'react'
import './Sidebar.css';
import SidebarRow from './SidebarRow.js';
import { Link } from 'react-router-dom'

function Sidebar({ user }) {

    const url = '/' + user.displayName + '/' + user.uid;

    return (
        <div className="sidebar">
            <Link to={url}>
                <SidebarRow avatar ImageLink={user?.photoURL} title={user?.displayName} />
            </Link>

            <Link to ="/">
            <SidebarRow ImageLink="https://www.flaticon.com/premium-icon/icons/svg/1674/1674711.svg" title="News Feed"/>
            </Link>

            <SidebarRow/>

            <SidebarRow title="Explore"/>

            <SidebarRow/>

            <Link to="/news">
            <SidebarRow ImageLink="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/duk32h44Y31.png" title="News" />
            </Link>

            <Link to="/game">
            <SidebarRow ImageLink="https://findicons.com/files/icons/2198/dark_glass/128/jabber_group.png" title="Games" />
            </Link>

            <Link to="/chat">
            <SidebarRow ImageLink="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/4Y9Xi2D3hJv.png" title="Chat" />
            </Link>
            
            <SidebarRow/>


            <div class="hr" />
            <div class="policies">
                <p>Privacy</p>
                <p class="dot">·</p>
                <p>Terms</p>
                <p class="dot">·</p>
                <p>Advertising</p>
                <p class="dot">·</p>
                <p>Ad choices</p>
                <i class="ads" />
                <p class="dot">·</p>
                <p>Cookies</p>
                <p class="dot">·</p>
                <p>More</p>
                <p class="dot">·</p>
                <p>Hello © 2021</p>
            </div>
        </div>
    )
}

export default Sidebar
