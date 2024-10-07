import { memo } from 'react';
import clsx from 'clsx';
import { useCreateUser } from '@/hooks/api/useUsersApi';
import { useCreateUserForm } from './hooks/useCreateUserForm';
import s from './CreateUserForm.module.css';

const CreateUserForm: React.FC = () => {
    const {
        nameController: {
            field: nameField,
            fieldState: { error: nameError },
        },
        handleSubmit,
        reset,
    } = useCreateUserForm();

    const { mutate: createUser, isPending: isCreateUserPending } = useCreateUser();

    const submitHandler = handleSubmit((data) => {
        createUser(data, {
            onSuccess() {
                reset();
            },
        });
    });

    return (
        <form className={s.form} onSubmit={submitHandler}>
            <div className={s['fields-wrap']}>
                <input className={clsx(s.input, 'focus-primary')} type="text" {...nameField} />
                <button className={clsx(s.cta, 'focus-primary')} disabled={isCreateUserPending}>
                    Add user
                </button>
            </div>
            {nameError?.message ? <p className={s.error}>{nameError.message}</p> : null}
        </form>
    );
};

export default memo(CreateUserForm);
