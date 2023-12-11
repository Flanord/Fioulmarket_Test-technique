<?php


namespace App\Service;


use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class FluxManager
{
    /**
     * Constructeur de classe FluxManager qui injecte plusieurs dépendances via le service container de Symfony.
     *
     *
     * @param HttpClientInterface $httpClient Le client HTTP utilisé pour effectuer les requêtes.
     */
    private $httpClient;
    private $params;

    public function __construct(ParameterBagInterface $params, HttpClientInterface $httpClient)
    {
        $this->params = $params;
        $this->httpClient = $httpClient;
    }

    /**
     * Récupère les liens RSS à partir de l'URL de base.
     *
     * @return array Un tableau contenant les liens RSS récupérés.
     */

    public function getRssLinks(): array
    {
        try {
            $xml = $this->fetchXmlContent($this->params->get('BaseUrlRss'));
            $links = [];
            foreach ($xml->channel->item as $item) {
                $link = (string)$item->link;
                $links[] = $link;
            }

            return $links;
        } catch (\Exception $e) {
            return ["Erreur lors de la récupération des liens RSS"];
        }
    }

    /**
     * Récupère les liens API à partir de l'URL de base et d'une clé API.
     * @return array Un tableau contenant les liens API récupérés.
     */
    public function getApiLinks(): array
    {
        try {
            $apiUrl = $this->params->get('baseUrlApi') . $this->params->get('apiKey');
            $apiData = $this->fetchJsonContent($apiUrl);

            $links = [];

            foreach ($apiData['articles'] as $article) {
                if (!empty($article['urlToImage'])) {
                    $links[] = $article['url'];
                }
            }

            return $links;
        } catch (\Exception $e) {
            return ["Erreur lors de la récupération des liens API: " . $e->getMessage()];
        }
    }

    /**
     * Récupère le contenu XML d'une URL à l'aide du client HTTP.
     *
     * @param string $url L'URL à partir de laquelle récupérer le contenu XML.
     * @return \SimpleXMLElement Le contenu XML sous forme d'objet SimpleXMLElement.
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    private function fetchXmlContent(string $url): \SimpleXMLElement
    {
        $response = $this->httpClient->request('GET', $url);
        $content = $response->getContent();

        return simplexml_load_string($content, 'SimpleXMLElement', LIBXML_NOCDATA);
    }


    /**
     * Récupère le contenu JSON d'une URL à l'aide du client HTTP.
     *
     * @param string $url L'URL à partir de laquelle récupérer le contenu JSON.
     * @return array Le contenu JSON sous forme de tableau associatif.
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    private function fetchJsonContent(string $url): array
    {
        $response = $this->httpClient->request('GET', $url);
        return $response->toArray(true);

    }


}
