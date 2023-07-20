import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearData } from '@/store/reducers/data.slice';
import { qrScannerPath, cameraPath } from '@/routes/routes';
import MainLayout from '@/components/layouts/main-layout';
import Button from '@/components/UI/button';
import Collapsible from '@/components/UI/collapsible';
import ImageThumbnail from '@/components/UI/image-thumbnail';
import Results from '@/components/results';
import styles from './main-page.module.scss';

function MainPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { qrResult, photos } = useSelector((state) => state.data);

    return (
        <MainLayout>
            <Button onClick={() => history.push(cameraPath)}>ADD PHOTO</Button>
            <Button
                className="ml-4"
                onClick={() => history.push(qrScannerPath)}
            >
                SCAN QR
            </Button>
            <Collapsible className="mt-4" label="Photos">
                {photos?.length ? (
                    <div className={styles.photos}>
                        {photos.map((src, idx) => (
                            <ImageThumbnail key={idx} src={src} alt="kavo" />
                        ))}
                    </div>
                ) : (
                    'Empty'
                )}
            </Collapsible>
            <Collapsible className="mt-4" label="Receipt Data">
                {qrResult ? <Results data={qrResult} /> : 'Empty'}
            </Collapsible>
            <Button
                type="outlined"
                className="mt-4"
                onClick={() => dispatch(clearData())}
            >
                RESET
            </Button>
            <Button
                type="outlined"
                className="mt-4 ml-4"
                onClick={() => dispatch(clearData())}
            >
                SEND
            </Button>
        </MainLayout>
    );
}

export default MainPage;
