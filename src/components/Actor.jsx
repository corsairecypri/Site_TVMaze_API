
import { useNavigate, useLocation } from "react-router-dom"

import InfosRoles from '../components/InfosRoles'
import InfosSeries from '../components/InfosSeries'



export default function Actor () {

    const location = useLocation();

    const navigate = useNavigate()



    return (
        <div>

            <div className="presentationActor">


                <div className='divActorImage'>
                    <p className="actorName">{location.state.actorInfo.name}</p>

                    <img src={location.state.actorInfo.image?.medium}></img>
                </div>

                <div className='actorInfo'>

                    <p className="actorCountry"><b>Country of origin</b> : {location.state.actorInfo.country?.name? location.state.actorInfo.country.name : "Unknown"}</p>

                    <p className="actorGender"><b>Gender</b> : {location.state.actorInfo.gender? location.state.actorInfo.gender : "Unknown"}</p>

                    <p className="actorBirthday"><b>Birthday</b> : {location.state.actorInfo.birthday? location.state.actorInfo.birthday : "Unknown"}</p>

                    {location.state.actorInfo.deathday? <p className="actorDeathday"> <b>Deathday</b> {location.state.actorInfo.deathday}</p> : ""}

                </div>

            </div>
            

            <h2 className="h2ActorRoles">Roles</h2>
 

            {

            location.state.actorInfo._embedded.castcredits.map((series) => {

                    //Il faut créer un composant pour chaque série dans laquelle l'acteur a joué
                    //et ce composant doit fetcher les infos

                    //? Pour accéder à des données d'API non écrits en dur, il faut déléguer 
                    //? à un composant le fetchage des données. 

                    //? Une fois ces données fetchées, on peut les afficher dans le return du composant

                    return (
            
                        <section className="actorResultSection">

                            <div className='result result3'>

                                <div className='divResultImage divResultImage4'>
                                    <InfosRoles rolesInfo = {series._links.character.href}/>
                                </div>


                                <div className='resultInfos'>

                                    <InfosSeries seriesInfo = {series._links.show.href}/>

                                </div>


                            </div> 
 

                        </section>   
                        
                    )
                })     


            }

        </div>
    )
}