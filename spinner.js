const waitWithSpinner = (callback) => {
  $('.spinner').removeClass('hidden');

  setTimeout(() => {
    callback();
    
    $(".spinner").addClass('hidden');
  }, 10);
}
