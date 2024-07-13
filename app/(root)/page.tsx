// import { Button } from "@/components/ui/button";
// import Collection from "@/components/ui/shared/Collection";
// import Image from "next/image";
// import Link  from 'next/link'


// export default function Home() {
//   return (
//     <>
//       <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
//        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
//         <div className="flex flex-col justify-center gap-8">
//         <h1 className="h1-bold">Host, Connect, Celebrate: Your Events, Our Platform!</h1>
//             <p className="p-regular-20 md:p-regular-24">Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.</p>
//             <Button size="lg" asChild className="button w-full sm:w-fit">
//               <Link href="#events">
//                 Explore Now
//               </Link>
//             </Button>
//         </div>

//         <Image
//             src="/assets/images/hero.png"
//             alt="hero"
//             width={1000}
//             height={1000}
//             className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
//           />
//        </div>
//       </section>

//       <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
//         <h2 className="h2-bold">Trust by <br /> Thousands of Events</h2>

//         <div className="flex w-full flex-col gap-5 md:flex-row">
//           {/* <Search /> */}
//           {/* <CategoryFilter /> */}
//         </div>

//         <Collection
//           data={events?.data}
//           emptyTitle="No Events Found"
//           emptyStateSubtext="Come back later"
//           collectionType="All_Events"
//           limit={6}
//           page={page}
//           totalPages={events?.totalPages}
//         />
//       </section>


//     </>
//   )
// }

"use client"
import { Button } from "@/components/ui/button";
import Collection from "@/components/ui/shared/Collection";
import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { IEvent } from '@/lib/mongodb/database/models/event.model'; // Import the IEvent type

type EventsResponse = {
  data: IEvent[];
  totalPages: number;
};

export default function Home() {
  const [events, setEvents] = useState<EventsResponse | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    // Fetch events data from your API or data source
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data: EventsResponse = await response.json();
        console.log("Fetched events data:", data); // Add this line to log the fetched data
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Host, Connect, Celebrate: Your Events, Our Platform!</h1>
            <p className="p-regular-20 md:p-regular-24">Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.</p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">
                Explore Now
              </Link>
            </Button>
          </div>

          <Image
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Trusted by <br /> Thousands of Events</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          {/* <Search /> */}
          {/* <CategoryFilter /> */}
        </div>

        {events ? (
          <Collection
            data={events.data}
            emptyTitle="No Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            limit={6}
            page={page}
            totalPages={events.totalPages}
          />
        ) : (
          <p>Loading events...</p>
        )}
      </section>
    </>
  );
}


