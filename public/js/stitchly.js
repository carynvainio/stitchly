
// the size of the chart will actually be set with a dialog when the user wants
// to create a chart; this is just here so I can create one to test with
// and do some stuff with the values
var isColor = false;
var isClicking = false;
var chart_rows = 20;
var chart_cols = 15; 
var selected_stitch_id = 0;
var selected_cell_id;
var keyboard_numbers = [49,50,51,52,53,54,55,56,57,48];  // 0-9

// in a hardcorded array for now while I test
var stitches = ["", "img-stitch_yo.png", "img-stitch_purl.png", "img-stitch_k2tog.png", "img-stitch_ssk.png", "img-stitch_s1-k2tog-psso.png"];
var colors = ["blue", "brown", "red", "orange", "green", "yellow", "white"];

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
            stitch.css("background-image", "url(../public/img/stitches/" + stitches[i] + ")");   
        }
        stitch.click(function() {
                selectStitchFromToolbar( $( this ).attr('id'), bIsColor );
            });
        
        var stitchkey = $('<div />', {
            }).addClass('key').appendTo(keyparent);
        stitchkey.text(i+1);
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

    // mark the stitch in the cell
    var arr = getChartCellPosById(cell_id);
    setSelectedChartCell(arr[0], arr[1]);

    if (isColor) {
        sel_stitch_cell.css("background-color", colors[selected_stitch_id]); 
    } else {
        sel_stitch_cell.css("background-image", "url(../public/img/stitches/" + stitches[selected_stitch_id] + ")"); 
    }
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
