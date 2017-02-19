var T = [];

const tableSubmit = () => {
  waitWithSpinner(() => {
    const t = getTasksMinMax();

    const vector = new DiscreteVector(t);
    T = Array(vector.combinations).fill().map((prev, item) => embodiment(t, vector.next())).sort((a, b) => a - b);

    $('#calculationContainer').css({ "display": "block" });
    setChart(T);
  });
}

const estimate = () => {
  const P = Number($('#probability').val()) / 100;
  const t = T[Math.ceil((T.length - 1) * P)];
  const result = t * getPercentage();

  $('#result').html(`TOTAL: ${result} H`);
}

const getTasksMinMax = () => {
  const t = [];
  $('#table .task').each((i, task)=> {
    const min = $(task).find('.min').val();
    const max = $(task).find('.max').val();
    min && max && t.push([
      Number(min),
      Number(max),
    ]);
  });
  return t;
}

const getPercentage = () => {
  let percentage = 0;
  $('#calculation .percentage').each((i, item)=> {
    percentage += Number(item.value);
  });
  return 1 + percentage / 100;
}

const embodiment = (a, b) => a.reduce((prev, item, i) => prev + item[b[i]], 0);

const setChart = (T) => {
  const datasets = [{
    // fill: false,
    // borderColor: 'black',
    // backgroundColor: 'black',
    label: 'Hours — Probability (Code Quality)',
    // xAxisID: 'Hours',
    // yAxisID: '%Probability',
    // pointBorderColor: 'rgba(100,255,0,1)',
    pointBorderWidth: 0,
    pointRadius: 0,
    showLine: true,
    // spanGaps: true,
    lineTension: 0,
    borderWidth: 2,
    borderColor: 'blue',
    data: T.sort(
      (a, b) => a - b
    ).map(
      (item, i) => ({ x: item, y: 100 * i / (T.length - 1) })
    )
  }];

  const ctx = document.getElementById("timeChart");
  const timeChart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets
    },
    options: {
      scales: {
        xAxes: [{
          type: 'linear',
          // type: 'time',
          position: 'bottom'
        }],
        // yAxes: [{
        //   ticks: {
        //     beginAtZero:true
        //   }
        // }]
      }
    }
  });
}

const addTask = ({ task = '', min = '', max = '' }) => {
  $('#table tbody').append(
    `<tr class="task">
      <td class="non-bordered not-printable">
        <span class="addSubtask" onclick="addSubtask({}, this)">↵</span>
      </td>
      <td>
        <input type="text" class="description non-bordered" placeholder="Task..." value="${task}" />
      </td>
      <td>
        <input type="number" min="0" class="min non-bordered" value="${min}" />
      </td>
      <td>
        <input type="number" min="0" class="max non-bordered" value="${max}" />
      </td>
      <td class="non-bordered not-printable align-right">
        <span class="delTask" onclick="delTask(this)">×</span>
      </td>
    </tr>`
  );

  // Focusing on the added task
  const tasks = $('.description');
  tasks[tasks.length - 1].focus();
}

const delTask = (e) => {
  pp = e.parentElement.parentElement;
  $(pp).nextUntil('.task').each((i, item) => item.remove());
  pp.remove();
}

const delSubtask = (e) => {
  prev = $(e.parentElement.parentElement).prevUntil('.task');
  next = $(e.parentElement.parentElement).nextUntil('.task');

  e.parentElement.parentElement.remove();

  if ([ ...prev, ...next ].length) {
    subtaskChange([ ...prev, ...next ][0].children[1].children[0]);
  }
}

const addSubtask = ({ subtask = '', submin = '', submax = '' }, e) => {
  const pp = $(e.parentElement.parentElement).nextUntil('.task');
  const insertAfter = pp.length && pp[pp.length - 1] || e.parentElement.parentElement;
  $(insertAfter).after(
    `<tr>
      <td class="non-bordered not-printable">
        <span></span>
      </td>
      <td>
        <span class="bullet">→</span><input type="text" class="subtask non-bordered" placeholder="Subtask..." value="${subtask}" />
      </td>
      <td>
        <input type="number" min="0" class="submin non-bordered" value="${submin}" onchange="subtaskChange(this)" />
      </td>
      <td>
        <input type="number" min="0" class="submax non-bordered" value="${submax}" onchange="subtaskChange(this)" />
      </td>
      <td class="non-bordered not-printable align-right">
        <span class="delSubask" onclick="delSubtask(this)">×</span>
      </td>
    </tr>`
  );

  $(insertAfter.nextSibling).find('.subtask')[0].focus();
}

const subtaskChange = (e) => {
  const minmax = [];

   pp = e.parentElement.parentElement

  minmax.push({
    min: pp.children[2].children[0].value,
    max: pp.children[3].children[0].value
  });

  $(pp).prevUntil('.task').each((i, item) => {
    minmax.push({
      min: item.children[2].children[0].value,
      max: item.children[3].children[0].value
    });
  });

  $(pp).nextUntil('.task').each((i, item) => {
    minmax.push({
      min: item.children[2].children[0].value,
      max: item.children[3].children[0].value
    });
  });

  const sum = minmax.reduce((prev, next) => ({
    min: prev.min + +next.min,
    max: prev.max + +next.max
  }), { min: 0, max: 0 });

  const parenTask = ($(pp).prevUntil('.task')[$(pp).prevUntil('.task').length - 1] || pp).previousSibling;
  console.log(parenTask);
  parenTask.children[2].children[0].value = sum.min;
  parenTask.children[3].children[0].value = sum.max;
}

// Canvas generator
const generateCanvas = () => {
  $('.not-printable').hide();
  $('.spinner').removeClass('hidden');

  const doc = new jsPDF();
  const left = 15;
  const top = 40;

  html2canvas(tableContainer).then((canvas) => {
    // resultContainer.appendChild(canvas);

    const url = canvas.toDataURL();

    // const height = width * canvas.height / canvas.width;
    // console.log(canvas, canvas.width, canvas.height, height );
    doc.addImage(url, 'PNG', left, top);

    // $(".spinner").addClass('hidden');
    // $('.not-printable').show();
  });


  html2canvas(calculationContainer).then((canvas) => {
    // resultContainer.appendChild(canvas);

    const url = canvas.toDataURL();

    doc.addPage();
    doc.addImage(url, 'PNG', left, top);

    doc.save('estimate-it.pdf');

    $(".spinner").addClass('hidden');
    $('.not-printable').show();
  });

}
