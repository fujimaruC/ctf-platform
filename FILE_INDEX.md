# CTF Platform - File Index

## 📂 Project Structure Overview

```
ctf-platform/                  (Root directory)
├── index.html                 (34 KB) - Main HTML file
├── README.md                  (8.8 KB) - Full documentation
├── QUICKSTART.md              (5.2 KB) - Quick setup guide
├── FEATURES.md                (8.3 KB) - Feature checklist
├── PROJECT_SUMMARY.md         (7.2 KB) - Project overview
├── start.sh                   (818 B) - Start script
│
├── css/                       (Stylesheets)
│   ├── main.css              (15.2 KB) - Core styles & variables
│   ├── challenges.css        (6.8 KB) - Challenge grid & cards
│   ├── modal.css             (12.1 KB) - Modal & interactions
│   └── responsive.css        (8.4 KB) - Mobile responsive design
│   └── TOTAL CSS: ~43 KB
│
├── js/                        (JavaScript modules)
│   ├── app.js                (17.0 KB) - Main application logic
│   ├── modal.js              (15.4 KB) - Modal interactions
│   ├── challenges.js         (1.2 KB) - Utility functions
│   └── router.js             (1.5 KB) - Client-side routing
│   └── TOTAL JS: ~35 KB
│
└── data/                      (Application data)
    └── challenges.json       (18.0 KB) - 18 sample challenges
```

## 📄 File Descriptions

### Root Files

#### `index.html` (34 KB)

- **Purpose**: Main HTML file with complete structure
- **Contains**:
  - Navigation bars (top + secondary)
  - Filter sidebar
  - Challenge grid
  - Challenge detail modal
  - Toast notification container
  - All semantic markup with ARIA labels
- **Lines**: 212
- **External Dependencies**: Font Awesome 6.4.0 (CDN)

#### `README.md` (8.8 KB)

- **Purpose**: Comprehensive documentation
- **Includes**:
  - Feature list
  - Technology stack
  - Getting started guide
  - Browser support
  - Customization instructions
  - Accessibility info
  - Performance notes

#### `QUICKSTART.md` (5.2 KB)

- **Purpose**: Fast setup guide (5 minutes)
- **Includes**:
  - Multiple setup options (Python, Node, PHP, etc.)
  - Demo challenge solutions
  - Feature exploration guide
  - Troubleshooting
  - Keyboard shortcuts

#### `FEATURES.md` (8.3 KB)

- **Purpose**: Complete feature checklist
- **Includes**:
  - 100+ items with checkmarks
  - All implemented features
  - Design specifications
  - Bonus features
  - Statistics

#### `PROJECT_SUMMARY.md` (7.2 KB)

- **Purpose**: High-level project overview
- **Includes**:
  - Deliverables list
  - Statistics
  - Design quality
  - Quick start
  - Key highlights
  - Next steps

#### `start.sh` (818 B)

- **Purpose**: Quick start shell script
- **Does**: Starts Python HTTP server on port 8000
- **Usage**: `chmod +x start.sh && ./start.sh`

### CSS Files

#### `css/main.css` (15.2 KB)

**Core styling and variables**

- CSS Custom Properties (20+ color variables)
- Spacing system (8px grid)
- Typography styles
- Button styles
- Navigation styling
- Sidebar styling
- Utility classes
- Global settings

**Key Features**:

