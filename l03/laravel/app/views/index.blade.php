<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Laravel PHP Framework</title>
    <link rel="stylesheet" href="styles/style.css">
</head>
<body>
    <div class="header-wrap">
        <header class="header grid">
            <h1 class="logo">Laboration 3 - Trafikinformation</h1> 
        </header>
    </div>

    <div id="map-canvas"></div>
    <div class="container">
        <select id="sorting">
            <option value="" selected="selected">- Allt-</option>
            <option value="0">Vägtrafik</option>
            <option value="1">Kollektivtrafik</option>
            <option value="2">Planerad störning</option>
            <option value="3">Övrigt</option>
        </select>

        <div class="trafic-info-area grid"></div>
        
    </div>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script type="text/javascript"
      src="https://maps.googleapis.com/maps/api/js?sensor=false">
    </script>
    <script src="js/main.js"></script>
</body>
</html>
