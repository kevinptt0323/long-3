{
  "chart":{
    "type":"areaspline"
  },
  "title":{
    "text":"各年度國人每日吸菸率"
  },
  "legend":{
    "layout":"vertical",
    "align":"left",
    "verticalAlign":"top",
    "x":150,
    "y":100,
    "floating":true,
    "borderWidth":1,
    "backgroundColor":"#FFFFFF"
  },
  "xAxis":{
    "categories":[
      "2004",
      "2005",
      "2006",
      "2007",
      "2008",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013"
    ],
    "plotBands":[
      {
        "from":8.5,
        "to":9.5,
        "color":"rgba(68, 170, 213, .2)"
      }
    ]
  },
  "yAxis":{
    "title":{
      "text":"百分比 (%)"
    }
  },
  "tooltip":{
    "shared":true,
    "valueSuffix":" %"
  },
  "credits":{
    "enabled":false
  },
  "plotOptions":{
    "areaspline":{
      "fillOpacity":0.5
    }
  },
  "series":[
    {
      "name":"Male",
      "data":[
        37.5,
        36,
        35,
        34,
        34.1,
        30.4,
        30.7,
        29.8,
        28.1,
        {
          "y":28.3,
          "marker":{
            "symbol":"url(http://i.imgur.com/dseB8hL.png)"
          }
        }
      ]
    },
    {
      "name":"Female",
      "color":"#FFA07A",
      "data":[
        3.5,
        4,
        3.3,
        4.2,
        3.2,
        3.2,
        3.1,
        3,
        3.2,
        2.2
      ]
    }
  ]
}