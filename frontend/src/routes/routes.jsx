import { Switch, Route } from 'react-router-dom';
import MainPage from '@/pages/main-page/MainPage';
import ScanQrPage from '@/pages/scan-qr-page';
import QrResultPage from '@/pages/qr-result-page/qr-result-page';
import CameraPage from '@/pages/camera-page';
import PhotoResultPage from '@/pages/photo-result-page';

export const mainPath = '/';
export const qrScannerPath = '/scan';
export const qrResultsPath = '/results/:qrData';
export const buildQrResultsPath = (qrData) => `/results/${qrData}`;
export const cameraPath = '/camera';
export const photoResultPath = '/taken-photo';

function Routes() {
    return (
        <Switch>
            <Route path={mainPath} exact component={MainPage} />
            <Route path={qrScannerPath} component={ScanQrPage} />
            <Route path={qrResultsPath} component={QrResultPage} />
            <Route path={cameraPath} component={CameraPage} />
            <Route path={photoResultPath} component={PhotoResultPage} />
        </Switch>
    );
}

export default Routes;
