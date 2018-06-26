import React from 'react'
import './App.css'

import Startpage from './components/Startpage/Startpage'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Logout from './components/Logout/Logout'
import Register from './components/Register/Register'
import CreateTask from './components/CreateTask/CreateTask'
import Topics from './components/Topics/Topics'
import Topic from './components/Topic/Topic'
import Task from './components/Task/Task'
import Profile from './components/Profile/Profile'
import ProfileEdit from './components/ProfileEdit/ProfileEdit'
import OtherProfile from './components/OtherProfile/OtherProfile'
import Karma from './components/Karma/Karma'
import myTasks from './components/myTasks/myTasks'

import {
  BrowserRouter as Router,
  Route, 
  Switch
} from 'react-router-dom'


const RouterNav = () => (
  <Router>
      <Switch>
        <Route exact path="/" component={Startpage} />
        <Route exact path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/logout" component={Logout} />
        <Route path="/createtask" component={CreateTask} />
        <Route exact path="/categories" component={Topics} />
        <Route exact path="/categories/:topicid" component={Topic} />
        <Route exact path="/categories/:topicid/:taskid" component={Task} />
        <Route exact path="/categories/:topicid/:taskid/:userid" component={OtherProfile} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile/edit" component={ProfileEdit} />
        <Route exact path="/profile/karma" component={Karma} />
        <Route exact path="/myTasks" component={myTasks} />
        <Route exact path="/myTasks/:taskid" component={Task} />
      </Switch>   
  </Router>
)


export default RouterNav