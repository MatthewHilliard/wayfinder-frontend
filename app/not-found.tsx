import Link from "next/link";
import { Button } from "@/components/ui/button";

'A component for a 404 page that displays a message and a button to go back home.'
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Button asChild>
        <Link href="/">Go Back Home</Link>
      </Button>
    </div>
  );
}
