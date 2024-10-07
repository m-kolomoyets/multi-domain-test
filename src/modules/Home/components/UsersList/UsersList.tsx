import { memo, useCallback } from 'react';
import CreateUserForm from '../CreateUserForm';
import { User } from '@/api/users';
import { useCreateUser, useGetUsers, useRemoveUser } from '@/hooks/api/useUsersApi';
import s from './UsersList.module.css';

const UsersList: React.FC = () => {
    const { data: users } = useGetUsers();

    const { isPending: isCreateUserPending } = useCreateUser();
    const { mutate: removeUser, isPending: isRemoveUserPending } = useRemoveUser();

    const removeUserHandler = useCallback(
        (user: User) => {
            return () => {
                removeUser(user);
            };
        },
        [removeUser]
    );

    return (
        <div className={s.wrap}>
            <h2 className={s.title}>Users</h2>
            <CreateUserForm />
            {users.length ? (
                <ul className={s.list} data-state={isCreateUserPending || isRemoveUserPending ? 'disabled' : 'default'}>
                    {users.map((user) => {
                        return (
                            <li key={user.name} className={s.item}>
                                {user.name}
                                <button onClick={removeUserHandler(user)}>Remove</button>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className={s.empty}>No users</p>
            )}
        </div>
    );
};

export default memo(UsersList);
