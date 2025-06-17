// import { format } from 'date-fns';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import VolunteerModal from '../../Components/VolunteerModal/VolunteerModal';
import { Helmet } from 'react-helmet-async';

const PostDetails = () => {
    const data = useLoaderData()
    const { category, deadline, description, location, postTitle, thumbnail, volunteersNeeded } = data;
    const [volunteersNumber, setVolunteersNumber] = useState(volunteersNeeded)
    return (
        <div className="block rounded-lg p-4  shadow w-8/12 mx-auto mt-10">
            <Helmet>
                <title>Post Details | {postTitle}</title>
            </Helmet>
            <img
                alt=""
                src={thumbnail}
                className="h-76 w-full rounded-md object-contain"
            />

            <div className="mt-2">
                <div className='flex justify-between mt-5'>
                    <div>
                        <p className="text-sm text-gray-500">{deadline}</p>
                        <dd className="font-medium">{postTitle}</dd>
                    </div>
                    <div>
                        {
                            volunteersNumber === 0 ? <button disabled className='btn btn-accent'>Become a Volunteer</button> :
                                <button className="btn btn-accent" onClick={() => document.getElementById('my_modal_3').showModal()}>Become a Volunteer</button>
                        }
                        {/* THIS MODAL WILL BE OPEN WHEN SOMEONE WILL CLICK ON THE BUTTON ABOVE */}
                        <VolunteerModal data={data} setVolunteersNumber={setVolunteersNumber} volunteersNumber={volunteersNumber}></VolunteerModal>
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-5 text-xs">
                    <p>Category: {category}</p>
                    <p>Location: {location}</p>
                    <p>Volunteer Needed: {volunteersNumber}</p>
                    <p>Description: {description}</p>

                </div>
            </div>
        </div>
    );
};

export default PostDetails;