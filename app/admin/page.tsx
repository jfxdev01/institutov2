import { AdminPanel } from "./AdminPanel";

export const metadata = {
  title: "Administração | Instituto V2",
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  return (
    <section className="bg-primary-50/60 min-h-screen">
      <AdminPanel />
    </section>
  );
}
