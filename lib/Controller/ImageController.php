namespace OCA\YourAppName\Controller;

use OCP\IRequest;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Controller;

class ImageController extends Controller {
    private $apiKey;

    public function __construct($AppName, IRequest $request) {
        parent::__construct($AppName, $request);
        $this->apiKey = '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';
    }

    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function generate() {
        $prompt = $this->request->getParam('prompt');

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, 'https://api.openai.com/v1/images/generate');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['prompt' => $prompt]));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $this->apiKey,
        ]);

        $response = curl_exec($ch);

        if (curl_errno($ch)) {
            return new DataResponse(['error' => curl_error($ch)], 500);
        } else {
            $data = json_decode($response, true);
            return new DataResponse(['url' => $data['data']['url']]);
        }

        curl_close($ch);
    }
}
