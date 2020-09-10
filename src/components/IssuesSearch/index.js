import React, { useCallback, useState, useRef, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { useLazyQuery } from '@apollo/client';
import { useHotkeys } from 'react-hotkeys-hook';
import QUERY_SEARCH_ISSUES from '../../queries/issuesSearch';
import issuesSlice from '../../store/issuesSlice';
import errorSlice from '../../store/errorSlice';
import Suggestions from './suggestions';
import useStyles from './style';

export default function IssuesSearch() {
  const [ search, setSearch ] = useState( '' );
  const dispatch = useDispatch();
  const inputRef = useRef( null );
  const [ queryIssues, { data, error } ] = useLazyQuery( QUERY_SEARCH_ISSUES );

  function onSubmit( ev ) {
    ev.preventDefault();
    dispatch( issuesSlice.actions.setQuery( { string: search } ) );
  }

  // get suggestions as user types
  const debouncedQuery = useCallback( _.debounce( searchString => {
    queryIssues({
      variables: {
        q: searchString,
        first: 15,
      },
    });
  }, 300 ), [] );

  // set search string and query suggestions
  const onChangeSearch = useCallback( ( ev ) => {
    const value = ev.target.value;
    const searchString = `${value} in:title type:issue repo:facebook/react`;
    setSearch( searchString );

    if ( value.length >= 3 ) {
      debouncedQuery( searchString );
    }
  }, [ debouncedQuery ] );

  const suggestions = useMemo( () => {
    if ( error ) {
      dispatch( errorSlice.actions.requestError( error ) );
    }
    if ( !data || !data.search || !data.search.edges ) {
      return [];
    }
    return data.search.edges;
  }, [ data, error, dispatch ]);

  useHotkeys('s', ( ) => {
    inputRef.current.focus();
  }, {
    keydown: false,
    keyup: true,
  } );

  const styles = useStyles();

  return (
    <form className={ styles.form } onSubmit={ onSubmit }>
      <label htmlFor="searchInput">
        Search issues by title
        <kbd>s</kbd>
      </label>
      <input id="searchInput" ref={ inputRef } key="in1" type="search" name="query"
        list="suggestions" onChange={ onChangeSearch } autoComplete="off"
      />
      <Suggestions suggestions={ suggestions } />
      <input type="submit" name="search" value="Search" />
    </form>
  )
};