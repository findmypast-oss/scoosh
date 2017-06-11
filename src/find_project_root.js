function getRelativePathToGitRoot() {
  const relativePath = execSync('git rev-parse --show-cdup');
  if (relativePath.startsWith('fatal:')) {
    return '';
  }
  return relativePath;
}

module.exports = {
  getRelativePathToGitRoot,
};
