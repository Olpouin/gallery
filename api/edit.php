<?php
require_once('../config.php');
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

if(!isset($data['type'])) exit($APIresponse('servererror', $langAPI['isset']."type"));
if(!isset($data['text'])) exit($APIresponse('servererror', $langAPI['isset']."text"));
if(!isset($data['name'])) exit($APIresponse('servererror', $langAPI['isset']."name"));
if(!isset($data['pass'])) exit($APIresponse('servererror', $langAPI['isset']."pass"));
if(!isset($data['group'])) exit($APIresponse('servererror', $langAPI['isset']."group"));
if(!isset($data['hide'])) exit($APIresponse('servererror', $langAPI['isset']."hide"));

$name = urldecode($data['name']);
$search = searchCard($name, $config['cardsList'][$data['type']]);
if (!password_verify($data['pass'], $config['general']['globalPassword']) AND !password_verify($data['pass'], $search['card']['password'])) exit($APIresponse('error',$langAPI['error-pass']));

if(!array_key_exists($data['type'], $configTypes)) exit($APIresponse('servererror', $langAPI['error-type-notfound']));
if (!$search['isFound']) exit($APIresponse('servererror', $langAPI['error-name-notfound']));
if (strlen($data['text']) > 1000000 OR strlen($data['text']) < 0) exit($APIresponse('error',$langAPI['error-text-size']));
if (strlen($data['group']) > 25 OR strlen($data['group']) < 0) exit($APIresponse('error',$langAPI['error-group-size']));

$hidden = ($data['hide']) ? 1 : 0;
$data['text'] = $serverFormat($data['text']);

$searchDB = $db->prepare("UPDATE {$config['database']['table']} SET text = ?, groupe = ?, hidden = ? WHERE name = ? AND type = ?");
$searchDB->execute(
	array (
		$data['text'],
		$data['group'],
		$hidden,
		$name,
		$data['type']
	)
);

echo($APIresponse('success',$langAPI['successes']['edit']));
?>
