/* jslint node: true, esnext: true */
'use strict';
var
  React = require('react'),
  ReactDOM = require('react-dom'),
  classNames = require('classnames'),
  ReactHighcharts = require('react-highcharts/dist/bundle/highcharts'),
  Paper = require('material-ui/lib/paper'),
  $ = require('jquery')
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
    for(var data of this.state._result) {
      infos.push(<Info displayData={data} key={data.uid} />);
    }
    return (
      <div>
        {infos}
      </div>
    );
  },
  getInitialState: function() {
    return { _result: [] };
  },
  componentDidMount() {
    this.loadResult();
  },
  loadResult() {
    $.ajax({
      url: this.props.resultUrl,
      dataType: 'json',
      cache: false,
      success: function(data) {
        var result = this.props.displayDatas;
        result[0].description = data.height;
        result[1].description = data.smoke;
        result[2].description = data.wine;
        result[3].description = data.sleep;
        result[4].description = data.exercise;
        result[5].description = data.vegetable;
        this.setState({_result: result});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.resultUrl, status, err.toString());
      }.bind(this),
      complete: function() {
        $("#loader").fadeOut(500);
        setTimeout(this.loadStatus, 10000);
      }.bind(this)
    });
  }
});

var Info = React.createClass({
  render() {
    var paperCls = classNames({
      'Info': true,
      'init': this.state.init,
      'final': !this.state.init
    });
    return (
      <Paper className={paperCls} zInder={1}>
        <InfoGraph uid={this.props.displayData.uid} />
        <InfoContent title={this.props.displayData.title} description={this.props.displayData.description} />
      </Paper>
    );
  },
  getInitialState() {
    return { init: true };
  },
  componentDidMount() {
    setTimeout(() => {
      this.setState( {init: false} );
    }, 500);
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
      { uid: "8773785-untitled-infographic", title: "18歲以上國民，近一半體重過重"},
      { uid: "8777642-smoking", title: "18歲以上國民，20%的人每天都吸煙"},
      { uid: "8777690-alcohol_new", title: "一位成人每天平均喝3.3公升的酒"},
      { uid: "8774622-sleeping", title: "一位成人每天平均睡8.7小時"},
      { uid: "8777446-exercise-time", title: "新竹市民是台灣運動量第一，平均每天1小時"},
      { uid: "8777826-threeveg", title: "只有8.5%的台灣人每天固定吃三份蔬菜和二份水果以上"}
    ];
    return <Panel displayDatas={displayDatas} resultUrl="api/dataHandler.php?result" />;
  })(),
  document.getElementById('panel')
);

