casper.
  then(function() {
    phantomcss.screenshot('.btn-default', 'btn-default');
  }).
  then(function() {
    phantomcss.screenshot('.btn-sm', 'btn-sm');
  }).
  then(function() {
    phantomcss.screenshot('.btn-xs', 'btn-xs');
  }).
  then(function() {
    phantomcss.screenshot('.myob-btn-secondary', 'myob-btn-secondary');
  }).
  then(function() {
    phantomcss.screenshot('.myob-btn-ghost', 'myob-btn-ghost');
  });
