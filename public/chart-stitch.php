<?php
include('header.php');
?>

    <div class="container">

      <div class="starter-template">
        <h1>Test Stitch Chart</h1>
        <p class="lead">A chart to play with to see if the interactions feel good.</p>

        <!-- STITCH TOOLBAR -->
        <div class="container-stitches">
            <!-- <div class="edit-options"><a>Edit Colors</a></div> -->
            <div class="stitchbar">
              <div class="stitchbar-row" id="symbols"></div>
              <div class="stitchbar-row" id="keys"></div>
            </div>
        </div>

        <!-- CHART -->
        <div class="container-chart">
          <div class="chart">
          </div>
        </div>

      </div>

    </div><!-- /.container -->


<?php
include('footer-stitch.php');
?>