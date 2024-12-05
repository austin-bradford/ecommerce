/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship } from '@keystone-next/fields';

export const User = list({
    // access:
    // eslint-disable-next-line @typescript-eslint/indent
    // ui:
    fields: {
        name: text({ isRequired: true }),
        email: text({ isRequired: true, isUnique: true }),
        password: password(),
        // to do: add roles, cart, and orders
    },
});
