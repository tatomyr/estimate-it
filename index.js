// We have a set of operation duration intervals.
// Find every possible combination of total duration
// Assume that there are only two possible duration for each operation - min or max

const tableSubmit = () => {
  const t = [];
  $('#table .task').each((i, task)=> {
    const min = $(task).find('.min').val();
    const max = $(task).find('.max').val()
    min && max && t.push([
      Number(min),
      Number(max),
    ]);
  });
  console.log(t);




  const J = new DiscreteVector(t);
  const T = [];
  for (let n = 0; n < J.combinations; n++) {
    T.push(embodiment(t, J.next()));
  }
  console.log(T.sort((a, b) => a - b));
  const P = 0.95;
  console.log(
    `${P * 100}%: [${Math.ceil((T.length - 1) * P)}] =>`,
    T.sort((a, b) => a - b)[Math.ceil((T.length - 1) * P)]
  );


  setChart(T);

}

const embodiment = (a, b) => a.reduce((prev, item, i) => prev + item[b[i]], 0);

const setChart = (T) => {
  const datasets = [{
    // fill: false,
    // borderColor: 'black',
    // backgroundColor: 'black',
    label: 'Hours -- %Probability',
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
