import Publication from './Publication';
import React from 'react';

const PublicationList = ({publications, onDelete, onReact}) => {
  const components = publications.map((data) => (
    <Publication {...data} key={data.id}/>
  ));

  return (
    <div>
      {components}
    </div>
  );
};

export default PublicationList;
