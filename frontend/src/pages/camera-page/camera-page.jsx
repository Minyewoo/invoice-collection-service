import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { mainPath, photoResultPath } from '@/routes/routes';
import { setPhotoTaken } from '@/store/reducers/data.slice';
import Camera from '@/components/camera';

function CameraPage() {
    const history = useHistory();
    const dispatch = useDispatch();

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
                    dispatch(setPhotoTaken(blob));
                    history.push(photoResultPath);
                }, 'image/png');
            }}
        />
    );
}

export default CameraPage;
