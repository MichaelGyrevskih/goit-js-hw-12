import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions';
import { getImagesByQuery, PER_PAGE } from './js/pixabay-api';

let page = 1;
const form = document.querySelector('.form');
form.addEventListener('submit', async event => {
event.preventDefault();
const query = event.target.elements['search-text'].value.trim();
if (query === '') {
    iziToast.warning({
      icon: 'ico-error',
      message: 'Поле пошуку не може бути порожнім.',
      position: 'topRight',
    });
    return;
    }

   page = 1; 
   clearGallery();
   hideLoadMoreButton();
   showLoader();
    try {
        const data = await getImagesByQuery(query, page);
        const images = data.hits;

    if (images.length === 0) {
      iziToast.info({
        icon: 'ico-error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
        createGallery(images);
        if(page < Math.ceil(data.totalHits / PER_PAGE)){
            showLoadMoreButton();
        }
        else {
            iziToast.info({
                icon: 'Info',
                message: 'We are sorry, but you have reached the end of search results.',
                position: 'topRight',
              });
            hideLoadMoreButton();
        }
        form.reset();
    }
    }catch (error) {
        console.error(error);
    }finally {
        hideLoader();
    }
});
  

const loadMoreButton = document.querySelector('.button-load-more');
loadMoreButton.addEventListener('click', async () => {
    page++;
    loadMoreButton.disabled = true;
    const query = form.elements['search-text'].value.trim();
    try {
        const data = await getImagesByQuery(query, page);
        const images = data.hits;
        createGallery(images);
        
        const card = document.querySelector('.gallery-item');
        const cardHeight = card.getBoundingClientRect().height;
        window.scrollBy({
            left: 0,
            top: cardHeight*2,
            behavior: 'smooth',
        });
        
        if(page < Math.ceil(data.totalHits / PER_PAGE)){
            showLoadMoreButton();
        }
        else {
            iziToast.info({
                icon: 'info',
                message: 'We are sorry, but you have reached the end of search results.',
                position: 'topRight',
              });
            hideLoadMoreButton();
        }
    } catch (error) {
        console.error(error);
    }
    finally {
        loadMoreButton.disabled = false;
    }
});
