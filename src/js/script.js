{
  ('use strict');
  const favoriteBooks = [];
  const filters = [];

  const templates = {
    booksMenu: Handlebars.compile(
      document.querySelector('#template-book').innerHTML
    ),
  };

  function render() {
    const books = dataSource.books;
    for (let book of books) {
      book.ratingWidth = book.rating * 10;
      book.ratingBgc = determineRatingBgc(book.rating);
      const generatedHtml = templates.booksMenu(book);
      const bookElement = utils.createDOMFromHTML(generatedHtml);
      const bookContainer = document.querySelector('.books-list');
      bookContainer.appendChild(bookElement);
    }
  }
  render();

  function filterBooks() {
    const books = dataSource.books;
    for (let book of books) {
      const imgLink = document.querySelector('.book__image[data-id="' + book.id + '"]');
      let shouldBeHidden = false;
      for (let filter of filters) {
        if (book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden) {
        imgLink.classList.add('hidden');
      } else {
        imgLink.classList.remove('hidden');
      }
    }
  }

  function initActions() {
    const filterWrapper = document.querySelector('.filters');

    filterWrapper.addEventListener('change', function (event) {
      event.preventDefault();
      const filterLink = event.target;

      if (filterLink.tagName === 'INPUT' && filterLink.name === 'filter' && filterLink.type === 'checkbox') {
        if (filterLink.checked) {
          if (filters.indexOf(filterLink.value) == -1) {
            filters.push(filterLink.value);
          }
        } else {
          const filterToRemove = filters.indexOf(filterLink.value);
          filters.splice(filterToRemove, 1);
        }
      }
      filterBooks();
    });

    const booksWrapper = document.querySelector('.books-list');
    booksWrapper.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const imgLink = event.target;

      if (imgLink.offsetParent.classList.contains('book__image')) {
        const bookId = imgLink.offsetParent.getAttribute('data-id');
        if (favoriteBooks.indexOf(bookId) == -1) {
          favoriteBooks.push(bookId);
          imgLink.offsetParent.classList.add('favorite');
        } else {
          const idToRemove = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(idToRemove, 1);
          imgLink.offsetParent.classList.remove('favorite');
        }
      }
    });
  }
  initActions();

  function determineRatingBgc(rating){
    if(rating < 6) {
      return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    }
    else if(rating >= 6 && rating <= 8) {
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    }
    else if (rating > 8 && rating <= 9){
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)'; 
    }
    else {
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)'; 
    }
  }
}
