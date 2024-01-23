<?php

namespace App\Http\Controllers;

use \App\Repositories\PropertyRepository;

class PropertyController extends Controller
{

    public $successStatus = 200;

    protected $propertyRepository;

    /**
     * __construct
     *
     * @param  mixed $planRepository
     * @return void
     */
    public function __construct(PropertyRepository $propertyRepository)
    {
        $this->propertyRepository = $propertyRepository;
    }

    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        $properties = $this->propertyRepository->getProperties();

        return response()->json([
            'success' => true,
            'data' => array(
                'properties' => $properties
            )
        ], $this->successStatus);
    }
}
