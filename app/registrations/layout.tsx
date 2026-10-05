import Header from "@/components/header";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";

export default function RegistrationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollToTop />
      <div className="hero__bg h-full w-full absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_33%,rgba(0,255,235,0.075)_0%,hsla(0,0%,100%,0)_25%),radial-gradient(circle_at_12%_35%,rgba(108,99,255,0.15)_0%,hsla(0,0%,100%,0)_25%)]" />
      <Header />
      <main className="min-h-screen pt-12">{children}</main>
      <Footer />
    </>
  );
}
