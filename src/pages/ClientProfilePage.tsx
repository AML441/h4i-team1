import React from 'react'

function ClientProfilePage() {
    return (
        <div>
            {/* box for list of products */}
            {/* Will need to set up the routing so that I can test if the dimensions are right*/}
            <div className="mx-auto mt-auto w-[10rem] bg-purple-50 border-2" >
                <ul className="space-y-4">
                    <li className="flex items-center gap-4">
                        <img src="../assets/logo.png" alt="Logo" className="w-12 h-12 rounded-md bg-purple-200 p-1"/>
                        <span className="text-gray-800 font-medium">[NAME], [PRICE]</span>
                    </li>
                    <li className="flex items-center gap-4">
                        <img src="/assets/logo.png" alt="Product" className="w-12 h-12 rounded-md bg-purple-200 p-1" />
                        <span className="text-gray-800 font-medium">[NAME], [PRICE]</span>
                    </li>
                    <li className="flex items-center gap-4">
                        <img src="/assets/logo.png" alt="Product" className="w-12 h-12 rounded-md bg-purple-200 p-1" />
                        <span className="text-gray-800 font-medium">[NAME],[PRICE]</span>
                    </li>

                </ul>

                {/* Need to implement total and checkout later!! */}


            </div>


        </div>

    );

};

export default ClientProfilePage