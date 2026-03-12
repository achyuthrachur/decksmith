#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { handleSkillsCommand } from './skills-sync.js';
import { handleRegisterCommand } from './register.js';
import { startMcpServer } from '../index.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
if (args[0] === '--version' || args[0] === '-v') {
    const pkgPath = path.resolve(__dirname, '../../package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    console.log(pkg.version);
    process.exit(0);
}
if (args[0] === 'skills') {
    handleSkillsCommand(args.slice(1)).catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
else if (args[0] === 'register') {
    handleRegisterCommand(args.slice(1));
}
else {
    startMcpServer().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map