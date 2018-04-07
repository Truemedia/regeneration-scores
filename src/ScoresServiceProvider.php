<?php namespace Regeneration\Scores;

use Illuminate\Support\ServiceProvider;
use Regeneration\Scores\Traits\PathTrait;

class ScoresServiceProvider extends ServiceProvider
{
    use PathTrait;
    
    public function boot()
    {
        $this->loadViewsFrom($this->resource_path('views'), 'scores');
    }
}
