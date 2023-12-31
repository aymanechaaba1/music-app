'use strict';

import View from './View.js';

class PlayingTrack extends View {
  _parent = document.querySelector('.player');

  generateMarkup({
    id,
    picture,
    title,
    artistName,
    isPlaying,
    duration,
    preview,
    loop = 0,
  }) {
    return `
          <div
          class="w-full flex py-3 px-5 bg-gray-700/20 backdrop-blur-md items-center justify-between text-slate-100"
        >
        <div class="space-y-2">
          <div class="flex items-start gap-3">
            <img src="${picture}" class="w-10 h-10 object-cover rounded-md shadow-md" />
            <h1 class="text-slate-200 text-xs w-20 md:w-full line-clamp-2  md:text-base">${title}</h1>
          </div>
          <p class="text-xs text-gray-200">${artistName}</p>
        </div>

        <audio>
          <source></source>
        </audio>
        <div class="player_controls flex items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-slate-100">
        <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
      </svg>
      ${
        isPlaying
          ? `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 text-slate-100">
      <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM9 8.25a.75.75 0 00-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75H9zm5.25 0a.75.75 0 00-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75h-.75z" clip-rule="evenodd" />
    </svg>
    
      `
          : `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 text-slate-100">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clip-rule="evenodd" />
</svg>

          `
      }
      

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-slate-100">
  <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
</svg>


        </div>
        <p class="duration">${duration}</p>
    </div>
    `;
  }

  handlePlayingTrack(handler) {
    ['load', 'hashchange'].forEach((ev) =>
      window.addEventListener(ev, (e) => {
        e.preventDefault();
        handler();
      })
    );
  }
}

export default new PlayingTrack();
