/* jslint node: true, esnext: true */
'use strict';
var
  React = require('react'),
  ReactDOM = require('react-dom'),
  ReactHighcharts = require('react-highcharts/dist/bundle/highcharts'),
  Paper = require('material-ui/lib/paper')
;
var config = {
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  series: [{
    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
  }]
};

var Panel = React.createClass({
  render() {
    var infos = [];
    for(var data of this.props.displayDatas) {
      infos.push(<Info displayData={data} key={data.uid} />);
    }
    return (
      <div>
        {infos}
      </div>
    );
  }
});

var Info = React.createClass({
  render() {
    return (
      <Paper className="item" zInder={1}>
        <InfoGraph uid={this.props.displayData.uid} />
        <InfoContent title={this.props.displayData.title} description={this.props.displayData.description} />
      </Paper>
    );
  }
});

var InfoGraph = React.createClass({
  render() {
    return (
      <div className="InfoGraph">
        <div className="piktowrapper-embed">
          <div className="pikto-canvas-wrap">
            <div className="pikto-canvas"></div>
          </div>
        </div>
      </div>
    );
  },
  componentDidMount() {
    ReactDOM.findDOMNode(this)
      .getElementsByClassName('piktowrapper-embed')[0]
      .setAttribute('pikto-uid', this.props.uid);
    (function(d){
      var js, id="pikto-embed-js", ref=d.getElementsByTagName("script")[0];
      if (d.getElementById(id)) { return;}
      js=d.createElement("script"); js.id=id; js.setAttribute('async', "");
      js.src="https://magic.piktochart.com/assets/embedding/embed.js";
      ref.parentNode.insertBefore(js, ref);
    }(document));
  }
});

var InfoContent = React.createClass({
  render() {
    return (
      <div className="InfoContent">
        <h3 className="infotitle">{this.props.title}</h3>
        <div className="des">
          <span>{this.props.description}</span>
        </div>
      </div>
    );
  }
});

ReactDOM.render((() => {
    var displayDatas = [
      { uid: "8773785-untitled-infographic", title: "18歲以上國民，近一半體重過重", description: "恭喜你，你體重正常" },
      { uid: "8773786-smoking_yes", title: "18歲以上國民，20%的人每天都吸煙", description: "恭喜你，你並不吸煙" },
      { uid: "8774513-alcohol", title: "一位成人每天平均喝3.3公升的酒", description: "別飲酒過量" },
      { uid: "8774622-sleeping", title: "一位成人每天平均睡8.7小時", description: "你好像睡太少了" }
    ];
    return <Panel displayDatas={displayDatas} />;
  })(),
  document.getElementById('panel')
);

