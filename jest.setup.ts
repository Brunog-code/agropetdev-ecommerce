import "@testing-library/jest-dom"

import fetchMock from "jest-fetch-mock"
import * as React from "react"
import { act } from "react-dom/test-utils"

fetchMock.enableMocks()

// adiciona act ao namespace React de forma tipada
declare module "react" {
   
  export function act(
    callback: () => void | Promise<void>
  ): Promise<void>
}

;(React as unknown as { act: typeof act }).act = act
