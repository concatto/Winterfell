import Publication from './Publication';
import React from 'react';

const PublicationList = ({publications, onDelete, onReact}) => {
  const components = publications.map((data) => {
    data = {
      ...data,
      onDelete: () => onDelete(data.id),
    };

    return (
      <Publication {...data} key={data.id}/>
    )
  });

  return (
    <div>
      {components}
    </div>
  );
};

export default PublicationList;