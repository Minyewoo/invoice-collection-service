import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { pushPhoto } from '@/store/reducers/data.slice';
import { mainPath, cameraPath } from '@/routes/routes';
import MainLayout from '@/components/layouts/main-layout';
import Button from '@/components/UI/button';
import styles from './photo-result-page.module.scss';

function PhotoResultPage() {
    const [photo, setPhoto] = useState(null);
    const { photoTaken } = useSelector((state) => state.data);
    const dispatch = useDispatch();
    const history = useHistory();

    console.log(photoTaken);

    useEffect(() => {
        const url = URL.createObjectURL(photoTaken);
        setPhoto(url);
    }, [photoTaken]);

    useEffect(() => () => URL.revokeObjectURL(photo), []);

    return (
        <MainLayout className={styles.photoResult}>
            <img src={photo} alt="receipt" />
            <Button
                type="outlined"
                className="mt-4"
                onClick={() => {
                    dispatch(pushPhoto(photoTaken));
                    history.push(mainPath);
                }}
            >
                OK
            </Button>
            <Button
                type="outlined"
                className="mt-4"
                onClick={() => {
                    history.push(mainPath);
                }}
            >
                Cancel
            </Button>
            <Button
                type="outlined"
                className="mt-4"
                onClick={() => {
                    history.push(cameraPath);
                }}
            >
                Retry
            </Button>
        </MainLayout>
    );
}

export default PhotoResultPage;
