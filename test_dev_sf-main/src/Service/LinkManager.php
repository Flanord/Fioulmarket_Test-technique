<?php


namespace App\Service;


class LinkManager
{
    public function removeDuplicates(array $links): array
    {
        return array_values(array_unique($links));
    }

}
