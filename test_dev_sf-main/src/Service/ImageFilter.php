<?php


namespace App\Service;


use Psr\Log\LoggerInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class ImageFilter
{
    private $httpClient;

    public function __construct(HttpClientInterface $httpClient,LoggerInterface $logger)
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
        $imageLinks = [];

        foreach ($links as $link) {
            try {
                $response = $this->httpClient->request('GET', $link);
                if ($this->isImageContent($response->getContent())) {
                    $imageLinks[] = $link;
                }
            } catch (\Exception $e) {
                $failedLinks[] = $link;
                $this->logger->error('Erreur lors du filtrage d\'images depuis ' . $link, ['exception' => $e]);
            }
        }
        return $imageLinks;
    }

    /**
     * Vérifie si le contenu de la réponse HTTP est une image.
     *
     * @param string $content Le contenu de la réponse HTTP.
     * @return bool True si le contenu est une image, sinon False.
     */
    private function isImageContent(string $content): bool
    {
        $imageRegex = '/\b(?:https?:\/\/\S+\.(?:jpg|jpeg|gif|png))\b/i';
        return preg_match($imageRegex, $content) === 1;
    }

}
