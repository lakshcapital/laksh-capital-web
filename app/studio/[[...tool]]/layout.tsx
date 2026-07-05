import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Studio | Laksh Capital",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
