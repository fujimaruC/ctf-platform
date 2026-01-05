/* ============================================
   MODAL INTERACTIONS - CHALLENGE DETAILS
   ============================================ */

const modal = {
    currentChallenge: null,
    unlockedHints: [],
    attempts: 3,

    openModal(challenge) {
        this.currentChallenge = challenge;
        this.unlockedHints = [];
        this.attempts = 3;
        
        const modalElement = document.getElementById('challenge-modal');
        modalElement.classList.add('active');
        document.body.style.overflow = 'hidden';

        this.renderModal(challenge);
        this.setupModalListeners();

        // Announce to screen readers
        const title = document.getElementById('modal-title');
        if (title) {
            title.focus();
        }
    },

    closeModal() {
        const modalElement = document.getElementById('challenge-modal');
        modalElement.classList.remove('active');
        document.body.style.overflow = '';
        this.currentChallenge = null;
    },

    renderModal(challenge) {
        // Set title and badges
        document.getElementById('modal-title').textContent = challenge.title;
        
        const badges = document.getElementById('modal-badges');
        badges.innerHTML = `
            <span class="category-badge ${challenge.category.replace(/\s+/g, '\\ ')}">${challenge.category}</span>
            <span class="difficulty-badge ${challenge.difficulty}">${challenge.difficulty}</span>
            <span class="points-badge">${challenge.points} points</span>
        `;

        // Set body content
        const body = document.getElementById('modal-body');
        body.innerHTML = this.createModalContent(challenge);

        // Add event listeners after rendering
        this.setupContentListeners(challenge);
    },

    createModalContent(challenge) {
        const daysAgo = Math.floor(Math.random() * 30) + 1; // Random days for "last solved"
        
        return `
            <!-- Challenge Meta Bar -->
            <div class="challenge-meta">
                <div class="meta-item">
                    <i class="fas fa-users"></i>
                    <span>${challenge.solves.toLocaleString()} solves</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-percent"></i>
                    <span>${challenge.successRate}% success rate</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-clock"></i>
                    <span>Avg. ${challenge.avgTime} min</span>
                </div>
                <button class="bookmark-btn ${challenge.bookmarked ? 'bookmarked' : ''}" title="Bookmark this challenge">
                    <i class="fas fa-bookmark"></i>
                    <span>Bookmark</span>
                </button>
            </div>

            <!-- Description Section -->
            <div class="content-section">
                <h3><i class="fas fa-file-alt"></i> Description</h3>
                <div class="description-text">
                    ${challenge.description.split('\n').map(p => `<p>${this.escapeHtml(p)}</p>`).join('')}
                </div>
                ${challenge.encryptedMessage ? `
                    <div class="code-block">
                        <code>${this.escapeHtml(challenge.encryptedMessage)}</code>
                        <button class="copy-btn" title="Copy" aria-label="Copy to clipboard">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                ` : ''}
            </div>

            <!-- Files Section -->
            ${challenge.files && challenge.files.length > 0 ? `
                <div class="content-section">
                    <h3><i class="fas fa-download"></i> Downloads</h3>
                    <div class="file-list">
                        ${challenge.files.map(file => `
                            <a href="${file.url}" class="file-item" download title="Download ${file.name}">
                                <i class="fas fa-file"></i>
                                <span>${file.name}</span>
                                <span class="file-size">${file.size}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- Hints Section -->
            <div class="content-section">
                <h3><i class="fas fa-lightbulb"></i> Hints</h3>
                <div class="hints-container">
                    ${challenge.hints.map((hint, idx) => `
                        <div class="hint-item" data-hint-index="${idx}">
                            <div class="hint-header">
                                <span class="hint-label">Hint ${idx + 1}</span>
                                <button class="unlock-hint-btn" title="Unlock this hint (costs ${hint.penalty} points)">
                                    <i class="fas fa-lock"></i>
                                    <span>Unlock (-${hint.penalty} points)</span>
                                </button>
                            </div>
                            <div class="hint-content" style="display: none;">
                                ${this.escapeHtml(hint.text)}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Flag Submission -->
            <div class="content-section">
                <h3><i class="fas fa-flag"></i> Submit Flag</h3>
                <div class="flag-submission">
                    <div class="input-group">
                        <span class="input-prefix">flag{</span>
                        <input 
                            type="text" 
                            class="flag-input" 
                            placeholder="enter_flag_here"
                            spellcheck="false"
                            autocomplete="off"
                        >
                        <span class="input-suffix">}</span>
                    </div>
                    <button class="submit-btn">Submit</button>
                </div>
                
                <div class="submission-feedback">
                    <p class="attempts-remaining">
                        ⚠️ You have <span class="attempts-count">3</span> attempts remaining
                    </p>
                </div>
            </div>
        `;
    },

    setupContentListeners(challenge) {
        // Copy button in code block
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const code = btn.previousElementSibling.textContent;
                navigator.clipboard.writeText(code).then(() => {
                    const icon = btn.innerHTML;
                    btn.innerHTML = '<i class="fas fa-check"></i>';
                    btn.classList.add('copied');
                    setTimeout(() => {
                        btn.innerHTML = icon;
                        btn.classList.remove('copied');
                    }, 2000);
                    app.showNotification('Copied to clipboard!', 'success');
                }).catch(err => {
                    console.error('Failed to copy:', err);
                });
            });
        });

        // Bookmark button
        const bookmarkBtn = document.querySelector('.bookmark-btn');
        if (bookmarkBtn) {
            bookmarkBtn.addEventListener('click', () => {
                challenge.bookmarked = !challenge.bookmarked;
                bookmarkBtn.classList.toggle('bookmarked');
                app.saveState();
                app.showNotification(
                    challenge.bookmarked ? 'Added to bookmarks' : 'Removed from bookmarks',
                    'info'
                );
            });
        }

        // Unlock hints
        document.querySelectorAll('.unlock-hint-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const hintItem = btn.closest('.hint-item');
                const hintIndex = parseInt(hintItem.getAttribute('data-hint-index'));
                this.unlockHint(hintIndex, btn, challenge);
            });
        });

        // Submit button
        document.querySelector('.submit-btn').addEventListener('click', () => {
            this.submitFlag(challenge);
        });

        // Flag input - allow Enter key submission
        document.querySelector('.flag-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitFlag(challenge);
            }
        });

        // Close modal
        document.querySelector('.close-btn').addEventListener('click', () => {
            this.closeModal();
        });

        document.querySelector('.back-btn').addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal on overlay click
        document.getElementById('challenge-modal').addEventListener('click', (e) => {
            if (e.target.id === 'challenge-modal') {
                this.closeModal();
            }
        });
    },

    unlockHint(hintIndex, btn, challenge) {
        const hint = challenge.hints[hintIndex];
        const hintItem = btn.closest('.hint-item');
        const hintContent = hintItem.querySelector('.hint-content');
        const hintHeader = hintItem.querySelector('.hint-header');

        // Remove unlock button
        btn.remove();

        // Show content
        hintContent.style.display = 'block';
        hintItem.classList.add('unlocked');

        // Add unlock indicator
        hintHeader.innerHTML += `<i class="fas fa-unlock"></i>`;

        // Deduct points (demo)
        const penalty = hint.penalty;
        app.showNotification(`Unlocked hint! -${penalty} points`, 'info');

        this.unlockedHints.push(hintIndex);
    },

    submitFlag(challenge) {
        const input = document.querySelector('.flag-input');
        const flagText = input.value.trim();
        
        if (!flagText) {
            app.showNotification('Please enter a flag', 'error');
            return;
        }

        const fullFlag = `flag{${flagText}}`;
        const submitBtn = document.querySelector('.submit-btn');
        const feedback = document.querySelector('.submission-feedback');

        // Disable button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

        // Simulate submission delay
        setTimeout(() => {
            if (fullFlag.toLowerCase() === challenge.flag.toLowerCase()) {
                // Correct flag
                submitBtn.disabled = true;
                input.disabled = true;
                
                // Show success
                const successMsg = document.createElement('div');
                successMsg.className = 'feedback-message success';
                successMsg.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <strong>Correct!</strong> You earned ${challenge.points} points!
                    </div>
                `;
                feedback.appendChild(successMsg);

                // Mark as solved
                challenge.solved = true;
                app.toggleSolved(challenge.id);
                app.showNotification(`Correct! +${challenge.points} points`, 'success');

                // Show post-solve section after delay
                setTimeout(() => {
                    this.showPostSolveContent(challenge);
                }, 1500);
            } else {
                // Wrong flag
                this.attempts--;
                
                if (this.attempts <= 0) {
                    // Out of attempts
                    submitBtn.disabled = true;
                    input.disabled = true;
                    
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'feedback-message error';
                    errorMsg.innerHTML = `
                        <i class="fas fa-times-circle"></i>
                        <div>
                            <strong>Out of attempts!</strong> The correct flag is: <code>${challenge.flag}</code>
                        </div>
                    `;
                    feedback.appendChild(errorMsg);
                    
                    app.showNotification('Out of attempts', 'error');
                } else {
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'feedback-message error';
                    errorMsg.innerHTML = `
                        <i class="fas fa-times-circle"></i>
                        <div>
                            <strong>Incorrect.</strong> Try again!
                        </div>
                    `;
                    feedback.appendChild(errorMsg);
                    
                    // Remove previous error message
                    const prevErrors = feedback.querySelectorAll('.feedback-message.error');
                    if (prevErrors.length > 1) {
                        prevErrors[0].remove();
                    }
                    
                    // Update attempts
                    document.querySelector('.attempts-count').textContent = this.attempts;
                    
                    // Clear input
                    input.value = '';
                    input.focus();
                    
                    app.showNotification('Incorrect flag. Try again!', 'error');
                }
                
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Submit';
            }
        }, 1000);
    },

    showPostSolveContent(challenge) {
        const body = document.getElementById('modal-body');
        
        // Add post-solve section
        const postSolveSection = document.createElement('div');
        postSolveSection.className = 'content-section';
        postSolveSection.id = 'post-solve-section';
        postSolveSection.innerHTML = `
            <h3><i class="fas fa-book"></i> Learn More</h3>
            <div class="resource-links">
                <a href="#" class="resource-link">
                    <i class="fas fa-file-alt"></i>
                    <span>Read Community Writeup</span>
                </a>
                <a href="#" class="resource-link">
                    <i class="fas fa-external-link-alt"></i>
                    <span>Related Tutorial</span>
                </a>
            </div>

            <h3 style="margin-top: 2rem;"><i class="fas fa-arrow-right"></i> Next Challenge</h3>
            <div class="next-challenge-card">
                <span class="category-badge Cryptography">Cryptography</span>
                <h4>ROT13 Mystery</h4>
                <span class="points">150 points • Easy</span>
                <button class="btn-primary" style="margin-top: 0.5rem;">Start Challenge</button>
            </div>
        `;
        
        body.appendChild(postSolveSection);
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};
