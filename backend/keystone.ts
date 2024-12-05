/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import { User } from './schemas/User';

const databaseURL =
    process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';
const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // How long should they stay signed in?
    secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
        // TODO: add in initial roles here
    }
});


// named export
export default withAuth(config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true
        },
    },
    db: {
        adapter: 'mongoose',
        url: databaseURL,
        // TODO: add data seeding here
    },
    lists: createSchema({
        // schema items here
        User
    }),
    ui: {
        // Show the UI only for people who pass this test
        isAccessAllowed: ({ session }) => !!session?.data
    },
    session: withItemData(statelessSessions(sessionConfig), {
        User: 'id'
    })
}));
