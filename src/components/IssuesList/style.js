import { createUseStyles } from 'react-jss';

export default createUseStyles( {
  container: {
    maxWidth: '40em',
    boxShadow: '1px 1px 5px rgba(20 ,20 ,0 , 0.1), -2px -2px 15px rgba(30, 0, 0, 0.1)',
    margin: '2em auto',
    padding: '1em 0.3em',
    backgroundColor: '#F5F9F7',
    position: 'relative',
    '&>kbd': {
      fontSize: '0.6em',
      position: 'absolute',
      right: 0,
      top: 0,
      margin: 10,
      '&>kbd': {
        border: 'solid 1px',
        padding: '0 3px',
        verticalAlign: 'middle',
        borderRadius: '5px',
        color: '#8F8F84',
      },
    },
  },
  issues: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    minHeight: '5em',
    '&>li': {
      display: 'block',
      margin: 10,
      padding: 10,
      border: 'solid 1px #DADAD5',
      boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.05)',
      backgroundColor: '#FBFBF9',
      '&:hover, &:focus': {
        backgroundColor: '#FDFDFB',
      },
      '&>a, &>a:link, &>a:visited': {
        color: '#8F8F84',
        display: 'block',
        margin: 10,
      },
    },
    '& .issueLabels': {
      listStyle: 'none',
      fontSize: '0.7em',
      '&>li': {
        display: 'inline-block',
        border: 'solid 2px',
        padding: '1px 5px',
        margin: 5,
        borderRadius: 5,
      }
    }
  },
  navigation: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    '&>li': {
      display: 'block',
      width: '10em',
      padding: '0.7em',
      '&>button': {
        width: '100%',
        height: '2em',
        verticalAlign: 'middle',
        backgroundColor: '#A0D0A9',
        color: '#507059',
        border: 'solid 2px #90A099',
        borderRadius: 3,
        boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.07)',
        '&:hover, &:active': {
          backgroundColor: '#B5D6B3',
        },
        '&:disabled': {
          backgroundColor: '#EBF0ED',
          color: '#A8ABA5',
          borderColor: '#A8ABA5',
        },
      }
    }
  },
} );