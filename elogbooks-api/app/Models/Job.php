<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

class Job extends Model
{
    use HasFactory;

    use SoftDeletes;

    protected $fillable = ['summary', 'description', 'status', 'property_id'];

    protected $table = 'jobs';

    protected $hidden = [
        'property_id'
    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }

}
