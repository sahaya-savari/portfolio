const fs = require('fs');
const files = [
  'src/sections/HeroSection.tsx',
  'src/components/BlurText.tsx',
  'src/components/Dock.tsx',
  'src/components/LearningJourney.tsx',
  'src/components/RotatingText.tsx',
  'src/components/ProjectModal.tsx',
  'src/components/FocusText.tsx',
  'src/components/CommandPalette.tsx',
  'src/components/BlogModal.tsx',
  'src/App.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/import\s+\{\s*motion(\s*,[^}]*)?\}\s+from\s+['"]framer-motion['"];?/, (match, p1) => {
    return `import { m as motion${p1 || ''} } from 'framer-motion';`;
  });
  content = content.replace(/import\s+\{([^}]*),\s*motion\s*\}/, (match, p1) => {
    return `import { ${p1}, m as motion }`;
  });
  fs.writeFileSync(file, content);
});
console.log('Replaced motion with m as motion');
