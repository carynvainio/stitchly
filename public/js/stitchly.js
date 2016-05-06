
// the size of the chart will actually be set with a dialog when the user wants
// to create a chart; this is just here so I can create one to test with
// and do some stuff with the values
var chart_rows = 10;
var chart_cols = 5; 
var selected_stitch_id = 0;
var selected_cell_id;
var keyboard_numbers = [49,50,51,52,53,54,55,56,57,48];  // 0-9

// in a hardcorded array for now while I test
var stitches = ["", "img-stitch_yo.png", "img-stitch_purl.png", "img-stitch_k2tog.png", "img-stitch_ssk.png", "img-stitch_s1-k2tog-psso.png"];

createChart(5, 10);
setSelectedChartCell(chart_cols-1,chart_rows-1);
//createStitchToolbar();

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
            selectStitchFromToolbar("stitch-" + $.inArray(event.which, keyboard_numbers));
        }
    });

// Create the empty chart
function createChart(cols, rows) {
    var parent = $('<div />', {
        class: 'chart',
    }).addClass('chart').appendTo('body');

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
}

function createStitchToolbar() {
    var parent = $('#symbols');
    var keyparent = $('#keys');

    for (var i = 0; i < stitches.length; i++) {
        var stitch = $('<div />', {
            }).addClass('stitch-selection').appendTo(parent);
        stitch.attr('id', 'stitch-' + i);
        stitch.css("background-image", "url(../public/img/stitches/" + stitches[i] + ")");  
        stitch.click(function() {
                selectStitchFromToolbar( $( this ).attr('id') );
            });

        var stitchkey = $('<div />', {
            }).addClass('key').appendTo(keyparent);
        stitchkey.text(i+1);
    }
}

// Select a stitch from the toolbar
function selectStitchFromToolbar(stitch_id) {
    var stitchnum = parseInt(stitch_id.substring(stitch_id.indexOf("-")+1));
    if ( stitchnum < stitches.length) {
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
    sel_stitch_cell.css("background-image", "url(../public/img/stitches/" + stitches[selected_stitch_id] + ")"); 
    var arr = getChartCellPosById(cell_id);
    setSelectedChartCell(arr[0], arr[1]);
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
