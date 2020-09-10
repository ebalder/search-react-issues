import React from 'react';

export default function Issue( props ) {
  const { node: { id, title, labels: { nodes: labels } , url } } = props;

  const labelsList = labels.map( label => {
    return <li key={ label.id } style={ { color: `#${label.color}` } } >
      { label.name }
    </li>
  });

  return (
    <li key={ `issue-${id}` } tabIndex="0" >
      <a href={ url }>{ title }</a>
      <ul className='issueLabels'>
        { labelsList }
      </ul>
    </li>
  )
};