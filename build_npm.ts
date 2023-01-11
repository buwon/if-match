import { build, emptyDir } from 'https://deno.land/x/dnt/mod.ts';

const npm = './.npm';

await emptyDir(`${npm}`);

await build({
  entryPoints: ['./src/index.ts'],
  outDir: `${npm}`,
  shims: {
    deno: true,
  },
  package: {
    name: 'if-match',
    version: '1.0.3',
    description: 'Allows if-else to be used as a lambdba expression.',
    author: 'buwon',
    license: 'MIT',
    repository: {
      type: 'git',
      url: 'git+https://github.com/buwon/if-match.git',
    },
    homepage: 'https://github.com/buwon/if-match',
    bugs: {
      url: 'https://github.com/buwon/if-match/issues',
    },
  },
});

Deno.copyFileSync('LICENSE', `${npm}/LICENSE`);
Deno.copyFileSync('README.md', `${npm}/README.md`);
