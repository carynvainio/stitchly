// STITCHLY
// author: Caryn Vainio


//+--------------- global vars --------------------+//
var isClicking = false;

var editModes = {
    Stitches: 0,
    Chart: 1,
    StitchPattern: 2
};

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
  chart.retrieve();
});

window.setInterval(function(){
  chart.save();
}, 5000);


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

                        if (toggled === false) {
                            window.selected_stitch = $elm.css('background-color');
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

$('.edit-clear').click(function() {
        if (!chart._clean) {
            $('#modal-clear-chart').modal({
                keyboard: false
            });
        }
    });

$('.btn-clear-chart').click(function() {
        chart.clearAll();
    });


//+--------------- create the chart -----------------+//
(function(window) {

    var _chart = {
        select: function(elm){
            $('.chart-row').children().attr('class', 'chart-cell');
            elm.attr('class', 'chart-cell chart-cell-selected');
            _chart._lastcell = elm.attr('id');
        },

        save: function(){
            $('.chart-cell').each(function() {
                if (!window.isColor) {
                    localStorage.setItem(($(this).attr('id') + "-image"),$(this).css('background-image'));
                } else {
                    localStorage.setItem(($(this).attr('id') + "-color"),$(this).css('background-color'));
                }
            });
        },

        retrieve: function(){
            var c_id;
            this._clean = false;
            for(var key in localStorage) {
                if (window.isColor && key.indexOf("-color") >= 0) {
                    c_id = key.substring(0, key.indexOf("-color"));
                    $('#' + c_id).css('background-color', localStorage[key]);
                } else if (!window.isColor && key.indexOf("-image") >= 0) {
                    c_id = key.substring(0, key.indexOf("-image"));
                    $('#' + c_id).css('background-image', localStorage[key]);
                }
            }
            //console.log("chart._clean = " + this._clean);
        },

        mark: function(elm) {
            elm.click();
        },

        setEditMode: function(mode) {
            _chart._editMode = mode;
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
        },

        clearAll: function() {
            if (window.isColor) {
                $('.chart-cell').css("background-color", this._mc);
            } else {
                $('.chart-cell').css("background-image", "");  
            }
            this._clean = true;
            $('.edit-clear').attr( 'class', 'edit-clear disabled');
        },

        insertRow: function(elm) {
            var c_id = elm.attr('id');
            var row = parseInt(c_id.substring(c_id.indexOf("r")+1,c_id.indexOf("-")));
            //console.log("row: " + row);
        },

        insertColumn: function(elm) {
            var c_id = elm.attr('id');
            var col = parseInt(c_id.substring(c_id.indexOf("c")+1));
            //console.log("col: " + col);
        }
    }

    Chart = function(parent, options) {
        _chart._cols = options.columns;
        _chart._rows = options.rows;
        _chart._mc = "rgb(255, 255, 255)";
        _chart._default_stitch = "";
        _chart._lastcell = "";
        _chart._undoing = false;
        _chart._clean = true;
        _chart._editMode = editModes.Stitches;

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
                    //console.log("clicked " + $(this).attr('id'));
                    // only allow chart editing when we're not in Stitchbar Edit mode or when we're not changing rows/columns
                    if (!sbar._isediting && _chart._editMode == editModes.Stitches) {
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

                        if (_chart._clean) {
                            _chart._clean = false;
                            $('.edit-clear').attr( 'class', 'edit-clear');
                        }
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

//localStorage.clear();

setInterval(function(){ 
    chart.save(); }, 5000);

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
                sbar.edit(false);
            } else {
                $('.cp-color-picker').css("visibility", "visible");
                sbar.edit(true);
            }
        },
        buildCallback: function($elm) {
            $('#colorPickerMod').appendTo('head');
        }
    });


//+---------- footer functionality ----------+//
$('#nav-chart-editing').click(function() {
    // change active footer button
    $('#nav-stitch-editing').removeClass("active");
    $('#nav-chart-editing').addClass("active");

    $('#container-stitchbar').css("display", "none");
    $('#chart-editing-help').css("display", "inline");

    chart.setEditMode(editModes.Chart);
});

$('#nav-stitch-editing').click(function() {
    // change active footer button
    $('#nav-stitch-editing').addClass("active");
    $('#nav-chart-editing').removeClass("active");

    $('#chart-editing-help').css("display", "none");
    $('#container-stitchbar').css("display", "inline");

    chart.setEditMode(editModes.Stitches);
});


//+---------- helper functions ---------+//

function RGBToHex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
