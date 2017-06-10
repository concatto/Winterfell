import Publication from './Publication';
import React from 'react';
import { Panel } from 'react-bootstrap';

const PublicationList = ({className, publications, onDelete, onReact}) => {
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
    <div className={className}>
      {components.length > 0 ? components : (
        <Panel className="post">
          <h4>Nenhuma publicação a ser exibida. :(</h4>
        </Panel>
      )}
    </div>
  );
};

export default PublicationList;
