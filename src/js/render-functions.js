import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.button-load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<li class="gallery-item">
	<a class="gallery-link" href="${largeImageURL}">
		<img
		  class="gallery-image"
		  src="${webformatURL }"
		  alt="${tags}"
		/>
	</a>
   <div class="image-info">
        <div class="info-item">
            <p class="info-label">Likes</p>
            <p class="info-value">${likes}</p>
        </div>
        <div class="info-item">
            <p class="info-label">Views</p>
            <p class="info-value">${views}</p>
        </div>
        <div class="info-item">
            <p class="info-label">Comments</p>
            <p class="info-value">${comments}</p>
        </div>
        <div class="info-item">
            <p class="info-label">Downloads</p>
            <p class="info-value">${downloads}</p>
        </div>
    </div>
</li>`).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
   loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreButton.classList.remove('hidden');
}

export function hideLoadMoreButton() {
    loadMoreButton.classList.add('hidden');
}