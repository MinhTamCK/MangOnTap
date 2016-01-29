casper.
  then(function() {
    phantomcss.screenshot('.myob-proof-point', 'proof-point-1');
  }).
  then(function() {
    phantomcss.screenshot('.myob-proof-point .proof-horizontal', 'proof-point-2');
  });

