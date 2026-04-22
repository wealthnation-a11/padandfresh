import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-girl">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-hero px-5 py-2 text-sm font-semibold text-white shadow-glow-girl"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PadAndFresh.ng — Keep them in school. Keep them confident." },
      {
        name: "description",
        content:
          "₦700 keeps a Nigerian girl in school or a Nigerian boy confident. Join us in supporting 1,000 youth in Kaduna State.",
      },
      { name: "author", content: "Prescribly" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@PadAndFresh" },
      { property: "og:title", content: "PadAndFresh.ng — Keep them in school. Keep them confident." },
      { name: "twitter:title", content: "PadAndFresh.ng — Keep them in school. Keep them confident." },
      { name: "description", content: "A donation website supporting Nigerian youth with sanitary pads and hygiene products, featuring real-time tracking." },
      { property: "og:description", content: "A donation website supporting Nigerian youth with sanitary pads and hygiene products, featuring real-time tracking." },
      { name: "twitter:description", content: "A donation website supporting Nigerian youth with sanitary pads and hygiene products, featuring real-time tracking." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/758e0d34-3757-46a8-a251-77987898d0b6/id-preview-18e79e4b--3bdcc6fb-f0bd-4b6c-9f28-5e145cbf2c94.lovable.app-1776855103436.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/758e0d34-3757-46a8-a251-77987898d0b6/id-preview-18e79e4b--3bdcc6fb-f0bd-4b6c-9f28-5e145cbf2c94.lovable.app-1776855103436.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <Toaster richColors position="top-right" />
    </div>
  );
}
