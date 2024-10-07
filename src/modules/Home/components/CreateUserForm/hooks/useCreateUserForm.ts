import { createUserSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useController, useForm } from 'react-hook-form';
import type { CreateUserSchema } from '../types';

export const useCreateUserForm = () => {
    const { control, ...rest } = useForm<CreateUserSchema>({
        resolver: zodResolver(createUserSchema),
    });

    const nameController = useController({
        control,
        name: 'name',
    });

    return {
        nameController,
        ...rest,
    };
};
