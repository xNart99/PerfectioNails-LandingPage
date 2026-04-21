"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, FileText, LogOut, PlusCircle, Mail, MessageSquare } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "All Posts", href: "/dashboard/posts", icon: FileText },
  { label: "New Post", href: "/dashboard/posts/new", icon: PlusCircle },
  { label: "Enquiries", href: "/dashboard/enquiries", icon: MessageSquare },
  { label: "Subscribers", href: "/dashboard/subscribers", icon: Mail },
];

/** Left-side navigation bar for the admin panel. */
export default function AdminNav({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-ink text-cream flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-[rgba(255,255,255,0.1)]">
        <div className="font-script text-[32px] text-cream leading-none">
          Perfectio<span className="text-gold">nails</span>
        </div>
        <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.4)] mt-1">
          Admin Panel
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname?.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded font-sans text-[13px] font-medium transition-all duration-200 mb-0.5
                ${active
                  ? "bg-gold text-ink"
                  : "text-[rgba(255,255,255,0.65)] hover:bg-[rgba(255,255,255,0.08)] hover:text-cream"
                }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.1)]">
        <div className="font-sans text-[12px] text-[rgba(255,255,255,0.5)] mb-3 truncate">
          {userEmail}
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2 font-sans text-[12px] text-[rgba(255,255,255,0.5)] hover:text-gold transition-colors cursor-pointer"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
