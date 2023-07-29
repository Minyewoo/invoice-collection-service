import { useHistory } from 'react-router-dom';
import { buildQrResultsPath, mainPath } from '@/routes/routes';
import Camera from '@/components/camera';

function ScanQrPage() {
    const history = useHistory();

    return (
        <Camera
            type="qr-scanner"
            onQrScan={(data) =>
                history.push(buildQrResultsPath(data.getText()))
            }
            onClose={() => history.push(mainPath)}
        />
    );
}

export default ScanQrPage;
