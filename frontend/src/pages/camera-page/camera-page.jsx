import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { mainPath, photoResultPath } from '@/routes/routes';
import { setPhotoTaken } from '@/store/reducers/data.slice';
import Camera from '@/components/camera';

function CameraPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    const handlePhoto = (blob) => {
        dispatch(setPhotoTaken(blob));
        history.push(photoResultPath);
    };

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
                    handlePhoto(blob);
                }, 'image/png');
            }}
            onFileSelect={(event) => {
                const { files } = event.target;
                if (!files || !files?.length) return;
                handlePhoto(files[0]);
            }}
        />
    );
}

export default CameraPage;
