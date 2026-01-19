const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/player.js'],
  bundle: true,
  minify: true,
  outfile: 'dist/dev-audio-player.min.js',
  format: 'iife',
  loader: {
    '.css': 'text',
  },
  target: ['es2015'],
}).catch(() => process.exit(1));
