const semanticRelease = require('semantic-release');
const pkg = require('../package.json');

async function getVersion() {
  let version = pkg.version;
  try {
    const result = await semanticRelease({
      branches: ['master'],
      dryRun: true,
      plugins: [],
    });
    if (result) {
      const {lastRelease, nextRelease} = result;
      if (lastRelease.version) {
        console.log(`The last release was "${lastRelease.version}".`);
      }
      console.log('The next release is', nextRelease.version);
      version = nextRelease.version;
    } else {
      console.log('No release published.');
    }
  } catch (err) {
    console.error('The automated release failed with %O', err);
  }
  console.log('The version is', version);
  return version;
}

module.exports = getVersion;
