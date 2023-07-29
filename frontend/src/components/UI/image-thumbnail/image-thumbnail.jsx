import classNames from 'classnames';
import styles from './image-thumbnail.module.scss';

function ImageThumbnail({ className, src, alt }) {
    return (
        <div className={classNames(className, styles.thumbnail)}>
            <img src={src} alt={alt} />
        </div>
    );
}

export default ImageThumbnail;
