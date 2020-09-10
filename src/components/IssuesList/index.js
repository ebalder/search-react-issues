import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import _ from 'lodash';
import { useHotkeys } from 'react-hotkeys-hook';
import issuesSlice from '../../store/issuesSlice';
import errorSlice from '../../store/errorSlice';
import QUERY_SEARCH_ISSUES from '../../queries/issuesSearch';
import Navigation from './navigation';
import Issue from './issue';
import useStyles from './style';

export default function Issues () {
  const query = useSelector( state => 
    state.issues.query );
  const [ pageInfo, setPageInfo ] = useState({});
  const [ issues, setIssues ] = useState([]);
  const dispatch = useDispatch();
  const [ queryIssues, { data, error } ] = useLazyQuery( QUERY_SEARCH_ISSUES );

  function onNavigate( action ) {
    let newQuery;

    // set the cursor for new query
    if ( action.type === 'previous' ) {
      newQuery = _.omit( query, 'after' );
      newQuery.before = action.start ;
    } else if ( action.type === 'next' ) {
      newQuery = _.omit( query, 'before' );
      newQuery.after = action.end;
    }

    dispatch( issuesSlice.actions.setQuery( newQuery ) );
  }

  const debouncedQuery = useCallback( _.debounce( query => {
    const variables = {
      ...query,
      q: query.string,
      first: !query.before ? 30 : undefined,
      last: query.before ? 30 : undefined,
    };
    queryIssues({ variables });
  }, 1000 ), [] );

  // fetch data when query changes
  useEffect( () => {
    debouncedQuery( query );
  }, [ query, debouncedQuery ] );

  // update pagination data after fetch
  useEffect( () => {
    if ( error ) {
      dispatch( errorSlice.actions.requestError( error ) );
    }

    if ( !data || !data.search || !data.search.edges ) {
      return;
    }

    setIssues( data.search.edges );
    setPageInfo( {
      ...data.search.pageInfo,
    } );
  }, [ data, error, dispatch ] );

  // create issues array when issues are fetched
  const issuesList = useMemo( () => {
    return issues.map( Issue );
  }, [ issues ]);

  const styles = useStyles();

  useHotkeys('home', ( ) => {
    const $li = document.querySelector( `.${styles.issues} li` );

    if ( $li ) {
      $li.focus();
    }
  }, [ styles ] );

  useHotkeys('end', ( ) => {
    const $li = document.querySelector( `.${styles.issues}>li:last-child` );

    if ( $li ) {
      $li.focus();
    }
  }, [ styles ] );

  return (
    <div className={ styles.container } >
      <kbd><kbd>home</kbd>/<kbd>end</kbd></kbd>
      <ul className={ styles.issues }>
        { issuesList }
      </ul>
      <Navigation
        className={ styles.navigation }
        start={ pageInfo.startCursor }
        end={ pageInfo.endCursor }
        hasPreviousPage={ pageInfo.hasPreviousPage }
        hasNextPage={ pageInfo.hasNextPage }
        onNavigate={ onNavigate }
      />
    </div>
  )
};