- Dark theme (#0d1117 base)
- Professional color palette
- Consistent spacing
- Border radius system
- Transition definitions
- Z-index management

#### `css/challenges.css` (6.8 KB)

**Challenge-specific styling**

- Challenge grid layout
- Challenge card styles
- Category badges (6 colors)
- Difficulty badges (3 colors)
- Points badges
- Card states (default, solved, locked)
- Pagination styling
- Hover effects

**Includes**:

- Card header styling
- Challenge stats
- Solved indicator
- Bookmark button
- Category color mapping

#### `css/modal.css` (12.1 KB)

**Modal and flag submission styling**

- Modal overlay and container
- Modal header (sticky)
- Modal body (scrollable)
- Challenge metadata bar
- Content sections
- Code blocks with copy button
- File list styling
- Hint system styling
- Flag input styling
- Submit button
- Feedback messages
- Post-solve content
- Animations and transitions

**Includes**:

- Backdrop blur effect
- Smooth animations
- Input focus states
- Button states
- Error/success messages

#### `css/responsive.css` (8.4 KB)

**Responsive design and breakpoints**

- Tablet layout (768-1199px)
  - 2-column grid
  - Sidebar adjustments
  - Modal resizing
- Mobile layout (<768px)
  - 1-column grid
  - Drawer sidebar
  - Responsive navigation
  - Touch optimizations
- Small mobile (<480px)
  - Optimized typography
  - Condensed layouts
  - Touch-friendly sizes
- Landscape orientation
- Accessibility modes (reduced motion, high contrast)
- Print styles

### JavaScript Files

#### `js/app.js` (17.0 KB)

**Main application logic**

- Global `app` object
- Challenge loading from JSON
- Filter system
  - Search filtering
  - Difficulty filtering
  - Category filtering
  - Solved/bookmarked filtering
  - Multi-filter support
- Pagination (12 items per page)
- Challenge rendering
- Event listeners setup
- Bookmark toggle
- LocalStorage persistence
- Toast notifications
- UI state management

**Key Functions**:

- `app.init()` - Initialize app
- `app.loadChallenges()` - Fetch and load challenges
- `app.applyFilters()` - Apply all active filters
- `app.renderChallenges()` - Render challenge grid
- `app.renderPagination()` - Render pagination
- `app.clearAllFilters()` - Reset all filters
- `app.showNotification()` - Toast notifications

#### `js/modal.js` (15.4 KB)

**Modal and flag submission logic**

- Modal open/close
- Challenge detail rendering
- Hint unlocking system
- Flag submission
  - Flag validation
  - Attempt tracking (3 attempts)
  - Success/error messages
- Copy to clipboard
- Bookmark from modal
- Post-solve content
- Event listener setup
- HTML escaping

**Key Functions**:

- `modal.openModal()` - Open challenge details
- `modal.closeModal()` - Close modal
- `modal.renderModal()` - Render modal content
- `modal.unlockHint()` - Unlock a hint
- `modal.submitFlag()` - Submit and validate flag
- `modal.showPostSolveContent()` - Show post-solve section

#### `js/challenges.js` (1.2 KB)

**Challenge utility functions**

- `getChallengesByCategory()`
- `getChallengesByDifficulty()`
- `getSolvedChallenges()`
- `getBookmarkedChallenges()`
- `calculateStats()`

#### `js/router.js` (1.5 KB)

**Client-side routing**

- Route definitions
- Navigation handling
- Active link management
- Tab switching
- Hash-based routing

### Data Files

#### `data/challenges.json` (18.0 KB)

**Sample challenge data**

- 18 challenges total
- 6 categories:
  - Cryptography (4)
  - Web Exploitation (3)
  - Forensics (3)
  - Binary Exploitation (3)
  - Reverse Engineering (3)
  - General Skills (3)
- All difficulties: Easy, Medium, Hard
- Challenge structure:
  - ID, title, category, difficulty
  - Points, description, flag
  - Hints (2-3 per challenge)
  - Files (where applicable)
  - Statistics (solves, success rate, avg time)
  - State (solved, bookmarked)

## 📊 File Statistics

| Category      | Files  | Total Size  | Lines      |
| ------------- | ------ | ----------- | ---------- |
| HTML          | 1      | 34 KB       | 212        |
| CSS           | 4      | 43 KB       | 2,450+     |
| JavaScript    | 4      | 35 KB       | 900+       |
| JSON          | 1      | 18 KB       | 585        |
| Documentation | 5      | 38 KB       | 1,000+     |
| Scripts       | 1      | 0.8 KB      | 30         |
| **TOTAL**     | **16** | **168+ KB** | **5,000+** |

## 🔗 File Relationships

```
index.html
├── imports: css/main.css
├── imports: css/challenges.css
├── imports: css/modal.css
├── imports: css/responsive.css
├── imports: Font Awesome (CDN)
├── imports: js/app.js
├── imports: js/challenges.js
├── imports: js/modal.js
└── imports: js/router.js

js/app.js
├── fetches: data/challenges.json
├── calls: modal.openModal()
├── uses: localStorage API
└── renders: challenges grid

js/modal.js
├── uses: challenge data from app.js
├── uses: Clipboard API
└── calls: app.showNotification()

js/router.js
├── updates: navigation state
└── uses: hash navigation
```

## 🎯 Usage by Context

### For Quick Start

1. Read: `QUICKSTART.md`
2. Run: `start.sh` or `python3 -m http.server 8000`
3. Open: `http://localhost:8000`

### For Understanding Features

1. Read: `FEATURES.md`
2. Read: `README.md`
3. Review: `index.html` structure
4. Check: `css/` files for styling

### For Development

1. Start: `js/app.js` (main logic)
2. Check: `data/challenges.json` (data format)
3. Review: `js/modal.js` (interactions)
4. Customize: `css/main.css` (colors/theme)

### For Deployment

1. Copy: entire `ctf-platform/` directory
2. Serve: with any static server
3. No installation needed
4. No build process required

## 🔄 Data Flow

```
Page Load
├── DOMContentLoaded event
├── app.init()
├── fetch challenges.json
├── Load saved state (localStorage)
├── Render challenge grid
└── Setup event listeners

User Interaction
├── Click card → modal.openModal()
├── Search input → app.applyFilters()
├── Click filter → app.applyFilters()
├── Submit flag → modal.submitFlag()
├── Unlock hint → modal.unlockHint()
└── Bookmark → app.toggleBookmark() → localStorage.save()
```

## 💾 Storage

### LocalStorage Keys

- `ctf-platform-state` - Stores:
  - All challenges with updated state
  - Filter preferences
  - Bookmarked challenges
  - Solved challenges

### No External API Calls

- All data is local
- No backend required
- No authentication needed
- No analytics tracking

## 🎨 Asset Dependencies

### External Resources

- **Font Awesome 6.4.0**: Icon library (CDN)
- **Google Fonts**: (Optional, using system fonts)
- **CDN Source**: https://cdnjs.cloudflare.com/

### Internal Assets

- No images
- No additional fonts
- No external libraries
- Pure HTML/CSS/JS

## 📝 Code Metrics

**Maintainability**:

- Modular structure
- Clear naming conventions
- Comprehensive comments
- DRY principles
- Proper error handling

**Performance**:

- No render blocking
- Efficient selectors
- Optimized animations
- Minimal repaints
- Small bundle size

**Accessibility**:

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus management
- Screen reader support

---

**Last Updated**: January 5, 2026
**Version**: 1.0
**Status**: Complete & Production Ready
