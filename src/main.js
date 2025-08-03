import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions';
import { getImagesByQuery, PER_PAGE } from './js/pixabay-api';

let page = 1;
let currentQuery = '';
const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('.button-load-more');
hideLoadMoreButton();
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

  
    currentQuery = query;
    page = 1;
    
    clearGallery();
    hideLoadMoreButton();
    showLoader();
    
    try {
        const data = await getImagesByQuery(currentQuery, page);
        const images = data.hits;

        if (images.length === 0) {
            iziToast.info({
                icon: 'ico-error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
            });
        } else {
            createGallery(images);
            if (page < Math.ceil(data.totalHits / PER_PAGE)) {
                showLoadMoreButton();
            } else {
                iziToast.info({
                    icon: 'Info',
                    message: 'We are sorry, but you have reached the end of search results.',
                    position: 'topRight',
                });
            }
        }
        form.reset();
    } catch (error) {
        console.error(error);
        iziToast.error({
            icon: 'ico-error',
            message: 'Something went wrong. Please try again!',
            position: 'topRight',
        });
    } finally {
        hideLoader();
    }
});

loadMoreButton.addEventListener('click', async () => {
    page++;
    loadMoreButton.disabled = true;
    showLoader(); 
    
    try {
        const data = await getImagesByQuery(currentQuery, page);
        const images = data.hits;
        createGallery(images);
        const card = document.querySelector('.gallery-item');
        if (card) {
            const cardHeight = card.getBoundingClientRect().height;
            window.scrollBy({
                left: 0,
                top: cardHeight * 2,
                behavior: 'smooth',
            });
        }
        if (page < Math.ceil(data.totalHits / PER_PAGE)) {
            showLoadMoreButton();
        } else {
            iziToast.info({
                icon: 'info',
                message: 'We are sorry, but you have reached the end of search results.',
                position: 'topRight',
            });
            hideLoadMoreButton();
        }
    } catch (error) {
        console.error(error);
        iziToast.error({
            icon: 'ico-error',
            message: 'Something went wrong. Please try again!',
            position: 'topRight',
        });
    } finally {
        hideLoader();
        loadMoreButton.disabled = false;
    }
});
