import gallery from "./gallery-items.js";
console.dir(gallery);

/**Разбей задание на несколько подзадач:

Создание и рендер разметки по массиву данных и предоставленному шаблону.
Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

Открытие модального окна по клику на элементе галереи.
Подмена значения атрибута src элемента img.lightbox__image.
Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того,
 чтобы при следующем открытии модального окна,
пока грузится изображение, мы не видели предыдущее.

Стартовые файлы
В папке src ты найдешь стартовые файлы проекта с базовой разметкой и готовыми стилями.
В файле gallery-items.js есть массив объектов содержащих информацию о изображениях: маленькое изображение, оригинальное и описание.
Разметка элемента галереи
Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе img, и указываться в href ссылки (это необходимо для доступности).

<li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li>

Дополнительно
Следующий функционал не обязателен при сдаче задания, но будет хорошей практикой по работе с событиями.

Закрытие модального окна по клику на div.lightbox__overlay.
Закрытие модального окна по нажатию клавиши ESC.
Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо". */

const ulRef = document.querySelector(".js-gallery");
const bigImgRef = document.querySelector(".lightbox__image");
const btmRef = document.querySelector('button[data-action="close-lightbox"]');
const lightBoxRef = document.querySelector(".lightbox");
const overRef = document.querySelector(".lightbox__overlay");

const list = ({ preview, original, description }) =>
  `<li class="gallery__item">
    <a
      class="gallery__link"
      href = ${original};
    >
      <img
        class="gallery__image"
        src= ${preview}
        data-source= ${original}
        alt=${description}
      />
    </a>
  </li>`;

// const galRef = gallery.map(item => list(item)).join('')
// console.log(galRef);
//вариант два:

const galRef = gallery.reduce((acc, item) => acc + list(item), "");

ulRef.insertAdjacentHTML("beforeend", galRef);
console.log(ulRef);

//==============================часть вторая=====================================

function onGalleryClick(event) {
  event.preventDefault();
  lightBoxRef.classList.add("is-open");
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const imageRef = event.target;
  const largeImageURL = imageRef.dataset.source;
  bigImgRef.src = largeImageURL;
}

function onBtm(e) {
  lightBoxRef.classList.remove("is-open");
  bigImgRef.src = "";
}

function onOverRef(event) {
  console.log(event.target);
  console.log(event.currentTarget);
  if (event.target === event.currentTarget) {
    lightBoxRef.classList.remove("is-open");
    bigImgRef.src = "";
  }
}
btmRef.addEventListener("click", onBtm);
overRef.addEventListener("click", onOverRef);
ulRef.addEventListener("click", onGalleryClick);
