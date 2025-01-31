import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PageData {
  content: string;
  frontmatter: {
    title: string;
    subtitle?: string;
    heroImage?: string;
  };
}

export function getPageData(filename: string): PageData {
  const filePath = path.join(process.cwd(), 'src/content/markdown', filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    content,
    frontmatter: data as PageData['frontmatter'],
  };
}