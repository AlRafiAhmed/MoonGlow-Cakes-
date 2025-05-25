# MoonGlow Cakes - Online Cake Ordering System

A real-time cake ordering system with admin panel and customer interface.

## Features

- Real-time order tracking
- Admin dashboard for order management
- Cake variant management
- Customer order placement
- Activity logging
- Responsive design

## Tech Stack

- HTML5
- CSS3 (Tailwind CSS)
- JavaScript
- Firebase Realtime Database
- GitHub for version control

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/moonglow-cakes.git
cd moonglow-cakes
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project at https://console.firebase.google.com/
   - Enable Realtime Database
   - Add your Firebase configuration to `firebase-config.js`

4. Start the development server:
```bash
npm start
```

## Project Structure

```
moonglow-cakes/
├── index.html          # Home page
├── menu.html          # Cake menu
├── order.html         # Order placement
├── admin.html         # Admin dashboard
├── js/
│   ├── firebase-config.js    # Firebase configuration
│   ├── database.js           # Database operations
│   └── auth.js              # Authentication
├── css/
│   └── styles.css           # Custom styles
└── assets/            # Images and other assets
```

## Database Schema

### Cakes Collection
```javascript
{
  id: string,
  name: string,
  description: string,
  prices: {
    small: number,
    medium: number,
    large: number
  },
  image: string,
  category: string,
  dateAdded: timestamp
}
```

### Orders Collection
```javascript
{
  id: string,
  name: string,
  phone: string,
  address: string,
  flavor: string,
  size: string,
  quantity: number,
  message: string,
  status: string,
  date: timestamp,
  price: number
}
```

### Admin Activities Collection
```javascript
{
  id: string,
  admin: string,
  action: string,
  details: string,
  timestamp: timestamp
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.