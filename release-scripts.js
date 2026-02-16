const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const versionJsonPath = path.resolve(__dirname, 'version.json');
const packageJsonPath = path.resolve(__dirname, 'package.json');
const buildGradlePath = path.resolve(__dirname, 'android/app/build.gradle');
const envPath = path.resolve(__dirname, '.env');
const envProdPath = path.resolve(__dirname, '.env.production');
const envBackupPath = path.resolve(__dirname, '.env.bak');

function updateVersion() {
  const args = process.argv.slice(2);
  const type = args[0] || 'patch'; // major, minor, patch

  if (!['major', 'minor', 'patch'].includes(type)) {
    console.error('Invalid version type. Use: major, minor, or patch');
    process.exit(1);
  }

  let envSwapped = false;

  try {
    // 1. Environment Swap Logic
    if (fs.existsSync(envProdPath)) {
      console.log('🔄 Swapping .env with .env.production for release...');
      if (fs.existsSync(envPath)) {
        fs.copyFileSync(envPath, envBackupPath);
      }
      fs.copyFileSync(envProdPath, envPath);
      envSwapped = true;
    } else {
      console.warn('⚠️  .env.production not found. Using existing .env file.');
    }

    // 2. Read version.json
    const versionData = JSON.parse(fs.readFileSync(versionJsonPath, 'utf8'));
    const oldVersion = versionData.versionName;
    const oldCode = versionData.versionCode;

    console.log(
      `Bumping ${type} version from ${oldVersion} (code: ${oldCode})...`,
    );

    // 3. Calculate new version using semver logic
    let [major, minor, patch] = oldVersion.split('.').map(Number);
    if (type === 'major') {
      major++;
      minor = 0;
      patch = 0;
    } else if (type === 'minor') {
      minor++;
      patch = 0;
    } else {
      patch++;
    }

    const newVersion = `${major}.${minor}.${patch}`;
    const newCode = oldCode + 1;

    // 4. Update version.json
    versionData.versionName = newVersion;
    versionData.versionCode = newCode;
    fs.writeFileSync(versionJsonPath, JSON.stringify(versionData, null, 2));
    console.log(`Updated version.json to ${newVersion} (${newCode})`);

    // 5. Sync to package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.version = newVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('Updated package.json');

    // 6. Update Android build.gradle
    if (fs.existsSync(buildGradlePath)) {
      let content = fs.readFileSync(buildGradlePath, 'utf8');
      content = content.replace(
        /versionName\s+\".*\"/,
        `versionName "${newVersion}"`,
      );
      content = content.replace(/versionCode\s+\d+/, `versionCode ${newCode}`);
      fs.writeFileSync(buildGradlePath, content);
      console.log('Updated android/app/build.gradle');
    }

    console.log('\n✅ Versioning updated successfully!');

    // 7. Run Android Build
    console.log('\n🚀 Starting Android Release Build...');
    const androidDir = path.resolve(__dirname, 'android');
    execSync('./gradlew clean assembleRelease', {
      cwd: androidDir,
      stdio: 'inherit',
    });
    console.log('\n✅ Android Release Build finished successfully!');
    console.log(
      `\nArtifact path: android/app/build/outputs/apk/release/FoodApp-v${newVersion}.apk`,
    );
  } catch (error) {
    console.error('\n❌ Release process failed!');
    console.error(error.message);
    process.exit(1);
  } finally {
    // 8. Restore original .env
    if (envSwapped) {
      console.log('\n🧹 Restoring original .env file...');
      if (fs.existsSync(envBackupPath)) {
        fs.copyFileSync(envBackupPath, envPath);
        fs.unlinkSync(envBackupPath);
      } else {
        // If there was no backup, it means .env didn't exist originally
        fs.unlinkSync(envPath);
      }
    }
  }
}

updateVersion();
