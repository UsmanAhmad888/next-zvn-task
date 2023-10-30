import { Card, CardBody, CardHeader } from "@nextui-org/react";
import moment from "moment";

const Events = (props?: any) => {
    const { events } = props;

    return (
        <>      <h3 className='mt-10 mb-5'>Events</h3>
            {events && events.length > 0 ?
                <div className='container m-auto grid sm:grid-col-12 md:grid-cols-3 gap-4' >
                    {events && events.map((evt: any) => {
                        return (

                            <div key={evt.id} className='grid-cols-4  '>
                                <Card className="dark:bg-gray-800 dark:text-white">
                                        <CardHeader className="flex gap-3">
                                            <h3>{evt?.title}</h3>
                                        </CardHeader>
                                    <CardBody>
                                        Date: {moment(evt.data).format('DD:MM:YYYY')}
                                    </CardBody>
                                </Card>
                            </div>
                        )
                    })}
                </div>
                :
                <>no event found</>}</>
    )
}

export default Events