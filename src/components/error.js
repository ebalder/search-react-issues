import React, { Fragment, useCallback, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector, useDispatch } from 'react-redux';
import errorSlice from '../store/errorSlice';


const useStyles = createUseStyles( {
  error: {
    position: 'absolute',
    display: 'block',
    color: '#A03530',
    '& p': {
      display: 'block',
      margin: 15,
      backgroundColor: '#E0C5C0',
      fontSize: '0.9em',
      padding: 10,
    },
    '& button': {
      fontSize: '0.7em',
      padding: '3px 5px',
      margin: '0px 15px',
      border: 'solid 1px #A03530',
      backgroundColor: '#E0C5C0',
    },
  },
} );

export default function Error() {
  const dispatch = useDispatch();
  const error = useSelector( state => state.error );
  const styles = useStyles();

  const onErrorClose = useCallback( () => {
    dispatch( errorSlice.actions.clear() );
  }, [ dispatch ] );

  const errorMessage = useMemo( () => {
    if ( error.length ) {
      return (
        <div className={ styles.error }>
          { error.map( err => <p>{ err }</p>) }
          <button onClick={ onErrorClose }> close </button>
        </div>
      );
    }
  }, [ error, styles, onErrorClose ] );

  return (
    <Fragment>
      { errorMessage }
    </Fragment>
  );
};
