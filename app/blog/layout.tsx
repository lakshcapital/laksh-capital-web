import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header calendlyUrl={process.env.NEXT_APP_CALENDLY_URL} />
      {children}
      <Footer />
      <WhatsAppButton />
    </>
  );
}
