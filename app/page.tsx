'use client';
import { useEffect, useState } from "react";
import CreateEvent from "./components/event/create";
import Events from "./components/event/events";
import callApi from "@/services/GetData";

export default function Home() {
  const [events, setEvents] = useState(null)
  const [isLoading, setLoading] = useState(true)

  const getEvents = () => {
    try {
      callApi('/api/events',{},'get',false)
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
      <CreateEvent onCreateEvent={getEvents}/>
      {isLoading ? <>Loading</> :
        <Events events={events} />
      }
    </main>
  )
}
