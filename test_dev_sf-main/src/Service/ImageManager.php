<?php


namespace App\Service;


class ImageManager
{
    private $fluxManager;
    private $imageFilter;
    private $imageRetriever;
    private $linkManager;

    public function __construct(
        FluxManager $fluxManager,
        ImageFilter $imageFilter,
        ImageRetriever $imageRetriever,
        LinkManager $linkManager
    )
    {
        $this->linkManager = $linkManager;
        $this->imageRetriever = $imageRetriever;
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

        $uniqueLinks = $this->linkManager->removeDuplicates($filteredLinks);

        $images = [];
        foreach ($uniqueLinks as $link) {
            $images[] = $this->imageRetriever->retrieveImage($link);
        }

        return $images;
    }

}
