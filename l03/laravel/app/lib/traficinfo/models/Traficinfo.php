<?php

namespace traficinfo\models;

class Traficinfo {
	private $priority;

	private $createddate;

	private $title;

	private $description;

	private $latitude;

	private $longitude;

	private $category;

	public function __construct(
								$priority,
								$createddate,
								$title,
								$description,
								$latitude,
								$longitude,
								$category) {

		$this->priority = $priority;
		$this->createddate = $createddate;
		$this->title = $title;
		$this->description = $description;
		$this->latitude = $latitude;
		$this->longitude = $longitude;
		$this->category = $category;
	}

	// public function getPriority() {
	// 	return $this->priority;
	// }

	// public function getCreateddate() {
	// 	return $this->createddate;
	// }

	// public function getTitle() {
	// 	return $this->title;
	// }

	// public function getDescription() {
	// 	return $this->description;
	// }

	// public function getLatitude() {
	// 	return $this->latitude;
	// }

	// public function getLongitude() {
	// 	return $this->longitude;
	// }

	// public function getCategory() {
	// 	return $this->category;
	// }

	// public function getSubCategory() {
	// 	return $this->subcategory;
	// }
}