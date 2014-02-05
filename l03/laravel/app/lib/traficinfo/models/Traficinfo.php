<?php

namespace traficinfo\models;

class Traficinfo {
	public $priority;

	public $createddate;

	public $title;

	public $description;

	public $latitude;

	public $longitude;

	public $category;

	public function __construct(
								$priority,
								$createddate,
								$title,
								$description,
								$latitude,
								$longitude,
								$category) {

		htmlspecialchars($this->priority = $priority);
		htmlspecialchars($this->createddate = $createddate);
		htmlspecialchars($this->title = $title);
		htmlspecialchars($this->description = $description);
		htmlspecialchars($this->latitude = $latitude);
		htmlspecialchars($this->longitude = $longitude);
		htmlspecialchars($this->category = $category);
	}
}