import { getDictionary } from "@/src/lib/dictionary";
import { getPageData } from "@/src/lib/markdown";
import { MDX } from "@/src/components/Mdx";
import { PageHeader } from "@/src/components/ui/page-header";
import { Navbar } from "@/src/components/navigation/navbar";
import { i18n } from "@/i18n.config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Summary({
  params
}: {
  params: { lang: "en" | "ar" };
}) {
  const {lang} = await params;
  const dict = await getDictionary(lang);
  const { content, frontmatter } = getPageData(`summary.${lang}.mdx`);

  return (
    <main className="min-h-screen bg-background">
      <Navbar lang={lang ?? "en"} dictionary={dict.navigation} />
      <PageHeader
        title={frontmatter.title}
        subtitle={frontmatter.subtitle}
        heroImage={frontmatter.heroImage}
      />
      <MDX content={content} lang={lang} />
    </main>
  );
}
