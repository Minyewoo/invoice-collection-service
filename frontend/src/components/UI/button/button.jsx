import classNames from 'classnames';
import styles from './button.module.scss';

function Button({
    children,
    onClick,
    className,
    type = 'contained',
    submit = false,
    disabled = false,
}) {
    return (
        <button
            className={classNames(className, styles.button, {
                [styles.variantText]: type === 'text',
                [styles.variantContained]: type === 'contained',
                [styles.variantOutlined]: type === 'outlined',
            })}
            onClick={onClick}
            type={submit ? 'submit' : 'button'}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;
