<?php namespace Regeneration\Scores\Traits;

trait PathTrait {

    /* Package - base path */
    private function base_path(String $path) : String
    {
        $base = base_path("vendor/regeneration/scores/src");
        return "${base}/${path}";
    }
    private function resource_path(String $path) : String { return $this->base_path("resources/${path}"); } // Package - resource path
}
