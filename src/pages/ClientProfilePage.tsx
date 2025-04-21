import { User } from 'firebase/auth';
import React from 'react'

interface ProfileProps {
    userData : User;
}

function ClientProfilePage({ userData }: ProfileProps) {
    return (
        <div>
            {/* Will need to set up the routing so that I can test if the dimensions are right*/}
            {/*Will later need to add name and number of purchases to the UserData Interface.*/ }
            <div className="mx-auto mt-auto w-[10rem] bg-[#C7A2D8] border-2" >
                <p className="text-base">Email: {userData.email} </p>
                <br />
                <br />
                <p className="text-base">User Stats: </p>
                <p className="text-base">Number of Purchases</p>
                <p className="text-base">Most Frequent Category: </p>
            </div>


        </div>

    );

};

export default ClientProfilePage