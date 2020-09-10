import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import { Provider } from 'react-redux';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './index.css';
import App from './App';
import Session from './components/Session';
import store from './store';

const apolloHttp = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const auth = localStorage.getItem('auth');
  return {
    headers: {
      ...headers,
      authorization: auth ||  "",
    }
  }
});

const graphQL = new ApolloClient({
  link: authLink.concat(apolloHttp),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={ graphQL }>
      <Provider store={ store }>
        <Session />
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById( 'root' )
);
