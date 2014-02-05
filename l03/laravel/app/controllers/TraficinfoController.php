<?php

use traficinfo\webservices\SRTraficWebservice;

class TraficinfoController extends BaseController {
	private $srTraficWebservice;

	public function __construct(SRTraficWebservice $srTraficWebservice) {
		$this->srTraficWebservice = $srTraficWebservice;
	}

	public function index() {	
		return View::make('index');
	}

	public function getTraficInfo() {
		try {
			$traficInfo = $this->srTraficWebservice->getTraficInfo();	
		}
		
		catch (\Exception $e) {
			dd($e->getMessage());
		}

		return Response::json($traficInfo);
	}

}