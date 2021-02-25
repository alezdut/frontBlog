import React, { useEffect, useReducer } from 'react';
import { Route, Switch } from "react-router-dom";
import axios from 'axios';
import './App.css';
import Main from './components/main/main';
import NavBar from './components/navBar/navBar';
import Detail from './components/post detail/detail';
import AddNew from './components/addNew/addNew';
import AddButton from './components/add button/addButton';

function App() {
  const initstate = {
    data: [],
    detail: {}
  }
  const reducer = (state, action) => {
    switch (action.type) {
      case 'LOAD': {
        return {
          ...state,
          data: action.payload,
        };
      }
      case 'LOAD_DETAIL': {
        return {
          ...state,
          detail: action.payload
        };
      }
      case 'ADD': {
        return {
          ...state
        };
      }
      case 'EDIT': {
        return {
          ...state,
        };
      }
      case 'DELETE': {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${action.payload.id}`).then(res => {
          console.log(`${action.payload.id} borrado`)
        })
        return {
          ...state,
          data: state.data.map(e => {
            if (e.id === action.payload.id) {
              return state.data.splice(state.data.indexOf(e), 1)
            } else { return e }
          })
        };
      }
      default: return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initstate);
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {
      dispatch({
        type: 'LOAD',
        payload: res.data
      })
    })
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <NavBar />
          <AddButton />
          <Main data={state.data} dispatch={dispatch}></Main>
        </Route>
        <Route path="/detail/:id">
          <NavBar />
          <Detail post={state.detail} dispatch={dispatch} />
        </Route>
        <Route path="/detail/new" exact>
          <NavBar />
          <Detail dispatch={dispatch} />
        </Route>
        <Route path="/edit/:id" >
          <NavBar />
          <AddNew dispatch={dispatch} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
