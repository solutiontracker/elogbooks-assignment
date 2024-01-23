<?php

namespace App\Http\Controllers;

use \App\Repositories\JobRepository;

use \App\Http\Controllers\Requests\JobRequest;

use Illuminate\Http\Request;

use App\Http\Resources\jobs\JobsCollection;

class JobController extends Controller
{
    public $successStatus = 200;

    protected $jobsRepository;

    /**
     * __construct
     *
     * @param  mixed $jobsRepository
     * @return void
     */
    public function __construct(JobRepository $jobsRepository)
    {
        $this->jobsRepository = $jobsRepository;
    }

    /**
     * index
     *
     * @return mixed
     */
    public function index(Request $request)
    {
        $request->merge([
            'limit' =>  $request->limit ? $request->limit : 10,
            'page' =>  isset($request->page) ? $request->page + 1 : 1
        ]);

        $jobs = $this->jobsRepository->getJobs($request->all());

        return new JobsCollection($jobs);
    }

    /**
     * store
     *
     * @param  mixed $request
     * @return void
     */
    public function store(JobRequest $request)
    {
        $this->jobsRepository->createJob($request->all());

        return response()->json([
            'success' => true
        ], $this->successStatus);
    }
}
