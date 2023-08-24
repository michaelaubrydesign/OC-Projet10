import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

// Importation du composant fonctionnel Slider
const Slider = () => {

  // Utilisation du hook useData pour obtenir les data
  const { data } = useData();

  // État local pour stocker l'index de la carte actuellement affichée dans le slider
  const [index, setIndex] = useState(0);

  // Trie des événements par ordre !!! décroissant !!! de date
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  // Fonction pour passer à la prochaine carte après un délai (5000ms = 5sec)
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length ? index + 1 : 0),
      5000
    );
  };

  // Utilisation de useEffect pour appeler la fonction nextCard après chaque rendu
  useEffect(() => {
    nextCard();
  });

  // Rendu du composant
  return (
    <div className="SlideCardList">
      
      {/* Mapping à travers chaque événement dans byDateDesc */}
      {byDateDesc?.map((event, idx) => (
        <>

        {/* Carte de l'événement */}
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />

            {/* Conteneur de la description de la carte */}
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>

          {/* Pagination des cartes */}
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">

              {/* Mapping à travers chaque événement pour créer des boutons radio */}
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${byDateDesc[radioIdx].id}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
