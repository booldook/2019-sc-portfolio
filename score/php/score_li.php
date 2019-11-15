<?
include '../inc/connect.php';
if(isset($_GET['page'])) {
	$page = $_GET['page'];
}
else $page = 1;
$std = $page - 1;
$len = 2;

$sql = " SELECT count(id) FROM score";
$result = mysqli_query($conn, $sql);
$rs = mysqli_fetch_array($result);
$total = $rs[0];

$sql = " SELECT * FROM score ORDER BY id DESC LIMIT $std, $len";
$result = mysqli_query($conn, $sql);


$str = '{';
$str.= 	'"total": '.$total.', "student" : [ ';
while($rs = mysqli_fetch_array($result)) {
	$str.= '{';
	$str.= ' "id": "'.$rs['id'].'", ';
	$str.= ' "stdname": "'.$rs['stdname'].'", ';
	$str.= ' "kor": "'.$rs['kor'].'", ';
	$str.= ' "eng": "'.$rs['eng'].'", ';
	$str.= ' "math": "'.$rs['math'].'" ';
	$str.= '},';
}
$str = substr($str, 0, -1);
$str.= ' ] }';
echo $str;
?>