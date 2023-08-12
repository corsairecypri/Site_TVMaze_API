
import { useState } from 'react';


import InfosFavorites from '../components/InfosFavorites'


export default function Favoris () {

        
    const [data, setData] = useState(localStorage);


    return (
          
        <div>

                {
                    //* Si la donnée du localStorage utilisée est une liste, on peut mapper 
                    //* directement

                    //* (Dans ce cas-là, pas besoin de mettre JSON.stringify entre le JSON.parse
                    //*  et le localstorage)

                    //* Ici on parse l'item 'Favorites' du localStorage

                    JSON.parse(localStorage.getItem('Favorites')).map((id) => {

                        return (
                            
                            <InfosFavorites favoriteId = {id}/>
                            
                        )
                    })
                }

        </div>
    )
}


