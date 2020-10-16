import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import mapMarker from '../images/map-marker.svg';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import '../styles/pages/orphanages-map.css';
import mapIcon from '../utils/mapIcon';

import api from '../services/api';
interface OrphanageProps {
    id: number;
    latitude: number;
    longitude: number;
    name: string

}

const OrphanagesMap = () => {

    const [orphanages, setOrphanages] = useState<OrphanageProps[]>([])

    useEffect(() => {
        api.get('orphanages').then((response) => {
            setOrphanages(response.data)

        })
    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarker} alt="marker" />
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>

                </header>
                <footer>
                    <strong>São Paulo </strong>
                    <span>Itaquaquecetuba</span>
                </footer>
            </aside>

            <Map
                center={[-23.4778756, -46.2953356]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"  /> */}
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                {orphanages.map(orphanage => {
                    const { id, latitude, longitude, name } = orphanage;
                    return (
                        <Marker
                            icon={mapIcon}
                            position={[latitude, longitude]}
                            key={id}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup" >
                                {name}
                                <Link to={`/orphanages/${id}`}>
                                    <FiArrowRight size={32} color="#FFF" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}

            </Map>
            <Link to="/orphanages/create" className="create-orphanage" >
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    )
}

export default OrphanagesMap