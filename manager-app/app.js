
const form = document.querySelector('#book-form');
const titleInput = document.querySelector('#book-title');
const authorInput = document.querySelector('#book-author');
const ratingInput = document.querySelector('#book-rating');
const statusInput = document.querySelector('#book-status');
const tip = document.querySelector('#tip');
const list = document.querySelector('#book-list');
let books = [];

const render = () => {
  list.innerHTML = '';               

  if (books.length === 0) {
    const li = document.createElement('li');
    li.textContent = '还没有图书，添加一本吧';
    li.className = 'empty-tip';
    list.appendChild(li);
    return;
  }

  books.forEach(book => {
    const li = document.createElement('li');
    li.className = 'book';
    li.dataset.id = book.id;

    const info = document.createElement('span');

    info.textContent = `${book.title} · ${book.author} · ${book.rating} 星 · ${book.status}`;

    li.appendChild(info);
    list.appendChild(li);
  });
};


form.addEventListener('submit', (e) => {
  e.preventDefault();             

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const rating = Number(ratingInput.value);

  if (title === '' || author === '') {
    tip.textContent = '书名和作者都不能为空';
    return;
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    tip.textContent = '评分必须是 1 到 5 的整数';
    return;
  }

  books.push({
    id: Date.now(),
    title: title,
    author: author,
    rating: rating,
    status: statusInput.value
  });

  tip.textContent = '';
  form.reset();
  render();
});

render();
