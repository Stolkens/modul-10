{
  ('use strict');

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
  const favoriteBooks = [];

  function initActions() {
    
    const booksImage = document.querySelectorAll('.book__image');
    for (let bookImage of booksImage) {
      bookImage.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const element = this;
        console.log('element', element);
        const bookId = element.getAttribute('data-id');
        if(favoriteBooks.indexOf(bookId)==-1){
          favoriteBooks.push(bookId);
          element.classList.add('favorite');
        }
        else {
          const idToRemove = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(idToRemove, 1);
          element.classList.remove('favorite');
        }
        console.log(favoriteBooks);
      });
      
    }
  }
  initActions();
}
