<?php
require_once('vendor/autoload.php');

class Config {
	static $confArray;

	public static function read($name) {
		$value = (isset(self::$confArray[$name])) ?
			self::$confArray[$name] :
			false;
		return $value;
	}
	public static function write($name, $value) {
		self::$confArray[$name] = $value;
	}
	public static function add($name, $value) {
		if (!is_array(self::$confArray[$name])) return false;
		array_push(self::$confArray[$name], $value);
	}

	public static function checkPassword($pass) {
		foreach (Config::read('gene.password') as $key) {
			if (password_verify($pass, $key)) return true;
		} return false;
	}
}
require_once(dirname(__FILE__, 2)."/database.php");
//require_once('../../database.php');
Config::write('db.host', $config['db.host']);
Config::write('db.name', $config['db.name']);
Config::write('db.user', $config['db.user']);
Config::write('db.password', $config['db.password']);
Config::write('db.table', $config['db.table.encyclopedia']);
require_once('config/general.php');
Config::write('gene.editorconfig', file_get_contents("config/editorJS.json", FILE_USE_INCLUDE_PATH));
$config = new Config();

class Core {
	public $db;
	private static $instance;

	function __construct() {
		$dsn = 'mysql:host='.Config::read('db.host').';dbname='.Config::read('db.name');
		$user = Config::read('db.user');
		$password = Config::read('db.password');

		$this->db = new PDO($dsn, $user, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
	}

	public static function getInstance() {
		if (!isset(self::$instance)) {
			$object = __CLASS__;
			self::$instance = new $object;
		}
		return self::$instance;
	}
}
$core = Core::getInstance();
require_once('src/class/gallery-parameters.php');
$galleryParameters = new GalleryParameters();
$galleryParameters->toConfig();

Config::write('gene.visibility', '0');
Config::write('gene.isEditing', '0');

require_once('src/class/card.php');
require_once('src/functions.php');
?>
