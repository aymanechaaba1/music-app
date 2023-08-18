'use strict';

import View from './View.js';

class SongPreviewView extends View {
  generateMarkup({
    id,
    picture,
    title,
    artistName,
    preview,
    isPlaying = false,
  }) {
    return `
    <a href="#${id}" data-id="${id}" class="track relative rounded-lg shadow-lg">
      <img src="${picture}" class="w-full object-cover" />
      <div class="absolute backdrop-blur-sm bottom-0 bg-gray-700/20 w-full py-3 px-2 space-y-2">
        <div class="flex gap-5 justify-between">
          <h1 class="text-white line-clamp-1">${title}</h1>
          <p class="text-sm text-gray-100">${artistName}</p>
        </div>
        <audio id="${id}" data-id="${id}" hidden>
          <source src="${preview}" type="audio/mp3">
        </audio>
        <div class="audio_controls flex">
          
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"       stroke-width="1.5" stroke="currentColor" class="btn_pause_track hidden w-6 h-6 text-gray-200 cursor-pointer">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>    
          
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="btn_play_track w-6 h-6 text-gray-200 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
            </svg>
        </div>
      </div>
    </a>
    `;
  }
}

export default new SongPreviewView();
