require.config({
    baseUrl: 'lib',
    paths: {
        'app': '../js/app',
        'react': 'react-with-addons',
        'react-dom': 'react-dom',
        'react-addons-update': '../../node_modules/react-addons-update/index'
    },
    packages: [{
        name: 'material-ui',
        location: 'material-ui'
    }],
    shim: {
        'material-ui': {
            name: 'material-ui',
            baseUrl: 'lib2/material-ui',
        }
    }
});

