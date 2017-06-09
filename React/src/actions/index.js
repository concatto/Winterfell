import { push } from 'react-router-redux';
import { createProfileHref } from '../utils';

export const setPublicationFilter = (filterType) => ({
  type: "CHANGE_PUBLICATION_FILTER",
  filterType
});

//Will use thunk eventually
export const loadMorePublications = () => ({
  type: "LOAD_PUBLICATIONS"
});

export const loadMoreFriends = () => ({
  type: "LOAD_FRIENDS"
});

export const search = (searchString) => push("/search?q=" + searchString);
export const visitProfile = (id) => push(createProfileHref(id));
