const fs = require('fs');
const path = require('path');

const userDir = 'C:\\Users\\admin\\.gemini\\antigravity-ide\\brain\\8a102ce3-046d-4ca5-be4e-db3882f054eb\\.user_uploaded';
const targetDir = 'C:\\Users\\admin\\.gemini\\antigravity-ide\\scratch\\WashOn\\src\\assets\\images';
const expoAssetsDir = 'C:\\Users\\admin\\.gemini\\antigravity-ide\\scratch\\WashOn\\assets';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

fs.copyFileSync(path.join(userDir, 'media_1789642225435.jpg'), path.join(targetDir, 'logo.jpg'));
fs.copyFileSync(path.join(userDir, 'media_1789642239443.jpg'), path.join(targetDir, 'favicon.jpg'));
fs.copyFileSync(path.join(userDir, 'media_1789642190361.png'), path.join(targetDir, 'splash_screen_mockup.png'));

// Copy to expo root assets as well
fs.copyFileSync(path.join(userDir, 'media_1789642239443.jpg'), path.join(expoAssetsDir, 'favicon.png'));
fs.copyFileSync(path.join(userDir, 'media_1789642239443.jpg'), path.join(expoAssetsDir, 'icon.png'));

console.log('Successfully copied assets:', fs.readdirSync(targetDir));
