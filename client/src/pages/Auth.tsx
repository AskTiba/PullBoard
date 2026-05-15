import { PBLogo } from "../components/brand";
import GitHub from "../components/icons/github";

export default function Auth() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-hestia-bg">
      {/* Visual Side */}
      <div className="relative hidden lg:block overflow-hidden">
        <div className="absolute top-10 left-10 z-20">
          <PBLogo width={180} />
        </div>
        <div className="absolute inset-0 bg-hestia-accent/10 z-10" />
        <img 
          src="/pbImg.png" 
          alt="PullBoard Dashboard Preview" 
          className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-1000" 
        />
        {/* Decorative Overlay */}
        <div className="absolute bottom-10 left-10 right-10 z-20 p-8 bg-white/10 backdrop-blur-md rounded-[32px] border border-white/20">
          <p className="text-white text-xl font-bold italic">
            "The most elegant way to manage your engineering velocity."
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex flex-col justify-center items-center px-6 lg:px-20 py-12">
        <div className="w-full max-w-md space-y-12">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center">
            <PBLogo width={160} />
          </div>

          {/* Text Content */}
          <div className="text-center lg:text-left space-y-4">
            <h2 className="text-4xl lg:text-5xl font-black text-hestia-text tracking-tight leading-tight">
              Welcome to <br />
              <span className="text-hestia-accent">Mission Control.</span>
            </h2>
            <p className="text-lg text-hestia-muted font-medium">
              Join thousands of developers tracking their PRs with Hestia precision.
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white p-10 rounded-[40px] shadow-ios-lg border border-white space-y-8">
            <div className="space-y-2 text-center lg:text-left">
              <h3 className="text-xl font-bold text-hestia-text">Get Started</h3>
              <p className="text-sm text-hestia-muted font-medium">
                Sign in with your GitHub account to continue.
              </p>
            </div>

            <button 
              onClick={() => window.location.href = 'http://localhost:3000/auth/github'}
              className="w-full flex items-center justify-center gap-4 bg-hestia-text text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-ios-lg hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <GitHub width={24} height={24} />
              <span>Connect GitHub</span>
            </button>

            <div className="pt-4 text-center">
              <p className="text-xs text-hestia-muted font-medium">
                By connecting, you agree to our <span className="text-hestia-accent cursor-pointer hover:underline">Terms</span> and <span className="text-hestia-accent cursor-pointer hover:underline">Privacy Policy</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
