import React  from 'react'
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

import DefaultScreen from '../screens/defaultScreen'
import Auth from '../screens/Auth'
import CreateTask from '../screens/CreateTask'
import EditTask from '../screens/EditTask'

const Routes = () => {
    const token = localStorage.getItem('token');

    return (
        <Switch>
            <Route exact path="/"><DefaultScreen /></Route>
            <Route path="/auth"><Auth /></Route>
            <Route path="/create-task"><CreateTask /></Route>
            {token && <Route path="/edit-task/:id"><EditTask /></Route>}
            <Route path="*"><Redirect to={'/'} /></Route>
        </Switch>
    )
}

export default Routes
