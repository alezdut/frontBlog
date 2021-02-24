import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import './App.css';
import Main from './components/main/main';
import NavBar from './components/navBar/navBar';

function App() {
  const initstate = {
    data: []
  }
  const reducer = (state, action) => {
    switch (action.type) {
      case 'LOAD': {
        return {
          ...state,
          data: action.payload,
        };
      }
      case 'UNLOAD': {
        return {
          ...state,
          data: action.payload,
        };
      }
      case 'ADD': {
        return {
          ...state
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
              state.data.splice(state.data.indexOf(e), 1)
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
      <NavBar />
      <Main data={state.data} dispatch={dispatch}></Main>
    </div>
  );
}

export default App;
