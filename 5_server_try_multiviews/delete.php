<?php
//fake delete, has 1/10 chance to fail delete
if (rand(1, 10) == 10) {
    header("HTTP/1.0 400");
}
echo json_encode(array());