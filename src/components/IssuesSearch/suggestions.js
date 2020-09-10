import React, { useMemo } from 'react';

export default function Suggestions ( props ) {
  const { suggestions } = props;

  const options = useMemo( () => {
    return suggestions.map( item => 
      <option key={ item.node.id } value={ item.node.title } />
    );
  }, [ suggestions ]);

  return (
    <datalist key="dl1" id="suggestions">
      { options }
    </datalist>
  )
};