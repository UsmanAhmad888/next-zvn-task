'use client';
import { useEffect, useState } from "react";
import CreateEvent from "./components/event/create";
import axios from "axios";
import Events from "./components/event/events";

export default function Home() {
  const [events, setEvents] = useState(null)
  const [isLoading, setLoading] = useState(true)

  const getEvents = () => {
    try {
      axios.get('/api/events')
        // .then((res) => res.json())
        .then((result) => {
          setEvents(result?.data?.data);
          setLoading(false);
        });
    } catch (e: any) {
      console.log("error occured");

      setLoading(false);
      setEvents(null)
    }
  }

  useEffect(() => {
    getEvents()
  }, [])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CreateEvent />
      {isLoading ? <>Loading</> :
        <Events events={events} />
      }
    </main>
  )
}
