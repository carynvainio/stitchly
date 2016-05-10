
// the size of the chart will actually be set with a dialog when the user wants
// to create a chart; this is just here so I can create one to test with
// and do some stuff with the values
var isColor = false;
var isClicking = false;
var chart_rows = 20;
var chart_cols = 30; 
var selected_stitch_id = 0;
var prev_stitch_id = -1;
var selected_cell_id;
var keyboard_numbers = [49,50,51,52,53,54,55,56,57,48];  // 0-9
var default_color = '#ffffff';
var default_stitch = "";

// in a hardcorded array for now while I test
var stitches = ["", "img-stitch_yo.png", "img-stitch_purl.png", "img-stitch_k2tog.png", "img-stitch_ssk.png", "img-stitch_s1-k2tog-psso.png"];
var colors = ["#ffffff", "#0000ff", "#f4a460", "#ff0000", "#ffa500", "#00ff00", "#ffff00"];

createChart(chart_cols, chart_rows);

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
            selectStitchFromToolbar("stitch-" + $.inArray(event.which, keyboard_numbers), false);
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

$('.mc_box').click(function() {
                $('.mc_colorselect').css("visibility", "visible");
            });

// Create the empty chart
function createChart(cols, rows) {
    var parent = $('.chart');

    for (var i = rows-1; i >= 0; i--) {
        var row = $('<div />', {
            }).addClass('chart-row').appendTo(parent);
        for(var j = 0; j < cols; j++){
            var cell = $('<div />', {
            }).addClass('chart-cell').appendTo(row);
            cell.attr('id', 'r' + i + '-c' + j);
            //cell.css('background-color', colors[0]);
            cell.click(function() {
                markSelectedStitch( $(this).attr('id') );
            });
        }
    }

    setSelectedChartCell(cols-1,rows-1);
}

function createStitchToolbar(bIsColor) {
    var parent = $('#symbols');
    var keyparent = $('#keys');

    isColor = bIsColor;
    var arr_to_use = [];

    if (isColor) {
        arr_to_use = colors;
        createMCColorBar();
    } else {
        arr_to_use = stitches;
    }

    for (var i = 0; i < arr_to_use.length; i++) {
        var stitch = $('<div />', {
            }).addClass('stitch-selection').appendTo(parent);
        stitch.attr('id', 'stitch-' + i);
        if (bIsColor) {  
            stitch.css("background-color", colors[i]);
        } else {
            stitch.css("background-image", "url(img/stitches/" + stitches[i] + ")");   
        }
        stitch.click(function() {
                selectStitchFromToolbar( $( this ).attr('id'), bIsColor );
            });
        
        var stitchkey = $('<div />', {
            }).addClass('key').appendTo(keyparent);
        stitchkey.text(i+1);
    }
}

function createMCColorBar() {
    var parent = $(".mc_colorselect");

    for (var i = 0; i < colors.length; i++) {
        var color = $('<div />', {
            }).addClass('color-selection').appendTo(parent);
        color.attr('id', 'color-' + i);
        color.css("background-color", colors[i]);
        color.click(function() {
                setMainColor($( this ).attr('id'));
            });
    }
}

// Select a stitch from the toolbar
function selectStitchFromToolbar(stitch_id, isColor) {
    var stitchnum = parseInt(stitch_id.substring(stitch_id.indexOf("-")+1));
    if ( (!isColor && stitchnum < stitches.length) || (isColor && stitchnum < colors.length)) {
        var selected_stitch_cell = $( '#' + stitch_id );

        // set the new selected stitch
        selected_stitch_id = stitchnum;

        // reset all the other stitches to not-selected
        $('#symbols').children().attr('class', 'stitch-selection');

        // highlight the selected stitch in the toolbar
        selected_stitch_cell.attr( 'class', 'stitch-selection stitch-selected');
    }
}

// Mark the selected stitch in the cell we clicked on
function markSelectedStitch(cell_id) {
    var sel_stitch_cell = $( '#' + cell_id );
    var color;
    var stitch;

    // if we clicked the same cell and we didn't change the stitch, we're clearing the cell
    if (cell_id == selected_cell_id && prev_stitch_id == selected_stitch_id && !isClicking) {
        color = default_color;
        stitch = default_stitch;
    } else {
        color = colors[selected_stitch_id];
        stitch = "url(img/stitches/" + stitches[selected_stitch_id] + ")";
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
        if ( selected_stitch_id > 0 ) {
            sel_stitch_cell.css("background-image", stitch); 
        } else {
            sel_stitch_cell.css("background-image", "");
        }
    }

    // we save this so that we can see if we're trying to undo when we click in the same cell
    prev_stitch_id = selected_stitch_id;
}

// move to a chart cell when an arrow key is pressed
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

function getChartCellPosById(c_id) {
    var arr = [];
    var col = -1;
    var row = -1;

    var col = parseInt(c_id.substring(c_id.indexOf("c")+1));
    var row = parseInt(c_id.substring(c_id.indexOf("r")+1,c_id.indexOf("-")));
    arr = [col, row];

    return arr;
}

function setMainColor(c_id) {
    var color_id = parseInt(c_id.substring(c_id.indexOf("-")+1));

    var curr_mc = $('.mc_box').css('backgroundColor');
    $('.mc_box').css("background-color", colors[color_id]); 

    $('.chart-cell').filter(function(){
        return $(this).css('background-color') == curr_mc;
        })
        .css( "background-color", colors[color_id] );

    $('.mc_colorselect').css("visibility", "hidden");
}

function RGBToHex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
