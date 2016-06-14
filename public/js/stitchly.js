// STITCHLY
// author: Caryn Vainio


//+--------------- global vars --------------------+//
var isClicking = false;

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});


//+--------------- create the stitchbar -----------------+//
(function(window) {

    var _stitchbar = {
        _iscolor: false,
        _isediting: false,

        edit: function(toggled) {
            this._isediting = toggled;
        },

        select: function(key) {
            $('#stitch' + key).click();
        },

        keyboardSelect: function(event){

            var keyboard_numbers = [49,50,51,52,53,54,55,56,57,48];  // 0-9
            if (keyboard_numbers.indexOf(event.keyCode) > -1) {
                // this means we've hit a number 0-9
                for (var key in this._stitches) {
                    var obj = this._stitches[key];
                    if ( (keyboard_numbers.indexOf(event.keyCode) + 1) === parseInt(obj["key"]) ) {
                        this.select(keyboard_numbers.indexOf(event.keyCode) + 1);
                    }
                }
            }
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
                }).addClass('stitchbar-row').appendTo(parent);
            //_row2 = $('<div />', {
                //}).addClass('stitchbar-row').appendTo(parent);
        _row1.attr('id', 'symbols');
        //_row2.attr('id', 'keys');

        var elm_s;
        for (var key in sbst) {
            if (!sbst.hasOwnProperty(key)) continue;

            _elm_s = $('<div />', {}).addClass('stitch').appendTo(_row1);
            _elm_s.attr('id', key);
            //_elm_k = $('<div />', {}).addClass('key').appendTo(_row2);

            var obj = sbst[key];
            _elm_s.text(obj["key"]);
            if (window.isColor) {
                _elm_s.css("background-color", obj["color"]);
            } else {
                _elm_s.css("background-image", obj["img"]);
                _elm_s.css("background-color", "#ffffff");
            }

            _elm_s.click(function() {
                if (window.isColor) {
                    window.selected_stitch = $(this).css('background-color');
                } else {
                    window.selected_stitch = $(this).css('background-image');
                }
                $('#symbols').children().attr('class', 'stitch');
                $(this).attr( 'class', 'stitch selected');
            });

            if (window.isColor) {
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
        }

        $('#stitch1').click();
    }

    window.stitchBar = stitchBar;
})(window);


var default_sbarOptions = {
    isColor: window.isColor,
    stitches: {
        'stitch1': {
            "img": "",
            "color": "#ffffff",
            "key": "1"
        },
        'stitch2': {
            "img": "url(img/stitches/img-stitch_yo.png)",
            "color": "#ff0000",
            "key": "2"
        },
        'stitch3': {
            "img": "url(img/stitches/img-stitch_purl.png)",
            "color": "#FFAE00",
            "key": "3"
        },
        'stitch4': {
            "img": "url(img/stitches/img-stitch_k2tog.png)",
            "color": "#FFFB00",
            "key": "4"
        },
        'stitch5': {
            "img": "url(img/stitches/img-stitch_ssk.png)",
            "color": "#00ff00",
            "key": "5"
        },
        'stitch6': {
            "img": "url(img/stitches/img-stitch_s1-k2tog-psso.png)",
            "color": "#0000ff",
            "key": "6"
        },
        'stitch7': {
            "img": "",
            "color": "#172A91",
            "key": "7"
        },
        'stitch8': {
            "img": "",
            "color": "#AF38FF",
            "key": "8"
        },
    }
}
var sbar = window.stitchBar('#stitchbar', default_sbarOptions);

$('.edit-stitches').click(function() {
        (sbar._isediting) ? sbar.edit(false) : sbar.edit(true);

        if (sbar._isediting) {
            $('.chart').css("opacity", "0.25");
            $('#keys').css("visibility", "hidden");
            $('.edit-stitches').html('<a class="edit-done"><i class="fa fa-check fa-lg" aria-hidden="true"></i></a><a class="edit-cancel"><i class="fa fa-times fa-lg" aria-hidden="true"></i></a>');
        } else {
            $('.chart').css("opacity", "1.0");
            $('#keys').css("visibility", "visible");
            $('.edit-stitches').html('<i class="fa fa-pencil fa-lg" aria-hidden="true"></i></a>');
        }
    });

$('.edit-cancel').click(function() {
        sbar.edit(false);

        $('.chart').css("opacity", "1.0");
        $('#keys').css("visibility", "visible");
        $('.edit-stitches').html('<i class="fa fa-pencil fa-lg" aria-hidden="true"></i></a>');
    });

//+--------------- create the chart -----------------+//
(function(window) {

    var _chart = {
        select: function(elm){
            $('.chart-row').children().attr('class', 'chart-cell');
            elm.attr('class', 'chart-cell chart-cell-selected');
            _chart._lastcell = elm.attr('id');
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
        _chart._default_stitch = "";
        _chart._lastcell = "";
        _chart._undoing = false;

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

                if (window.isColor) {
                    _elm.css("background-color", _chart._mc);
                } else {
                    _elm.css("background-image", "");  
                }

                _elm.click(function() {
                    // only allow chart editing when we're not in Stitchbar Edit mode
                    if (!sbar._isediting) {
                        // if we're clicking in the same cell AND we're not dragging AND we haven't changed the stitch, we're doing a quick reset
                        if ($(this).attr('id') == _chart._lastcell && !isClicking ) {
                            if ( (window.isColor && $(this).css("background-color") == window.selected_stitch) 
                                || (!window.isColor && $(this).css("background-image") == window.selected_stitch) ) {     
                                _chart._undoing = true;
                            }
                        } 

                        if (!_chart._undoing) {
                            if (window.isColor) {     
                                $(this).css("background-color", window.selected_stitch);
                            } else {
                                $(this).css("background-image", window.selected_stitch);  
                            }
                        } else {
                            if (window.isColor) {     
                                $(this).css("background-color", _chart._mc);
                            } else {
                                $(this).css("background-image", "");  
                            }
                        }

                        _chart._undoing = false;
                        _chart.select($(this));
                    }
                });
            }
        }

        _chart.select($('#r0-c0'));
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
    sbar.keyboardSelect(event);
    });

$('#mc_box').colorPicker({
        opacity: false,
        renderCallback: function($elm, toggled) {
            if (toggled === false) {
                var new_mc = $('#mc_box').css('background-color');
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
