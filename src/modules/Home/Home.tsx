import { memo, useEffect } from 'react';
import clsx from 'clsx';
import { useGetConfig } from '@/hooks/api/useConfigApi';
import { CURRENT_YEAR } from './constants';
import { UsersList } from './components/UsersList';
import s from './Home.module.css';

const Home: React.FC = () => {
    const { data: config, isFetched } = useGetConfig();

    useEffect(() => {
        if (isFetched && !!config) {
            document.title = config.name;
        }
    }, [config, isFetched]);

    return (
        <main className={clsx(s.wrap, 'full-height')}>
            <div className={s.inner}>
                <header className={s.header}>
                    <img className={s.logo} src={config.logoUrl} alt={config.name} />
                    <h1 className={s.title}>
                        <strong className={s.company}>{config.name}</strong>
                    </h1>
                </header>
                <UsersList />
            </div>
            <footer className={s.footer}>
                &copy;&nbsp;{CURRENT_YEAR}, {config.name}
            </footer>
        </main>
    );
};

export default memo(Home);
