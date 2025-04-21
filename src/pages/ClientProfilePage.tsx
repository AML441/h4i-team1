import { User } from 'firebase/auth';
import React from 'react'
import Navbar from '../components/Navbar';

// interface ProfileProps {
//     userData : User;
// }

function ClientProfilePage() {
    return (
        <div>
            {/* Will need to set up the routing so that I can test if the dimensions are right*/}
            {/*Will later need to add name and number of purchases to the UserData Interface.
            { userData }: ProfileProps*/ }
            <Navbar/>
            <div>
                <h1> PROFILE PAGE</h1>
            </div>
            <div className="mx-auto mt-50 w-[100rem] bg-[#FCF6FF]" >
                <p className="text-base">Email: </p>
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