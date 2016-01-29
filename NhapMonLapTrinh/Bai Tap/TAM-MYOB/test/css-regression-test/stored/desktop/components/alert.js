casper.
  then(function() {
    phantomcss.screenshot('.alert-success', 'alert-success');
  }).
  then(function() {
    phantomcss.screenshot('.alert-info', 'alert-info');
  }).
  then(function() {
    phantomcss.screenshot('.alert-warning', 'alert-warning');
  }).
  then(function() {
    phantomcss.screenshot('.alert-danger', 'alert-danger');
  });
