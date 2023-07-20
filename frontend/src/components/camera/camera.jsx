/* eslint-disable jsx-a11y/media-has-caption */
import classNames from 'classnames';
import { useZxing } from 'react-zxing';
import { MdClose, MdOutlineQrCodeScanner, MdCircle } from 'react-icons/md';
import Button from '@/components/UI/button';
import styles from './camera.module.scss';

function Hint({ className, text }) {
    return (
        <span className={classNames(className, styles.hint, 'py-1 px-2')}>
            {text}
        </span>
    );
}

function TopControls({ children, className }) {
    return (
        <div className={classNames(className, styles.topControls, 'px-1')}>
            {children}
        </div>
    );
}

function BottomControls({ children, className }) {
    return (
        <div className={classNames(className, styles.bottomControls, 'p-4')}>
            {children}
        </div>
    );
}

function Camera({ className, type = 'qr-scaner', onQrScan, onShoot, onClose }) {
    const { ref } = useZxing({
        onResult: (data) => onQrScan && onQrScan(data),
    });

    const onShootHandler = () => onShoot && onShoot({ video: ref.current });

    return (
        <div className={classNames(className, styles.cameraContainer)}>
            <TopControls>
                <Button
                    className={classNames(styles.closeButton, 'p-1')}
                    type="text"
                    onClick={onClose}
                >
                    <MdClose />
                </Button>
                {type === 'qr-scanner' && (
                    <Hint
                        className="ml-1"
                        text="Point your camera at a QR code"
                    />
                )}
            </TopControls>
            <video ref={ref} />
            {ref.current && (
                <BottomControls>
                    {type === 'qr-scanner' && (
                        <Button
                            className={styles.qrButton}
                            type="text"
                            disabled
                        >
                            <MdOutlineQrCodeScanner />
                        </Button>
                    )}
                    {type === 'camera' && (
                        <Button
                            className={styles.qrButton}
                            type="text"
                            onClick={onShootHandler}
                        >
                            <MdCircle />
                        </Button>
                    )}
                </BottomControls>
            )}
        </div>
    );
}

export default Camera;
