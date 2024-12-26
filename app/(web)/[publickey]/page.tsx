import { Metadata } from "next";
import SharePage from "@/components/pages/share";

interface Params {
  publickey: string;
}

interface SearchParams {
  story?: string;
}
// Use the specific Next.js page props type
export type PageProps = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
};
export const generateMetadata = async ({
  params,
}: {
  params: PageProps["params"];
}): Promise<Metadata> => {
  const resolvedParams = await params;
  return {
    title: `Wrapped - ${resolvedParams?.publickey}`,
  };
};

export default async function Page({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const currSearchParams = await searchParams;
  const storyId = currSearchParams?.story ?? "";

  return <SharePage publicKey={resolvedParams.publickey} storyId={storyId} />;
}
