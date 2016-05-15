<?php
include_once('header.php');
?>

    <div class="container">

      <div class="starter-template">
        <h1>Test Color Chart</h1>
        <p class="lead">A chart to play with to see if the interactions feel good.</p>

        <!-- STITCH TOOLBAR -->
        <div class="container-stitches">
            <div class="edit-options"><a>Edit Colors</a></div>
            <div class="stitchbar">
              <div class="stitchbar-row" id="symbols"></div>
              <div class="stitchbar-row" id="keys"></div>
            </div>
        </div>

        <div class="container-chart">
          <div class="chart">
          </div>
        </div>

        <div class="maincolor">
          <div class="mc_label">Main Color:</div><div class="mc_box"></div>
          <div class="mc_colorselect"></div>
        </div>

      </div>

    </div><!-- /.container -->


    <?php
include_once('footer-color.php');
?>
