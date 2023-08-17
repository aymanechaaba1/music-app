'use strict';

import View from './View.js';

class ResultsListView extends View {
  _parent = document.querySelector('.results_list');

  generateMarkup(data) {
    return data
      .map(
        (entry) => `
        <div class="track relative rounded-lg shadow-lg">
          <img src="${
            entry.artist.picture_big || entry.artist.picture_medium
          }" class="w-full object-cover" />
          <div class="absolute backdrop-blur-sm bottom-0 bg-gray-700/20 w-full py-3 px-2 space-y-2">
            <div class="flex gap-5 justify-between">
              <h1 class="text-white line-clamp-1">${
                entry.title || entry.title_short
              }</h1>
              <p class="text-sm text-gray-100">${entry.artist.name}</p>
            </div>
            <audio id="${entry.id}" data-id="${entry.id}" hidden>
              <source src="${entry.preview}" type="audio/mp3">
            </audio>
            <div class="audio_controls flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="btn_play_track w-8 h-8 cursor-pointer text-gray-100">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
            </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="btn_pause_track hidden w-8 h-8 cursor-pointer text-gray-100">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          
            </div>
          </div>
        </div>
    `
      )
      .join('');
  }

  _togglePlayPauseBtn(clickedTrack) {
    const audioTrack = clickedTrack.querySelector('audio');

    if (audioTrack.paused) {
      audioTrack.play();
      clickedTrack.querySelector('.btn_play_track').classList.add('hidden');
      clickedTrack.querySelector('.btn_pause_track').classList.remove('hidden');
    } else {
      audioTrack.pause();
      clickedTrack.querySelector('.btn_play_track').classList.remove('hidden');
      clickedTrack.querySelector('.btn_pause_track').classList.add('hidden');
    }
  }

  addHandlerPlayTrack(handler) {
    this._parent.addEventListener('click', (e) => {
      const clickedTrack = e.target.closest('.track');
      if (!clickedTrack) return;

      const audioTrack = clickedTrack.querySelector('audio');

      const { id } = audioTrack.dataset;
      if (!id) return;

      const btnPlayTrack = clickedTrack.querySelector('.btn_play_track');
      if (!btnPlayTrack) return;

      if (btnPlayTrack) {
        this._togglePlayPauseBtn(clickedTrack);
        handler(id);
      }
    });
  }

  addHandler(searchResults, currentTrack) {
    // don't pause for current playing track
    if (currentTrack.isPlaying) {
      this._parent.querySelectorAll('audio').pause();
    }
  }
}

export default new ResultsListView();
