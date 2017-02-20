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

  $('#result').html(`Total: ${result} h`);
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
    // label: 'Hours — Probability (Code Quality)',
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
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          type: 'linear',
          // type: 'time',
          position: 'bottom',
          scaleLabel: {
            display: true,
            labelString: 'Hours'
          }
        }],
        yAxes: [{
          // ticks: {
          //   beginAtZero:true
          // },
          scaleLabel: {
            display: true,
            labelString: 'Probability (Code Quality)'
          }
        }]
      }
    }
  });
}

const addTask = ({ task = '', min = '', max = '' }) => {
  $('#table tbody').append(
    `<tr class="task">
      <td class="non-bordered not-printable">
        <span class="addSubtask" onclick="addSubtask({}, this)">↳</span>
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

const addSubtask = ({ subtask = '', submin = '', submax = '' }, e) => {
  const pp = $(e.parentElement.parentElement).nextUntil('.task');
  const insertAfter = pp.length && pp[pp.length - 1] || e.parentElement.parentElement;
  $(insertAfter).after(
    `<tr>
      <td class="non-bordered not-printable">
        <span></span>
      </td>
      <td class="subtask-td">
        <span class="bullet">⊢</span><input type="text" class="subtask non-bordered" placeholder="Subtask..." value="${subtask}" />
      </td>
      <td class="subtask-td">
        <input type="number" min="0" class="submin non-bordered" value="${submin}" onchange="subtaskChange(this)" />
      </td>
      <td class="subtask-td">
        <input type="number" min="0" class="submax non-bordered" value="${submax}" onchange="subtaskChange(this)" />
      </td>
      <td class="non-bordered not-printable align-right">
        <span class="delSubask" onclick="delSubtask(this)">×</span>
      </td>
    </tr>`
  );

  $(insertAfter.nextSibling).find('.subtask')[0].focus();
}

const delSubtask = (e) => {
  prev = $(e.parentElement.parentElement).prevUntil('.task');
  next = $(e.parentElement.parentElement).nextUntil('.task');

  e.parentElement.parentElement.remove();

  if ([ ...prev, ...next ].length) {
    subtaskChange([ ...prev, ...next ][0].children[1].children[0]); // ??
  }
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
  const top = 20;

  const keenlogo = 'data:image/jpeg;base64,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';
  const logocoords = [148, 10, 52, 7];

  html2canvas(tableContainer).then((canvas) => {
    // resultContainer.appendChild(canvas);

    const url = canvas.toDataURL();

    // const height = width * canvas.height / canvas.width;
    // console.log(canvas, canvas.width, canvas.height, height );
    doc.addImage(keenlogo, 'JPEG', ...logocoords);
    doc.addImage(url, 'PNG', left, top);

    // $(".spinner").addClass('hidden');
    // $('.not-printable').show();
  });


  html2canvas(calculationContainer).then((canvas) => {
    // resultContainer.appendChild(canvas);

    const url = canvas.toDataURL();

    doc.addPage();
    doc.addImage(keenlogo, 'JPEG', ...logocoords);
    doc.addImage(url, 'PNG', left, top);

    doc.save('estimate-it.pdf');

    $(".spinner").addClass('hidden');
    $('.not-printable').show();
  });

}
