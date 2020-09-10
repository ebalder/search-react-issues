import React from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import Issues from './components/Issues';
import Error from './components/error';

const useStyles = createUseStyles( {
  '@global': {
    body: {
      backgroundColor: '#DBE3DF',
    },
  },
  logIn: {
    display: 'block',
    fontSize: '2em',
    color: '#A09A95',
    margin: '49vh auto',
    textAlign: 'center',
  }
} );

function App() {
  const logged = useSelector( state => state.session.logged );
  const styles = useStyles();

  return (
    <div className="App">
      <Error />
      { !logged &&
        <a className={ styles.logIn } href={
          `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&state=${process.env.REACT_APP_STATE}`}>
            Log In
        </a>
      }
      { logged &&
        <Issues/>
      }
    </div>
  );
}

export default App;

