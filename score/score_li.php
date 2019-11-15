<?
include '../inc/connect.php';

$sql = " SELECT * FROM score ORDER BY id DESC ";
$result = mysqli_query($conn, $sql);


$str = '{ "student" : [ ';
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