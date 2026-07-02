export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-zinc-900 bg-black">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(29,78,216,0.12),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        {/* Top Section */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold tracking-wider text-white">
              MARUTI
              <span className="ml-2 text-[#2B3494]">SUZUKI</span>
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Explore the future of mobility with performance,
              safety and innovation built for every journey.
            </p>
          </div>

          {/* Vehicles */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Vehicles
            </h3>

            <ul className="space-y-3 text-zinc-400">
              <li>
                <a href="#" className="transition hover:text-white">
                  SUVs
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-white">
                  Hatchbacks
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-white">
                  Sedans
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-white">
                  Electric
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-zinc-400">
              <li>
                <a href="#" className="transition hover:text-white">
                  About Us
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-white">
                  Dealers
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-white">
                  Contact
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-white">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Ready For A Test Drive?
            </h3>

            <p className="mb-6 text-zinc-400">
              Experience your next vehicle today.
            </p>

            <button className="rounded-full border border-white px-6 py-3 text-white transition hover:bg-white hover:text-black">
              Book Test Drive →
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-zinc-900" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-zinc-500">
            © 2026 Maruti Suzuki. All Rights Reserved.
          </p>

          <div className="flex gap-4">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition hover:border-[#2B3494] hover:text-white">
              X
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition hover:border-[#2B3494] hover:text-white">
              in
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition hover:border-[#2B3494] hover:text-white">
              f
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition hover:border-[#2B3494] hover:text-white">
              ▶
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}