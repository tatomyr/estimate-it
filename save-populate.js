$(document).ready(() => {
  readDataFromURI().forEach((item, i) => {
    console.log(item.task !== undefined, '| sub:', item.subtask !== undefined);

    if (item.task !== undefined) {
      addTask(item);
    }

    if (item.subtask !== undefined) {
      addSubtask(item, $('#table tr')[$('#table tr').length - 1].children[1].children[0]);
    }
  });

  readDataFromURI()
});

const save = () => {
  // getData()
  location.search = `tasks=${JSON.stringify(getData())}`; // encodeURIComponent();
}

const getData = () => {
  const tasks = [];
  $('#table tr').each((i, task) => {
    console.log($(task).find('.description').length, $(task).find('.subtask').length);

    if ($(task).find('.description').length) {
      const description = $(task).find('.description').val();
      const min = $(task).find('.min').val();
      const max = $(task).find('.max').val();

      tasks.push({ task: description, min, max });
    }

    if ($(task).find('.subtask').length) {
      const subtask = $(task).find('.subtask').val();
      const submin = $(task).find('.submin').val();
      const submax = $(task).find('.submax').val();

      tasks.push({ subtask, submin, submax });
    }

  });
  return tasks;
}

const readDataFromURI = () => {
  const preData = location.search.substring(1).split('&');

  if (!preData.find(item => item.split('=')[0] === 'tasks')) return [{ task: '' }];
  const tasks = JSON.parse(decodeURI(preData.find(item => item.split('=')[0] === 'tasks').split('=')[1]));
  return tasks;
}

const reset = () => {
  location.search = `tasks=[{"task":""}]`;
}
