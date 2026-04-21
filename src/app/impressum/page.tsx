import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EditableText from "@/components/EditableText";

export default function Impressum() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full relative pt-40 pb-24 bg-brand-secondary min-h-[80vh]">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="bg-white p-10 md:p-14 rounded-3xl shadow-sm border border-gray-100">
            <h1 className="text-4xl font-bold text-brand-primary mb-8">
               <EditableText contentKey="impressum.headline" />
            </h1>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
               <EditableText contentKey="impressum.content" multiline />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
