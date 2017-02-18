$(document).ready(() => {
  readDataFromURI().forEach(item => addTask(item));
});

const save = () => {
  location.search = `tasks=${JSON.stringify(getData())}`; // encodeURIComponent();
}

const getData = () => {
  const tasks = [];
  $('#table .task').each((i, task)=> {
    const description = $(task).find('.description').val();
    const min = $(task).find('.min').val();
    const max = $(task).find('.max').val();
    tasks.push({ task: description, min, max });
  });
  return tasks;
}

const readDataFromURI = () => {
  const preData = location.search.substring(1).split('&');

  if (!preData.find(item => item.split('=')[0] === 'tasks')) return [{}];
  const tasks = JSON.parse(decodeURI(preData.find(item => item.split('=')[0] === 'tasks').split('=')[1]));
  return tasks;
}

const reset = () => {
  location.search = `tasks=[{}]`;
}
