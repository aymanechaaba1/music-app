'use strict';

import { getSearchResults, state } from './model.js';
import PlayingTrackView from './views/PlayingTrackView.js';
import ResultsListView from './views/ResultsListView.js';
import SearchFromView from './views/SearchFromView.js';

const controlSearch = async () => {
  try {
    // get search query
    const { search_query: query } = SearchFromView.getFormData();
    if (!query) return;

    // fetch data
    const data = await getSearchResults(query);
    if (!data) return;

    // add search results to model
    state.searchResults = data.data.map((entry) => ({
      id: entry.id,
      title: entry.title || entry.title_short,
      artistName: entry.artist.name,
      picture: entry.album.cover_big || entry.album.cover_medium,
      preview: entry.preview,
      isPlaying: false,
    }));

    // render results to the view
    ResultsListView.render({ data: state.searchResults });
  } catch (err) {
    console.error(err.message);
  }
};

const controlPlayTrack = async (trackId) => {
  try {
    // current playing track
    state.searchResults.forEach((track) => (track.isPlaying = false));
    const currTrack = state.searchResults.find((track) => track.id === trackId);
    currTrack.isPlaying = true;

    console.log(state.currTrack);
  } catch (err) {
    console.error(err.message);
  }
};

const controlPlayingTrack = () => {
  const trackId = window.location.hash.slice(1);
  if (!trackId) return;

  // get track info from state by using its id
  const track = state.searchResults.find((track) => track.id === +trackId);
  if (!track) return;

  console.log(track);

  PlayingTrackView.render({ data: { ...track } });
};

const init = () => {
  SearchFromView.addHandler(controlSearch);
  ResultsListView.handlePlayTrack(controlPlayTrack);
  PlayingTrackView.handlePlayingTrack(controlPlayingTrack);
};

init();
