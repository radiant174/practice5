
const form = document.querySelector('#add-form');
const input = document.querySelector('#task-input');
const tip = document.querySelector('#tip');
const list = document.querySelector('#task-list');
const filters = document.querySelector('.filters');


let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
let currentFilter = 'all'; 

const save = () => localStorage.setItem('tasks', JSON.stringify(tasks));

const render = () => {
  list.innerHTML = '';               

  const shown = tasks.filter(task =>
    currentFilter === 'all' ? true :
    currentFilter === 'active' ? !task.done : task.done
  );

  if (shown.length === 0) {
    const li = document.createElement('li');
    li.textContent = tasks.length === 0 ? '暂无任务' : '没有符合条件的任务';
    li.className = 'empty-tip';
    list.appendChild(li);
    return;
  }

  shown.forEach(task => {
    const li = document.createElement('li');
    li.dataset.id = task.id;             
    if (task.done) li.classList.add('done');

    const span = document.createElement('span');
    span.textContent = task.text;      
    li.appendChild(span);

    const del = document.createElement('button');
    del.className = 'del';
    del.textContent = '删除';
    li.appendChild(del);

    list.appendChild(li);
  });
};


form.addEventListener('submit', (e) => {
  e.preventDefault();                
  const text = input.value.trim();
  if (text === '') {
    tip.textContent = '任务名不能为空';
    return;
  }
  tasks.push({ id: Date.now(), text: text, done: false });
  tip.textContent = '';
  input.value = '';
  save();                         
  render();                       
});


list.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (li === null) return;
  const id = Number(li.dataset.id);

  if (e.target.classList.contains('del')) {
    tasks = tasks.filter(task => task.id !== id);  
  } else {
    const task = tasks.find(task => task.id === id);
    if (task === undefined) return;
    task.done = !task.done;                 
  }
  save();
  render();
});


filters.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  currentFilter = e.target.dataset.filter;     
  render();
});


render();
