import { database } from './firebase-config.js';

// Admin authentication operations
export const authOperations = {
    // Admin credentials reference
    adminsRef: database.ref('admins'),

    // Initialize admin credentials
    initializeAdmins: async () => {
        const defaultAdmins = [
            {
                username: 'Al Rafi Ahmed',
                password: '1234',
                position: 'Operational Administrator',
                image: 'Al RAfi.jpg'
            },
            {
                username: 'Saymoon Nahar Mariam',
                password: 'Saymoon2004',
                position: 'Managing Director',
                image: 'https://randomuser.me/api/portraits/women/44.jpg'
            },
            {
                username: 'Yubayer Bin Zakir',
                password: '1234',
                position: 'উচ্চপদস্থ কর্মকর্তা',
                image: 'Yubayer.jpg'
            }
        ];

        try {
            // Check if admins already exist
            const snapshot = await authOperations.adminsRef.once('value');
            if (!snapshot.exists()) {
                // Add default admins
                for (const admin of defaultAdmins) {
                    await authOperations.adminsRef.push(admin);
                }
            }
        } catch (error) {
            console.error('Error initializing admins:', error);
            throw error;
        }
    },

    // Verify admin credentials
    verifyAdmin: async (username, password) => {
        try {
            const snapshot = await authOperations.adminsRef
                .orderByChild('username')
                .equalTo(username)
                .once('value');

            if (snapshot.exists()) {
                const adminData = Object.values(snapshot.val())[0];
                if (adminData.password === password) {
                    return {
                        success: true,
                        admin: {
                            username: adminData.username,
                            position: adminData.position,
                            image: adminData.image
                        }
                    };
                }
            }
            return { success: false };
        } catch (error) {
            console.error('Error verifying admin:', error);
            throw error;
        }
    },

    // Get admin profile
    getAdminProfile: async (username) => {
        try {
            const snapshot = await authOperations.adminsRef
                .orderByChild('username')
                .equalTo(username)
                .once('value');

            if (snapshot.exists()) {
                return Object.values(snapshot.val())[0];
            }
            return null;
        } catch (error) {
            console.error('Error getting admin profile:', error);
            throw error;
        }
    },

    // Update admin profile
    updateAdminProfile: async (username, updates) => {
        try {
            const snapshot = await authOperations.adminsRef
                .orderByChild('username')
                .equalTo(username)
                .once('value');

            if (snapshot.exists()) {
                const adminKey = Object.keys(snapshot.val())[0];
                await authOperations.adminsRef.child(adminKey).update(updates);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error updating admin profile:', error);
            throw error;
        }
    }
}; 