/**
 * Assemblage des compositions Golden Gab.
 *
 * Ce fichier ne fait que **regrouper** ce qui est déclaré ailleurs :
 *  - le styleguide (outil de QA du design system) ;
 *  - les dossiers de toutes les séries, via `seriesRegistry`.
 *
 * Ajouter une série ne nécessite aucune modification ici : voir
 * `src/series/index.ts`.
 */

import React from "react";
import { Folder } from "remotion";

import { seriesRegistry } from "../series";
import { StyleguideComposition } from "./Styleguide";

export const GoldenGabCompositions: React.FC = () => {
  return (
    <>
      <Folder name="GoldenGab">
        <StyleguideComposition />
      </Folder>
      {seriesRegistry.map((series) => {
        const SeriesFolder = series.Folder;

        return <SeriesFolder key={series.id} />;
      })}
    </>
  );
};

export { Styleguide, StyleguideComposition } from "./Styleguide";
