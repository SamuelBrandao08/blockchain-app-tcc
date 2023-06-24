import React, { useState } from "react";

const SearchHoney = ({ product, production, hives }) => {
  return (
    <div className="home-container">
      <div className="content">
        <div>
          <ul>
            <li>ID: {product?.id}</li>
            <li>LOTE: {product?.lote}</li>
            <li>CODIGO: {product?.codigo}</li>
            <li>ORIGEM: {product?.feedstockBatch}</li>
            <li>TIPO: {product?.honeyType}</li>
            <li>VARIEDADE: {product?.variety}</li>
            <li>PESO: {product?.weight}</li>
            <li>RECIPIENTE: {product?.packaging}</li>
            <li>VALIDADE: {product?.validity}</li>
            <li>COMPOSIÇÃO: {product?.composition}</li>
          </ul>
        </div>
      </div>
      <div>
        <ul>
          <li>ID: {production.id}</li>
          <li>LOTE: {production.batch}</li>
          <li>CODIGO: {production.code}</li>
          <li>PRODUTOR: {production.productorId}</li>
          <li>APIÁRIO: {production.apiary}</li>
          <li>PESO: {production.weight}</li>
          <li>RECIPIENTE: {production.packing}</li>
          <li>FLORADA: {production.flowering}</li>
          <li>DATA: {production.date}</li>
          <li>COLMEIAS: {production.hivesId}</li>
        </ul>
      </div>
    </div>
  );
};

export default SearchHoney;
