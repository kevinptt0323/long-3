requirejs.config({
  baseUrl: 'lib',
  paths: {
    react: 'react-with-addons.min',
  }
});

requirejs(["js/main.js"]);
