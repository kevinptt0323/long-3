require.config({
    baseUrl: 'lib',
    paths: {
        'react': 'react-with-addons',
        'react-dom': 'react-dom',
        'raisedButton': 'material-ui/raised-button'
    },
    packages: [{
        name: 'material-ui',
        location: 'material-ui',
        main: 'index'
    }],
    shim: {
        'material-ui': {
            name: 'material-ui',
            baseUrl: 'lib2/material-ui',
        }
    }
});

require(["js/form.js"]);
