import React, { useState } from "react";

export const SearchHoney = ({ product, production, hives }) => {
  return (
    <div className="searchHoneyContainer">
      <div>
        <ul>
          <li>
            <span>ID:</span>
            <p>{product?.id}</p>
          </li>
          <li>
            <span>LOTE:</span>
            <p>{product?.lote}</p>
          </li>
          <li>
            <span>CÓDIGO:</span>
            <p>{product?.codigo}</p>
          </li>
          <li>
            <span>ORIGEM:</span>
            <p>{product?.feedstockBatch}</p>
          </li>
          <li>
            <span>TIPO:</span>
            <p>{product?.honeyType}</p>
          </li>
          <li>
            <span>VARIEDADE:</span>
            <p>{product?.variety}</p>
          </li>
          <li>
            <span>PESO:</span>
            <p>{product?.weight}</p>
          </li>
          <li>
            <span>RECIPIENTE:</span>
            <p>{product?.packaging}</p>
          </li>
          <li>
            <span>VALIDADE:</span>
            <p>{product?.validity}</p>
          </li>
          <li>
            <span>COMPOSIÇÃO:</span>
            <p>{product?.composition}</p>
          </li>
        </ul>
      </div>

      <div>
        <ul>
          <li>
            <span>ID:</span>
            <p>{production.id}</p>
          </li>
          <li>
            <span>LOTE:</span>
            <p>{production.batch}</p>
          </li>
          <li>
            <span>CODIGO:</span>
            <p>{production.code}</p>
          </li>
          <li>
            <span>PRODUTOR:</span>
            <p>{production.productorId}</p>
          </li>
          <li>
            <span>APIÁRIO:</span>
            <p>{production.apiary}</p>
          </li>
          <li>
            <span>PESO:</span>
            <p>{production.weight}</p>
          </li>
          <li>
            <span>RECIPIENTE:</span>
            <p>{production.packing}</p>
          </li>
          <li>
            <span>FLORADA:</span>
            <p>{production.flowering}</p>
          </li>
          <li>
            <span>DATA:</span>
            <p>{production.date}</p>
          </li>
          <li>
            <span>COLMEIAS:</span>
            <p>{production.hivesId}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
