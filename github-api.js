// GitHub API Configuration
const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN'; // Replace with your GitHub Personal Access Token
const REPO_OWNER = 'YOUR_GITHUB_USERNAME'; // Replace with your GitHub username
const REPO_NAME = 'MoonGlow-Cakes-DB'; // Replace with your repository name
const BASE_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;

// GitHub API Headers
const headers = {
    'Authorization': `token ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
};

// Function to create or update a file in GitHub
async function saveToGitHub(path, content, sha = null) {
    try {
        const url = `${BASE_URL}/contents/${path}`;
        const data = {
            message: `Update ${path}`,
            content: btoa(JSON.stringify(content, null, 2)),
            branch: 'main'
        };

        if (sha) {
            data.sha = sha;
        }

        const response = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error saving to GitHub:', error);
        throw error;
    }
}

// Function to get file content from GitHub
async function getFromGitHub(path) {
    try {
        const url = `${BASE_URL}/contents/${path}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error(`GitHub API error: ${response.statusText}`);
        }

        const data = await response.json();
        return JSON.parse(atob(data.content));
    } catch (error) {
        console.error('Error getting from GitHub:', error);
        throw error;
    }
}

// Function to get file SHA from GitHub
async function getFileSHA(path) {
    try {
        const url = `${BASE_URL}/contents/${path}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data.sha;
    } catch (error) {
        console.error('Error getting file SHA:', error);
        return null;
    }
}

// Function to save cake data
async function saveCake(cake) {
    try {
        const cakes = await getFromGitHub('cakes.json') || [];
        const existingCakeIndex = cakes.findIndex(c => c.id === cake.id);
        
        if (existingCakeIndex !== -1) {
            cakes[existingCakeIndex] = cake;
        } else {
            cakes.push(cake);
        }

        const sha = await getFileSHA('cakes.json');
        await saveToGitHub('cakes.json', cakes, sha);
        return true;
    } catch (error) {
        console.error('Error saving cake:', error);
        return false;
    }
}

// Function to save order data
async function saveOrder(order) {
    try {
        const orders = await getFromGitHub('orders.json') || [];
        orders.push(order);
        
        const sha = await getFileSHA('orders.json');
        await saveToGitHub('orders.json', orders, sha);
        return true;
    } catch (error) {
        console.error('Error saving order:', error);
        return false;
    }
}

// Function to save activity log
async function saveActivity(activity) {
    try {
        const activities = await getFromGitHub('activities.json') || [];
        activities.push(activity);
        
        const sha = await getFileSHA('activities.json');
        await saveToGitHub('activities.json', activities, sha);
        return true;
    } catch (error) {
        console.error('Error saving activity:', error);
        return false;
    }
}

// Function to get all cakes
async function getAllCakes() {
    try {
        return await getFromGitHub('cakes.json') || [];
    } catch (error) {
        console.error('Error getting cakes:', error);
        return [];
    }
}

// Function to get all orders
async function getAllOrders() {
    try {
        return await getFromGitHub('orders.json') || [];
    } catch (error) {
        console.error('Error getting orders:', error);
        return [];
    }
}

// Function to get all activities
async function getAllActivities() {
    try {
        return await getFromGitHub('activities.json') || [];
    } catch (error) {
        console.error('Error getting activities:', error);
        return [];
    }
}

// Export functions
export {
    saveCake,
    saveOrder,
    saveActivity,
    getAllCakes,
    getAllOrders,
    getAllActivities
}; 