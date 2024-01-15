<?php
include("connect_db_rtcapps.php");

$id_card = $_GET['id_card'];

if($_GET['type'] == "delete"){

    $file_id = $_GET['file_id'];

    $sql = "select *from vf_file where file_id = '$file_id'";
    $result = mysqli_query($conn_rtcapp,$sql);
    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
      unlink($row['path']);
    }
    unset($result, $row);

    $sql = "delete from vf_file where file_id = '$file_id'";
    mysqli_query($conn_rtcapp,$sql);

    echo '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
    echo "<script>alert('ลบข้อมูลเรียบร้อย');</script>";
    echo '<meta http-equiv="refresh" content="0;URL=list_file.php?id_card='.$id_card.'&type=query">';
}

 ?>
 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
 <html xmlns="http://www.w3.org/1999/xhtml">
 <head>
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 <script src="js/jquery-1.11.1.min.js"></script>
 <script src="js/bootstrap.min.js"></script>

 <link href="css/bootstrap.min.css" rel="stylesheet" />
 <link href="css/bootstrap-theme.css" rel="stylesheet" />
 <link href="css/txt_all.css" rel="stylesheet" />
 <script>

 function delete_file(file_id, file_name){
   if(confirm('คุณต้องการลบไฟล์ '+file_name+' หรือไม่?')==true){
     window.location = 'list_file.php?id_card=<?php echo $id_card ?>&type=delete&file_id='+file_id;
   }
 }

 </script>
</head>
 <body>
   <table width="100%" class="table" style="font-family: 'TH Sarabun'; font-size: 19px;">
   <?php
   $sql = "select *from vf_file where id_card = '$id_card'";
   $result3 = mysqli_query($conn_rtcapp,$sql);
   $num_file = mysqli_num_rows($result3);
   while($row3 = mysqli_fetch_array($result3, MYSQLI_ASSOC)){
   ?>
   <tr>
     <td>&#9729;<a href="<?php echo $row3['path']; ?>" target="_blank">
       &nbsp;<?php echo $row3['file_name']; ?>
      </a>
    </td>
    <td>
       <button type="button" style="font-size: 12px; width : 35px;" onclick="delete_file('<?php echo $row3['file_id'] ?>','<?php echo $row3['file_name'] ?>');">&nbsp;-&nbsp;</button>
     </td>
   </tr>
     <?php
   }
   if($num_file == 0){
     echo "<tr><td>ไม่มีไฟล์แนบ</tr></td>";
   }
   unset($row3, $result3);

    ?>
   </table>
</body>
</html>
