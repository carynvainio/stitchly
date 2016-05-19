// the size of the chart will actually be set with a dialog when the user wants
// to create a chart; this is just here so I can create one to test with
// and do some stuff with the values
var chart_rows = 20;
var chart_cols = 30; 
var stitches = ["", "img-stitch_yo.png", "img-stitch_purl.png", "img-stitch_k2tog.png", "img-stitch_ssk.png", "img-stitch_s1-k2tog-psso.png"];
var arr_default_colors = [
    "#ffffff",
    "#ff0000",
    "#FFAE00",
    "#FFFB00",
    "#00ff00",
    "#0000ff",
    "#172A91",
    "#AF38FF"
    ];
var current_colors = [];

var isColor = false;
var isClicking = false;
var isReadyForUndo = false;
var isEditingToolbar = false;
var selected_stitch_num = 0;
var prev_stitch_num = -1;
var selected_cell_id;
var curr_mc = 'rgb(255, 255, 255)';
var keyboard_numbers = [49,50,51,52,53,54,55,56,57,48];  // 0-9
var default_color = '#ffffff';
var default_stitch = "";

createChart(chart_cols, chart_rows);


//+--------------- creators -----------------+//

// create the stitchbar
(function(window) {

    console.log("prepping stitchbar...");

    // setting some defaults
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

        buildUI(parent);

        return _stitchbar;
    }

    function buildUI(parent) {

        var sbst = _stitchbar._stitches;

        console.log("building the stitchbar...");

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
                window.selected_stitch = $(this).attr('id');
                $('#symbols').children().attr('class', 'stitch');
                $(this).attr( 'class', 'stitch selected');
                console.log(window.selected_stitch);
            });

            _elm_s.colorPicker({
                opacity: false,
                renderCallback: function($elm, toggled) {
                    //if ( toggled === true ) {
                    //    console.log("true");
                    //}
                },
                buildCallback: function($elm) {
                    $('#colorPickerMod').appendTo('head');
                }
            });
        }
    }

    window.stitchBar = stitchBar;
})(window);

$('.edit-colors').click(function() {
        sbar.edit(true);

        $('.chart').css("opacity", "0.25");
        $('#keys').css("visibility", "hidden");
        $('.edit-options a').text("Done");

        //saveCurrentColors();
        //toggleStitchBarEdit();
    });

$('.edit-cancel').click(function() {
        sbar.edit(false);

        $('.chart').css("opacity", "1.0");
        $('#keys').css("visibility", "visible");
        $('.edit-options a').text("Edit Colors");

        //cancelEditColors();
    });

/*
$(function(){
    var options = {
        isColor: true
    }

    //$('.stitchbar').stitchBar(options);
};
*/

var sbarOptions = {
    isColor: true,
    stitches: {
        'stitch1': {
            "color": "#ff0000",
            "key": "1"
        },
        'stitch2': {
            "color": "#00ff00",
            "key": "2"
        },
        'stitch3': {
            "color": "#0000ff",
            "key": "3"
        }
    }
}

var sbar = window.stitchBar('.stitchbar', sbarOptions);


// listen for keyboard input
// right = 39     left = 37     up = 38     down = 40       enter = 13
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

// listen for mousedrag when mouse is down and set the cell value as we drag over
$(document).mouseup(function() {
    isClicking = false;
});
$(document).mousedown(function() {
    isClicking = true;
});
$('.chart-cell').mousemove(function(event){
        if (isClicking) {
            markSelectedStitch($(this).attr('id'));
        }
    });


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




function createChart(cols, rows) {
    var parent = $('.chart');

    for (var i = rows-1; i >= 0; i--) {
        var row = $('<div />', {
            }).addClass('chart-row').appendTo(parent);
        for(var j = 0; j < cols; j++){
            var cell = $('<div />', {
            }).addClass('chart-cell').appendTo(row);
            cell.attr('id', 'r' + i + '-c' + j);
            cell.css("background-color", default_color);
            cell.click(function() {
                markSelectedStitch( $(this).attr('id') );
            });
        }
    }

    var c_width = chart_cols * ( parseInt(cell.css("width")) + 1 );
    $('.chart-container').css("min-width", c_width);

    setSelectedChartCell(cols-1,rows-1);
}



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


function markSelectedStitch(cell_id) {
    if (isEditingToolbar) {
        return;
    }

    var sel_stitch_cell = $( '#' + cell_id );
    var color;
    var stitch;

    // if we clicked the same cell and we didn't change the stitch, we're clearing the cell
    if (cell_id == selected_cell_id && prev_stitch_num == selected_stitch_num && !isClicking && isReadyForUndo) {
        color = default_color;
        stitch = default_stitch;
        isReadyForUndo = false;
    } else {
        //color = colors[selected_stitch_num];
        color = $('.stitch-selected').css('background-color');
        stitch = "url(img/stitches/" + stitches[selected_stitch_num] + ")";
        isReadyForUndo = true;
    }

    // save the stitch info -- if we click again, we're going to undo
    if (isColor) {
        prev_color = sel_stitch_cell.css('background-color');
    } else {
        prev_stitch = sel_stitch_cell.css("background-image");
    }

    var arr = getChartCellPosById(cell_id);
    setSelectedChartCell(arr[0], arr[1]);

    if (isColor) {
        sel_stitch_cell.css("background-color", color); 
    } else {
        if ( selected_stitch_num > 0 ) {
            sel_stitch_cell.css("background-image", stitch); 
        } else {
            sel_stitch_cell.css("background-image", "");
        }
    }

    // we save this so that we can see if we're trying to undo when we click in the same cell
    prev_stitch_num = selected_stitch_num;
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
