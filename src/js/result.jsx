/* jslint node: true, esnext: true */
'use strict';
var
  $                = require('jquery'),
  React            = require('react'),
  ReactDOM         = require('react-dom'),
  classNames       = require('classnames'),
  ReactHighcharts  = require('react-highcharts/dist/bundle/highcharts'),
  Paper            = require('material-ui/lib/paper'),
  CircularProgress = require('material-ui/lib/circular-progress'),
  RaisedButton     = require('material-ui/lib/raised-button'),
  Dialog           = require('material-ui/lib/dialog'),
  injectTapEventPlugin = require("react-tap-event-plugin")
;

injectTapEventPlugin();

var Page = React.createClass({
  render() {
    var pageCls = classNames({
      'page': true,
      'init': this.state.init,
      'final': !this.state.init
    });
    return (
      <div className={pageCls}>
        <div className="progress">
          <CircularProgress mode="indeterminate" size={3} />
        </div>
        <Panel displayDatas={this.state.displayDatas} resultUrl="api/dataHandler.php?result" />
      </div>
    );
  },
  getInitialState() {
    var displayDatas = [
      { uid: "8773785-untitled-infographic", title: "18歲以上國民，近一半體重過重", chart: "weight"},
      { uid: "8777642-smoking", title: "18歲以上國民，20%的人每天都吸煙", chart: "smoking"},
      { uid: "8777690-alcohol_new", title: "一位成人每天平均喝3.3公升的酒", chart: ""},
      { uid: "8774622-sleeping", title: "一位成人每天平均睡8.7小時", chart: ""},
      { uid: "8777446-exercise-time", title: "新竹市民是台灣運動量第一，平均每天1小時", chart: "exercise"},
      { uid: "8777826-threeveg", title: "只有8.5%的台灣人每天固定吃三份蔬菜和二份水果以上", chart: ""},
      { uid: "8778236-b-liver", title: "B肝可透過唾液傳染，可透過定期補疫苗解決", chart: ""}
    ];
    return { displayDatas: displayDatas, init: true };
  },
  componentDidMount() {
    setTimeout(() => {
      this.setState( {init: false} );
    }, 5000);
  }
});

var Panel = React.createClass({
  render() {
    var infos = [];
    for(var data of this.state._result) {
      infos.push(<Info displayData={data} key={data.uid} />);
    }
    return (
      <div className="panel">
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
        result[6].description = data.Bvac;
        this.setState({_result: result});
      }.bind(this),
      error: function(xhr, status, err) {
        //console.error(this.props.resultUrl, status, err.toString());
      }.bind(this),
      complete: function() {
      }.bind(this)
    });
  }
});

var Info = React.createClass({
  render() {
    var paperCls = classNames({
      'info': true,
      'init': this.state.init,
      'final': !this.state.init
    });
    var hide = this.props.displayData && this.props.displayData.chart != "" ? false : true;
    var btnCls = classNames({
      "button": true,
      "hide": hide
    });
    var standardActions = [
      { text: 'Close', onTouchTap: this._onDialogClose.bind(this), ref: 'submit' }
    ];
    return (
      <Paper className={paperCls} zInder={1}>
        <InfoGraph uid={this.props.displayData.uid} />
        <InfoContent title={this.props.displayData.title} description={this.props.displayData.description} />
        <div className={btnCls}>
          <RaisedButton label="觀看相關數據" secondary={true} onTouchTap={this.handleTouchTapDialog.bind(this)} />
        </div>
        <Dialog
          ref="dialog"
          title="相關數據"
          actions={standardActions}
          actionFocus="submit"
          modal={false}>
          <ReactHighcharts config={this.state.chart} />;
        </Dialog>
      </Paper>
    );
  },
  getInitialState() {
    return { init: true, chart: {} };
  },
  componentDidMount() {
    if( this.props.displayData.chart !== "" ) {
      $.ajax({
        url: "js/chart/"+this.props.displayData.chart+".js",
        dataType: 'json',
        success: function(data) {
          this.setState({chart: data});
        }.bind(this),
        error: function(xhr, status, err) {
          //console.error(this.props.resultUrl, status, err.toString());
        }.bind(this),
        complete: function(a, b) {
        }.bind(this)
      });
    }
    setTimeout(() => {
      this.setState( {init: false} );
    }, 500);
  },
  _onDialogClose() {
    this.refs.dialog.dismiss();
  },
  handleTouchTapDialog(e) {
    this.refs.dialog.show();
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

ReactDOM.render(<Page />, document.getElementById('page'));
