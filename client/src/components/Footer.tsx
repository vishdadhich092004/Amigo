const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h4 className="font-medium">About</h4>
            <nav className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Careers
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Press
              </a>
            </nav>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">Help</h4>
            <nav className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Support
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Safety
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Terms
              </a>
            </nav>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">Resources</h4>
            <nav className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Blog
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Developers
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Guidelines
              </a>
            </nav>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">Legal</h4>
            <nav className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Cookies
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Licenses
              </a>
            </nav>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Amigo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
