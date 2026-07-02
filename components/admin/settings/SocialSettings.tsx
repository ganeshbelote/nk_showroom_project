'use client'

export default function SocialSettings() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 lg:p-8">

      <h2 className="mb-8 text-2xl font-semibold text-white">
        Social Media
      </h2>

      <div className="grid gap-6">

        <Input
          label="Instagram"
          placeholder="https://instagram.com/..."
        />

        <Input
          label="Facebook"
          placeholder="https://facebook.com/..."
        />

        <Input
          label="YouTube"
          placeholder="https://youtube.com/..."
        />

        <Input
          label="Twitter / X"
          placeholder="https://x.com/..."
        />

        <Input
          label="LinkedIn"
          placeholder="https://linkedin.com/company/..."
        />

      </div>

      <div className="mt-8 flex justify-end">

        <button className="rounded-2xl bg-[#2B3494] px-8 py-3 font-semibold text-white hover:bg-indigo-800">
          Save Changes
        </button>

      </div>

    </div>
  )
}

function Input({
  label,
  placeholder
}: {
  label: string
  placeholder: string
}) {
  return (
    <div>

      <label className="mb-2 block text-zinc-300">
        {label}
      </label>

      <input
        placeholder={placeholder}
        className="w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none focus:border-indigo-800"
      />

    </div>
  )
}