# Spotify Taste Mixer 🎵

A modern web application that allows users to explore and create personalized Spotify playlists based on their favorite artists and genres. Built with Next.js and React, this application provides an intuitive interface for discovering music and organizing it into custom playlists.

## Features

### 🎤 Artist Search & Selection
- **Search Artists**: Find artists from the Spotify database with real-time search functionality
- **Multiple Selection**: Select multiple artists to create a diverse playlist base
- **Artist Management**: Add and remove artists from your selection with ease
- **Visual Feedback**: See artist images and names in an organized list

### 🎵 Genre Selection
- **Multi-Select Dropdown**: Choose from 100+ Spotify genres
- **Genre Management**: Add or remove genres from your selection
- **Visual Tags**: Selected genres displayed as stylish green tags
- **Smart Display**: Shows "No genres selected" message when empty

### 🎼 Song Selection & Curation
- **Track Search**: Search for specific songs to add to your selection
- **Favorites Management**: Build a personalized selection of favorite tracks
- **Track Details**: View track names, artists, and album artwork
- **Easy Management**: Add and remove tracks from your selection

### 📋 Playlist Creation
- **Spotify Integration**: Create playlists directly in your Spotify account
- **Custom Names**: Give your playlists meaningful names
- **Public Playlists**: Playlists are created as public by default
- **Direct Access**: Get a link to your newly created playlist

### 📊 User Dashboard
- **User Stats**: View your Spotify profile information
- **Playlist History**: Access your created playlists
- **User Profile**: See your Spotify account details

## Technology Stack

- **Framework**: Next.js 16.0.8
- **UI Library**: React 19.2.1
- **Styling**: Tailwind CSS 4, Custom CSS
- **Authentication**: Spotify OAuth 2.0
- **API**: Spotify Web API
- **Build Tool**: Next.js built-in

## Project Structure

```
spotify-taste-mixer/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── refresh-token/       # Token refresh endpoint
│   │   │   └── spotify-token/       # Spotify authentication endpoint
│   │   ├── auth/
│   │   │   └── callback/            # OAuth callback handler
│   │   ├── dashboard/               # Main dashboard page
│   │   ├── playlist-creator/        # Playlist creation page
│   │   ├── layout.js                # Root layout
│   │   ├── page.js                  # Home page
│   │   └── globals.css              # Global styles
│   ├── components/
│   │   ├── ArtistWidget.jsx         # Artist search & selection
│   │   ├── ArtistWidget.css
│   │   ├── GenreWidget.jsx          # Genre multi-select
│   │   ├── GenreWidget.css
│   │   ├── SongSelectionWidget.jsx  # Track search & selection
│   │   ├── SongSelectionWidget.css
│   │   ├── Header.jsx               # Navigation header
│   │   ├── Header.css
│   │   ├── UserStats.jsx            # User profile display
│   │   ├── UserStats.css
│   │   ├── UserPlaylists.jsx        # Playlist listing
│   │   ├── UserPlaylists.css
│   │   ├── PlaylistStatsWidget.jsx  # Playlist statistics
│   │   ├── PlaylistStatsWidget.css
│   │   ├── ErrorNotification.jsx    # Error display
│   │   ├── ErrorNotification.css
│   │   ├── ErrorManager.jsx         # Error state management
│   │   ├── SearchResultCard.jsx     # Search result card
│   │   ├── SearchResultCard.css
│   │   ├── LoginSpinner.jsx         # Loading spinner
│   │   └── LoginSpinner.css
│   └── lib/
│       ├── auth.js                  # Authentication utilities
│       └── spotify.js               # Spotify API helpers
├── public/                           # Static assets
├── package.json                      # Project dependencies
├── next.config.mjs                   # Next.js configuration
├── postcss.config.mjs                # PostCSS configuration
├── eslint.config.mjs                 # ESLint configuration
└── README.md                         # This file
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Spotify Developer Account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd spotify-taste-mixer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the project root:
   ```
   NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   SPOTIFY_REDIRECT_URI=http://localhost:3000/auth/callback
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## Components Guide

### ArtistWidget
Allows users to search and select multiple artists. Features real-time search with debouncing and displays selected artists with remove functionality.

### GenreWidget
Provides a multi-select dropdown with 100+ Spotify genres. Selected genres are displayed as green tags with individual remove buttons.

### SongSelectionWidget
Enables searching for tracks and building a favorites list. Includes playlist creation functionality directly from selected tracks.

### UserStats
Displays authenticated user's profile information from Spotify.

### UserPlaylists
Shows a list of user's Spotify playlists with stats and direct links.

### ErrorManager & ErrorNotification
Handles application errors with user-friendly notifications.

## API Integration

The application uses the Spotify Web API for:
- User Authentication (OAuth 2.0)
- Artist Search
- Genre Information
- Track Search
- Playlist Creation
- User Profile Data
- Playlist Management

## Key Features Implementation

### Authentication Flow
1. User clicks "Login with Spotify"
2. Redirected to Spotify authorization page
3. User grants permissions
4. Redirected back to callback handler
5. Access token stored in local storage
6. User can now access Spotify features

### Playlist Creation
1. User selects artists, genres, and tracks
2. Clicks "Create Playlist"
3. Application:
   - Creates a new playlist in user's Spotify account
   - Adds selected tracks to the playlist
   - Generates a link to the playlist
4. User can view the playlist directly on Spotify

## Styling

The application uses:
- **Custom CSS** for component-specific styles
- **Tailwind CSS** for utility-first styling
- **Dark Theme**: Spotify-inspired dark color scheme
- **Responsive Design**: Mobile and desktop compatible

## Error Handling

The application includes comprehensive error handling:
- Network error handling for API calls
- User-friendly error messages
- Error notification component
- Graceful degradation when features unavailable

## Performance Optimizations

- **Debounced Search**: Search input debouncing to reduce API calls
- **Code Splitting**: Next.js automatic code splitting
- **Image Optimization**: Next.js Image component usage
- **Local Storage**: Caching user selections

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

Contributions are welcome! Please follow the existing code style and component structure.

## License

This project is private and intended for educational purposes.

## Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api) for the music data
- [Next.js](https://nextjs.org/) for the framework
- [React](https://react.dev/) for the UI library
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities

## Support

For issues or questions, please check the documentation or review the API integration in the `/lib` directory.

---

**Version**: 0.1.0  
**Last Updated**: December 2024
