<?php

namespace App\Service;


use Psr\Log\LoggerInterface;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class ImageFilter
{
    private $httpClient;

    public function __construct(HttpClientInterface $httpClient, LoggerInterface $logger)
    {
        $this->httpClient = $httpClient;
        $this->logger = $logger;
    }

    /**
     * Filtrer les liens d'images à partir du contenu de la réponse HTTP.
     *
     * @param array $links Les liens à filtrer.
     * @return array Les liens d'images filtrés.
     */
    public function filterImages(array $links): array
    {

        $imageUrls = [];

        foreach ($links as $link) {
            try {
                $response = $this->httpClient->request('GET', $link);
                $htmlContent = $response->getContent();

                $imageUrls = array_merge($imageUrls, $this->extractImageUrls($htmlContent));
                $this->logger->info('Images filtrées depuis ' . $link);
            } catch (\Exception $e) {
                $this->logger->error('Erreur lors de la récupération du contenu depuis ' . $link, ['exception' => $e]);
            }

        }
        return $imageUrls;
    }

    /**
     *
     *
     * @param string $content Le contenu HTML.
     * @return string|null L'URL des  images ou null s'il n'y en a pas.
     */
    public function extractImageUrls(string $htmlContent): array
    {
        $imageUrls = [];

        $crawler = new Crawler($htmlContent);
        $crawler->filter('img[src]')->each(function (Crawler $imgNode) use (&$imageUrls) {
            $src = $imgNode->attr('src');
            if (filter_var($src, FILTER_VALIDATE_URL) && !strstr($src, 'facebook.com/tr?id=')) {
                $imageUrls[] = $src;
            }
        });

        return $imageUrls;
    }

}
