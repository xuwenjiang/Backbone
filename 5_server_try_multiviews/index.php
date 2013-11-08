<!--
To change this template, choose Tools | Templates
and open the template in the editor.
-->
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
        <script src="../js/jquery-2.0.3.js"></script>
        <script src="../js/underscore.js"></script>
        <script src="../js/backbone.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
        <script type="text/template" id="item-template">

        <td><%= name %></td>
        <td><%= gender %></td>
        <td><%= dob %></td>
        <td><button class="remove-item">Delete</button></td>

    </script>
    <script src="server.js"></script>
</head>
<body>
    <?php
    echo 'model, collection, and view. Get data from server' . '<br/>';
    ?>
    <button id='fetchNewItem'>Fetch New Item</button>
    <div id="list-data-empty">
        Try clicking "Fetch New Item" to get some data
    </div>
    <div id="list-data-table">
        <table border="1">
            <tr>
                <td>Name</td>
                <td>Gender</td>
                <td>DOB</td>
                <td></td>
            </tr>
        </table>
    </div>
    <script type="text/javascript">
        var listView = new ListView();
    </script>
</body>
</html>
