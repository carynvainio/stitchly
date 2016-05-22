<?php
include_once('header.php');
?>

    <div class="container">

      <div class="starter-template">
        <h1>Test Color Chart</h1>
        <p class="lead">A chart to play with to see if the interactions feel good.</p>
        <p>Feedback? Send it to <a href="mailto:caryn.vainio@gmail.com">Caryn Vainio!</a></p>
        <div class="help">
          <ul>
            <li><b>Select stitches:</b> click on the stitch in the stitch bar, or use the corresponding number key.</li>
            <li><b>Mark stitches:</b> Click to mark a single stitch, or click and drag to mark multiple stitches. Clicking on a stitch you just marked will reset the stitch. You can also mark a stitch by hitting the Enter key.</li>
          </ul> 
      </div>

        <!-- STITCH TOOLBAR -->
        <div class="container-stitches">
          <div class="color-editing-options">
            <div class="edit-options"><a class="edit-colors">Edit Colors</a></div><div class="cancel-options"> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a class="edit-cancel">Cancel</a></div>
          </div>
            <div class="stitchbar"><!-- STITCHBAR --></div>
        </div>

        <!-- CHART -->
        <div class="container-chart">
          <div class="chart">
          </div>
        </div>

        <div class="maincolor">
          <div class="mc_label">Main Color</div>
          <div class="mc_box"></div>
        </div>

      </div>

    </div><!-- /.container -->

    <script>window.isColor = true;</script>


    <?php
include_once('footer-chart.php');
?>
