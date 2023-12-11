<?php


namespace App\Service;


class ImageManager
{
    private $fluxManager;
    private $imageFilter;
    private $linkManager;

    public function __construct(
        FluxManager $fluxManager,
        ImageFilter $imageFilter,
        LinkManager $linkManager
    )
    {
        $this->linkManager = $linkManager;
        $this->imageFilter = $imageFilter;
        $this->fluxManager = $fluxManager;
    }
    /**
     * Récupère les images à partir des flux RSS et de l'API.
     *
     * @return array Les images récupérées.
     */
    public function getImages(): array
    {
        $rssLinks = $this->fluxManager->getRssLinks();

        $apiLinks = $this->fluxManager->getApiLinks();

        $filteredLinks = $this->imageFilter->filterImages(array_merge($rssLinks, $apiLinks));

        $uniqueImages = $this->linkManager->removeDuplicates($filteredLinks);

        return $uniqueImages;
    }

}
