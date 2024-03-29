/* eslint-disable jsx-a11y/media-has-caption */
import classNames from 'classnames';
import { useEffect } from 'react';
import { useZxing } from 'react-zxing-track-access';
import { MdClose, MdOutlineQrCodeScanner, MdCircle } from 'react-icons/md';
import {
    RiFlashlightFill,
    RiFlashlightLine,
    RiImage2Fill,
    RiCameraLine,
} from 'react-icons/ri';
import Button from '@/components/UI/button';
import styles from './camera.module.scss';

function Hint({ className, text }) {
    return (
        <span className={classNames(className, styles.hint, 'py-1 px-2 mx-1')}>
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
        <div className={classNames(className, styles.bottomControls)}>
            {children}
        </div>
    );
}

function Camera({
    className,
    type = 'qr-scaner',
    onQrScan,
    onShoot,
    onClose,
    onFileSelect,
}) {
    const {
        ref,
        videoTrack,
        torch: { on, off, isOn, isAvailable },
    } = useZxing({
        onResult: (data) => onQrScan && onQrScan(data),
    });

    useEffect(() => {
        if (!videoTrack) return;
        const isFrameRateAvailable =
            typeof videoTrack.getCapabilities === 'function'
                ? videoTrack.getCapabilities().frameRate !== undefined
                : false;
        if (isFrameRateAvailable) {
            videoTrack.applyConstraints({
                frameRate: 60,
            });
        }
    }, [videoTrack]);

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
                {onFileSelect !== undefined && (
                    <label
                        className={classNames(
                            {
                                [styles.disabled]: onFileSelect === undefined,
                            },
                            styles.cameraAppButton,
                            styles.galleryButton,
                            'p-4'
                        )}
                        htmlFor="camera-app"
                    >
                        <input
                            id="camera-app"
                            type="file"
                            accept="image/*"
                            capture="user"
                            onChange={onFileSelect}
                        />
                        <RiCameraLine />
                    </label>
                )}
            </TopControls>
            <video ref={ref} />
            {ref.current && (
                <BottomControls>
                    <Button
                        className={styles.sideButton}
                        type="text"
                        disabled={!isAvailable}
                        onClick={() => (isOn ? off() : on())}
                    >
                        {isOn ? <RiFlashlightFill /> : <RiFlashlightLine />}
                    </Button>
                    {type === 'qr-scanner' && (
                        <Button
                            className={styles.mainButton}
                            type="text"
                            disabled
                        >
                            <MdOutlineQrCodeScanner />
                        </Button>
                    )}
                    {type === 'camera' && (
                        <Button
                            className={styles.mainButton}
                            type="text"
                            onClick={onShootHandler}
                        >
                            <MdCircle />
                        </Button>
                    )}
                    <label
                        className={classNames(
                            {
                                [styles.disabled]: onFileSelect === undefined,
                            },
                            styles.sideButton,
                            styles.galleryButton
                        )}
                        htmlFor="explorer-app"
                    >
                        <input
                            id="explorer-app"
                            type="file"
                            accept="image/*"
                            onChange={onFileSelect}
                        />
                        <RiImage2Fill />
                    </label>
                </BottomControls>
            )}
        </div>
    );
}

export default Camera;
