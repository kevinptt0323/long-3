define(['react', 'react-dom', 'material-ui'], function(React, ReactDOM, Mui) {
    console.log(React);
    console.log(ReactDOM);
    console.log(Mui);
    ReactDOM.render(
        <RaisedButton label="Default" />,
        document.getElementById('form')
    );
});

