
// the size of the chart will actually be set with a dialog when the user wants
// to create a chart; this is just here so I can create one to test with
// and do some stuff with the values
var chart_rows = 10;
var chart_cols = 5; 

var selected_stitch = "X";
var selected_cell_id;

var keyboard_numbers = [48,49,50,51,52,53,54,55,56,57];  // 0-9

createChart(5, 10);
setSelectedChartCell(chart_cols-1,chart_rows-1);

// set up the onclick for the stitch toolbar
$(".stitch-selection").click(function() {
        selectStitchFromToolbar( $( this ).attr('id') );
    });

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
            selectStitchFromToolbar("stitch" + $.inArray(event.which, keyboard_numbers));
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

// Select a stitch from the toolbar
function selectStitchFromToolbar(stitch_id) {
    var selected_stitch_cell = $( '#' + stitch_id );

    // set the new selected stitch
    selected_stitch = selected_stitch_cell.text();

    // reset all the other stitches to not-selected
    $('.stitchbar-row').children().attr('class', 'stitch-selection');

    // highlight the selected stitch in the toolbar
    selected_stitch_cell.attr( 'class', 'stitch-selection stitch-selected');
}

// Mark the selected stitch in the cell we clicked on
function markSelectedStitch(cell_id) {
    var sel_stitch_cell = $( '#' + cell_id );

    // mark the stitch in the cell
    sel_stitch_cell.text(selected_stitch);
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

    //console.log("col = " + arr[0] + "  row: " + arr[1]);

    return arr;
}
