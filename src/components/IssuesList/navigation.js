import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

export default function Navigation( props ) {
  const { start, end, hasNextPage, hasPreviousPage, onNavigate } = props;

  function navBw() {
    onNavigate( {
      type: 'previous',
      start,
    } );
  }

  function navFw() {
    onNavigate( {
      type: 'next',
      end,
    } );
  }

  useHotkeys('p', () => {
    if ( hasPreviousPage ) {
      navBw();
    }
    return false;
  }, [ hasPreviousPage ] );

  useHotkeys('n', () => {
    if ( hasNextPage ) {
      navFw();
    }
    return false;
  }, [ hasNextPage ] );

  return (
    <ul className={ props.className }>
      <li key='issues-prev' className='previous'>
        <button onClick={ navBw } disabled={ !hasPreviousPage }>
          Previous
        </button>
      </li>
      <li key='issues-next' className='next'>
        <button onClick={ navFw } disabled={ !hasNextPage }>
          Next
        </button>
      </li>
    </ul>
  )
};