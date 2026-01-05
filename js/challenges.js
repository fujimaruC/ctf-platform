/* ============================================
   CHALLENGES DATA & RENDERING
   ============================================ */

// This file contains challenge-related utilities
// Main logic is in app.js

const challengeUtils = {
    getChallengesByCategory(challenges, category) {
        if (category === 'all') return challenges;
        return challenges.filter(c => c.category === category);
    },

    getChallengesByDifficulty(challenges, difficulty) {
        if (difficulty === 'all') return challenges;
        return challenges.filter(c => c.difficulty === difficulty);
    },

    getSolvedChallenges(challenges) {
        return challenges.filter(c => c.solved);
    },

    getBookmarkedChallenges(challenges) {
        return challenges.filter(c => c.bookmarked);
    },

    calculateStats(challenges) {
        return {
            total: challenges.length,
            solved: challenges.filter(c => c.solved).length,
            bookmarked: challenges.filter(c => c.bookmarked).length,
            points: challenges
                .filter(c => c.solved)
                .reduce((sum, c) => sum + c.points, 0)
        };
    }
};
