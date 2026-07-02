'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, EyeOff, LockKeyhole, Mail, Phone, User, MapPin, Car, Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'

const carModels = [
  "Brezza", "Swift", "Baleno", "Ertiga", "Grand Vitara", 
  "Fronx", "Jimny", "Alto K10", "Wagon R", "Celerio", "Not Sure"
]

export default function RegisterPage() {
  const router = useRouter()
  
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    city: '',
    pincode: '',
    interestedModel: '',
    budget: '',
    hearAbout: '',
    message: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    // TODO: API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLoading(false)
    router.push('/success?registered=true')
  }

  const progress = ((step - 1) / 2) * 100

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-[radial-gradient(at_center,#1a1a1a_0%,transparent_70%)]" />
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#2B3494]/10 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-800/10 blur-[130px]" />

      <section className="relative z-10 w-full max-w-lg px-4 sm:px-6 py-12">
        <div className="rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl">
          
          {/* Header */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900">
              <Image src="/logo.svg" alt="Maruti Suzuki" width={48} height={48} priority />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-white">Create Account</h1>
            <p className="text-zinc-400 mt-2">Join thousands of happy Maruti families</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#2B3494] transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between text-xs text-zinc-500 mt-2">
              <span>Basic Info</span>
              <span>Preferences</span>
              <span>Additional</span>
            </div>
          </div>

          {/* Step Content */}
          <form onSubmit={(e) => { e.preventDefault(); step === 3 ? handleSubmit() : nextStep() }} className="space-y-6">
            
            {/* ==================== STEP 1 ==================== */}
            {step === 1 && (
              <>
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">Full Name *</label>
                    <div className="flex h-12 items-center rounded-2xl border border-zinc-800 bg-zinc-900 px-4 focus-within:border-[#2B3494]">
                      <User size={20} className="text-zinc-500" />
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="ml-3 w-full bg-transparent outline-none text-white" placeholder="Enter your full name" />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">Email Address *</label>
                    <div className="flex h-12 items-center rounded-2xl border border-zinc-800 bg-zinc-900 px-4 focus-within:border-[#2B3494]">
                      <Mail size={20} className="text-zinc-500" />
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required className="ml-3 w-full bg-transparent outline-none text-white" placeholder="your@email.com" />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">Mobile Number *</label>
                    <div className="flex h-12 items-center rounded-2xl border border-zinc-800 bg-zinc-900 px-4 focus-within:border-[#2B3494]">
                      <Phone size={20} className="text-zinc-500" />
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="ml-3 w-full bg-transparent outline-none text-white" placeholder="98765 43210" />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">Password *</label>
                    <div className="flex h-12 items-center rounded-2xl border border-zinc-800 bg-zinc-900 px-4 focus-within:border-[#2B3494]">
                      <LockKeyhole size={20} className="text-zinc-500" />
                      <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required className="ml-3 w-full bg-transparent outline-none text-white" placeholder="Create password" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-zinc-500 hover:text-white">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">Confirm Password *</label>
                    <div className="flex h-12 items-center rounded-2xl border border-zinc-800 bg-zinc-900 px-4 focus-within:border-[#2B3494]">
                      <LockKeyhole size={20} className="text-zinc-500" />
                      <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="ml-3 w-full bg-transparent outline-none text-white" placeholder="Confirm password" />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-zinc-500 hover:text-white">
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ==================== STEP 2 ==================== */}
            {step === 2 && (
              <>
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">City *</label>
                    <div className="flex h-12 items-center rounded-2xl border border-zinc-800 bg-zinc-900 px-4 focus-within:border-[#2B3494]">
                      <MapPin size={20} className="text-zinc-500" />
                      <input type="text" name="city" value={formData.city} onChange={handleChange} required className="ml-3 w-full bg-transparent outline-none text-white" placeholder="e.g. Mumbai" />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">Interested Car Model</label>
                    <div className="flex h-12 items-center rounded-2xl border border-zinc-800 bg-zinc-900 px-4 focus-within:border-[#2B3494]">
                      <Car size={20} className="text-zinc-500" />
                      <select name="interestedModel" value={formData.interestedModel} onChange={handleChange} className="ml-3 w-full bg-transparent outline-none text-white">
                        <option value="">Select Model</option>
                        {carModels.map(model => (
                          <option key={model} value={model}>{model}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">Budget Range (Optional)</label>
                    <input type="text" name="budget" value={formData.budget} onChange={handleChange} className="h-12 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 text-white focus:border-[#2B3494] outline-none" placeholder="₹ 8 - 15 Lakh" />
                  </div>
                </div>
              </>
            )}

            {/* ==================== STEP 3 ==================== */}
            {step === 3 && (
              <>
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">How did you hear about us?</label>
                    <select name="hearAbout" value={formData.hearAbout} onChange={handleChange} className="h-12 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 text-white focus:border-[#2B3494] outline-none">
                      <option value="">Select Option</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Friend/Family">Friend or Family</option>
                      <option value="Google">Google Search</option>
                      <option value="Advertisement">Advertisement</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">Message / Requirements (Optional)</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full resize-y rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-white focus:border-[#2B3494] outline-none" placeholder="Any specific requirements or questions?" />
                  </div>
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-6">
              {step > 1 && (
                <button type="button" onClick={prevStep} className="flex-1 h-12 rounded-2xl border border-zinc-700 hover:bg-zinc-900 text-white font-medium transition">
                  Previous
                </button>
              )}

              {step < 3 ? (
                <button type="submit" className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-[#2B3494] to-indigo-800 text-white font-semibold transition hover:brightness-110">
                  Continue
                </button>
              ) : (
                <button type="submit" disabled={loading} className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-[#2B3494] to-indigo-800 text-white font-semibold transition hover:brightness-110 disabled:opacity-70">
                  {loading ? "Creating Account..." : "Complete"}
                </button>
              )}
            </div>

            {/* Skip Option */}
            {step === 2 || step === 3 ? (
              <button type="button" onClick={step === 3 ? handleSubmit : nextStep} className="w-full text-center text-sm text-zinc-400 hover:text-zinc-300 transition">
                Skip for now →
              </button>
            ) : null}
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-zinc-400 mt-8">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-indigo-800 hover:text-indigo-600">
              Login
            </Link>
          </p>

          <div className="mt-8 text-center text-xs text-zinc-500">
            © {new Date().getFullYear()} NK Car Showroom • Maruti Suzuki
          </div>
        </div>
      </section>
    </main>
  )
}