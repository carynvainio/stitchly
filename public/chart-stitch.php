<?php
include('header.php');
?>

<?php
include_once('modals.php');
?>

<div class="subheader">
        <div class="container">
            <h1>Test Stitch Chart</h1>
        </div>
    </div>

    <div class="container">

      <!--
      <div class="starter-template">
        <p class="lead">A chart to play with to see if the interactions feel good.</p>
        <p>Feedback? Send it to <a href="mailto:caryn.vainio@gmail.com">Caryn Vainio!</a></p>
        <div class="help">
          <ul>
            <li><b>Select stitches:</b> click on the stitch in the stitch bar, or use the corresponding number key.</li>
            <li><b>Mark stitches:</b> Click to mark a single stitch, or click and drag to mark multiple stitches. Clicking on a stitch you just marked will reset the stitch. You can also mark a stitch by hitting the Enter key.</li>
          </ul> 
      </div>
    -->

        <!-- CHART EDITING HELP TEXT -->
        <table class="container-editing-help" id="chart-editing-help">
          <tr>
            <td class="chart-editing-help-text">
            Click to toggle between rows and columns. 
            </td>
          </tr>
        </table>

        <!-- STITCH TOOLBAR -->
        <table class="container-stitches" id="container-stitchbar">
          <tr>
            <th class="col1" colspan="2">Stitches</th>
            <th class="col3"></th>
          </tr>
          <tr>
            <td class="stitch-editing-options">
              <!-- <a class="edit-stitches" data-toggle="tooltip" data-placement="bottom" title="Edit colors" data-delay='{"show":"500", "hide":"100"}'><i class="fa fa-pencil fa-lg" aria-hidden="true"><i class="fa fa-pencil fa-lg" aria-hidden="true"></i></a> -->
              <!-- <a class="edit-done"><i class="fa fa-check fa-lg" aria-hidden="true"></i></a>
              <a class="edit-cancel"><i class="fa fa-times fa-lg" aria-hidden="true"></i></a> -->
            </td>
            <td class="stitchbar"><div id="stitchbar"><!-- STITCHBAR --></div></td>
            <td class="macro-editing-options">
              <a class="edit-clear"><i class="fa fa-undo fa-lg" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="Clear chart" data-delay='{"show":"500", "hide":"100"}'></i></a>
            </td>
          </tr>
        </table>

        <!-- CHART -->
        <div class="container-chart">
          <div class="chart" id="chart-test">
          </div>
        </div>

      </div>

    </div><!-- /.container -->


    <script>window.isColor = false;</script>


<?php
include('footer-chart.php');
?>