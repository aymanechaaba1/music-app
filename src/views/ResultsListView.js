'use strict';

import SongPreviewView from './SongPreviewView.js';
import View from './View.js';

class ResultsListView extends View {
  _parent = document.querySelector('.results_list');

  generateMarkup(data) {
    return data
      .map((entry) =>
        SongPreviewView.generateMarkup({
          ...entry,
        })
      )
      .join('');
  }

  loading() {
    const loading = `<p class="md:col-span-2 lg:col-span-3 text-gray-300 animate-pulse text-center my-5">Loading Songs...</p>`;
    this._clear();
    this._parent.insertAdjacentHTML('beforeend', loading);
  }

  handlePlayTrack(handler) {
    this._parent.addEventListener('click', (e) => {
      const clickedTrack = e.target.closest('.track');
      if (!clickedTrack) return;

      const { id } = clickedTrack.dataset;

      const audioTrack = clickedTrack.querySelector('audio');

      const { btnPlay, btnPause } = this._getControlBtns(clickedTrack);

      if (btnPlay) {
        // pause all tracks
        [...this._parent.querySelectorAll('.track')].forEach((trackEl) => {
          this._pauseTrack(trackEl);
        });

        // play audio, hide play btn, show pause btn
        this._playTrack(clickedTrack);
      }
      // pause audio, hide pause btn, show play btn
      else this._pauseTrack(clickedTrack);

      handler(id);
    });
  }

  _playTrack(trackEl) {
    trackEl.querySelector('audio').play();
    this._togglePlayPauseBtn({ trackEl, play: true });
  }

  _pauseTrack(trackEl) {
    trackEl.querySelector('audio').pause();
    this._togglePlayPauseBtn({ trackEl, play: false });
  }

  _togglePlayPauseBtn({ trackEl, play = false }) {
    const { btnPlay, btnPause } = this._getControlBtns(trackEl);

    if (play) {
      btnPlay.classList.add('hidden');
      btnPause.classList.remove('hidden');
    } else {
      btnPause.classList.add('hidden');
      btnPlay.classList.remove('hidden');
    }
  }

  _getControlBtns(trackEl) {
    const btnPlay = trackEl.querySelector('.btn_play_track');
    const btnPause = trackEl.querySelector('.btn_pause_track');
    return { btnPlay, btnPause };
  }
}

export default new ResultsListView();
