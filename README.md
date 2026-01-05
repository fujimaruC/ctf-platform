# CTF Learning Platform - Frontend UI

A professional, responsive Capture The Flag learning platform inspired by PicoCTF with a modern dark theme. This is a pure frontend implementation with no backend dependencies required.

## 🎯 Features

### Core Functionality

- **Challenge Browsing**: Browse 18+ sample CTF challenges with detailed information
- **Filtering System**: Filter by difficulty level, category, solved status, and bookmarks
- **Search**: Real-time search across challenge titles, categories, and descriptions
- **Challenge Details Modal**: View full challenge descriptions, hints, files, and submit flags
- **Hint System**: Unlock hints with point penalties for progressive difficulty
- **Flag Submission**: Submit and validate flags with attempt tracking
- **Bookmarking**: Save challenges for later review
- **Progress Tracking**: Track solved challenges and earned points

### Design Features

- **Dark Theme**: Professional GitHub-inspired dark color scheme
- **Responsive Design**:
  - Desktop (3-column layout)
  - Tablet (2-column layout)
  - Mobile (1-column with drawer menu)
- **Accessibility**: WCAG compliant with keyboard navigation, ARIA labels, and screen reader support
- **Smooth Animations**: Polished micro-interactions and transitions
- **Mobile-First**: Touch-optimized interface for all devices

## 🛠️ Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Grid, Flexbox, custom properties, animations
- **Vanilla JavaScript**: No frameworks or dependencies
- **Font Awesome 6**: Icon library
- **LocalStorage**: Demo data persistence

## 📁 Project Structure

```
ctf-platform/
├── index.html              # Main HTML file
├── css/
│   ├── main.css           # Core styles and variables
│   ├── challenges.css     # Challenge card and grid styles
│   ├── modal.css          # Modal and flag submission styles
│   └── responsive.css     # Media queries and responsive design
├── js/
│   ├── app.js             # Main application logic
│   ├── challenges.js      # Challenge utilities
│   ├── modal.js           # Modal interactions
│   └── router.js          # Client-side routing
└── data/
    └── challenges.json    # Sample challenge data
```

## 🚀 Getting Started

### Quick Start

1. **Open in Browser**

   ```bash
   # Simply open the index.html file in a web browser
   # Or use a local server for better experience:
   python -m http.server 8000
   # Then navigate to http://localhost:8000
   ```

2. **No Installation Required**
   - No build process
   - No dependencies to install
   - Works immediately in any modern browser

### Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## 📚 Challenge Data

The platform includes 18 sample challenges across all major CTF categories:

### Categories

- **Cryptography** (4 challenges): Caesar cipher, ROT13, XOR encryption
- **Web Exploitation** (3 challenges): SQL injection, cookies, path traversal
- **Forensics** (3 challenges): Metadata extraction, file carving, memory analysis
- **Binary Exploitation** (3 challenges): Buffer overflow, format strings, ROP
- **Reverse Engineering** (3 challenges): Simple crackme, decompilation, keygen
- **General Skills** (3 challenges): Platform tutorial, command line, Python scripting

## 🎮 Usage Guide

### Filtering & Search

1. **Search**: Type in the search box to find challenges by name or category
2. **Difficulty Filter**: Select Easy, Medium, or Hard
3. **Category Filter**: Choose specific challenge category
4. **Hide Solved**: Show only unsolved challenges
5. **Show Bookmarked**: Show only bookmarked challenges
6. **Clear All**: Reset all filters at once

### Challenge Detail Modal

1. **Click a card** to open the challenge details
2. **Read description** and requirements
3. **Download files** if provided
4. **Unlock hints** progressively (each has point penalty)
5. **Submit flag** in the flag input (format: `flag{...}`)
6. **Track attempts**: You have 3 attempts per challenge
7. **Bookmark** challenges for later reference

### Flag Submission

- Format: `flag{your_flag_here}` (without the braces)
- 3 attempts per challenge
- Hints unlock with point penalties
- Success shows earned points and post-solve resources

### Navigation

- **Primary Nav**: Learn, Practice, Compete, Classrooms
- **Secondary Nav**: Challenges, Playlists, Assignments
- **Responsive Menu**: Mobile hamburger menu on small screens

## 🎨 Color Palette

### Dark Theme

