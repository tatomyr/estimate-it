var T = [];

const tableSubmit = () => {
  const t = getTasksMinMax();

  const vector = new DiscreteVector(t);
  T = Array(vector.combinations).fill().map((prev, item) => embodiment(t, vector.next())).sort((a, b) => a - b);

  $('#container').css({ "display": "block" });
  setChart(T);
}

const estimate = () => {
  const P = Number($('#probability').val()) / 100;
  const t = T[Math.ceil((T.length - 1) * P)];
  const result = t * getPercentage();

  $('#result').html(`RESULT: ${result} H`);
}

const getTasksMinMax = () => {
  const t = [];
  $('#table .task').each((i, task)=> {
    const min = $(task).find('.min').val();
    const max = $(task).find('.max').val()
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

const addTask = () => {
  $('#table tbody').append(
    `<tr class="task">
      <td>
        <input type="text" class="description" placeholder="Task..." />
      </td>
      <td>
        <input type="number" class="min" />
      </td>
      <td>
        <input type="number" class="max" />
      </td>
    </tr>`
  );
}

// Canvas generator
const generateCanvas = () => {
  $('.not-printable').hide();

  html2canvas(document.body).then((canvas) => {
    document.body.appendChild(canvas);

    $('.not-printable').show();
  });


}
