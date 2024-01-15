<?php

//$conn_rtcapp = mysqli_connect("10.99.202.130","admin","1234", "rtcapps");
$conn_rtcapp = mysqli_connect("localhost","admin","1234", "rtcapps");
if (!$conn_rtcapp) {
  die('Could not connect: ' . mysqli_connect_errno());
}
//echo 'Connected successfully';

mysqli_query($conn_rtcapp, "SET CHARACTER SET UTF8");

 ?>
