var config = {};

// dispatcher, so no login
config.testServer = 'http://myob.devfi.sh';

// screen sizes
config.viewports = [
    {
        width: 750,
        height: 1334
    },
    {
        width: 1024,
        height: 768
    },
    {
        width: 1366,
        height: 768
    },
    {
        width: 1920,
        height: 1080
    }];

// export
module.exports = config;
