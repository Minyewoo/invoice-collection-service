import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setQrText, setQrResult } from '@/store/reducers/data.slice';
import { useGetInvoiceDataQuery } from '@/services/api';
import MainLayout from '@/components/layouts/main-layout';
import Collapsible from '@/components/UI/collapsible';
import Results from '@/components/results';
import Button from '@/components/UI/button';

function QrResultPage() {
    const { qrraw } = useParams();
    const { data, error, isLoading } = useGetInvoiceDataQuery({
        qrraw,
    });
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <MainLayout>
            {error && <p>{JSON.stringify(error, null, 4)}</p>}
            {isLoading && !error && <p>Loading...</p>}
            {!isLoading && !error && (
                <Collapsible className="mb-4" label="Receipt">
                    <Results data={data} />
                </Collapsible>
            )}
            <Button
                type="outlined"
                className="mt-4"
                onClick={() => {
                    if (isLoading || error) {
                        history.push('/');
                        return;
                    }
                    dispatch(setQrText(qrraw));
                    dispatch(setQrResult(data));
                    history.push('/');
                }}
            >
                OK
            </Button>
        </MainLayout>
    );
}

export default QrResultPage;
