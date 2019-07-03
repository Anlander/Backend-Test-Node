import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import ChatRoom from './Components/ChatRoom';


function MainRouter() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={() => <Home />} />
                <Route path="/chatroom/:id" render={({match}) => <ChatRoom match={match} key={match.params.id} />} />
            </Switch>
        </BrowserRouter>
    )
}

export default MainRouter;