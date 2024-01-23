<?php

namespace App\Repositories;

class PropertyRepository extends AbstractRepository
{
    /**
     * properties
     *
     * @return object
     */
    public function getProperties() {
        return \App\Models\Property::all();
    }
}
