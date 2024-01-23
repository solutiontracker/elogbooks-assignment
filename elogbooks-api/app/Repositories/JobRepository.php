<?php

namespace App\Repositories;

class JobRepository extends AbstractRepository
{
    /**
     * jobs
     * @param mixed $formInput
     *
     * @return object
     */
    public function getJobs($formInput) {

        $string = $formInput['query'];

        $query = \App\Models\Job::with('property')->orderBy('created_at', 'DESC');

        //Search
        if(isset($formInput['query'])) {
            $query->where(function($q) use($string) {
                return $q->where('summary', 'like', "%$string%")
                        ->orWhere('description', 'like', "%$string%")
                        ->orWhere('status', 'like', "%$string%");
            });
        }

        return $query->paginate($formInput['limit']);
    }

    /**
     * createJob
     * @param mixed $formInput
     *
     * @return object
     */
    public function createJob($formInput) {

        return \App\Models\Job::create([
            'summary' => $formInput['summary'],
            'description' => $formInput['description'],
            'property_id' => $formInput['property_id'],
        ]);

    }
}
