import React, { useState, useEffect } from 'react'


export default function InfosRoles ({rolesInfo}) {

    const [data, setData] = useState();


    useEffect(() =>  {
        
        try{
            fetch(rolesInfo)
        
            .then(function(response) {
        
            return response.json();
          
            }).then(function(response) {
    

            //* Ici on utilise le setter et non un state

            setData(response)
    
        })
    
        } catch (err) {
            console.log(err.message)
        }

    }, []);



    return (
        <div className='infosRoleComponent'>

            <p className='roleLineComponent'>Plays the role of <br/> <u> {data?.name} </u></p>

            
            <img className="resultImage actorImageRoleComponent" src={data?.image?.medium?  data.image.medium : "/images/image-not-found.jpg"}/>
            
        </div>
    )
}