- **Background**: `#0d1117` (primary), `#161b22` (secondary)
- **Accent**: `#58a6ff` (blue)
- **Success**: `#3fb950` (green)
- **Warning**: `#d29922` (orange)
- **Danger**: `#f85149` (red)

### Difficulty Colors

- **Easy**: `#7ee787` (green)
- **Medium**: `#d29922` (orange)
- **Hard**: `#f85149` (red)

### Category Colors

- **Cryptography**: `#bb86fc` (purple)
- **Web**: `#03dac6` (cyan)
- **Forensics**: `#69f0ae` (green)
- **Binary**: `#ffd966` (yellow)
- **Reverse**: `#ff6e6e` (red)
- **General**: `#64b5f6` (blue)

## 💾 Data Persistence

The platform uses **LocalStorage** to persist:

- Solved challenges
- Bookmarked challenges
- Filter preferences
- User state

All data is stored locally in the browser with no backend required.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px

  - 1-column layout
  - Drawer sidebar
  - Optimized touch interactions

- **Tablet**: 768px - 1199px

  - 2-column layout
  - Visible sidebar
  - Full features

- **Desktop**: ≥ 1200px
  - 3-column layout
  - Fixed sidebar
  - Maximum width container

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation (Tab, Enter, ESC)
- Focus indicators (blue outline)
- Alt text for icons
- Screen reader friendly
- Color contrast > 4.5:1
- Skip to main content link

## 🎬 Key Interactions

### Modal Animations

- Fade in/out on open/close
- Scale animation for entrance
- Slide transitions for content

### Hover Effects

- Challenge cards lift on hover
- Color transitions on buttons
- Border highlights on focus

### Feedback

- Toast notifications for actions
- Attempt counter updates
- Real-time search results
- Loading states

## 🔧 Customization

### Adding More Challenges

Edit `data/challenges.json` and add new challenge objects:

```json
{
  "id": "category_###",
  "title": "Challenge Name",
  "category": "Category Name",
  "difficulty": "easy|medium|hard",
  "points": 100,
  "description": "Challenge description...",
  "flag": "flag{actual_flag}",
  "hints": [
    {
      "text": "Hint text...",
      "penalty": 10
    }
  ],
  "files": [
    {
      "name": "filename",
      "url": "#",
      "size": "1.2 KB"
    }
  ],
  "solves": 1234,
  "successRate": 75,
  "avgTime": 10,
  "solved": false,
  "bookmarked": false
}
```

### Changing Colors

Modify CSS variables in `css/main.css`:

```css
:root {
  --bg-primary: #0d1117;
  --accent-primary: #58a6ff;
  /* ... more colors */
}
```

### Adding Categories

1. Add new category filter button in HTML
2. Add category color in `css/challenges.css`
3. Add challenges with new category in JSON

## 📊 Performance

- No external API calls
- Optimized CSS with containment
- Efficient DOM manipulation
- Debounced search input
- Smooth animations using transform/opacity
- Minimal repaints and reflows

## 🐛 Browser Compatibility

| Browser       | Support | Notes        |
| ------------- | ------- | ------------ |
| Chrome 90+    | ✅      | Full support |
| Firefox 88+   | ✅      | Full support |
| Safari 14+    | ✅      | Full support |
| Edge 90+      | ✅      | Full support |
| Mobile Safari | ✅      | Full support |
| Chrome Mobile | ✅      | Full support |

## 📝 Code Quality

- Clean, readable code with comments
- Consistent naming conventions
- Modular JavaScript structure
- Valid HTML5 and CSS3
- No console errors
- Proper error handling

## 🎓 Learning Resources

The challenge data includes:

- Real-world CTF problem examples
- Hints with progressive difficulty
- Real solve counts and success rates
- Time estimates for each challenge
- File downloads and resources

## 🚧 Future Enhancements

Potential additions (not in current scope):

- Backend API integration
- User authentication
- Progress tracking across devices
- Leaderboards
- Challenge playlists
- Custom challenge creation
- Live CTF competitions
- Writeup submissions
- Discussion forums

## 📄 License

This project is provided as-is for educational purposes.

## 🤝 Feedback

This is a demonstration frontend. All functionality is client-side with demo data in LocalStorage.

---

**Version**: 1.0  
**Last Updated**: January 2026  
**Status**: ✅ Production Ready
