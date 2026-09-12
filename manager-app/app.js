
const form = document.querySelector('#book-form');
const titleInput = document.querySelector('#book-title');
const authorInput = document.querySelector('#book-author');
const ratingInput = document.querySelector('#book-rating');
const statusInput = document.querySelector('#book-status');
const searchInput = document.querySelector('#search-input');
const tip = document.querySelector('#tip');
const list = document.querySelector('#book-list');
let books = [];

const render = () => {
  list.innerHTML = '';

  const keyword = searchInput.value.trim().toLowerCase();
  const shown = books.filter(book =>
    book.title.toLowerCase().includes(keyword) ||
    book.author.toLowerCase().includes(keyword)
  );

  if (shown.length === 0) {
    const li = document.createElement('li');
    li.textContent = books.length === 0 ? '还没有图书，添加一本吧' : '没有匹配的图书';
    li.className = 'empty-tip';
    list.appendChild(li);
    return;
  }

  shown.forEach(book => {
    const li = document.createElement('li');
    li.className = 'book';
    li.dataset.id = book.id;

    const info = document.createElement('span');
    info.textContent = `${book.title} · ${book.author} · ${book.rating} 星 · ${book.status}`;
    li.appendChild(info);

    const del = document.createElement('button');
    del.className = 'del';
    del.textContent = '删除';
    li.appendChild(del);

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

list.addEventListener('click', (e) => {
  if (!e.target.classList.contains('del')) return;
  const li = e.target.closest('li');
  if (li === null) return;

  const id = Number(li.dataset.id);
  books = books.filter(book => book.id !== id);
  render();
});

searchInput.addEventListener('input', render);

render();
