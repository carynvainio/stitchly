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

            //saveCurrentColors();
            //toggleStitchBarEdit();
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

        //cancelEditColors();
    });

//+--------------- create the chart -----------------+//
(function(window) {

    var _chart = {
        selectCell: function(){
            console.log(this);
            //$(this).css("background-color", window.selected_stitch);

            //$('.chart-row').children().attr('class', 'chart-cell');
            //$(this).attr('class', 'chart-cell chart-cell-selected');
        },

        keyboardSelect: function(event){
            switch(event.which) {
                case 39:    // right
                    console.log("right");
                    getNextCellID($('.chart-cell-selected').attr('id'), "right");
                    break;
                case 37:    // left
                    console.log("left");
                    break;
                case 38:    // up
                    console.log("up");
                    break;
                case 40:    // down
                    console.log("down");
                    break;
                case 13:    // enter
                    console.log("enter");
                    break;
                default:
                    console.log(event.which);
            }
        }
    }

    Chart = function(parent, options) {
        _chart._cols = options.columns;
        _chart._rows = options.rows;

        buildChartUI(parent);

        return _chart;
    }

    function getNextCellID(c_id, dir) {
        console.log(c_id, dir);
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
                _elm.css("background-color", sbarOptions["stitches"]["stitch1"]["color"]); // TODO: replace this with default MC at some point

                _elm.click(function() {
                    if (sbarOptions["isColor"] === true) {      // TODO: this might not be the best way to see if we're in a color chart
                        $(this).css("background-color", window.selected_stitch);

                        $('.chart-row').children().attr('class', 'chart-cell');
                        $(this).attr('class', 'chart-cell chart-cell-selected');
                    }
                });
            }
        }
    }

    window.chart = Chart;
})(window);

var chartOptions = {
    columns: 30,
    rows: 20
}
var chart = window.chart('.chart', chartOptions);

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

// listen for keyboard input
// right = 39     left = 37     up = 38     down = 40       enter = 13
/*
$(document).keydown(function(event){ 
        if (event.which == 39) {
            keyboardSelectChartCell("right");
        } else if (event.which == 37) {
            keyboardSelectChartCell("left");
        } else if (event.which == 38) {
            keyboardSelectChartCell("up");
        } else if (event.which == 40) {
            keyboardSelectChartCell("down");
        } else if (event.which == 13) {
            markSelectedStitch(selected_cell_id);
        } else if ($.inArray(event.which, keyboard_numbers) != -1) {
            selectStitchFromToolbar($("#stitch-" + $.inArray(event.which, keyboard_numbers)));
        }
    });
*/


$('.mc_box').colorPicker({
        opacity: false,
        renderCallback: function($elm, toggled) {
            if (toggled === false) {
                setMainColor();
            }
        },
        buildCallback: function($elm) {
                $('#colorPickerMod').appendTo('head');
            }
    });






function toggleStitchBarEdit() {
    $('.stitch-selection').unbind("click");
    if (isEditingToolbar) {
        isEditingToolbar = false;
        $('#keys').css("visibility", "visible");
        $('.edit-options a').text("Edit Colors");
        $('.cancel-options').css("visibility", "hidden");
        $('.chart').css("opacity", "1.0");
        $('.stitch-selection').click(function() {
                selectStitchFromToolbar(this);
            });
    } else {
        isEditingToolbar = true;
        $('#keys').css("visibility", "hidden");
        $('.edit-options a').text("Done");
        $('.cancel-options').css("visibility", "visible");
        $('.chart').css("opacity", "0.25");
        $('.stitch-selection').colorPicker({
            opacity: false,
            renderCallback: function($elm, toggled) {
                selectNewStitch($elm);
            },
            buildCallback: function($elm) {
                $('#colorPickerMod').appendTo('head');
            }
        });
    }
}

//+----------- color chart editing stuff -----------+//

function saveCurrentColors() {
    console.log("saving current colors...");
    $('.stitch-selection').each(function(i) {
        current_colors[i] = $(this).css("background-color");
        console.log(current_colors[i]);
        });
}

function createMCColorBar() {
    var parent = $(".mc_colorselect");

    for (var i = 0; i < default_colors.length; i++) {
        var color = $('<div />', {
            }).addClass('color-selection').appendTo(parent);
        color.attr('id', 'color-' + i);
        color.css("background-color", default_colors[i]);
        color.click(function() {
                setMainColor($( this ).attr('id'));
            });
    }
}

function setMainColor() {
    var new_mc = $('.mc_box').css('background-color');
    $('.chart-cell').filter(function(){
        return $(this).css('background-color') == curr_mc;
        })
        .css( "background-color", new_mc );

    curr_mc = new_mc;
}

function cancelEditColors() {
    console.log("CANCELING color edit...");
    $('.stitch-selection').each(function(i) {
        console.log(current_colors[i]);
        $(this).css("background-color", current_colors[i]);
        });
    toggleStitchBarEdit();
}


//+------------- stitch selection and marking ------------+//

function selectStitchFromToolbar(stitch_el) {
    if ( !isEditingToolbar ) {
        selectNewStitch(stitch_el);
    } else {
        if (isColor) {
            editColor(stitch_el);
        }
    }
}

function selectNewStitch(stitch_el) {
    var stitch_id = $(stitch_el).attr('id');
    if (stitch_id == null) {
        return;
    }

    var stitchnum = parseInt(stitch_id.substring(stitch_id.indexOf("-")+1));
    if (isColor) {
        if (stitchnum >= default_colors.length) {
            return;
        }
    } else {
        if (stitchnum >= stitches.length) {
            return;
        }
    }
        
    // set the new selected stitch
    selected_stitch_num = stitchnum;

    // reset all the other stitches to not-selected
    $('#symbols').children().attr('class', 'stitch-selection');

    // highlight the selected stitch in the toolbar
    $(stitch_el).attr( 'class', 'stitch-selection stitch-selected');
}


function keyboardSelectChartCell(dir) {
    var curr_cell_id = selected_cell_id;

    var arr = getChartCellPosById(curr_cell_id);
    var col = arr[0];
    var row = arr[1];

    if (dir == "right") {
        if ( (col+1) < chart_cols ) {
            setSelectedChartCell(col+1, row);
        }
    } else if (dir == "left") {
        if ( (col-1) >= 0 ) {
            setSelectedChartCell(col-1, row);
        }
    } else if (dir == "up") {
        if ( (row+1) < chart_rows ) {
            setSelectedChartCell(col, row+1);
        }
    } else if (dir == "down") {
        if ( (row-1) >= 0 ) {
            setSelectedChartCell(col, row-1);
        }
    }
}

function setSelectedChartCell(col, row) {
    $('.chart-row').children().attr('class', 'chart-cell');
    selected_cell_id = "r" + row + "-c" + col;
    $('#r' + row + "-c" + col).attr('class', 'chart-cell chart-cell-selected');
}


//+---------- helper functions ---------+//

function getChartCellPosById(c_id) {
    var arr = [];
    var col = -1;
    var row = -1;

    var col = parseInt(c_id.substring(c_id.indexOf("c")+1));
    var row = parseInt(c_id.substring(c_id.indexOf("r")+1,c_id.indexOf("-")));
    arr = [col, row];

    return arr;
}

function RGBToHex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
