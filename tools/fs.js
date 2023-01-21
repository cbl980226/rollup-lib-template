const path = require('path');
const { removeSync } = require('fs-extra');

/**
 * Delete an output directory, but error out if it's the root of the project.
 * @param {string} outputPath
 * @param {string} [root]
 */
function deleteOutputDir(outputPath, root) {
  root = root || process.cwd();
  const resolvedOutputPath = path.resolve(root, outputPath);
  if (resolvedOutputPath === root) {
    throw new Error('Output path MUST not be project root directory!');
  }

  removeSync(resolvedOutputPath);
}

module.exports = {
  deleteOutputDir,
};
