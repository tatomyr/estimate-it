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
  // location.search = `tasks=${JSON.stringify(getData())}`; // encodeURIComponent();
  history.pushState('', '', `${location.pathname}?tasks=${JSON.stringify(getData())}`)

  $('.spinner').removeClass('hidden');
  fetch('https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyCKs8fbpledoucIysdmEGmQLCWHTdp8CXg', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      longUrl: location.href
    })
  }).then(res => res.json()).then(doc => {
    prompt('Your short address:', doc.id);
    $(".spinner").addClass('hidden');
  });
}

const getData = () => {
  const tasks = [];
  $('#table tr').each((i, task) => {
    console.log($(task).find('.description').length, $(task).find('.subtask').length);

    if ($(task).find('.description').length) {
      const description = $(task).find('.description').val();
      const min = $(task).find('.min').val();
      const max = $(task).find('.max').val();

      const descEncoded = description.replace(/ \& /g, ' and ').
                                      replace(/\&/g, ' and ').
                                      replace(/\#/g, '⧣');

      tasks.push({ task: descEncoded, min, max });
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
