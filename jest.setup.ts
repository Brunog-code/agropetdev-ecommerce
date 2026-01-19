import "@testing-library/jest-dom";

import fetchMock from "jest-fetch-mock";
import * as React from 'react';

fetchMock.enableMocks();

// 1. Resolve o erro de Tipagem do TS
declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

// 2. Avisa ao React que estamos em ambiente de teste
global.IS_REACT_ACT_ENVIRONMENT = true;

// 3. Polyfill caso o ambiente de teste não carregue o act nativo do React 19
if (typeof React.act === 'undefined') {
    // Usamos um type assertion para 'unknown' antes de 'React' para injetar a função
    // e tipamos o callback como uma função que retorna void ou Promise<void>
    (React as unknown as { act: (cb: () => void | Promise<void>) => void | Promise<void> }).act = (callback) => {
        return callback();
    };
}   