export default function UnauthorizedPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center font-mono px-6 text-center">
      <h1 className="text-3xl font-bold text-primary-blue mb-4 tracking-wide">Access Denied</h1>
      <p className="text-secondary-blue text-base max-w-md leading-relaxed mb-8">
        Interview Diaries is restricted to <span className="font-bold">@nitc.ac.in</span> accounts only.
        Please sign in with your NIT Calicut Google account.
      </p>
      <a
        href="http://localhost:1337/api/connect/google"
        className="bg-primary-blue text-white px-8 py-2.5 text-sm font-bold tracking-widest uppercase hover:bg-blue-800 transition-colors"
      >
        Sign In with NITC Google
      </a>
    </div>
  );
}
