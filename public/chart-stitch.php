<?php
include('header.php');
?>

    <div class="container">

      <div class="starter-template">
        <h1>Test Stitch Chart</h1>
        <p class="lead">A chart to play with to see if the interactions feel good.</p>
        <div class="help">
          <ul>
            <li><b>Select stitches:</b> click on the stitch in the stitch bar, or use the corresponding number key.</li>
            <li><b>Mark stitches:</b> Click to mark a single stitch, or click and drag to mark multiple stitches. Clicking on a stitch you just marked will reset the stitch. You can also mark a stitch by hitting the Enter key.</li>
          </ul> 
      </div>

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