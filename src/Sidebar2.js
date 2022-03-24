import React from 'react'
import './Sidebar2.css';
import Sidebar2Row from './Sidebar2Row.js';
import './Sidebar2Row.css';
import { Link } from 'react-router-dom';
import { Avatar, Button } from '@material-ui/core';

function Sidebar2() {
    return (
        
        <div className="sidebar2">
            <div class="hr" />

            <div class="details">

            
            <h1>Developer Contacts</h1>
            
                <i class="searchIcon2" />
                <i class="more" />
            </div>

            <div class="contacts">

        
            <hr/>
            <a href="http://healmesd.blogspot.com">
            <Sidebar2Row ImageURL="https://scontent.fhyd11-1.fna.fbcdn.net/v/t1.0-1/p148x148/118481251_3275143269198791_1562775451854010190_n.jpg?_nc_cat=102&_nc_sid=dbb9e7&_nc_ohc=DJ5eF_SWz8gAX_k1CMp&_nc_ht=scontent.fhyd11-1.fna&tp=6&oh=3eb6fe833a57e157b042a857b554baba&oe=5F739318" title="Blog" click="www.google.com" />
            </a><p>contact on Blogspot - HealmeSD</p>
            

            <hr/>
            <a href="https://www.youtube.com/channel/UCMOG8LgxJOK1uuQbNHNsncQ">
            <Sidebar2Row ImageURL="https://scontent.fhyd11-1.fna.fbcdn.net/v/t1.0-1/p148x148/118481251_3275143269198791_1562775451854010190_n.jpg?_nc_cat=102&_nc_sid=dbb9e7&_nc_ohc=DJ5eF_SWz8gAX_k1CMp&_nc_ht=scontent.fhyd11-1.fna&tp=6&oh=3eb6fe833a57e157b042a857b554baba&oe=5F739318" title="Youtube" click="www.google.com" />
            </a><p>contact on Youtube - Healer</p>
            

            
            <hr/><hr/><hr/>
            <h1>explore</h1>
            
            
            <a href="http://youtube.com">
            <Sidebar2Row ImageURL="https://www.kindpng.com/picc/m/11-114674_youtube-social-white-circle-youtube-logo-2017-png.png" title="Youtube"  />
            </a>
            
            <a href="http://facebook.com">
            <Sidebar2Row ImageURL="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIhGH1OFEycIaqiGZETUhZs9_CtSulCmIIFkQ4OZa_Ngo9rNTV9HVZeAd2a2Jvdh_pRmk&usqp=CAU" title="FaceBook" click="#" />
            </a>
            
            <a href="http://tiktok.com">
            <Sidebar2Row ImageURL="https://www.pngitem.com/pimgs/m/523-5231038_tiktok-logo-kreis-circle-black-white-black-tick.png" title="TikTok" click="#" />
            </a>
            
            <a href="http://linkedin.com">
            <Sidebar2Row ImageURL="https://www.kindpng.com/picc/m/363-3632986_logo-linkedin-png-rond-transparent-png.png" title="LinkedIn" click="#" />
            </a>
            

            </div>
    









        <div className="sidebar3">
            <div className="sidebar3__languages">
                <p className="sidebar3__selected">English (UK) · </p>
                <p>English (US) · </p>
                <p>हिन्दी · </p>
                <p>اردو · </p>
                <p>தமிழ் · </p>
            </div>
            <div className="sidebar3__policies">
                <p>Privacy · </p>
                <p>Terms · </p>
                <p>Advertising · </p>
                <p>AdChoices · </p>
                <p>Cookies · </p>
                <p>More</p>
            </div>
            <p className="copyright">Hello © 2021</p>
        </div>
        </div>
    )
}

export default Sidebar2
