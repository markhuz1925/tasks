import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="fixed bottom-0 w-full p-4 border-t bg-slate-100">
      <div className="md:max-w-screen-2xl mx-auto w-full flex items-center justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto w-full flex itemx-center justify-between">
          <Button size="sm" variant="ghost">
            Privacy Policy
          </Button>
          <Button size="sm" variant="ghost">
            Terms of Service
          </Button>
        </div>
      </div>
    </footer>
  );
}
