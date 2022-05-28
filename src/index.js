import './sass/index.scss';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import NewsApiService from './js/data-service';
import { Notify } from 'notiflix';
import { showLoadBtn, hideLoadBtn } from './js/load-button';
import simpleLightbox from 'simplelightbox';
const axios = require('axios').default;

const BASE_URL = `https://pixabay.com/api/`;
let imgCount = 0;


const refs= {
    searchForm: document.querySelector('#search-form'),
    imgCardContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click',onLoadMore);

function onSearch(e) {
  
  e.preventDefault();
  
  newsApiService.query = e.currentTarget.elements.searchQuery.value;
  
  if (newsApiService.query === '') {
     Notify.failure('There is nothing to find')
     return;
  };
  newsApiService.resetPage();
newsApiService.fetchImages().then(res=>{
      imgCount = res.length;
      Notify.success(`Hooray! We found ${imgCount} images.`)
      showLoadBtn(refs.loadMoreBtn);
      appendImgMarkup(res);
  refs.loadMoreBtn.disabled = false;
  });
  clearImgCardContainer();
  refs.searchForm.reset();
  
};

function onLoadMore() {
  refs.loadMoreBtn.disabled = true;
  newsApiService.fetchImages().then(res => {

    if (res.length === 0) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    }
    else {
      imgCount += res.length;
       Notify.success(`Hooray! We found ${imgCount} images.`)
      showLoadBtn(refs.loadMoreBtn);
      appendImgMarkup(res);
      refs.loadMoreBtn.disabled = false;
    };
  });
}

function renderImgMarkup(hits) {
  return hits
    .map(
      ({ comments, downloads, largeImageURL, likes, tags,views,webformatURL }) =>
        `<div class="photo-card">
  <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`
    )
        .join('');
};

function appendImgMarkup(hits) {
    refs.imgCardContainer.insertAdjacentHTML('beforeend', renderImgMarkup(hits));
var lightbox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  animationSpeed: 250,
});
};

function clearImgCardContainer() {
    refs.imgCardContainer.innerHTML = '';
};

