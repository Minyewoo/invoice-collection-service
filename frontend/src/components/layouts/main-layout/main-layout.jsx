import classNames from 'classnames';

function MainLayout({ children, className }) {
    return <div className={classNames(className, 'p-4')}>{children}</div>;
}

export default MainLayout;
