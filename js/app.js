/* ============================================
   MAIN APP LOGIC - CTF PLATFORM
   ============================================ */

// Global app state
const app = {
    challenges: [],
    filteredChallenges: [],
    currentPage: 1,
    itemsPerPage: 12,
    filters: {
        search: '',
        difficulty: 'all',
        category: 'all',
        hideSolved: false,
        showBookmarked: false,
        showAssigned: false
    },
    currentChallengeId: null,
    init() {
        this.loadChallenges();
        this.setupEventListeners();
        this.loadState();
        this.render();
    },
    loadChallenges() {
        // Load challenges from JSON
        fetch('data/challenges.json')
            .then(response => response.json())
            .then(data => {
                this.challenges = data.challenges;
                this.applyFilters();
            })
            .catch(error => {
                console.error('Failed to load challenges:', error);
                this.showNotification('Failed to load challenges', 'error');
            });
    },
    setupEventListeners() {
        // Search input
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', (e) => {
            this.filters.search = e.target.value.toLowerCase();
            this.currentPage = 1;
            this.applyFilters();
        });

        // Checkboxes
        document.getElementById('hide-solved').addEventListener('change', (e) => {
            this.filters.hideSolved = e.target.checked;
            this.currentPage = 1;
            this.applyFilters();
        });

        document.getElementById('show-bookmarked').addEventListener('change', (e) => {
            this.filters.showBookmarked = e.target.checked;
            this.currentPage = 1;
            this.applyFilters();
        });

        document.getElementById('show-assigned').addEventListener('change', (e) => {
            this.filters.showAssigned = e.target.checked;
            this.currentPage = 1;
            this.applyFilters();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                const value = btn.getAttribute('data-value');
                
                // Remove active class from siblings
                btn.parentElement.querySelectorAll('.filter-btn').forEach(b => {
                    b.classList.remove('active');
                });
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Update filter
                this.filters[filter] = value;
                this.currentPage = 1;
                this.applyFilters();
            });
        });

        // Clear filters button
        document.querySelector('.clear-filters').addEventListener('click', () => {
            this.clearAllFilters();
        });

        // Mobile menu toggle
        document.querySelector('.mobile-menu-toggle').addEventListener('click', () => {
            document.querySelector('.filter-sidebar').classList.toggle('active');
        });

        // Sidebar close button (mobile)
        document.querySelector('.sidebar-close').addEventListener('click', () => {
            document.querySelector('.filter-sidebar').classList.remove('active');
        });

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Secondary nav tabs
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });

        // Close modal on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.closeModal();
            }
        });
    },
    applyFilters() {
        let filtered = [...this.challenges];

        // Search filter
        if (this.filters.search) {
            filtered = filtered.filter(c => 
                c.title.toLowerCase().includes(this.filters.search) ||
                c.category.toLowerCase().includes(this.filters.search) ||
                c.description.toLowerCase().includes(this.filters.search)
            );
        }

        // Difficulty filter
        if (this.filters.difficulty !== 'all') {
            filtered = filtered.filter(c => c.difficulty === this.filters.difficulty);
        }

        // Category filter
        if (this.filters.category !== 'all') {
            filtered = filtered.filter(c => c.category === this.filters.category);
        }

        // Hide solved filter
        if (this.filters.hideSolved) {
            filtered = filtered.filter(c => !c.solved);
        }

        // Show bookmarked filter
        if (this.filters.showBookmarked) {
            filtered = filtered.filter(c => c.bookmarked);
        }

        // Show assigned filter (demo - no assigned challenges for now)
        if (this.filters.showAssigned) {
            filtered = filtered.filter(c => c.assigned);
        }

        this.filteredChallenges = filtered;
        this.currentPage = 1;
        this.render();
    },
    clearAllFilters() {
        this.filters = {
            search: '',
            difficulty: 'all',
            category: 'all',
            hideSolved: false,
            showBookmarked: false,
            showAssigned: false
        };
        
        // Reset UI
        document.getElementById('search-input').value = '';
        document.getElementById('hide-solved').checked = false;
        document.getElementById('show-bookmarked').checked = false;
        document.getElementById('show-assigned').checked = false;
        
        // Reset filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            const value = btn.getAttribute('data-value');
            if (value === 'all') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        this.currentPage = 1;
        this.applyFilters();
        this.showNotification('Filters cleared', 'info');
    },
    render() {
        this.renderChallenges();
        this.renderPagination();
        this.saveState();
    },
    renderChallenges() {
        const grid = document.getElementById('challenges-grid');
        const noResults = document.getElementById('no-results');
        
        if (this.filteredChallenges.length === 0) {
            grid.style.display = 'none';
            noResults.style.display = 'flex';
            return;
        }

        grid.style.display = 'grid';
        noResults.style.display = 'none';

        // Calculate pagination
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const paginatedChallenges = this.filteredChallenges.slice(start, end);

        // Render challenge cards
        grid.innerHTML = paginatedChallenges.map(challenge => this.createChallengeCard(challenge)).join('');

        // Add event listeners to cards
        document.querySelectorAll('.challenge-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                const challenge = this.challenges.find(c => c.id === id);
                modal.openModal(challenge);
            });
        });

        // Add event listeners to bookmark buttons
        document.querySelectorAll('.btn-bookmark').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = btn.closest('.challenge-card');
                const id = card.getAttribute('data-id');
                this.toggleBookmark(id);
                btn.classList.toggle('bookmarked');
            });
        });
    },
    createChallengeCard(challenge) {
        const solvedClass = challenge.solved ? 'solved' : '';
        const bookmarkedClass = challenge.bookmarked ? 'bookmarked' : '';
        
        return `
            <div class="challenge-card ${solvedClass}" data-id="${challenge.id}" role="button" tabindex="0" aria-label="${challenge.title}">
                <div class="card-header">
                    <span class="category-badge ${challenge.category.replace(/\s+/g, '\\ ')}">${challenge.category}</span>
                    <span class="difficulty-badge ${challenge.difficulty}">${challenge.difficulty}</span>
                </div>
                
                <h3 class="challenge-title">${challenge.title}</h3>
                
                ${challenge.solved ? '<div class="solved-indicator"><i class="fas fa-check-circle"></i><span>Solved</span></div>' : ''}
                
                <div class="challenge-stats">
                    <div class="stat-item">
                        <i class="fas fa-users"></i>
                        <span>${challenge.solves.toLocaleString()} solves</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-percent"></i>
                        <span>${challenge.successRate}% success</span>
                    </div>
                </div>
                
                <div class="card-actions">
                    <button class="btn-bookmark ${bookmarkedClass}" title="Bookmark this challenge" aria-label="Bookmark">
                        <i class="fas fa-bookmark"></i>
                    </button>
                </div>
            </div>
        `;
    },
    renderPagination() {
        const pagination = document.getElementById('pagination');
        const totalPages = Math.ceil(this.filteredChallenges.length / this.itemsPerPage);

        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let html = `
            <button class="page-btn" ${this.currentPage === 1 ? 'disabled' : ''} aria-label="Previous page">
                <i class="fas fa-chevron-left"></i>
            </button>
        `;

        // Show first page
        html += `<button class="page-btn ${this.currentPage === 1 ? 'active' : ''}">1</button>`;

        // Show middle pages
        let startPage = Math.max(2, this.currentPage - 1);
        let endPage = Math.min(totalPages - 1, this.currentPage + 1);

        if (startPage > 2) {
            html += `<span class="page-dots">...</span>`;
        }

        for (let i = startPage; i <= endPage; i++) {
            html += `<button class="page-btn ${this.currentPage === i ? 'active' : ''}">${i}</button>`;
        }

        if (endPage < totalPages - 1) {
            html += `<span class="page-dots">...</span>`;
        }

        // Show last page
        if (totalPages > 1) {
            html += `<button class="page-btn ${this.currentPage === totalPages ? 'active' : ''}">${totalPages}</button>`;
        }

        html += `
            <button class="page-btn" ${this.currentPage === totalPages ? 'disabled' : ''} aria-label="Next page">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;

        pagination.innerHTML = html;

        // Add event listeners to pagination buttons
        document.querySelectorAll('.page-btn').forEach((btn, idx) => {
            if (btn.textContent === '') return; // Skip prev/next buttons for now
            
            btn.addEventListener('click', () => {
                if (btn.textContent === '') return;
                const page = parseInt(btn.textContent);
                if (!isNaN(page)) {
                    this.currentPage = page;
                    this.render();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });

        // Previous button
        pagination.querySelector('.page-btn:first-child').addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });

        // Next button
        pagination.querySelector('.page-btn:last-child').addEventListener('click', () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    },
    toggleBookmark(challengeId) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (challenge) {
            challenge.bookmarked = !challenge.bookmarked;
            this.saveState();
            this.showNotification(
                challenge.bookmarked ? 'Added to bookmarks' : 'Removed from bookmarks',
                'info'
            );
        }
    },
    toggleSolved(challengeId) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (challenge) {
            challenge.solved = !challenge.solved;
            this.saveState();
            this.render();
        }
    },
    saveState() {
        // Save to localStorage for persistence
        const state = {
            challenges: this.challenges,
            filters: this.filters
        };
        localStorage.setItem('ctf-platform-state', JSON.stringify(state));
    },
    loadState() {
        // Load from localStorage
        const saved = localStorage.getItem('ctf-platform-state');
        if (saved) {
            try {
                const state = JSON.parse(saved);
                // Merge saved challenges data (bookmarks, solved status) with loaded challenges
                if (state.challenges && this.challenges.length > 0) {
                    state.challenges.forEach(savedChallenge => {
                        const challenge = this.challenges.find(c => c.id === savedChallenge.id);
                        if (challenge) {
                            challenge.bookmarked = savedChallenge.bookmarked;
                            challenge.solved = savedChallenge.solved;
                        }
                    });
                }
            } catch (error) {
                console.error('Failed to load saved state:', error);
            }
        }
    },
    showNotification(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.setAttribute('role', 'status');
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle'
        };

        toast.innerHTML = `
            <i class="${icons[type]}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        // Fade in
        setTimeout(() => toast.classList.add('show'), 10);

        // Fade out after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// Toast styles (added to DOM)
const toastStyles = `
.toast-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.toast {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-size: 14px;
    opacity: 0;
    transform: translateY(20px);
    transition: all var(--transition-base);
}

.toast.show {
    opacity: 1;
    transform: translateY(0);
}

.toast.success {
    border-left: 4px solid var(--success);
}

.toast.success i {
    color: var(--success);
}

.toast.error {
    border-left: 4px solid var(--danger);
}

.toast.error i {
    color: var(--danger);
}

.toast.info {
    border-left: 4px solid var(--info);
}

.toast.info i {
    color: var(--info);
}

@media (max-width: 767px) {
    .toast-container {
        left: 10px;
        right: 10px;
        bottom: 10px;
    }
    
    .toast {
        width: 100%;
    }
}
`;

// Inject toast styles
const styleSheet = document.createElement('style');
styleSheet.textContent = toastStyles;
document.head.appendChild(styleSheet);

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
