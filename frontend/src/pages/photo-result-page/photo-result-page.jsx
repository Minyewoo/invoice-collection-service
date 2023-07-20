import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { pushPhoto } from '@/store/reducers/data.slice';
import { mainPath, cameraPath } from '@/routes/routes';
import MainLayout from '@/components/layouts/main-layout';
import Button from '@/components/UI/button';
import styles from './photo-result-page.module.scss';

function PhotoResultPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    return (
        <MainLayout className={styles.photoResult}>
            <img src={location.state?.photo} alt="receipt" />
            <Button
                type="outlined"
                className="mt-4"
                onClick={() => {
                    dispatch(pushPhoto(location.state?.photo));
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
