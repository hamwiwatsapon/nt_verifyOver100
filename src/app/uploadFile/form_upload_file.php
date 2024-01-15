<?php
include("connect_db_rtcapps.php");

if(!empty($_GET['id_card'])){
  $id_card = $_GET['id_card'];
}

if(!empty($_POST['id_card'])){
  $id_card = $_POST['id_card'];

  $plus_num = 0;

  if(isset($_FILES["my_file"])){
    foreach ($_FILES['my_file']['tmp_name'] as $key => $val){

    $plus_num++;

    if (($_FILES['my_file']['name'][$key]!="")){
       $target_dir = "files/";
       $file = $_FILES['my_file']['name'][$key];
       $path = pathinfo($file);
       $filename = $path['filename'];
       $ext = $path['extension'];
       $temp_name = $_FILES['my_file']['tmp_name'][$key];
       $path_filename_ext = $target_dir.$id_card."_".date("YmdHis", time())."_$plus_num.".$ext;

      if (file_exists($path_filename_ext)) {
        $error = 1;
        $msg_error = "ไฟล์ที่ UPLOAD ลำดับที่ $plus_num มีปัญหา โปรดตรวจสอบ";
       }else{

          move_uploaded_file($temp_name,$path_filename_ext);

          $sql = "insert into vf_file (id_card, file_name, path) values('$id_card', '$filename', '$path_filename_ext')";
          mysqli_query($conn_rtcapp, "SET CHARACTER SET UTF8");
          mysqli_query($conn_rtcapp,$sql);

       //echo "Congratulations! File Uploaded Successfully.";
       }

       //echo $path_filename_ext;

      }
    }
  }
}

if(empty($id_card)){
  exit();
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

 $(document).ready(function(){

 $("#add_file").click(function(){
   $("#div_file").append('<div class="row_h"><div class="column"><input type="file" name="my_file[]" class="my_file" /></div><button type="button" class="remove_file" style="font-size: 18px; width : 35px;">&nbsp;-&nbsp;</button></div>');
 });

 $(document).on("click",".remove_file", function(){
     $(this).parent('div').remove();
 });

 });

 </script>

 <style>

 .my_file::-webkit-file-upload-button {
   font-family: "TH Sarabun";
 }

 .column {
   float: left;
   padding: 2px;
 	box-sizing: border-box;
 	text-align: left;
 }

 /* Clear floats after the columns */
 .row_h:after {
   content: "";
   display: table;
   clear: both;
 	box-sizing: border-box;
 }

 </style>

 </head>

 <body>
 <div class="contrainer">
     <form name="form1" method="post" enctype="multipart/form-data" action="form_upload_file.php">
       <input name="id_card" type="hidden" id="id_card" value="<?php echo $id_card ?>" />
       <table class="table" width="500" border="0" style="font-family: 'TH Sarabun'; font-size: 19px;">
      <tr><td colspan="2" class="h_text" align="center">แนบหลักฐานยืนยันตัวตน</td></tr>
       <tr>
         <td align="right" valign="top">จัดการไฟล์ : </td>
         <td><iframe src="list_file.php?id_card=<?php echo $id_card ?>&type=query" width="450" height="100"></iframe></td>
       </tr>
        <tr>
          <td align="right" valign="top">อัพโหลดไฟล์ : </td>
          <td>
           <div class="row_h"><div class="column"><input type="file" name="my_file[]" class="my_file" /></div>
            <button type="button" id="add_file" style="font-size: 18px; width : 35px;">&nbsp;+&nbsp;</button></div>
            <div id="div_file"></div>
         </td>
        </tr>
        <tr>
          <td colspan="2" align="center" class="h_text"><button type="submit" class="btn btn-success" style="font-family: 'TH Sarabun'; font-size: 20px;">&#10003; Upload Files</button></td>
        </tr>
      </table>
     </form>
 </div>
</body>
</html>
