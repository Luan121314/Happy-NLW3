import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus } from "react-icons/fi";
import { useHistory } from 'react-router-dom';

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

import '../styles/pages/create-orphanage.css';

export default function CreateOrphanage() {
  const history = useHistory()

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpeningOnWeekends] = useState(true);
  const [contact, setContact] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [mapPosition, setMapPosition] = useState({ latitude: 0, longitude: 0 })

  const [previewImages, setPreviewImages] = useState<string[]>([])
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position => {
      console.log(position);
      const { latitude, longitude } = position.coords;
      setMapPosition({ latitude, longitude })

    }))
  }, [])

  function handlerMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;


    setPosition({
      latitude: lat,
      longitude: lng
    });

  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return
    }
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    })

    setPreviewImages(selectedImagesPreview)

  }

  function ValidateIsNumber(event: ChangeEvent<HTMLInputElement>){
    const {value} = event.target
    setContact(value)    
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { latitude, longitude } = position;
    const data = new FormData();

    data.append("name", name);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("about", about);
    data.append("instructions", instructions);
    data.append("opening_hours", opening_hours);
    data.append("contact", contact);
    data.append("open_on_weekends", String(open_on_weekends));
    data.append("images", String(images));
    images.forEach(image => {
      data.append("images", image)
    })
    console.log(data);

    await api.post('orphanages', data);
    // alert('Cadastro realizado com sucesso !');
    history.push('/app');


  }


  return (
    <div id="page-create-orphanage">

      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[mapPosition.latitude, mapPosition.longitude]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handlerMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {position.latitude != 0 && (
                <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name"
                required
                value={about}
                onChange={(event) => setAbout(event.target.value)}
                maxLength={300} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>
              <div className="images-container">
                {
                  previewImages.map(image => {
                    return (
                      <img key={image} src={image} alt={name} />
                    )
                  })
                }

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                multiple type="file"
                id="image[]"
                onChange={handleSelectImages}
              />


            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                onChange={(event) => { setInstructions(event.target.value) }}
                value={instructions}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                onChange={(event) => { setOpeningHours(event.target.value) }}
                value={opening_hours}
                required
              />
            </div>

            <div className="input-block">
              <label htmlFor="whatsAppp">WhatsApp</label>
              <input
                id="whatsAppp"
                onChange={ValidateIsNumber}
                value={contact}
                inputMode="tel"
                maxLength={11}
                required
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => { setOpeningOnWeekends(true) }}
                >Sim</button>

                <button
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => { setOpeningOnWeekends(false) }}

                >Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

