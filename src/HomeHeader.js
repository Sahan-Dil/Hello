import React, { useEffect, useState } from 'react'
import './HomeHeader.css';
import Avatar from "@material-ui/core/Avatar";
import { Link, useHistory } from 'react-router-dom';
import { auth,db } from './firebase.js';
import { useStateValue } from './StateProvider';
import logo4 from "./logo4.png";

function Header({ user, selected }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDown, setProfileDown] = useState(false);
  const history = useHistory("");
  const [{ notifications }, dispatch] = useStateValue();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    db.collection('posts').onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        if (doc.data().username == user.displayName) {
          db.collection('posts').doc(doc.id).collection('comments').onSnapshot((snapshot) => {
            snapshot.docs.map(doc => {
              console.log(doc.data())
              if (doc.data().username !== user.displayName) {
                dispatch({
                  type: 'ADD_TO_NOTIFICATIONS',
                  item: {
                    notification: doc.data(),
                  },
                });
              }
            });
          })
        }
      });

    });
  }, [user])

  if (user === false) {
    history.push("/login");
  }

  const logout = () => {
    if (user) {
      auth.signOut();
      history.push("/login");
    }
  }


  const renderNotifications = () => {
    if (notificationsOpen) {
      setNotificationsOpen(false)
      document.getElementsByClassName('dropdown-content2')[0].classList.remove('block')
    } else {
      setNotificationsOpen(true)
      setProfileDown(false)
      document.getElementsByClassName('dropdown-content')[0].classList.remove('block');
      document.getElementsByClassName('dropdown-content2')[0].classList.add('block');
    }
  }

  const renderProfile = () => {
    if (profileDown) {
      setProfileDown(false)
      document.getElementsByClassName('dropdown-content')[0].classList.remove('block');
    } else {
      setProfileDown(true);
      setNotificationsOpen(false)
      document.getElementsByClassName('dropdown-content2')[0].classList.remove('block');
      document.getElementsByClassName('dropdown-content')[0].classList.add('block');
    }
  }

  const collapseNavbar = () => {
    document.getElementsByClassName('homeHeader__logo')[0].style.display = 'block';
    document.getElementsByClassName('homeHeader__searchBack')[0].style.display = 'none';
    document.getElementsByClassName('searchBox')[0].style.display = 'none';
    document.getElementsByClassName('homeHeader__search')[0].style.display = 'block';
    document.getElementsByClassName('dropdown-content3')[0].style.display = 'none';
    document.getElementsByClassName('searchBox')[0].value = ""
  }

  const expandNavbar = () => {
    document.getElementsByClassName('homeHeader__logo')[0].style.display = 'none';
    document.getElementsByClassName('homeHeader__searchBack')[0].style.display = 'block';
    document.getElementsByClassName('homeHeader__search')[0].style.display = 'none';
    document.getElementsByClassName('searchBox')[0].style.display = 'block';
  }

  useEffect(() => {
    db.collection('users').onSnapshot((snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()))
    })

    if (users !== undefined) {
      const finalUsers = users.filter(user => {
        return user.displayName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      })

      setFilteredUsers(finalUsers)
    }
  }, [searchTerm])

  const updateSearchResults = (e) => {
    setSearchTerm(e.target.value)
    document.getElementsByClassName('dropdown-content3')[0].style.display = 'block';
  }


  return (
    <div class="homeHeader">
      <div class="homeHeaderLogoAndSearch">
        <Link to="/">
          <img src={logo4} class="homeHeader__logo" />
        </Link>
        <div class="homeHeader__searchBack" onClick={collapseNavbar}>
          <i class="searchBackIcon" />
        </div>
        <div class="homeHeader__search" onClick={expandNavbar}>
          <i class="searchIcon" />
        </div>
        <input type="text" className="searchBox" placeholder="Search Facebook" onChange={updateSearchResults} />
        <div class="dropdown-content3">
          <ul id="list">
            {
              users !== undefined && (
                filteredUsers.map((user1) => (
                  <li>
                    <a onClick={collapseNavbar} href={`/${user1.displayName}/${user1.uid}`}>
                      <Avatar className="searchAvatar" src={user1.photoURL} />
                      <h3 className="searchH3">{user1.displayName}</h3>
                    </a>
                  </li>
                ))
              )
            }
          </ul>
        </div>
      </div>

      <div class="homeHeader__pages">
        <div class="home">
          {
            selected ? (
              <Link to="/"><svg viewBox="0 0 28 28" class={`PagesIcon ${selected && "selected"}`} height="28" width="28"><path d="M25.825 12.29C25.824 12.289 25.823 12.288 25.821 12.286L15.027 2.937C14.752 2.675 14.392 2.527 13.989 2.521 13.608 2.527 13.248 2.675 13.001 2.912L2.175 12.29C1.756 12.658 1.629 13.245 1.868 13.759 2.079 14.215 2.567 14.479 3.069 14.479L5 14.479 5 23.729C5 24.695 5.784 25.479 6.75 25.479L11 25.479C11.552 25.479 12 25.031 12 24.479L12 18.309C12 18.126 12.148 17.979 12.33 17.979L15.67 17.979C15.852 17.979 16 18.126 16 18.309L16 24.479C16 25.031 16.448 25.479 17 25.479L21.25 25.479C22.217 25.479 23 24.695 23 23.729L23 14.479 24.931 14.479C25.433 14.479 25.921 14.215 26.132 13.759 26.371 13.245 26.244 12.658 25.825 12.29"></path></svg></Link>
            ) : (
                <Link to="/"><svg viewBox="0 0 28 28" class="PagesIcon" height="28" width="28"><path d="M17.5 23.979 21.25 23.979C21.386 23.979 21.5 23.864 21.5 23.729L21.5 13.979C21.5 13.427 21.949 12.979 22.5 12.979L24.33 12.979 14.017 4.046 3.672 12.979 5.5 12.979C6.052 12.979 6.5 13.427 6.5 13.979L6.5 23.729C6.5 23.864 6.615 23.979 6.75 23.979L10.5 23.979 10.5 17.729C10.5 17.04 11.061 16.479 11.75 16.479L16.25 16.479C16.939 16.479 17.5 17.04 17.5 17.729L17.5 23.979ZM21.25 25.479 17 25.479C16.448 25.479 16 25.031 16 24.479L16 18.327C16 18.135 15.844 17.979 15.652 17.979L12.348 17.979C12.156 17.979 12 18.135 12 18.327L12 24.479C12 25.031 11.552 25.479 11 25.479L6.75 25.479C5.784 25.479 5 24.695 5 23.729L5 14.479 3.069 14.479C2.567 14.479 2.079 14.215 1.868 13.759 1.63 13.245 1.757 12.658 2.175 12.29L13.001 2.912C13.248 2.675 13.608 2.527 13.989 2.521 14.392 2.527 14.753 2.675 15.027 2.937L25.821 12.286C25.823 12.288 25.824 12.289 25.825 12.29 26.244 12.658 26.371 13.245 26.133 13.759 25.921 14.215 25.434 14.479 24.931 14.479L23 14.479 23 23.729C23 24.695 22.217 25.479 21.25 25.479Z"></path></svg></Link>
              )
          }
        </div>
        
        <Link class="watch" to = "/news">
          <svg viewBox="0 0 28 28" class="PagesIcon" height="28" width="28"><path d="M8.75 25.25C8.336 25.25 8 24.914 8 24.5 8 24.086 8.336 23.75 8.75 23.75L19.25 23.75C19.664 23.75 20 24.086 20 24.5 20 24.914 19.664 25.25 19.25 25.25L8.75 25.25ZM17.163 12.846 12.055 15.923C11.591 16.202 11 15.869 11 15.327L11 9.172C11 8.631 11.591 8.297 12.055 8.576L17.163 11.654C17.612 11.924 17.612 12.575 17.163 12.846ZM21.75 20.25C22.992 20.25 24 19.242 24 18L24 6.5C24 5.258 22.992 4.25 21.75 4.25L6.25 4.25C5.008 4.25 4 5.258 4 6.5L4 18C4 19.242 5.008 20.25 6.25 20.25L21.75 20.25ZM21.75 21.75 6.25 21.75C4.179 21.75 2.5 20.071 2.5 18L2.5 6.5C2.5 4.429 4.179 2.75 6.25 2.75L21.75 2.75C23.821 2.75 25.5 4.429 25.5 6.5L25.5 18C25.5 20.071 23.821 21.75 21.75 21.75Z"></path></svg>
        </Link>
        <Link class="market" to = "/game">
          <svg viewBox="0 0 28 28" class="PagesIcon" height="28" width="28"><path d="M10.5 4.5c-2.272 0-2.75 1.768-2.75 3.25C7.75 9.542 8.983 11 10.5 11s2.75-1.458 2.75-3.25c0-1.482-.478-3.25-2.75-3.25zm0 8c-2.344 0-4.25-2.131-4.25-4.75C6.25 4.776 7.839 3 10.5 3s4.25 1.776 4.25 4.75c0 2.619-1.906 4.75-4.25 4.75zm9.5-6c-1.41 0-2.125.841-2.125 2.5 0 1.378.953 2.5 2.125 2.5 1.172 0 2.125-1.122 2.125-2.5 0-1.659-.715-2.5-2.125-2.5zm0 6.5c-1.999 0-3.625-1.794-3.625-4 0-2.467 1.389-4 3.625-4 2.236 0 3.625 1.533 3.625 4 0 2.206-1.626 4-3.625 4zm4.622 8a.887.887 0 00.878-.894c0-2.54-2.043-4.606-4.555-4.606h-1.86c-.643 0-1.265.148-1.844.413a6.226 6.226 0 011.76 4.336V21h5.621zm-7.122.562v-1.313a4.755 4.755 0 00-4.749-4.749H8.25A4.755 4.755 0 003.5 20.249v1.313c0 .518.421.938.937.938h12.125c.517 0 .938-.42.938-.938zM20.945 14C24.285 14 27 16.739 27 20.106a2.388 2.388 0 01-2.378 2.394h-5.81a2.44 2.44 0 01-2.25 1.5H4.437A2.44 2.44 0 012 21.562v-1.313A6.256 6.256 0 018.25 14h4.501a6.2 6.2 0 013.218.902A5.932 5.932 0 0119.084 14h1.861z"></path></svg>
        </Link>
        <Link class="groups" to = "/chat">
        <svg viewBox="0 0 28 28" alt="" class="PagesIcon" height="20" width="20"><path d="M14 2.042c6.76 0 12 4.952 12 11.64S20.76 25.322 14 25.322a13.091 13.091 0 0 1-3.474-.461.956 .956 0 0 0-.641.047L7.5 25.959a.961.961 0 0 1-1.348-.849l-.065-2.134a.957.957 0 0 0-.322-.684A11.389 11.389 0 0 1 2 13.682C2 6.994 7.24 2.042 14 2.042ZM6.794 17.086a.57.57 0 0 0 .827.758l3.786-2.874a.722.722 0 0 1 .868 0l2.8 2.1a1.8 1.8 0 0 0 2.6-.481l3.525-5.592a.57.57 0 0 0-.827-.758l-3.786 2.874a.722.722 0 0 1-.868 0l-2.8-2.1a1.8 1.8 0 0 0-2.6.481Z"></path></svg>
        </Link>
      </div>

      <div class="homeHeader__otherIcons">
        <div class="round profile">
          <a href={`/${user.displayName}/${user.uid}`}>
            <Avatar className="ProfileAvatar" src={user.photoURL} />
            <p>{user.displayName}</p>
          </a>
        </div>
        <div class="round">
          <i class="addIcon" />
        </div>

        <div class="round">
          
        </div>

        <div class="round" onClick={renderNotifications}>
          <svg viewBox="0 0 28 28" alt="" class={`notificationsIcon ${notificationsOpen && "blue"}`} height="20" width="20"><path d="M7.847 23.488C9.207 23.488 11.443 23.363 14.467 22.806 13.944 24.228 12.581 25.247 10.98 25.247 9.649 25.247 8.483 24.542 7.825 23.488L7.847 23.488ZM24.923 15.73C25.17 17.002 24.278 18.127 22.27 19.076 21.17 19.595 18.724 20.583 14.684 21.369 11.568 21.974 9.285 22.113 7.848 22.113 7.421 22.113 7.068 22.101 6.79 22.085 4.574 21.958 3.324 21.248 3.077 19.976 2.702 18.049 3.295 17.305 4.278 16.073L4.537 15.748C5.2 14.907 5.459 14.081 5.035 11.902 4.086 7.022 6.284 3.687 11.064 2.753 15.846 1.83 19.134 4.096 20.083 8.977 20.506 11.156 21.056 11.824 21.986 12.355L21.986 12.356 22.348 12.561C23.72 13.335 24.548 13.802 24.923 15.73Z"></path></svg>
        </div>
        <div class="dropdown-content2">
          <h1>Notifications</h1>

          {
            notifications.length == 0 ? (
              <div className="noNotifDiv">
                <img src={user.photoURL} />
                <h1 className="NoNotif">It seems that there are no active notifications</h1>
              </div>
            ) : (
                console.log()
              )
          }
          {
            notifications.map(({ notification }) => (
              <a href="#" className="announcement">
                <div class="optionDrop">
                  <Avatar src="" />
                  <div className="announcementInfo">
                    <h1>{notification.username} <span>commented to your post.</span></h1>
                  </div>
                </div>
              </a>
            ))
          }

        </div>
        <div class="round" onClick={renderProfile}>
          <i class={`dropdownIcon ${profileDown === true && "blue"}`} />
          <div class="dropdown-content">

            <a href="#">
              <div class="optionDrop">
                <img src="https://i.ibb.co/1zmBtwr/84241059-189132118950875-4138507100605120512-n.jpg" class="Avatar" />
                <div class="sideinfoDropAvatar">
                  <h1>{user?.displayName}</h1>
                </div>
              </div>
            </a>

            <div class="hr" />

            <a href="http://localhost:3000/Sahan%20Dilshan/zCj4q8f1HMgzClJgkdwFW1tPT9e2">
              <div class="optionDrop">
                <div class="iconDrop">
                  <i class="feedback" />
                </div>
                <div class="sideinfoDrop">
                  <h1>Give Feedback</h1>
                  <p>Help us improve the new Hello</p>
                  <p>sahandilshan.projects@gmail.com</p>
                </div>
              </div>
            </a>

            <div class="hr" />
          
            <a href="#">
              <div class="optionDrop">
                <div class="iconDrop">
                  <i class="darkMode" />
                </div>
                <h1>Dark Mode</h1>
              </div>
            </a>

            <a href="#">
              <div onClick={logout} class="optionDrop">
                <div class="iconDrop">
                  <i class="logout" />
                </div>
                <h1>Log out</h1>
              </div>
            </a>

          </div>
        </div>
      </div>
    </div >
  );
}

export default Header;