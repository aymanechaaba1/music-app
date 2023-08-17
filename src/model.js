'use strict';

import { deezer_base_url, deezer_endpoints } from './config.js';

export const state = {
  currentTrack: null,
  searchResults: [],
};

export const getSearchResults = async (query) => {
  try {
    const res = await fetch(
      `${deezer_base_url}${deezer_endpoints.get('search')}?q=${query}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key':
            '4ef091339bmsh01863cf3bb48f49p191d37jsnab835b4f8447',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        },
      }
    );

    if (!res.ok)
      throw new Error(
        `Failed to search for your query, Please try again later. (${res.status})`
      );

    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
};

export const getTrackById = async (trackId) => {
  try {
    // get track by track id
    const res = await fetch(
      `${deezer_base_url}${deezer_endpoints.get('track')}${trackId}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key':
            '4ef091339bmsh01863cf3bb48f49p191d37jsnab835b4f8447',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        },
      }
    );

    if (!res.ok)
      throw new Error(
        `Failed getting track, Please try again later! (${res.status})`
      );

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err.message);
  }
};
