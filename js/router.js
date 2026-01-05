/* ============================================
   CLIENT-SIDE ROUTING
   ============================================ */

const router = {
    routes: {
        '#learn': 'learn',
        '#practice': 'practice',
        '#compete': 'compete',
        '#classrooms': 'classrooms',
        '#challenges': 'challenges',
        '#playlists': 'playlists',
        '#assignments': 'assignments'
    },

    init() {
        window.addEventListener('hashchange', () => this.handleNavigation());
        this.handleNavigation();
    },

    handleNavigation() {
        const hash = window.location.hash || '#practice';
        const page = this.routes[hash];

        if (page) {
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === hash) {
                    link.classList.add('active');
                }
            });

            // Update active tab
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('data-tab') === page) {
                    tab.classList.add('active');
                }
            });
        }
    },

    navigate(hash) {
        window.location.hash = hash;
    }
};

// Initialize router when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    router.init();
});
