'use client'

export default function ContactSettings() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 lg:p-8">

      <h2 className="mb-8 text-2xl font-semibold text-white">
        Contact Settings
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">

        <Input
          label="Primary Phone"
          placeholder="+91 9876543210"
        />

        <Input
          label="Secondary Phone"
          placeholder="+91 9876543210"
        />

        <Input
          label="Email"
          placeholder="info@nkcars.com"
        />

        <Input
          label="WhatsApp"
          placeholder="+91 9876543210"
        />

      </div>

      <div className="mt-6">

        <label className="mb-2 block text-zinc-300">
          Address
        </label>

        <textarea
          rows={4}
          placeholder="Showroom Address..."
          className="w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none focus:border-indigo-800"
        />

      </div>

      <div className="mt-6">

        <Input
          label="Google Maps Embed Link"
          placeholder="https://maps.google.com/..."
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