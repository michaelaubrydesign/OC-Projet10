import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {

  const { data } = useData();

  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
    if (byDateDesc) {
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    )};
  };

  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      
      {/* Mapping à travers chaque événement dans byDateDesc */}
      {byDateDesc?.map((event, idx) => (
        <div key={event.id}>

        {/* Carte de l'événement */}
          <div
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
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
