cat >dist/cjs/package.json <<!EOF
{
  "type": "commonjs",
	"typings": "dist/cjs/index.d.ts"
}
!EOF

cat >dist/mjs/package.json <<!EOF
{
  "type": "module",
	"typings": "dist/mjs/index.d.ts"
}
!EOF
