import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import Main from './Main';
let history = createBrowserHistory();

ReactDOM.render(
   <Router history={history}>
    <Main/>
    </Router>,

  document.getElementById('root')
);

