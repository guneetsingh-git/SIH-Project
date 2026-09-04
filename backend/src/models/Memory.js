/**
 * Domain shape for a saved Smriti Setu memory.
 *
 * This deliberately contains no persistence code yet: the repository does not
 * specify a database or any memory-related client API. Add the selected ORM or
 * database adapter here when those requirements are available.
 */
class Memory {
  constructor({ id, title, content, createdAt = new Date() }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
  }
}

module.exports = Memory;
