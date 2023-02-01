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
      const generatedHtml = templates.booksMenu(book);
      const bookElement = utils.createDOMFromHTML(generatedHtml);
      // console.log(bookElement);
      const bookContainer = document.querySelector('.books-list');
      // console.log(bookContainer);
      bookContainer.appendChild(bookElement);
    }
  }
  render();
  
  function filterBooks(){
    const books = dataSource.books;
    for(let book of books){
      const imgLink = document.querySelector('.book__image[data-id="'+ book.id + '"]');
      console.log('imgLink', imgLink);
      let shouldBeHidden = false;
      for(let filter of filters){
        if(book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      if(shouldBeHidden){
        imgLink.classList.add('hidden');
      }
      else {
        imgLink.classList.remove('hidden');
      } 
    }
  }

  function initActions() {
    const filterWrapper = document.querySelector('.filters');
    console.log('filterWrapper', filterWrapper);
    filterWrapper.addEventListener('change', function (event) {
      event.preventDefault();
      const filterLink = event.target;
      console.log('filetLink', filterLink);
      console.log('filterLink.value', filterLink.value);

      if (filterLink.tagName === 'INPUT' && filterLink.name === 'filter' && filterLink.type === 'checkbox') {
        if (filterLink.checked) {
          if (filters.indexOf(filterLink.value) == -1) {
            filters.push(filterLink.value);
          }  
        }
        else {
          const filterToRemove = filters.indexOf(filterLink.value);
          filters.splice(filterToRemove, 1);
        } 
      }
      filterBooks();
      console.log('tablica filter', filters);
      
    });
    const booksWrapper = document.querySelector('.books-list');
    booksWrapper.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const element = this;
      const imgLink = event.target;
      console.log('imgLink', imgLink);
      console.log('element', element);
      console.log(imgLink.offsetParent.classList.contains('book__image'));
      if (imgLink.offsetParent.classList.contains('book__image')) {
        console.log('element na okadce', element);

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

  function addRatingStyle(){
    const booksRating = document.querySelectorAll('.book__rating__fill');
    for(let bookRating of booksRating){
      console.log('bookRating', bookRating.innerHTML);
      const ratingNumber = parseFloat(bookRating.innerHTML);
      const width = ratingNumber *10;
      
      if (ratingNumber < 6){
        bookRating.style = 'background: linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%); width:'+ width + '%';
      }
      else if (ratingNumber > 6 && ratingNumber <= 8){
        bookRating.style = 'background: linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%); width:'+ width + '%';
      }
      else if (ratingNumber > 8 && ratingNumber <= 9){
        bookRating.style = 'background: linear-gradient(to bottom, #299a0b 0%, #299a0b 100%); width:'+ width + '%';
      }
      else {
        bookRating.style = 'background: linear-gradient(to bottom, #ff0084 0%,#ff0084 100%); width:'+ width + '%';
      }
    }
  }
  addRatingStyle();
}
