<?
include '../inc/connect.php';

$id = $_POST['id'];

$sql = " DELETE FROM score WHERE id = '$id' ";
mysqli_query($conn, $sql);

$str = '{ "code": 200 }';
echo $str;
?>


