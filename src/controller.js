'use strict';

import { getSearchResults, getTrackById, state } from './model.js';
import ResultsListView from './views/ResultsListView.js';
import SearchFromView from './views/SearchFromView.js';

const controlLoadSearchResults = async () => {
  try {
    // get search query
    const { search_query: query } = SearchFromView.getFormData();
    if (!query) return;

    // fetch data
    const data = await getSearchResults(query);
    if (!data) return;

    // add search results to model
    state.searchResults = data;

    // log data to the console
    console.log(data);
    ResultsListView.render(data.data);
  } catch (err) {
    console.error(err.message);
  }
};

const controlPlayTrack = async (trackId) => {
  try {
    // get track by track id
    const data = await getTrackById(trackId);

    // push current playing track to state
    state.currentTrack = window.structuredClone(data);
    state.currentTrack.isPlaying = true;

    console.log(state);
  } catch (err) {
    console.error(err.message);
  }
};

const init = () => {
  SearchFromView.addHandler(controlLoadSearchResults);
  ResultsListView.addHandlerPlayTrack(controlPlayTrack);
};

init();
