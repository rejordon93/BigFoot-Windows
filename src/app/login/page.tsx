// app/login/page.tsx
import { Suspense } from "react";
import Login from "./Login";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white">Loading login...</div>}>
      <Login />
    </Suspense>
  );
}
