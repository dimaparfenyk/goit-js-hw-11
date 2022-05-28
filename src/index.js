import './sass/index.scss';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import NewsApiService from './js/data-service'
const axios = require('axios').default;

// (`https://pixabay.com/api/?key=${authorizeKey}q=${this.searchQuery}&per_page=40`)

const BASE_URL = `https://pixabay.com/api/`;

const refs= {
    searchForm: document.querySelector('#search-form'),
    imgCardContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}

// refs.loadMoreBtn.disabled = true;
// console.dir(refs.loadMoreBtn)

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  
  e.preventDefault();
  
  
    // if (newsApiService.query === '') {
    //     return
    // }
    refs.loadMoreBtn.disabled = false;
    newsApiService.query = e.currentTarget.elements.searchQuery.value;
    newsApiService.resetPage();
    newsApiService.fetchImages().then(hits => {
        appendImgMarkup(hits);
    });
  clearImgCardContainer();
};

function onLoadMore() {
    newsApiService.fetchImages().then(appendImgMarkup);
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
}

function appendImgMarkup(hits) {
    refs.imgCardContainer.insertAdjacentHTML('beforeend', renderImgMarkup(hits));
var lightbox  = new SimpleLightbox('.photo-card a', {captionsData: 'alt',animationSpeed:250});
// photo-card.refresh();
};

function clearImgCardContainer() {
    refs.imgCardContainer.innerHTML = '';
}

