<?php
include('header.php');
?>

    <div class="container">

      <div class="starter-template">
        <h1>Test Color Chart</h1>
        <p class="lead">A chart to play with to see if the interactions feel good.</p>

        <!-- STITCH TOOLBAR -->
        <div class="container_stitches">
          <div class="stitchbar-container">
            <div class="stitchbar">
              <div class="stitchbar-row" id="symbols"></div>
              <div class="stitchbar-row" id="keys"></div>
            </div>
            <div class="edit_options"><a>Edit Colors</a></div>
          </div>
        </div>

        <div class="chart-container">
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
include('footer-color.php');
?>
