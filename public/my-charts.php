<?php
include('header.php');
?>

    <div class="subheader">
        <div class="container">
            <h1>My Charts</h1>
            <div class="button-new-chart"></div>
        </div>
    </div>

    <div class="container">

      <div class="starter-template">

        <div class="mychart">
            <a href="chart-color.php">
                <div class="image"></div>
                <p>Test Color Chart</p>
                <p class="muted">Last edited 3 days ago</p>
                <p class="muted last-viewed">Public (7 views)</p>
                <div class="options" style="visibility: hidden"><img src="img/icons/icon-mycharts-options.svg" /></div>
            </a>
        </div>

        <div class="mychart">
            <a href="chart-stitch.php">
                <div class="image"></div>
                <p>Test Stitch Chart</p>
                <p class="muted">Last edited 3 days ago</p>
                <p class="muted last-viewed">Public (7 views)</p>
                <div class="options" style="visibility: hidden"><img src="img/icons/icon-mycharts-options.svg" /></div>
            </a>
        </div>

      </div>

    </div><!-- /.container -->


<?php
include('footer.php');
?>
