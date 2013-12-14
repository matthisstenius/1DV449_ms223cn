<?php

namespace traficinfo\webservices;

class SRTraficWebservice extends RequestWrapper {
	private static $baseUri = 'http://api.sr.se/api/v2/traffic/messages?format=json&size=100';

	public function getTraficInfo() {
		try {
			$result = $this->request(self::$baseUri);
			$fromJson = json_decode($result, true);

			$traficInfoCollection = [];
			foreach ($fromJson['messages'] as $traficInfo) {
				$traficInfoCollection[] = new \traficinfo\models\Traficinfo($traficInfo['priority'],
																			$traficInfo['createddate'],
																			$traficInfo['title'],
																			$traficInfo['description'],
																			$traficInfo['latitude'],
																			$traficInfo['longitude'],
																			$traficInfo['category']);
			}

			return $fromJson;
		}

		catch (\Exception $e) {
			dd($e->getMessage());
		}
	}
}