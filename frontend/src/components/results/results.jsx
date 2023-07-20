/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import styles from './results.module.scss';

const toCurrency = (value) =>
    Number(value / 100)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$& ');

function Item({ item, idx }) {
    const { name, price, quantity } = item;
    return (
        <li className={styles.item}>
            <span>
                {`${idx}. `}
                {name}
            </span>
            <span className={styles.itemPrice}>
                {toCurrency(price)} × {quantity} ≡{' '}
                {toCurrency(price * quantity)}
            </span>
        </li>
    );
}

function Items({ data, className }) {
    const { items, ecashTotalSum } = data;

    return (
        <>
            <ul className={classNames(className, styles.items)}>
                {items.map((item, idx) => (
                    <Item
                        key={`${idx}-${item.name}`}
                        item={item}
                        idx={idx + 1}
                    />
                ))}
            </ul>
            <div className={styles.total}>
                <span>Total</span>
                <span>{toCurrency(ecashTotalSum)}</span>
            </div>
        </>
    );
}

function Results({ data }) {
    return <Items className="mt-4" data={data.data.json} />;
}

export default Results;
