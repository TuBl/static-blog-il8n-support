# 🌍 3eza – Localized MDX-powered Markdown Pages with Theming Support

A sleek, developer-friendly template for building multilingual websites with rich Markdown content, dark/light theme toggling, and full support for JSX within `.mdx` files.

Built on top of [Next.js App Router](https://nextjs.org/docs/app/building-your-application/routing), this project leverages the power of [`@mdx-js/mdx`](https://mdxjs.com/) to let you write Markdown that seamlessly integrates with React components.

---

## ✨ Features

- ✅ **Internationalization (i18n)** – Easy support for multiple locales like English and Arabic.
- 💡 **Dark/Light Theme Ready** – Works beautifully with TailwindCSS + `prose` utilities.
- 📘 **MDX Support** – Use JSX directly in markdown files.
- 🧩 **Component Injection** – Customize rendering behavior in `src/components/Mdx.tsx`.
- 📁 **Filesystem-Based Markdown Routing** – Add pages and routes with minimal config.

---

## 🚀 Getting Started

### 1. Create a Markdown Page

Add your localized `.mdx` files to `src/content/markdown`.  
Use the language code in the filename:

```
src/content/markdown/home.en.mdx
src/content/markdown/home.ar.mdx
```

Each file can contain frontmatter metadata like:

```mdx
---
title: "Welcome"
subtitle: "Explore the world of 3eza"
heroImage: "/hero-image.png"
---
```

---

### 2. Create the Route

Create a Next.js App Router page at:

```
src/app/[lang]/your-route-name/page.tsx
```

Access the content with:

```tsx
const { content, frontmatter } = getPageData("your-file.en.mdx");
```

---

### 3. Add Your Translations

Update the appropriate dictionary file under `src/dictionaries/`:

```jsonc
// src/dictionaries/en.json
{
  "navigation": {
    "home": "Home",
    "hobbies": "Hobbies",
    "title": "3eza"
  }
}
```

---

## 🧠 Helper Utilities

### `getDictionary()` – Language-Aware Dictionary Loader

Located in `src/lib/dictionary.ts`:

```ts
const dictionaries = {
  en: () => import('@/src/dictionaries/en.json').then(m => m.default),
  ar: () => import('@/src/dictionaries/ar.json').then(m => m.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
```

---

### `getPageData()` – Parse Markdown Frontmatter + Content

Located in `src/lib/markdown.ts`:

```ts
export function getPageData(filename: string): PageData {
  const filePath = path.join(process.cwd(), 'src/content/markdown', filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    content,
    frontmatter: data as PageData['frontmatter'],
  };
}
```

---

## 🔧 MDX Customization

MDX rendering is powered by [`@mdx-js/mdx`](https://mdxjs.com/), and is fully customizable in:

```
src/components/Mdx.tsx
```

Features:
- Uses `remark-gfm` for GitHub-flavored Markdown
- Adds slugs and autolinks to headings via `rehype-slug` and `rehype-autolink-headings`
- Supports custom component injection like `<NextImage>` or `<UnstyledCode>`

Example usage:

```tsx
<MDX content={content} lang="en" />
```

Render output is styled using `prose` classes with RTL support for Arabic content.

---

## 📦 Dependencies

- `next` + App Router
- `@mdx-js/mdx`
- `remark-gfm`
- `rehype-slug`
- `rehype-autolink-headings`
- `gray-matter`
- `tailwindcss` with typography plugin

---

## 📁 Project Structure Overview

```
src/
├── app/
│   └── [lang]/[page]/page.tsx     // Route per locale
├── content/markdown/              // .mdx content files
├── dictionaries/                  // i18n translation JSON
├── lib/
│   ├── dictionary.ts              // getDictionary()
│   └── markdown.ts                // getPageData()
├── components/
│   └── Mdx.tsx                    // MDX rendering logic
```

---

## 🌗 Theme Support

This project works great in both dark and light modes. Make sure to set up your Tailwind config to support `darkMode: 'class'` and toggle the theme accordingly in your layout.

---

## 📣 Contributing

Contributions, bug reports, and suggestions are welcome! Feel free to fork this repo and build your own content platform.

---

## 🐾 Built with love by [Tariq](https://github.com/TuBl)

And inspired by a black cat named **Kastana** 🖤

---
