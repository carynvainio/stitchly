<?php
include_once('header.php');
?>

<div class="subheader">
        <div class="container">
            <h1>Test Color Chart</h1>
        </div>
    </div>

    <div class="container">

        <p>This is a test color chart you can play with to see if the interactions of marking stitches make sense to you. Feedback? Send it to <a href="mailto:caryn.vainio@gmail.com">Caryn Vainio!</a></p>

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
