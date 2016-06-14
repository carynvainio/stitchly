<?php
include_once('header.php');
?>

<?php
include_once('modals.php');
?>

<div class="subheader">
        <div class="container">
            <h1>Test Color Chart</h1>
        </div>
    </div>

    <div class="container">

        <!--
        <p>This is a test color chart you can play with to see if the interactions of marking stitches make sense to you. Feedback? Send it to <a href="mailto:caryn.vainio@gmail.com">Caryn Vainio!</a></p>
      -->

        <!-- STITCH TOOLBAR -->
        <table class="container-stitches">
          <tr>
            <th class="col1" colspan="2">Stitches</th>
            <th class="col2">MC</th>
            <th class="col3"></th>
          </tr>
          <tr>
            <td class="stitch-editing-options">
              <a class="edit-stitches" data-toggle="tooltip" data-placement="bottom" title="Edit colors" data-delay='{"show":"500", "hide":"100"}'><i class="fa fa-pencil fa-lg" aria-hidden="true"></i></a>
              <!-- <a class="edit-done"><i class="fa fa-check fa-lg" aria-hidden="true"></i></a>
              <a class="edit-cancel"><i class="fa fa-times fa-lg" aria-hidden="true"></i></a> -->
            </td>
            <td class="stitchbar"><div id="stitchbar"><!-- STITCHBAR --></div></td>
            <td class="mc_box"><div id="mc_box"></div></td>
            <td class="macro-editing-options">
              <a class="edit-flip" data-toggle="tooltip" data-placement="bottom" title="flip main and background colors" data-delay='{"show":"500", "hide":"100"}'><i class="fa fa-adjust fa-lg" aria-hidden="true"></i></a>
              <a class="edit-clear" data-toggle="modal" data-target="#modal-clear-chart" data-toggle="tooltip" data-placement="bottom" title="Clear chart" data-delay='{"show":"500", "hide":"100"}'><i class="fa fa-undo fa-lg" aria-hidden="true"></i></a>
            </td>
          </tr>
        </table>

        <!-- CHART -->
        <div class="container-chart">
          <div class="chart">
          </div>
        </div>

    </div>

    </div><!-- /.container -->

    <script>window.isColor = true;</script>


    <?php
include_once('footer-chart.php');
?>
