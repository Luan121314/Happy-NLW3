import React from 'react';
import { Link } from 'react-router-dom';
import mapMArker from '../images/map-marker.svg';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css'


import '../styles/pages/orphanages-map.css';

const OrphanagesMap = () => {

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMArker} alt="marker" />
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>

                </header>
                <footer>
                    <strong>São Paulo </strong>
                    <span>Itaquaquecetuba</span>
                </footer>
            </aside>
            <Link to="/" className="create-orphanage" >
                <FiPlus size={32} color="#FFF" />
            </Link>
            <Map
                center={[-23.4778756, -46.2953356]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"  /> */}
                <TileLayer
                 url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                   />
            </Map>
        </div>
    )
}

export default OrphanagesMap