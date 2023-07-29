import { useHistory } from 'react-router-dom';
import { mainPath, photoResultPath } from '@/routes/routes';
import Camera from '@/components/camera';

function CameraPage() {
    const history = useHistory();

    return (
        <Camera
            type="camera"
            onClose={() => history.push(mainPath)}
            onShoot={({ video }) => {
                if (!video) return;

                const { videoWidth, videoHeight } = video;
                const canvas = document.createElement('canvas');

                canvas.width = videoWidth;
                canvas.height = videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0);

                canvas.toBlob((blob) => {
                    history.push(photoResultPath, {
                        photo: blob,
                    });
                }, 'image/png');
            }}
        />
    );
}

export default CameraPage;
