// STITCHLY
// author: Caryn Vainio


//+--------------- global vars --------------------+//
//var stitches = ["", "img-stitch_yo.png", "img-stitch_purl.png", "img-stitch_k2tog.png", "img-stitch_ssk.png", "img-stitch_s1-k2tog-psso.png"];
var isClicking = false;


//+--------------- create the stitchbar -----------------+//
(function(window) {

    var _stitchbar = {
        _iscolor: false,
        _isediting: false,

        edit: function(toggled) {
            this._isediting = toggled;
        }
    }

    stitchBar = function(parent, options) {
        _stitchbar._iscolor = options.isColor;
        _stitchbar._stitches = options.stitches;

        buildStitchUI(parent);

        return _stitchbar;
    }

    function buildStitchUI(parent) {

        var sbst = _stitchbar._stitches;

        var _row1 = $('<div />', {
                }).addClass('stitchbar-row').appendTo(parent),
            _row2 = $('<div />', {
                }).addClass('stitchbar-row').appendTo(parent);
        _row1.attr('id', 'symbols');
        _row2.attr('id', 'keys');

        var elm_s, elm_k;
        for (var key in sbst) {
            if (!sbst.hasOwnProperty(key)) continue;

            _elm_s = $('<div />', {}).addClass('stitch').appendTo(_row1);
            _elm_s.attr('id', key);
            _elm_k = $('<div />', {}).addClass('key').appendTo(_row2);

            var obj = sbst[key];
            _elm_k.text(obj["key"]);
            if (_stitchbar._iscolor) {
                _elm_s.css("background-color", obj["color"]);
            }

            _elm_s.click(function() {
                if (_stitchbar._iscolor) {
                    window.selected_stitch = $(this).css('background-color');
                } else {
                    window.selected_stitch = $(this).css('background-image');
                }
                $('#symbols').children().attr('class', 'stitch');
                $(this).attr( 'class', 'stitch selected');
            });

            _elm_s.colorPicker({
                opacity: false,
                renderCallback: function($elm, toggled) {
                    if (!_stitchbar._isediting) {
                        $('.cp-color-picker').css("visibility", "hidden");
                    } else {
                        $('.cp-color-picker').css("visibility", "visible");
                    }
                },
                buildCallback: function($elm) {
                    $('#colorPickerMod').appendTo('head');
                    $('.cp-color-picker').css("visibility", "hidden");
                }
            });
        }

        $('#stitch1').click();
    }

    window.stitchBar = stitchBar;
})(window);

var sbarOptions = {
    isColor: true,
    stitches: {
        'stitch1': {
            "color": "#ffffff",
            "key": "1"
        },
        'stitch2': {
            "color": "#ff0000",
            "key": "2"
        },
        'stitch3': {
            "color": "#FFAE00",
            "key": "3"
        },
        'stitch4': {
            "color": "#FFFB00",
            "key": "4"
        },
        'stitch5': {
            "color": "#00ff00",
            "key": "5"
        },
        'stitch6': {
            "color": "#0000ff",
            "key": "6"
        },
        'stitch7': {
            "color": "#172A91",
            "key": "7"
        },
        'stitch8': {
            "color": "#AF38FF",
            "key": "8"
        },
    }
}
var sbar = window.stitchBar('.stitchbar', sbarOptions);

$('.edit-colors').click(function() {
        (sbar._isediting) ? sbar.edit(false) : sbar.edit(true);

        if (sbar._isediting) {
            $('.chart').css("opacity", "0.25");
            $('#keys').css("visibility", "hidden");
            $('.edit-options a').text("Done");
        } else {
            $('.chart').css("opacity", "1.0");
            $('#keys').css("visibility", "visible");
            $('.edit-options a').text("Edit Colors");
        }
    });

$('.edit-cancel').click(function() {
        sbar.edit(false);

        $('.chart').css("opacity", "1.0");
        $('#keys').css("visibility", "visible");
        $('.edit-options a').text("Edit Colors");
    });

//+--------------- create the chart -----------------+//
(function(window) {

    var _chart = {
        select: function(elm){
            $('.chart-row').children().attr('class', 'chart-cell');
            elm.attr('class', 'chart-cell chart-cell-selected');
        },

        mark: function(elm) {
            elm.click();
        },

        keyboardSelect: function(event){

            var new_c_id;
            var c_id = $('.chart-cell-selected').attr('id');
            var col = parseInt(c_id.substring(c_id.indexOf("c")+1));
            var row = parseInt(c_id.substring(c_id.indexOf("r")+1,c_id.indexOf("-")));

            switch(event.which) {
                case 39:    // right
                    if ( col+1 < this._cols ) { col++ };
                    break;
                case 37:    // left
                    if ( col-1 >= 0 ) { col-- };
                    break;
                case 38:    // up
                    if ( row+1 < this._rows ) { row++ };
                    break;
                case 40:    // down
                    if ( row-1 >= 0 ) { row-- };
                    break;
                case 13:    // enter
                    this.mark($('.chart-cell-selected'));
                    break;
                default:
            }

            new_c_id = ("r" + row + "-c" + col);
            this.select($("#" + new_c_id));
        }
    }

    Chart = function(parent, options) {
        _chart._cols = options.columns;
        _chart._rows = options.rows;
        _chart._mc = "rgb(255, 255, 255)";

        buildChartUI(parent);

        return _chart;
    }

    function buildChartUI(parent) {

        var _elm, row, i, j;
        for (i = _chart._rows-1; i >= 0; i--) {
            row = $('<div />', {
                }).addClass('chart-row').appendTo(parent);
            for(j = 0; j < _chart._cols; j++){
                _elm = $('<div />', {
                }).addClass('chart-cell').appendTo(row);
                _elm.attr('id', 'r' + i + '-c' + j);
                _elm.css("background-color", _chart._mc);

                _elm.click(function() {
                    if (sbarOptions["isColor"] === true) {      // TODO: this might not be the best way to see if we're in a color chart
                        $(this).css("background-color", window.selected_stitch);

                        $('.chart-row').children().attr('class', 'chart-cell');
                        $(this).attr('class', 'chart-cell chart-cell-selected');
                    }
                });
            }
        }

        $('#r0-c0').attr('class', 'chart-cell chart-cell-selected');
    }

    window.chart = Chart;
})(window);

var chartOptions = {
    columns: 30,
    rows: 20
}
var chart = window.chart('.chart', chartOptions);

//+--------------- event listeners -----------------+//
// prevent scrolling when moving around the chart with the keyboard
window.addEventListener("keydown", function(event) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }
}, false);

// listen for mousedrag when mouse is down and set the cell value as we drag over
$(document).mouseup(function() {
    isClicking = false;
    });

$(document).mousedown(function() {
    isClicking = true;
    });

$('.chart-cell').mousemove(function(event){
        if (isClicking) {   
            this.click();   
        }
    });
    
$(document).keydown(function(event){ 
    chart.keyboardSelect(event);
    });

$('.mc_box').colorPicker({
        opacity: false,
        renderCallback: function($elm, toggled) {
            if (toggled === false) {
                var new_mc = $('.mc_box').css('background-color');
                $('.chart-cell').filter(function(){
                    return $(this).css('background-color') == chart._mc;
                    })
                    .css( "background-color", new_mc );

                chart._mc = new_mc;
            } else {
                $('.cp-color-picker').css("visibility", "visible");
            }
        },
        buildCallback: function($elm) {
            $('#colorPickerMod').appendTo('head');
        }
    });


//+---------- helper functions ---------+//

function RGBToHex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
