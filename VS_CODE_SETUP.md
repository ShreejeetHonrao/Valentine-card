# VS Code Setup Guide for This Project

## 📋 Quick Overview

This is a **Next.js 16 + TypeScript + Tailwind CSS + shadcn/ui** project.

---

## 🔧 Method 1: Automatic Setup (Recommended)

### Step 1: Install VS Code Extensions
Open this project in VS Code and press:
- **Windows/Linux**: `Ctrl + Shift + P`
- **Mac**: `Cmd + Shift + P`

Type: `Extensions: Show Recommended Extensions`

Click **"Install All"** to install all recommended extensions automatically.

---

## 🛠️ Method 2: Manual Installation

### Required Extensions (Must Install)

1. **ESLint**
   - Extension: `dbaeumer.vscode-eslint`
   - Purpose: Code linting and error checking

2. **Prettier**
   - Extension: `esbenp.prettier-vscode`
   - Purpose: Code formatting

3. **Tailwind CSS IntelliSense**
   - Extension: `bradlc.vscode-tailwindcss`
   - Purpose: Tailwind CSS autocomplete and suggestions

4. **TypeScript and JavaScript Language Features** (usually built-in)
   - Extension: `ms-vscode.vscode-typescript-next`
   - Purpose: TypeScript support

### Recommended Extensions (Nice to Have)

5. **ES7+ React/Redux/React-Native snippets**
   - Extension: `dsznajder.es7-react-jsnippets`
   - Purpose: React code snippets

6. **Auto Rename Tag**
   - Extension: `formulahendry.auto-rename-tag`
   - Purpose: Auto-rename paired HTML/XML tags

7. **Path Intellisense**
   - Extension: `christian-kohler.path-intellisense`
   - Purpose: Autocomplete file paths

8. **Material Icon Theme**
   - Extension: `pkief.material-icon-theme`
   - Purpose: Better file icons

9. **One Dark Pro Theme**
   - Extension: `zhuangtongfa.material-theme`
   - Purpose: Beautiful dark theme (optional)

10. **GitLens**
    - Extension: `eamodio.gitlens`
    - Purpose: Git supercharged

11. **Prisma**
    - Extension: `prisma.prisma`
    - Purpose: Prisma ORM support

---

## ✅ Verification Checklist

After installing extensions, verify they're working:

- [ ] Open a `.tsx` or `.ts` file - should see TypeScript highlighting
- [ ] Type a Tailwind class (e.g., `bg-`) - should see autocomplete
- [ ] Press `Ctrl/Cmd + S` - should auto-format code
- [ ] See squiggly underlines for errors - ESLint is working
- [ ] File icons should look nice - Material Icon Theme is working

---

## 🎯 Common VS Code Commands

### Formatting
- `Shift + Alt + F` - Format document
- `Ctrl/Cmd + Shift + P` → "Format Document With..." - Choose formatter

### Running the Project
- Open terminal: `Ctrl/Cmd + ~` (tilde)
- Run: `bun run dev`
- Check lint: `bun run lint`

### TypeScript
- `F12` - Go to definition
- `Shift + F12` - Find all references
- `Ctrl/Cmd + .` - Quick fix suggestions

---

## ⚠️ Important Notes

### This is NOT a Python Project
- **DO NOT** use `requirements.txt` (that's for Python)
- **DO USE** `package.json` (already included)
- All dependencies are already installed via `bun`

### If You Want to Add Dependencies
```bash
bun add <package-name>
# Example: bun add framer-motion
```

### If You Want to Remove Dependencies
```bash
bun remove <package-name>
# Example: bun remove framer-motion
```

---

## 📦 Current Project Dependencies (Already Installed)

See `package.json` for the complete list. Key dependencies include:

- **Framework**: Next.js 16, React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Database**: Prisma + SQLite
- **State**: Zustand + TanStack Query
- **Theme**: next-themes (dark mode)

---

## 🚨 Troubleshooting

### Extensions Not Working?
1. Reload VS Code: `Ctrl/Cmd + Shift + P` → "Developer: Reload Window"
2. Check if extensions are enabled in Extensions panel
3. Restart your computer if needed

### TypeScript Not Recognized?
1. Run: `bun install` to ensure all dependencies are installed
2. Reload VS Code
3. Check `.vscode/settings.json` has correct TypeScript path

### Tailwind CSS Not Working?
1. Ensure `tailwind.config.ts` exists
2. Ensure `globals.css` has Tailwind imports
3. Reload VS Code

### Linting Errors?
1. Run: `bun run lint`
2. Fix errors manually or use Quick Fix (`Ctrl/Cmd + .`)

---

## 📚 Additional Resources

- [VS Code Documentation](https://code.visualstudio.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

---

## 💡 Pro Tips

1. **Use Keyboard Shortcuts** - They save tons of time!
2. **Customize Your Theme** - Find one you love
3. **Install GitLens** - It makes working with git much easier
4. **Enable Auto-Save** - Never lose work again
5. **Use Code Snippets** - Install React snippets for faster coding

---

## 🎉 You're Ready!

After installing the recommended extensions, your VS Code is ready for development!

Open the terminal and run:
```bash
bun run dev
```

Then open `http://localhost:3000` to see your Valentine's Day website!

---

**Made with ❤️ for developers**
