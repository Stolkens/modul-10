{
  ('use strict');
  const templates = {
    booksMenu: Handlebars.compile(
      document.querySelector('#template-book').innerHTML
    ),
  };
  
  class BookList {
    constructor(){
      const thisBookList = this;
      thisBookList.getElements();
      thisBookList.render();
      thisBookList.initActions();
      
    }
    getElements(){
      const thisBookList = this;
      thisBookList.books = dataSource.books;
      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];
      thisBookList.container = document.querySelector('.books-list');
      thisBookList.filterWrapper = document.querySelector('.filters');
      thisBookList.wrapper = document.querySelector('.books-list');
    }
    render(){
      const thisBookList = this;
      for (let book of thisBookList.books) {
        book.ratingWidth = book.rating * 10;
        book.ratingBgc = thisBookList.determineRatingBgc(book.rating);
        const generatedHtml = templates.booksMenu(book);
        const bookElement = utils.createDOMFromHTML(generatedHtml);
        thisBookList.container.appendChild(bookElement);
      }
    }
    filterBooks(){
      const thisBookList = this;

      for (let book of thisBookList.books) {
        const imgLink = document.querySelector('.book__image[data-id="' + book.id + '"]');
        let shouldBeHidden = false;
        for (let filter of thisBookList.filters) {
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
    initActions(){
      const thisBookList = this;

      thisBookList.filterWrapper.addEventListener('change', function (event) {
        event.preventDefault();
        const filterLink = event.target;
  
        if (filterLink.tagName === 'INPUT' && filterLink.name === 'filter' && filterLink.type === 'checkbox') {
          if (filterLink.checked) {
            if (thisBookList.filters.indexOf(filterLink.value) == -1) {
              thisBookList.filters.push(filterLink.value);
            }
          } else {
            const filterToRemove = thisBookList.filters.indexOf(filterLink.value);
            thisBookList.filters.splice(filterToRemove, 1);
          }
        }
        thisBookList.filterBooks();
      });
  
      thisBookList.wrapper.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const imgLink = event.target;

        if (imgLink.offsetParent.classList.contains('book__image')) {
          const bookId = imgLink.offsetParent.getAttribute('data-id');
          if (thisBookList.favoriteBooks.indexOf(bookId) == -1) {
            thisBookList.favoriteBooks.push(bookId);
            imgLink.offsetParent.classList.add('favorite');
          } else {
            const idToRemove = thisBookList.favoriteBooks.indexOf(bookId);
            thisBookList.favoriteBooks.splice(idToRemove, 1);
            imgLink.offsetParent.classList.remove('favorite');
          }
        }
      });
    }
    determineRatingBgc(rating){
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
  new BookList();
  
}
