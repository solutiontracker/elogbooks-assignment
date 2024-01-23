<?php

namespace App\Http\Resources\jobs;

use Illuminate\Http\Resources\Json\ResourceCollection;

class JobsCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'data' => $this->collection->map(function ($item) {
                return [
                    'id' => $item->id,
                    'summary' => $item->summary,
                    'description' => $item->description,
                    'status' => \Str::ucfirst($item->status),
                    'property' => $item->property->name,
                    'user' => '',
                ];
            }),
        ];
    }
}
