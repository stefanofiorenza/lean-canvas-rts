USE `lean_canvas_rts`;
CREATE TABLE `canvas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `kind_of` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE `topics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `canvas_id` int(11) NOT NULL,
  `content` varchar(200) NOT NULL,
  `section` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_canvas` (`canvas_id`),
  CONSTRAINT `fk_canvas` FOREIGN KEY (`canvas_id`) REFERENCES `canvas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;

INSERT INTO canvas(name) VALUES ('Canvas #1'), ('Canvas #2'), ('Canvas #3'), ('Canvas #4'), ('Canvas #5');
