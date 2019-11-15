<?
include '../inc/connect.php';

$id = $_POST['id'];
$stdname = $_POST['stdname'];
$kor =  $_POST['kor'];
$eng = $_POST['eng'];
$math = $_POST['math'];

$sql = " UPDATE score SET kor=$kor, eng=$eng, math=$math, stdname='$stdname' WHERE id = '$id' ";
mysqli_query($conn, $sql);

$str = '{ "code": 200 }';
echo $str;
?>



