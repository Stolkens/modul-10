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
    const bookContainer = document.querySelector('.books-list');
    bookContainer.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const element = this;
      console.log('event.taget', event.target);
      console.log('element', element);
      console.log(
        event.target.offsetParent.classList.contains('book__image')
      );
      if (event.target.offsetParent.classList.contains('book__image')) {
        console.log('element na okadce', element);

        const bookId = event.target.offsetParent.getAttribute('data-id');
        if (favoriteBooks.indexOf(bookId) == -1) {
          favoriteBooks.push(bookId);
          event.target.offsetParent.classList.add('favorite');
        } else {
          const idToRemove = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(idToRemove, 1);
          event.target.offsetParent.classList.remove('favorite');
        }
      }
    });
    console.log('tablica', favoriteBooks);
  }
  initActions();
}
