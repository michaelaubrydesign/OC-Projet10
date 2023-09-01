import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData(); // Récupération des données et erreurs depuis le contexte
  const [type, setType] = useState(); // État pour le type d'événement sélectionné
  const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle
  // Filtrage des événements en fonction du type et de la pagination
  const filteredEvents = (
    (!type
      ? data?.events
      : data?.events) || []
  ).filter((event) => {
    if (!type) {
      return true
    }
    if (
      event.type === type
    ) {
      return true;
    }
    return false;
  })
  .filter((event, index) => {
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      return true;
    }
    return false;
  });

  // Fonction pour changer le type d'événement sélectionné et réinitialiser la page
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  // Calcul du nombre total de pages en fonction des événements filtrés
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;

  // Création d'une liste de types d'événements uniques
  const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
        {/* Sélection du type d'événement */}
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          {/* Affichage des événements filtrés */}
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              // Affichage d'un événement dans un modal
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          {/* Affichage de la pagination */}
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // Lien vers une page spécifique
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
