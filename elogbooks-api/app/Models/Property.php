<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

class Property extends Model
{
    use HasFactory;

    use SoftDeletes;

    protected $table = 'properties';

    protected $fillable = ['name'];

    public function jobs()
    {
        return $this->hasMany(Job::class);
    }

}
