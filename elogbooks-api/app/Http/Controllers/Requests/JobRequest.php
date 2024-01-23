<?php

namespace App\Http\Controllers\Requests;

use App\Http\Requests\FormRequest;

class JobRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'summary' => 'bail|required|max:150',
            'description' => 'bail|required|max:500',
            'property_id' => 'required|exists:properties,id',
        ];
    }
}
