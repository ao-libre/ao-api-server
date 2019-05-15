CREATE TABLE IF NOT EXISTS`logs_worldsave` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `filename` varchar(535) NOT NULL,
  `log` mediumtext NOT NULL,
  UNIQUE KEY `id` (`id`)
)