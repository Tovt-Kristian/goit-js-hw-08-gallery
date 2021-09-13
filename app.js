const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];




const refs = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalOverlay: document.querySelector('.lightbox__overlay'),
  lightboxImg: document.querySelector('.lightbox__image'),
  modalCloseBtn: document.querySelector('.lightbox__button')
}


//1. Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.
const gallery = createElementOfGallery(galleryItems)
refs.gallery.insertAdjacentHTML('beforeend', gallery)

//2. Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
refs.gallery.addEventListener('click', onClickOfElementGallery)


function createElementOfGallery(galleryItems) {
return galleryItems
    .map(({preview, original, description}) => {
      return `
  <li class="gallery__item">
    <a
    class="gallery__link"
    href="${original}"
    >
      <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      />
    </a>
  </li>`
    })
    .join('');
}

function onClickOfElementGallery(event) {
  if (!event.target.classList.contains('gallery__image')){
    return;
  }
  event.preventDefault();
  //console.log(event.target.dataset.source);
  closeModalWindow();

  openModalWindow(event);
};

//3. Открытие модального окна по клику на элементе галереи.
function openModalWindow(event) {
  refs.modal.classList.add('is-open');
//4. Подмена значения атрибута src элемента img.lightbox__image.
  refs.lightboxImg.src = event.target.dataset.source;
  refs.lightboxImg.alt = event.target.alt;
}

function closeModalWindow() {
  const modalWindow = document.querySelector('.js-lightbox.is-open');
    if (modalWindow) {
      modalWindow.classList.remove('is-open')
      //6. Очистка значения атрибута src элемента img.lightbox__image. 
      //Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
      refs.lightboxImg.src ='';
      refs.lightboxImg.alt = '';
    }
  }

//5. Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
refs.modalCloseBtn.addEventListener('click', closeModalWindow)
//Закрытие модального окна по клику на div.lightbox__overlay.
refs.modalOverlay.addEventListener('click', closeModalWindow)
//Закрытие модального окна по нажатию клавиши ESC.
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModalWindow();
  }
});


