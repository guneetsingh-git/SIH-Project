/**
 * Deterministic rule-based adaptive difficulty engine.
 * Adjusts difficulty based on accuracy and reaction time.
 * For the MVP, keeps difficulty between 1 and 5.
 */
export const calculateNewDifficulty = (currentDifficulty, accuracy, reactionTime) => {
  let newDifficulty = currentDifficulty;

  if (accuracy >= 80) {
    // High accuracy, maybe increase difficulty if reaction time was reasonable
    if (reactionTime < 10) {
      newDifficulty += 1;
    }
  } else if (accuracy < 50) {
    // Low accuracy, decrease difficulty
    newDifficulty -= 1;
  }

  // Ensure difficulty stays within 1 to 5
  return Math.min(Math.max(newDifficulty, 1), 5);
};

export const getDifficultyMessage = (oldDiff, newDiff, gameName) => {
  if (newDiff > oldDiff) {
    return `${gameName} is now slightly more challenging.`;
  } else if (newDiff < oldDiff) {
    return `${gameName} is now slightly easier.`;
  }
  return `${gameName} is at the perfect level for you.`;
};
