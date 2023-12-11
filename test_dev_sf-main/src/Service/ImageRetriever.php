<?php


namespace App\Service;


use Psr\Cache\InvalidArgumentException;
use Symfony\Contracts\Cache\CacheInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class ImageRetriever
{
    private $httpClient;
    private $cache;

    public function __construct(HttpClientInterface $httpClient, CacheInterface $cache)
    {
        $this->httpClient = $httpClient;
        $this->cache = $cache;
    }

    /**
     * Récupère le contenu d'une image à partir de son URL.
     *
     * @param string $url L'URL de l'image à récupérer.
     * @return string|null Le contenu de l'image ou null en cas d'échec.
     */
    public function retrieveImage(string $url): ?string
    {
        // Crée une clé de cache unique basée sur l'URL de l'image.
        $cacheKey = sha1($url);
            return $this->cache->get($cacheKey, function () use ($url) {
                $response = $this->httpClient->request('GET', $url);
                if ($response->getStatusCode() === 200) {
                    return $response->getContent();
                }
                return "Échec de la récupération de l'image depuis l'URL {$url}";
            });
    }
}
