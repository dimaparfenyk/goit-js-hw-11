import './sass/index.scss';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import NewsApiService from './js/data-service';
import { Notify } from 'notiflix';
import { showLoadBtn, hideLoadBtn } from './js/load-button';
import simpleLightbox from 'simplelightbox';
const { default: axios } = require('axios');

const refs = {
  searchForm: document.querySelector('#search-form'),
  imgCardContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.loadMoreBtn.disabled = true;
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click',onLoadMore);

async function onSearch(e) {
  
  e.preventDefault();
  
 newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  let query = newsApiService.query;

  if (query === '' ) {
    Notify.failure('There is nothing to find');
     return;
  };
  
  newsApiService.resetPage();
  
  newsApiService.fetchImages().then(res => {  

    if (res.totalHits === 0) { 
      Notify.failure('Sorry, there are no images matching your search query. Please try again.')
       return;
     };
    clearImgCardContainer();
    checkAmountOfResponseEl(res);
      
    // if (res.totalHits>40) {
    //   console.log(res.hits)
    //   Notify.success(`Hooray! We found ${res.totalHits} images.`);
    //   showLoadBtn(refs.loadMoreBtn);
    //   appendImgMarkup(res);
    //     refs.loadMoreBtn.disabled = false;
    //     return res.totalHits;
    // }
    //   if (res.totalHits < 40) {
    //     hideLoadBtn(refs.loadMoreBtn);
    //     Notify.success(`Hooray! We found ${res.totalHits} images.`);
    //     appendImgMarkup(res);
    //     return res.totalHits;
    //   }
  });
  refs.searchForm.reset();
};

function checkAmountOfResponseEl(result) {
  Notify.success(`Hooray! We found ${result.totalHits} images.`);
  appendImgMarkup(result);
  
  if (result.totalHits>40){
      showLoadBtn(refs.loadMoreBtn);
      refs.loadMoreBtn.disabled = false; 
  };
      if (result.totalHits < 40) {
        hideLoadBtn(refs.loadMoreBtn);   
  };
   return result.totalHits;
};

async function onLoadMore() {
   try {
     const response = await newsApiService.fetchImages();
     appendImgMarkup(response);

   } catch (error) {
     hideLoadBtn(refs.loadMoreBtn);
     Notify.info(`We're sorry, but you've reached the end of search results.`);
     console.log(error);
   }
   };

function renderImgMarkup(data) {
  return data.hits
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
   lightbox.refresh();
};

function clearImgCardContainer() {
    refs.imgCardContainer.innerHTML = '';
};

