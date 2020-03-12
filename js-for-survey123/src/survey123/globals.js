import config from '../../webpack.config.js';

export const {
  library: libraryName,
  path: libraryPath,
  filename: libraryFilename
} = config.output;

export const libraryFullPath = libraryPath.indexOf("/") >= 0 ? ([libraryPath, libraryFilename]).join("/") : ([libraryPath, libraryFilename]).join("\\");

export default {
  libraryName,
  libraryPath,
  libraryFilename,
  libraryFullPath
}
