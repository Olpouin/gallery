<?php
/*==== BASIC FILES ====*/
require_once 'config.php'; /*Various functions*/
require_once 'php/functions.inc.php'; /*Various functions*/
require_once 'php/pages.php'; /*Everything in the pages*/
require_once 'php/sidenav.php'; /*Well... The sidenav.*/
/*=== HEADER ===*/
$headerContentDetectionArray = array(
	'img' => '/\?\[(.*)\]\((.*)\)/m',
	'desc' => '/\[p\](.*)\[\/p\]/Ums'
);
$headerContent = "";
foreach ($headerContentDetectionArray as $key => $value) {
	preg_match($value, $cardContent, $matches);
	if (!empty($matches)) {
		switch ($key) {
			case 'img':
				$headerContent .= '<meta property="og:image:url" content="'.$matches['2'].'">';
				$headerContent .= '<meta name="twitter:image" content="'.$matches['2'].'">';
				$headerContent .= '<meta name="twitter:card" content="summary_large_image">';
				$headerContent .= '<meta property="og:image:alt" content="Artwork : '.$matches['1'].'">';
				break;
			case 'desc':
				if (strlen($matches['1']) > 290) {
					$matches['1'] = substr($matches['1'], 0, 290)."...";
				}
				$description = $matches['1'];
				$headerContent .= '<meta property="og:description" content="'.htmlentities($description).'">';
				$headerContent .= '<meta name="description" content="'.htmlentities($description).'">';
				break;
		}
	}
}
$headerContent .= '<meta property="og:title" content="'.$infoContent['g_title'].'">';
/*=== VARIABLES ===*/
$markdownArray = array(
	'/\[h1\](.*)\[\/h1\]/Ums' => '<h1>$1</h1>',
	'/\[h2\](.*)\[\/h2\]/Ums' => '<h2>$1</h2>',
	'/\[i\](.*)\[\/i\]/Ums' => '<i>$1</i>',
	'/\[b\](.*)\[\/b\]/Ums' => '<b>$1</b>',
	'/\[s\](.*)\[\/s\]/Ums' => '<s>$1</s>',
	'/\[u\](.*)\[\/u\]/Ums' => '<u>$1</u>',
	'/\[quote\](.*)\[author\](.*)\[\/author\]\[\/quote\]/Ums' => '<blockquote><span>$1</span><cite>— $2</cite></blockquote>',
	'/\[ib\](.*)\[\/ib\]/Ums' => '<aside class="infobox">$1</aside>',
	'/\[ibd\](.*)\|(.*)\[\/ibd\]/Ums' => '<div class="infobox-data"><span class="infobox-data-title">$1</span><span>$2</span></div>',
	'/[\!\?]\[(.*)\]\((.*)\)/Ums' => '<img src="$2" onclick="openImg(event)" alt="$1">'
);
if (!isset($_GET['edit'])) {
	foreach ($markdownArray as $key => $value) {
		$cardContent = preg_replace($key, $value, $cardContent);
	}
}
?>
<!DOCTYPE html>
<html lang="<?=$config['general']['language']?>">
	<head>
		<title>Pages<?=$config['head-content']['title']?></title>
		<?=$headerContent?>
		<meta property="og:type" content="article">
		<meta property="og:site_name" content="<?=$config['head-content']['site_name']?>">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta charset="utf-8">
		<link rel="icon" href="<?=$config['general']['path']?>/content/favicon.ico">
		<link rel="stylesheet" href="<?=$config['general']['path']?>/content/css/main.css" type="text/css" media="screen">
		<link rel="stylesheet" href="<?=$config['general']['path']?>/content/css/sidenav.css" type="text/css" media="screen">
		<link rel="stylesheet" href="<?=$config['general']['path']?>/content/css/card.css" type="text/css" media="screen">
		<script src="<?=$config['general']['path']?>/content/script.js" type="text/javascript" defer="defer"></script>
	</head>
	<body>
		<div id="fullscreen-image" class="fullscreen-image">
			<div>
				<img id="fs-img_img" src="">
			</div>
			<h1 id="fs-img_title">Image title</h1>
			<span class="button-x" onclick="closeImg();">&times;</span>
		</div>
		<nav id="sidenav">
			<?=$sidenavContent?>
		</nav>
		<section class="card" id="card">
			<div class="sidenav-button" style="font-size: 20px;" onclick="openNav();">&#9776;</div>
			<?=$cardContent?>
		</section>
	</body>
</html>
