import { redirect } from "next/navigation";

// The middleware handles locale detection and redirect.
// This fallback redirects root / -> /hu just in case.
export default function RootPage() {
  redirect("/hu");
}
