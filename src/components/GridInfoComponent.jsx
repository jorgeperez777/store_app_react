import React from "react";
import "./GridInfoComponent.css";

const GridInfoComponent = () => {
  return (
    <div className="section-info-grid">
      <span className="title-info-section">Garantia de nuestro servicio</span>
      <div className="grid-info">
        <InfoRowComponent
          url_img={
            "https://res.cloudinary.com/djx6viedj/image/upload/t_trimmed_square_128/x1ss4wnhbgm7vbro1ndt89jry8zs?_a=BACCd2Ev"
          }
          title="Pago 100% Seguro"
          alt={"segure-pay"}
          descp="Garantizado. Con diversos medios de pago."
        />
        <InfoRowComponent
          url_img={
            "https://res.cloudinary.com/djx6viedj/image/upload/t_trimmed_square_128/ptgv7py2labdzh1fre2f90jj2maf?_a=BACCd2Ev"
          }
          title="Encuéntralo todo"
          alt={"find-all"}
          descp="Con nuestro avanzado buscador."
        />
        <InfoRowComponent
          url_img={
            "https://res.cloudinary.com/djx6viedj/image/upload/t_trimmed_square_128/277kxho2vsfjzzbf4euvhnfj32wh?_a=BACCd2Ev"
          }
          title="Despacho internacional"
          alt={"send-all-world"}
          descp="A través de múltiples paises."
        />
        <InfoRowComponent
          url_img={
            "https://res.cloudinary.com/djx6viedj/image/upload/t_trimmed_square_128/100yalk6gu1d0hi7q1nhlmpvqj0u?_a=BACCd2Ev"
          }
          title="Envío Gratis"
          alt={"send-free"}
          descp="En compras sobre $75.000 comunas adheridas."
        />
      </div>
    </div>
  );
};

const InfoRowComponent = ({
  url_img = "",
  alt = "",
  title = "",
  descp = "",
}) => {
  return (
    <div className="grid-item-info">
      <img src={url_img} alt={alt} style={{ height: "30%" }} />
      <div className="grid-descp">
        <span className="grid-title-info">{title}</span>
        <p>{descp}</p>
      </div>
    </div>
  );
};

export default GridInfoComponent;
