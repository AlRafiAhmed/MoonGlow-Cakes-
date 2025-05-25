import { database } from './firebase-config.js';

// Database references
const cakesRef = database.ref('cakes');
const ordersRef = database.ref('orders');
const activitiesRef = database.ref('activities');

// Cake operations
export const cakeOperations = {
    // Add a new cake
    addCake: async (cakeData) => {
        try {
            const newCakeRef = cakesRef.push();
            await newCakeRef.set({
                ...cakeData,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
            return newCakeRef.key;
        } catch (error) {
            console.error('Error adding cake:', error);
            throw error;
        }
    },

    // Update a cake
    updateCake: async (cakeId, cakeData) => {
        try {
            await cakesRef.child(cakeId).update(cakeData);
        } catch (error) {
            console.error('Error updating cake:', error);
            throw error;
        }
    },

    // Delete a cake
    deleteCake: async (cakeId) => {
        try {
            await cakesRef.child(cakeId).remove();
        } catch (error) {
            console.error('Error deleting cake:', error);
            throw error;
        }
    },

    // Get all cakes
    getAllCakes: (callback) => {
        cakesRef.on('value', (snapshot) => {
            const cakes = [];
            snapshot.forEach((childSnapshot) => {
                cakes.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            callback(cakes);
        });
    }
};

// Order operations
export const orderOperations = {
    // Add a new order
    addOrder: async (orderData) => {
        try {
            const newOrderRef = ordersRef.push();
            await newOrderRef.set({
                ...orderData,
                status: 'pending',
                date: firebase.database.ServerValue.TIMESTAMP
            });
            return newOrderRef.key;
        } catch (error) {
            console.error('Error adding order:', error);
            throw error;
        }
    },

    // Update order status
    updateOrderStatus: async (orderId, newStatus) => {
        try {
            await ordersRef.child(orderId).update({
                status: newStatus,
                statusUpdateTime: firebase.database.ServerValue.TIMESTAMP
            });
        } catch (error) {
            console.error('Error updating order status:', error);
            throw error;
        }
    },

    // Get all orders
    getAllOrders: (callback) => {
        ordersRef.on('value', (snapshot) => {
            const orders = [];
            snapshot.forEach((childSnapshot) => {
                orders.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            callback(orders);
        });
    },

    // Get pending orders
    getPendingOrders: (callback) => {
        ordersRef.orderByChild('status').equalTo('pending').on('value', (snapshot) => {
            const orders = [];
            snapshot.forEach((childSnapshot) => {
                orders.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            callback(orders);
        });
    }
};

// Activity operations
export const activityOperations = {
    // Log an activity
    logActivity: async (admin, action, details) => {
        try {
            await activitiesRef.push({
                admin,
                action,
                details,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            });
        } catch (error) {
            console.error('Error logging activity:', error);
            throw error;
        }
    },

    // Get all activities
    getAllActivities: (callback) => {
        activitiesRef.orderByChild('timestamp').on('value', (snapshot) => {
            const activities = [];
            snapshot.forEach((childSnapshot) => {
                activities.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            // Sort activities by timestamp in descending order
            activities.sort((a, b) => b.timestamp - a.timestamp);
            callback(activities);
        });
    }
};

// Real-time listeners
export const setupRealtimeListeners = {
    // Listen for cake changes
    onCakesChange: (callback) => {
        cakesRef.on('value', (snapshot) => {
            const cakes = [];
            snapshot.forEach((childSnapshot) => {
                cakes.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            callback(cakes);
        });
    },

    // Listen for order changes
    onOrdersChange: (callback) => {
        ordersRef.on('value', (snapshot) => {
            const orders = [];
            snapshot.forEach((childSnapshot) => {
                orders.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            callback(orders);
        });
    },

    // Listen for activity changes
    onActivitiesChange: (callback) => {
        activitiesRef.orderByChild('timestamp').on('value', (snapshot) => {
            const activities = [];
            snapshot.forEach((childSnapshot) => {
                activities.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            // Sort activities by timestamp in descending order
            activities.sort((a, b) => b.timestamp - a.timestamp);
            callback(activities);
        });
    }
}; 