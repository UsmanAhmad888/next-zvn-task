'use client';
import CreateEvent from "./components/event/create";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CreateEvent/>
    </main>
  )
}
