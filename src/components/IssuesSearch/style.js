import { createUseStyles } from 'react-jss';

export default createUseStyles( {
  form: {
    maxWidth: '40em',
    boxShadow: '1px 1px 5px rgba(20 ,20 ,0 , 0.1)',
    margin: '2em auto',
    padding: '0.5em',
    backgroundColor: '#E5EDE7',
    border: 'solid 1px #D5DDD7',
    display: 'block',
    textAlign: 'center',
    '&>label': {
      display: 'block',
      color: '#507059',
      margin: '15px 0 0 5px',
    },
    '& kbd': {
      fontSize: '0.6em',
      margin: 10,
      border: 'solid 1px',
      padding: '0 3px',
      verticalAlign: 'middle',
      borderRadius: '5px',
    },
    '&>#searchInput': {
      display: 'inline-block',
      margin: 10,
      padding: '5px 10px',
      borderRadius: 4,
      border: 'groove 2px rgba(200 ,200 ,180 , 0.4)',
      backgroundColor: '#FDFDFB',
      color: '#507059',
      verticalAlign: 'middle',
    },
    '&>input[type=submit]': {
      display: 'inline-block',
      margin: 10,
      borderRadius: 7,
      border: 'outset 2px rgba(200 ,200 ,180 , 0.4)',
      backgroundColor: '#D0DDC9',
      color: '#507059',
      verticalAlign: 'middle',
      lineHeight: '1.7em',
    }
  },
} );